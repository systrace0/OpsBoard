import { db } from "@/lib/db";
import { projects, projectMembers } from "@/lib/db/schema";
import { eq, and, isNull } from "drizzle-orm";
import { NotFoundError, ForbiddenError } from "@/lib/errors";
import type {
  CreateProjectInput,
  UpdateProjectInput,
} from "@/lib/validations/project.schema";

// Load all projects from a User
// (Only user can see their projects - not all projects)
export async function getUserProjects(userId: string) {
  const result = await db
    .select({
      project: projects,
    })
    .from(projects)
    .innerJoin(
      projectMembers,
      and(
        eq(projectMembers.projectId, projects.id),
        eq(projectMembers.userId, userId),
      ),
    )
    .where(isNull(projects.deletedAt));

  return result.map((r) => r.project);
}

// Load only one project with Authorization check
export async function getProjectById(projectId: string, userId: string) {
  const result = await db
    .select()
    .from(projects)
    .where(and(eq(projects.id, projectId), isNull(projects.deletedAt)))
    .limit(1);

  const project = result[0];

  if (!project) {
    throw new NotFoundError("Project");
  }

  // Check if the member is part of the project
  const membership = await db
    .select()
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, userId),
      ),
    )
    .limit(1);

  if (!membership[0]) {
    throw new ForbiddenError();
  }

  return project;
}

// ------------------------------------------------------

// Create Project
export async function createProject(input: CreateProjectInput, userId: string) {
  // Transaction: Create project AND add user as an Owner
  // Either both functionalites work or both get rolled back so the DB is consistent
  const result = await db.transaction(async (tx) => {
    const [project] = await tx
      .insert(projects)
      .values({
        ...input,
        createdBy: userId,
      })
      .returning(); // returns created datarecord

    await tx.insert(projectMembers).values({
      projectId: project.id,
      userId,
      role: "owner",
    });

    return project;
  });

  return result;
}

// Archive Project (Soft delete)
export async function archiveProject(projectId: string, userId: string) {
  // Check if member is an Owner
  const membership = await db
    .select()
    .from(projectMembers)
    .where(
      and(
        eq(projectMembers.projectId, projectId),
        eq(projectMembers.userId, userId),
        eq(projectMembers.role, "owner"),
      ),
    )
    .limit(1);

  if (!membership[0]) {
    throw new ForbiddenError();
  }

  const [project] = await db
    .update(projects)
    .set({ deletedAt: new Date() })
    .where(eq(projects.id, projectId))
    .returning();

  return project;
}
