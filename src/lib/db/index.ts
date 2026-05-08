import { drizzle } from "drizzle-orm/postgres-js";
import postgres from "postgres";
import * as schema from "./schema";
import * as authSchema from "../auth/auth-schema";

// PostgreSQL-DB connection
const client = postgres(process.env.DATABASE_URL!);

// Drizzle instance with the schema
export const db = drizzle(client, { schema: { ...schema, ...authSchema } });
