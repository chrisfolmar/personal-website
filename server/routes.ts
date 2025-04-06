import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertMessageSchema } from "@shared/schema";
import { ZodError } from "zod";
import { fromZodError } from "zod-validation-error";

export async function registerRoutes(app: Express): Promise<Server> {
  // Handle contact form submissions
  app.post("/api/contact", async (req: Request, res: Response) => {
    try {
      // Validate the incoming data against our schema
      const validatedData = insertMessageSchema.parse(req.body);
      
      // Store the message
      const message = await storage.createMessage(validatedData);
      
      // Return success
      res.status(201).json({ 
        success: true, 
        message: "Message received successfully",
        data: message
      });
    } catch (error) {
      // Handle validation errors
      if (error instanceof ZodError) {
        const validationError = fromZodError(error);
        res.status(400).json({ 
          success: false, 
          message: validationError.message 
        });
        return;
      }
      
      // Handle other errors
      console.error("Error processing contact form submission:", error);
      res.status(500).json({ 
        success: false, 
        message: "An error occurred while processing your message" 
      });
    }
  });

  const httpServer = createServer(app);

  return httpServer;
}
