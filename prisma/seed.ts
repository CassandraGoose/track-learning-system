import { PrismaClient } from '@prisma/client';
import { Argon2id } from 'oslo/password';
import contentAreasData from './data/contentAreas.json';
import pathwaysData from './data/pathways.json';
import competenciesData from './data/competencies.json';

const prisma = new PrismaClient();

async function main() {
  await prisma.contentArea.createMany({
    data: contentAreasData.contentAreas,
  });

  await prisma.pathway.createMany({
    data: pathwaysData.pathways,
  });

  competenciesData.competencies.forEach(async (competency) => {
    await prisma.competency.create({
      data: {
        title: competency.title,
        description: competency.description,
        pathways: {
          connect: [
            {
              title: competency.belongsToPathway,
            },
          ],
        },
        contentAreas: {
          connect: competency.hasContentAreas,
        }
      },
    });
  });

  const pw = process.env.TEST_USER_PASSWORD || '';
  const hashedPassword = await new Argon2id().hash(pw);

  await prisma.person.upsert({
    where: { email: process.env.TEST_USER_EMAIL },
    create: {
      email: process.env.TEST_USER_EMAIL || '',
      username: 'CassTheOG',
      firstName: 'Cass',
      lastName: 'T',
      bio: 'I am the person who created this application. Hi!',
      hashedPassword: hashedPassword,
      id: process.env.TEST_USER_ID || '',
      pathways: {
        connect: [
          {
            "title": "Use Track",
          },
          {
            "title": "Illustration",
          }
        ]
      }
    },
    update: {},
  });

  await prisma.proof.create({
    data: {
      title: 'Pathway Searching',
      description: 'I found the pathway',
      justification: 'Here is how I did it.',
      competency: {
        connect: {
          title: "Find personal pathways",
        },
      },
      author: {
        connect: {
          username: 'CassTheOG',
        },
      },
      }
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
