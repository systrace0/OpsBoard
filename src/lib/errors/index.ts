// Base class for all App Errors
export class AppError extends Error {
  constructor(
    public message: string,
    public statusCode: number,
    public code: string,
  ) {
    super(message);
    this.name = "AppError";
  }
}

export class ValidationError extends AppError {
  constructor(message: string) {
    super(message, 400, "VALIDATION_ERROR");
  }
}

export class NotFoundError extends AppError {
  constructor(resource: string) {
    super(`${resource} not found`, 404, "NOT_FOUND");
  }
}

export class UnauthorizedError extends AppError {
  constructor() {
    super("Unauthorized", 401, "UNAUTHORIZED");
  }
}

export class ForbiddenError extends AppError {
  constructor() {
    super("Forbidden", 403, "FORBIDDEN");
  }
}

// Helper function - turns every error in one clean HTTP-Response
export function handleApiError(error: unknown): Response {
  console.error(error);

  if (error instanceof AppError) {
    return Response.json(
      { error: error.message, code: error.code },
      { status: error.statusCode },
    );
  }

  return Response.json(
    { error: "Internal server error", code: "INTERNAL_ERROR" },
    { status: 500 },
  );
}
