import 'dotenv/config';
import { PrismaClient } from '@prisma/client';

function buildDatabaseUrl() {
  const url = new URL(process.env.DATABASE_URL!);
  if (!url.searchParams.has('connection_limit')) url.searchParams.set('connection_limit', '10');
  if (!url.searchParams.has('pool_timeout')) url.searchParams.set('pool_timeout', '30');
  return url.toString();
}

const prisma = new PrismaClient({
  datasources: { db: { url: buildDatabaseUrl() } },
});

export default prisma;
