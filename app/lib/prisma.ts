import { PrismaClient } from '@prisma/client';

let prisma: PrismaClient;
console.log('NODE_ENV', process.env.NODE_ENV);
console.log('hellooooo');
const global = globalThis as unknown as {
  prisma: PrismaClient | undefined;
}

if (process.env.NODE_ENV === 'production') {
  prisma = new PrismaClient({
    datasourceUrl: process.env.DATABASE_URL,
  });
} else if (process.env.NODE_ENV === 'test') {
  console.log('greetings, humans')
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasourceUrl: process.env.TEST_DATABASE_URL,
    });
  }
  prisma = global.prisma;
} else {
  if (!global.prisma) {
    global.prisma = new PrismaClient({
      datasourceUrl: process.env.DATABASE_URL,
    });
  }
  prisma = global.prisma;
}

export default prisma;
