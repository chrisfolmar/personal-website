import { users, type User, type InsertUser, messages, type Message, type InsertMessage } from "@shared/schema";
import { desc, eq } from "drizzle-orm";
import { db } from "./db";

// modify the interface with any CRUD methods
// you might need

export interface IStorage {
  getUser(id: number): Promise<User | undefined>;
  getUserByUsername(username: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  createMessage(message: InsertMessage): Promise<Message>;
  updateMessageDelivery(
    id: number,
    delivery: {
      deliveryStatus: "sent" | "failed";
      providerMessageId?: string;
      notificationSentAt?: Date;
    },
  ): Promise<void>;
  getMessages(): Promise<Message[]>;
}

// Kept for isolated unit tests. Runtime traffic uses DatabaseStorage below.
export class MemStorage implements IStorage {
  private users: Map<number, User>;
  private messages: Map<number, Message>;
  currentUserId: number;
  currentMessageId: number;

  constructor() {
    this.users = new Map();
    this.messages = new Map();
    this.currentUserId = 1;
    this.currentMessageId = 1;
  }

  async getUser(id: number): Promise<User | undefined> {
    return this.users.get(id);
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    return Array.from(this.users.values()).find(
      (user) => user.username === username,
    );
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const id = this.currentUserId++;
    const user: User = { ...insertUser, id };
    this.users.set(id, user);
    return user;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const id = this.currentMessageId++;
    const message: Message = {
      ...insertMessage,
      id,
      deliveryStatus: "pending",
      providerMessageId: null,
      receivedAt: new Date(),
      notificationSentAt: null,
    };
    this.messages.set(id, message);
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
    const current = this.messages.get(id);
    if (!current) throw new Error("Message not found");
    this.messages.set(id, {
      ...current,
      deliveryStatus: delivery.deliveryStatus,
      providerMessageId: delivery.providerMessageId ?? null,
      notificationSentAt: delivery.notificationSentAt ?? null,
    });
  }

  async getMessages(): Promise<Message[]> {
    return Array.from(this.messages.values());
  }
}

export class DatabaseStorage implements IStorage {
  async getUser(id: number): Promise<User | undefined> {
    const [user] = await db.select().from(users).where(eq(users.id, id)).limit(1);
    return user;
  }

  async getUserByUsername(username: string): Promise<User | undefined> {
    const [user] = await db
      .select()
      .from(users)
      .where(eq(users.username, username))
      .limit(1);
    return user;
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const [user] = await db.insert(users).values(insertUser).returning();
    return user;
  }

  async createMessage(insertMessage: InsertMessage): Promise<Message> {
    const [message] = await db.insert(messages).values(insertMessage).returning();
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
    await db
      .update(messages)
      .set({
        deliveryStatus: delivery.deliveryStatus,
        providerMessageId: delivery.providerMessageId ?? null,
        notificationSentAt: delivery.notificationSentAt ?? null,
      })
      .where(eq(messages.id, id));
  }

  async getMessages(): Promise<Message[]> {
    return db.select().from(messages).orderBy(desc(messages.receivedAt));
  }
}

export const storage = new DatabaseStorage();
