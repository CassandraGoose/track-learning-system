import prisma from '@/app/lib/prisma';

export async function getPathwaysByEmail() {
  return await prisma.person.findFirst({
    where: {
      email: process.env.TEST_USER_EMAIL,
    },
    include: {
      pathways: {
        include: {
          contentArea: {
            include: {
              competencies: {
                include: {
                  proofs: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function getPathwayByUserId(userId: string, pathwayId: string) {
  return await prisma.person.findFirst({
    where: {
      id: userId,
    },
    include: {
      pathways: {
        where: {
          id: parseInt(pathwayId),
        },
        include: {
          contentArea: {
            include: {
              competencies: {
                include: {
                  proofs: true,
                },
              },
            },
          },
        },
      },
    },
  });
}

export async function getCompetency(userId: string, competencyId: string) {
  return await prisma.competency.findFirst({
    where: {
      id: parseInt(competencyId),
    },
    include: {
      proofs: {
        where: {
          personId: userId,
        },
      },
    },
  });
}
