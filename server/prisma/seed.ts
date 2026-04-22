import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const hashedPassword = await bcrypt.hash('password123', 10);

  // Create Admin
  await prisma.user.upsert({
    where: { email: 'admin@healthai.com' },
    update: {},
    create: {
      email: 'admin@healthai.com',
      name: 'System Admin',
      password: hashedPassword,
      role: 'ADMIN',
    },
  });

  // Create Doctor
  const doctor = await prisma.user.upsert({
    where: { email: 'doctor@healthai.com' },
    update: {},
    create: {
      email: 'doctor@healthai.com',
      name: 'Dr. Sarah Wilson',
      password: hashedPassword,
      role: 'DOCTOR',
      doctorProfile: {
        create: { specialization: 'General Physician' }
      }
    },
  });

  // Create Patient
  const patient = await prisma.user.upsert({
    where: { email: 'patient@healthai.com' },
    update: {},
    create: {
      email: 'patient@healthai.com',
      name: 'James Cooper',
      password: hashedPassword,
      role: 'PATIENT',
      patientProfile: {
        create: { age: 34, gender: 'Male' }
      }
    },
  });

  console.log('Seeding complete. Use "password123" for all accounts.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
