import { NextRequest } from "next/server";
import { handleApiError } from "@/lib/errors";
import { createProjectSchema } from "@/lib/validations/project.schema";
import { getUserProjects, createProject } from "@/lib/services/project.service";

// This handler does three things: Get input and validate, call service and return Response

// -----------------------------------------------------------------------------------------

// GET /api/projects - all projects from logged User
export async function GET(request: NextRequest) {
  try {
    // TODO: Get userId from the Session. Temporary hardcoded for testing
    const userId = "test-user-id";
    const projects = await getUserProjects(userId);

    return Response.json({ projects });
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/projects - create new project
export async function POST(request: NextRequest) {
  try {
    const userId = "test-user-id";

    // Parse body
    const body = await request.json();

    // Validation - throws error if data is not correct
    const parsed = createProjectSchema.safeParse(body);

    if (!parsed.success) {
      return Response.json(
        {
          error: "Validation failed",
          details: parsed.error.flatten().fieldErrors,
        },
        { status: 400 },
      );
    }

    const project = await createProject(parsed.data, userId);

    return Response.json({ project }, { status: 201 });
  } catch (error) {
    return handleApiError(error);
  }
}
