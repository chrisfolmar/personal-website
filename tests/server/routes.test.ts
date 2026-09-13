import { describe, it, expect, beforeEach, vi } from "vitest";
import express from "express";
import request from "supertest";

// server/routes imports server/vite for the `log` helper, which in turn
// pulls in the full Vite package — heavy and not needed in unit tests.
vi.mock("../../server/vite", () => ({
  log: () => {},
  setupVite: () => {},
  serveStatic: () => {},
  injectSsrHead: (t: string) => t,
}));

vi.mock("../../server/mail-service", () => ({
  sendContactFormEmail: async () => ({ sent: true }),
}));

const { buildContactHandler, createRateLimiterState, isSpamContent, makeRateLimiter } =
  await import("../../server/routes");
import type { IStorage } from "../../server/storage";
import type { Message, InsertMessage, User, InsertUser } from "../../shared/schema";
import type { EmailDeliveryResult } from "../../server/mail-service";

class StubStorage implements IStorage {
  public messages: Message[] = [];
  private nextId = 1;
  async getUser(_id: number): Promise<User | undefined> {
    return undefined;
  }
  async getUserByUsername(_u: string): Promise<User | undefined> {
    return undefined;
  }
  async createUser(_u: InsertUser): Promise<User> {
    throw new Error("not used");
  }
  async createMessage(m: InsertMessage): Promise<Message> {
    const message: Message = {
      id: this.nextId++,
      ...m,
      deliveryStatus: "pending",
      providerMessageId: null,
      receivedAt: new Date(),
      notificationSentAt: null,
    };
    this.messages.push(message);
    return message;
  }
  async updateMessageDelivery(
    id: number,
    delivery: {
      deliveryStatus: "sent" | "failed";
      providerMessageId?: string;
      notificationSentAt?: Date;
    },
  ): Promise<void> {
    const message = this.messages.find((item) => item.id === id);
    if (!message) throw new Error("Message not found");
    message.deliveryStatus = delivery.deliveryStatus;
    message.providerMessageId = delivery.providerMessageId ?? null;
    message.notificationSentAt = delivery.notificationSentAt ?? null;
  }
  async getMessages(): Promise<Message[]> {
    return this.messages;
  }
}

function makeApp(
  storage: IStorage,
  opts?: {
    windowMs?: number;
    max?: number;
    sendEmail?: (message: Message) => Promise<EmailDeliveryResult>;
  },
) {
  const app = express();
  app.use(express.json());
  const limiterState = createRateLimiterState(opts?.windowMs ?? 60_000, opts?.max ?? 5);
  app.post(
    "/api/contact",
    makeRateLimiter(limiterState),
    buildContactHandler({
      storage,
      sendEmail: opts?.sendEmail ?? (async () => ({ sent: true })),
    }),
  );
  return { app, limiterState };
}

const validBody = {
  name: "Jane Tester",
  email: "jane@validdomain.io",
  subject: "Looking to connect on engineering leadership",
  message: "Hi Chris, I'd love to compare notes on operating models and AI workflows.",
};

describe("contact route", () => {
  let storage: StubStorage;
  beforeEach(() => {
    storage = new StubStorage();
  });

  it("accepts a valid submission and stores it", async () => {
    const { app } = makeApp(storage);
    const res = await request(app).post("/api/contact").send(validBody);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.deliveryStatus).toBe("sent");
    expect(storage.messages).toHaveLength(1);
    expect(storage.messages[0].email).toBe(validBody.email);
    expect(storage.messages[0].deliveryStatus).toBe("sent");
  });

  it("persists before attempting notification delivery", async () => {
    const { app } = makeApp(storage, {
      sendEmail: async (message) => {
        expect(storage.messages.some((stored) => stored.id === message.id)).toBe(true);
        return { sent: true, providerMessageId: "resend-message-id" };
      },
    });

    const res = await request(app).post("/api/contact").send(validBody);
    expect(res.status).toBe(201);
    expect(storage.messages[0].providerMessageId).toBe("resend-message-id");
    expect(storage.messages[0].notificationSentAt).toBeInstanceOf(Date);
  });

  it("reports a durable fallback when notification delivery fails", async () => {
    const { app } = makeApp(storage, {
      sendEmail: async () => ({ sent: false }),
    });

    const res = await request(app).post("/api/contact").send(validBody);
    expect(res.status).toBe(201);
    expect(res.body.success).toBe(true);
    expect(res.body.deliveryStatus).toBe("stored");
    expect(storage.messages).toHaveLength(1);
    expect(storage.messages[0].deliveryStatus).toBe("failed");
  });

  it("keeps the durable fallback when the provider throws", async () => {
    const { app } = makeApp(storage, {
      sendEmail: async () => {
        throw new Error("provider outage");
      },
    });

    const res = await request(app).post("/api/contact").send(validBody);
    expect(res.status).toBe(201);
    expect(res.body.deliveryStatus).toBe("stored");
    expect(storage.messages).toHaveLength(1);
  });

  it("returns an error when durable storage fails", async () => {
    const failingStorage = new StubStorage();
    failingStorage.createMessage = async () => {
      throw new Error("database unavailable");
    };
    const { app } = makeApp(failingStorage);

    const res = await request(app).post("/api/contact").send(validBody);
    expect(res.status).toBe(500);
    expect(res.body.success).toBe(false);
  });

  it("rejects empty body", async () => {
    const { app } = makeApp(storage);
    const res = await request(app).post("/api/contact").send({});
    expect(res.status).toBe(400);
  });

  it("rejects schema violations (wrong types)", async () => {
    const { app } = makeApp(storage);
    const res = await request(app)
      .post("/api/contact")
      .send({ name: "Jane", email: 123, subject: null, message: ["arr"] });
    expect(res.status).toBe(400);
    expect(res.body.success).toBe(false);
    expect(storage.messages).toHaveLength(0);
  });

  it("rejects invalid email addresses and undersized content server-side", async () => {
    const { app } = makeApp(storage);
    const res = await request(app).post("/api/contact").send({
      name: "J",
      email: "not-an-email",
      subject: "Hi",
      message: "Too short",
    });
    expect(res.status).toBe(400);
    expect(storage.messages).toHaveLength(0);
  });

  it("rejects oversized content server-side", async () => {
    const { app } = makeApp(storage);
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, message: "x".repeat(1001) });
    expect(res.status).toBe(400);
    expect(storage.messages).toHaveLength(0);
  });

  it("rejects spam content in message", async () => {
    const { app } = makeApp(storage);
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, message: "Hello, please buy viagra at our pharmacy today." });
    expect(res.status).toBe(400);
    expect(storage.messages).toHaveLength(0);
  });

  it("rejects suspicious email domains", async () => {
    const { app } = makeApp(storage);
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, email: "someone@example.com" });
    expect(res.status).toBe(400);
  });

  it("silently accepts honeypot submissions without storing", async () => {
    const { app } = makeApp(storage);
    const res = await request(app)
      .post("/api/contact")
      .send({ ...validBody, website: "http://spam.example" });
    expect(res.status).toBe(200);
    expect(res.body.success).toBe(true);
    expect(storage.messages).toHaveLength(0);
  });
});

describe("rate limiter", () => {
  it("allows up to max requests then 429s", async () => {
    const storage = new StubStorage();
    const { app } = makeApp(storage, { windowMs: 60_000, max: 2 });
    const r1 = await request(app).post("/api/contact").send(validBody);
    const r2 = await request(app).post("/api/contact").send(validBody);
    const r3 = await request(app).post("/api/contact").send(validBody);
    expect(r1.status).toBe(201);
    expect(r2.status).toBe(201);
    expect(r3.status).toBe(429);
  });

  it("resets the counter after the window passes", () => {
    const state = createRateLimiterState(50, 1);
    const limiter = makeRateLimiter(state);

    const fakeReq = { ip: "1.1.1.1", socket: { remoteAddress: "1.1.1.1" } } as any;
    let lastStatus = 0;
    let nextCalls = 0;
    const fakeRes = {
      status(code: number) {
        lastStatus = code;
        return this;
      },
      json() {
        return this;
      },
    } as any;
    const next = () => {
      nextCalls++;
    };

    limiter(fakeReq, fakeRes, next);
    expect(nextCalls).toBe(1);
    limiter(fakeReq, fakeRes, next);
    expect(lastStatus).toBe(429);

    // Force the window to expire.
    state.requests.get("1.1.1.1")!.resetTime = Date.now() - 1;
    limiter(fakeReq, fakeRes, next);
    expect(nextCalls).toBe(2);
  });
});

describe("isSpamContent", () => {
  it("flags known spam phrases", () => {
    expect(isSpamContent("Earn money fast with this trick")).toBe(true);
    expect(isSpamContent("Free CASINO bonus")).toBe(true);
    expect(isSpamContent("Visit https://bit.ly/abc")).toBe(true);
  });

  it("does not flag normal messages", () => {
    expect(isSpamContent("Hello, I'd love to talk about engineering leadership")).toBe(false);
    expect(isSpamContent("Following up on our case-study conversation")).toBe(false);
  });
});
