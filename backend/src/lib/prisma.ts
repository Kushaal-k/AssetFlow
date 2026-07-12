import { PrismaClient } from "@prisma/client";
import { Pool } from "pg";
import { PrismaPg } from "@prisma/adapter-pg";
import "dotenv/config";

const connectionString = process.env.DATABASE_URL;

// Initialize the standard PostgreSQL driver
const pool = new Pool({ connectionString });
const adapter = new PrismaPg(pool);

// Pass the adapter to PrismaClient (Required in Prisma 7+)
const prisma = new PrismaClient({ adapter });

export default prisma;