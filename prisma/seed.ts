import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

async function main() {
  await prisma.pathway.upsert({
    where: { id: 1 },
    create: {
      title: "Use Track",
      description: 'Learn to use the tool so you can leverage it to your advantage.'
    },
    update: {},
  });

  await prisma.contentArea.upsert({
    where: { id: 1 },
    create: {
      title: 'Navigating Qual',
      description: 'Practice finding things in the applicaiton.',
      pathways: {
        connect: [{
            id: 1,
        }]
      }
    },
    update: {},
  });

  await prisma.competency.upsert({
    where: { id: 1 },
    create: {
      title: 'Find personal pathways',
      description: 'You can find all of your saved pathways',
      contentAreas: {
        connect: [
          {
            id: 1
          }
        ]
      }
    },
    update: {},
  });
  
  await prisma.person.upsert({
    where: { email: process.env.TEST_USER_EMAIL },
    create: {
      email: process.env.TEST_USER_EMAIL || '',
      username: 'me',
    },
    update: {},
  });
}

async function addRelations() {
  await prisma.pathway.update({
    where: { id: 1 },
    data: {
      contentArea: {
        connect: [
          { 
            id: 1,
          }
        ]
      },
      persons: {
        connect: [
          {
            username: 'me',
          }
        ]
      }
    }
  });

  await prisma.contentArea.update({
    where: { id: 1 },
    data: {
      pathways: {
        connect: [
          {
            id: 1,
          }
        ]
      },
      competencies: {
        connect: [
          {
            id: 1,
          }
        ]
      }
    }
  });
}

main()
  .then(async () => {
    addRelations()
    .then(async () => {
      await prisma.$disconnect();
    })
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    console.error(e);
    await prisma.$disconnect();
    process.exit(1);
  });