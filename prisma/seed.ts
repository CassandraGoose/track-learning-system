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

  for (const pathway of createdPathways) {
    const contentAreas = pathwaysData.pathways.find(
      (p) => p.title === pathway.title,
    )?.contentAreas;
    if (!contentAreas) throw new Error('Content areas not found');

    for (const contentArea of contentAreas) {
      await prisma.contentArea.create({
        data: {
          title: contentArea.title,
          order: parseInt(contentArea.order),
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

      if (!createdContentArea) throw new Error('Content area not found: ');

      for (const competency of contentArea.competencies) {
        try {
          await prisma.competency.create({
            data: {
              title: competency.title,
              description: competency.description,
              order: parseInt(competency.order),
              contentArea: {
                connect: {
                  id: createdContentArea?.id,
                },
              },
            },
          });
        } catch (e) {
          throw new Error('Error creating competency ' + competency.title + ': ' + e);
        }
      }
    }
  }


  const pw = process.env.TEST_USER_PW || '';
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
