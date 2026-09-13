import { describe, expect, it } from "vitest";
import type { Message } from "../../shared/schema";
import { buildContactEmail, escapeHtml } from "../../server/mail-service";

function makeMessage(overrides: Partial<Message> = {}): Message {
  return {
    id: 1,
    name: "Jane Visitor",
    email: "jane@validdomain.io",
    subject: "Project inquiry",
    message: "Let's discuss a project.",
    deliveryStatus: "pending",
    providerMessageId: null,
    receivedAt: new Date("2026-09-13T12:00:00Z"),
    notificationSentAt: null,
    ...overrides,
  };
}

describe("contact email", () => {
  it("escapes HTML metacharacters", () => {
    expect(escapeHtml(`<script>alert("x")</script> & 'quoted'`)).toBe(
      "&lt;script&gt;alert(&quot;x&quot;)&lt;/script&gt; &amp; &#039;quoted&#039;",
    );
  });

  it("does not interpolate executable user HTML into the email body", () => {
    const email = buildContactEmail(
      makeMessage({
        name: "<img src=x onerror=alert(1)>",
        subject: "<script>alert(1)</script>",
        message: "<a href='https://evil.invalid'>click</a>\nNext line",
      }),
    );

    expect(email.html).not.toContain("<script>");
    expect(email.html).not.toContain("<img src=x");
    expect(email.html).not.toContain("<a href='https://evil.invalid'>");
    expect(email.html).toContain("&lt;script&gt;");
    expect(email.html).toContain("<br>Next line");
  });
});