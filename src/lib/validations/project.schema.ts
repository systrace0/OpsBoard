import { z } from "zod";

export const createProjectSchema = z.object({
  name: z
    .string()
    .min(1, "Name is required")
    .max(100, "Name must be under 100 characters"),
  description: z.string().max(500).optional(),
  slug: z
    .string()
    .min(1)
    .max(50)
    .regex(
      /^[a-z0-9-]+$/,
      "Slug can only contain lowercase letters, numbers and hyphens",
    ),
});

export const updateProjectSchema = createProjectSchema.partial();

export type CreateProjectInput = z.infer<typeof createProjectSchema>;
export type UpdateProjectInput = z.infer<typeof updateProjectSchema>;
