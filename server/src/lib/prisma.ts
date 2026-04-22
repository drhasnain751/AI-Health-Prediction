import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

let prisma: PrismaClient;

const tmpPath = '/tmp/dev.db';

// Copy logic
if (process.env.NODE_ENV === 'production' || process.env.VERCEL) {
  const possiblePaths = [
    path.join(process.cwd(), 'server', 'prisma', 'dev.db'),
    path.join(process.cwd(), 'prisma', 'dev.db'),
    path.join(__dirname, '..', 'prisma', 'dev.db'),
    path.join(__dirname, '..', '..', 'prisma', 'dev.db')
  ];

  let dbPath = '';
  for (const p of possiblePaths) {
    if (fs.existsSync(p)) {
      dbPath = p;
      break;
    }
  }

  try {
    if (dbPath && !fs.existsSync(tmpPath)) {
      fs.copyFileSync(dbPath, tmpPath);
    }
  } catch (err) {
    console.error('Copy Error:', err);
  }

  prisma = new PrismaClient({
    datasources: {
      db: {
        url: `file:${tmpPath}`,
      },
    },
  });
} else {
  prisma = new PrismaClient();
}

export default prisma;
