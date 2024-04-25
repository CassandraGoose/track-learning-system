import { PrismaClient } from '@prisma/client';
import { Argon2id } from 'oslo/password';
import pathwaysData from './data/pathways.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.pathway.createMany({
    data: pathwaysData.pathways.map((pathway) => ({
      title: pathway.title,
      description: pathway.description,
      approved: pathway.approved === 'true',
    })),
  });

  const createdPathways = await prisma.pathway.findMany();

  createdPathways.forEach((pathway) => {
    const contentAreas = pathwaysData.pathways.find(
      (p) => p.title === pathway.title,
    )?.contentAreas;
    if (!contentAreas) throw new Error('Content areas not found');

    contentAreas.forEach(async (contentArea) => {
      await prisma.contentArea.create({
        data: {
          title: contentArea.title,
          pathway: {
            connect: {
              id: pathway.id,
            },
          },
        },
      });

      const createdContentArea = await prisma.contentArea.findFirst({
        where: {
          title: contentArea.title,
        },
      });

      contentArea.competencies.forEach(async (competency) => {
        await prisma.competency.create({
          data: {
            title: competency.title,
            description: competency.description,
            contentArea: {
              connect: {
                id: createdContentArea?.id,
              },
            },
          },
        });
      });
    });
  });

  const pw = process.env.TEST_USER_PW || '';
  console.log('PW IS: ', pw);
  
  const hashedPassword = await new Argon2id().hash(pw);

  await prisma.person.upsert({
    where: { email: process.env.TEST_USER_EMAIL },
    create: {
      email: process.env.TEST_USER_EMAIL || '',
      username: 'IAmCass',
      firstName: 'Cass',
      lastName: 'T',
      bio: "Hi, I'm Cassandra. I'm a JavaScript developer with a knack for weaving education and code together. I enjoy working throughout the stack and have a particular love for creating front end applications. I believe that coding is a craft and I aim to deliver thoughtful, empathetic, and elegant code. When I'm not crafting code, you can find me indulging my creative side as an artist, musician, and writer.",
      hashedPassword: hashedPassword,
      id: process.env.TEST_USER_ID || '',
      pathways: {
        connect: [
          {
            title: 'Use Track',
          },
          {
            title: 'Learn to Learn',
          },
          {
            title: 'Illustration',
          },
        ],
      },
    },
    update: {},
  });
}

async function addRelations() {}

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
