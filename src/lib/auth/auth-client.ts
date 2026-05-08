import { createAuthClient } from "better-auth/react";

// This communicates with /api/auth/* on the server
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_BETTER_AUTH_URL ?? "https://localhost:3000",
});

// This function can be used in frontend
export const { signIn, signUp, signOut, useSession } = authClient;
