import { PrismaClient } from '@prisma/client';
import fs from 'fs';
import path from 'path';

let prisma: PrismaClient;

if (process.env.NODE_ENV === 'production') {
  // Try multiple possible locations for the bundled database
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

  const tmpPath = '/tmp/dev.db';

  try {
    if (dbPath && !fs.existsSync(tmpPath)) {
      fs.copyFileSync(dbPath, tmpPath);
      console.log(`Database copied from ${dbPath} to ${tmpPath}`);
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
