import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from './generated/prisma/client.js' 
import pg from "pg";

const { Pool } = pg;

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

const adapter = new PrismaPg(pool);

const prisma = new PrismaClient({
  adapter,
});

export { prisma };