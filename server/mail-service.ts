import { Resend } from "resend";
import type { Message } from "@shared/schema";

const ADMIN_EMAIL = process.env.CONTACT_TO_EMAIL ?? "contact@chrisfolmar.com";
const FROM_EMAIL = process.env.CONTACT_FROM_EMAIL ?? "contact@chrisfolmar.com";

export interface EmailDeliveryResult {
  sent: boolean;
  providerMessageId?: string;
}

export function escapeHtml(value: string): string {
  return value
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export function buildContactEmail(message: Message) {
  const currentDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  const safeName = escapeHtml(message.name);
  const safeEmail = escapeHtml(message.email);
  const safeSubject = escapeHtml(message.subject);
  const safeMessage = escapeHtml(message.message).replace(/\n/g, "<br>");

  return {
    to: ADMIN_EMAIL,
    from: `Chris Folmar Portfolio <${FROM_EMAIL}>`,
    replyTo: message.email,
    subject: `Website Contact Form: ${message.subject}`,
    text: [
      `New website contact form submission on ${currentDate}`,
      "",
      `From: ${message.name} (${message.email})`,
      `Subject: ${message.subject}`,
      "",
      "Message:",
      message.message,
    ].join("\n"),
    html: `
      <!doctype html>
      <html lang="en">
        <body style="font-family:Arial,sans-serif;line-height:1.6;color:#172033">
          <h1 style="font-size:22px">New contact form submission</h1>
          <p><strong>Date:</strong> ${escapeHtml(currentDate)}</p>
          <p><strong>Name:</strong> ${safeName}</p>
          <p><strong>Email:</strong> <a href="mailto:${safeEmail}">${safeEmail}</a></p>
          <p><strong>Subject:</strong> ${safeSubject}</p>
          <div style="margin-top:20px;padding:16px;background:#f5f2e8;border-left:4px solid #a67c2e">
            ${safeMessage}
          </div>
          <p style="margin-top:20px;color:#586174">Reply directly to this email to respond.</p>
        </body>
      </html>
    `,
  };
}

export async function sendContactFormEmail(
  message: Message,
): Promise<EmailDeliveryResult> {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.error(
      `Contact notification unavailable: RESEND_API_KEY is not configured (messageId=${message.id})`,
    );
    return { sent: false };
  }

  const resend = new Resend(apiKey);

  try {
    const { data, error } = await resend.emails.send(buildContactEmail(message));

    if (error) {
      console.error(
        `Resend rejected contact notification (messageId=${message.id}, provider=${error.name})`,
      );
      return { sent: false };
    }

    return { sent: true, providerMessageId: data?.id };
  } catch (error) {
    const errorName = error instanceof Error ? error.name : "UnknownError";
    console.error(
      `Resend contact notification failed (messageId=${message.id}, error=${errorName})`,
    );
    return { sent: false };
  }
}