import { pgTable, text, serial, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").notNull().unique(),
  password: text("password").notNull(),
});

export const messages = pgTable("messages", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull(),
  subject: text("subject").notNull(),
  message: text("message").notNull(),
  deliveryStatus: text("delivery_status").notNull().default("pending"),
  providerMessageId: text("provider_message_id"),
  receivedAt: timestamp("received_at", { withTimezone: true }).notNull().defaultNow(),
  notificationSentAt: timestamp("notification_sent_at", { withTimezone: true }),
});

export const insertUserSchema = createInsertSchema(users).pick({
  username: true,
  password: true,
});

export const insertMessageSchema = z.object({
  name: z
    .string()
    .trim()
    .min(2)
    .max(50)
    .regex(/^[a-zA-Z\s'-]+$/),
  email: z.string().trim().email().min(5).max(100),
  subject: z.string().trim().min(5).max(100).refine((value) => !/https?:\/\//i.test(value)),
  message: z
    .string()
    .trim()
    .min(20)
    .max(1000)
    .refine((value) => (value.match(/https?:\/\//g) ?? []).length <= 2),
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;

export type InsertMessage = z.infer<typeof insertMessageSchema>;
export type Message = typeof messages.$inferSelect;
