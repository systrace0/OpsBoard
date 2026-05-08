import { z } from "zod";

export const createTicketSchema = z.object({
  title: z.string().min(1, "Title is required").max(200),
  description: z.string().optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).default("medium"),
  assignedTo: z.string().uuid().optional(),
});

export const updateTicketSchema = z.object({
  title: z.string().min(1).max(200).optional(),
  description: z.string().optional(),
  status: z
    .enum(["open", "in_progress", "in_review", "done", "cancelled"])
    .optional(),
  priority: z.enum(["low", "medium", "high", "critical"]).optional(),
  assignedTo: z.string().uuid().nullable().optional(),
});

export type CreateTicketInput = z.infer<typeof createTicketSchema>;
export type UpdateTicketInput = z.infer<typeof updateTicketSchema>;
