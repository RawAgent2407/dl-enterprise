import 'dotenv/config';
import bcrypt from 'bcryptjs';
import prisma from '../prisma';

async function main() {
  const email = process.env.ADMIN_EMAIL || 'admin@example.com';
  const password = process.env.ADMIN_PASSWORD || 'admin123';
  const name = process.env.ADMIN_NAME || 'Admin';

  const existing = await prisma.adminUser.findUnique({ where: { email } });
  if (existing) {
    console.log(`Admin user ${email} already exists`);
    return;
  }

  const passwordHash = await bcrypt.hash(password, 10);
  await prisma.adminUser.create({ data: { email, passwordHash, name } });
  console.log(`Created admin: ${email} / ${password}`);
}

main().then(() => prisma.$disconnect()).catch(console.error);
