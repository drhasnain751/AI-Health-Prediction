import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // Vercel Hack: Copy the database file to /tmp so it's writable
  const dbPath = path.join(process.cwd(), 'prisma', 'dev.db');
  const tmpPath = '/tmp/dev.db';

  try {
    if (fs.existsSync(dbPath) && !fs.existsSync(tmpPath)) {
      fs.copyFileSync(dbPath, tmpPath);
      console.log('Database copied to /tmp');
    }
  } catch (err) {
    console.error('Failed to copy database to /tmp:', err);
  }

  prisma = new PrismaClient({
    datasources: {
      db: {
        url: `file:${tmpPath}`,
      },
    },
  });
} else {
  // Local development
  prisma = new PrismaClient();
}

export default prisma;
