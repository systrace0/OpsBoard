import { NextRequest } from "next/server";
import { headers } from "next/headers";
import { handleApiError } from "@/lib/errors";
import { auth } from "@/lib/auth";
import { createProjectSchema } from "@/lib/validations/project.schema";
import { getUserProjects, createProject } from "@/lib/services/project.service";

// This handler does three things: Get input and validate, call service and return Response

// -----------------------------------------------------------------------------------------

// GET /api/projects - all projects from logged User
export async function GET() {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;
    const projects = await getUserProjects(userId);

    return Response.json({ projects });
  } catch (error) {
    return handleApiError(error);
  }
}

// POST /api/projects - create new project
export async function POST(request: NextRequest) {
  try {
    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session) {
      return Response.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = session.user.id;

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
