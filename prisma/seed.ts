import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.pathway.upsert({
    where: { id: 1 },
    create: {
      title: 'Use Track',
      description:
        'Learn to use the tool so you can leverage it to your advantage.',
    },
    update: {},
  });

  await prisma.pathway.upsert({
    where: { id: 2 },
    create: {
      title: 'Learn to Learn',
      description: 'Utilize a growth mindset and grit to learn anything',
    },
    update: {},
  });

  await prisma.competency.upsert({
    where: { id: 1 },
    create: {
      title: 'Find personal pathways',
      description: 'You can find all of your saved pathways',
      pathways: {
        connect: [
          {
            id: 1,
          },
        ],
      },
    },
    update: {},
  });

  await prisma.competency.upsert({
    where: { id: 2 },
    create: {
      title: 'Explain what a Growth Mindset is',
      description:
        'The first step in developing a skill is understanding what it is.',
      pathways: {
        connect: [
          {
            id: 2,
          },
        ],
      },
    },
    update: {},
  });

  await prisma.contentArea.upsert({
    where: { id: 1 },
    create: {
      title: 'Navigating Track',
      description: 'Practice finding things in the applicaiton.',
      competencies: {
        connect: [
          {
            id: 1,
          },
        ],
      },
    },
    update: {},
  });

  await prisma.contentArea.upsert({
    where: { id: 2 },
    create: {
      title: 'Metacognition',
      description:
        'Being aware of your own thought process will help you learn more effectively.',
      competencies: {
        connect: [
          {
            id: 2,
          },
        ],
      },
    },
    update: {},
  });

  await prisma.person.upsert({
    where: { email: process.env.TEST_USER_EMAIL },
    create: {
      email: process.env.TEST_USER_EMAIL || '',
      username: 'me',
      id: process.env.TEST_USER_ID || '', 
    },
    update: {},
  });
}

async function addRelations() {
  await prisma.pathway.update({
    where: { id: 1 },
    data: {
      competency: {
        connect: [
          {
            id: 1,
          },
        ],
      },
      persons: {
        connect: [
          {
            username: 'me',
          },
        ],
      },
    },
  });

  await prisma.pathway.update({
    where: { id: 2 },
    data: {
      competency: {
        connect: [
          {
            id: 2,
          },
        ],
      },
      persons: {
        connect: [
          {
            username: 'me',
          },
        ],
      },
    },
  });

  await prisma.contentArea.update({
    where: { id: 1 },
    data: {
      competencies: {
        connect: [
          {
            id: 1,
          },
        ],
      },
    },
  });

  await prisma.contentArea.update({
    where: { id: 2 },
    data: {
      competencies: {
        connect: [
          {
            id: 2,
          },
        ],
      },
    },
  });
}

main()
  .then(async () => {
    addRelations().then(async () => {
      await prisma.$disconnect();
    });
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });
