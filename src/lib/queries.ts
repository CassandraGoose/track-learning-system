import prisma from '@/lib/prisma';

export function getPathwaysByEmail() {
  return prisma.person.findFirst({
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

export function getPathwayByUserId(userId:string, pathwayId:string) {
  console.log('prod debug pathway: ', pathwayId);
  console.log('prod debug user:', userId);
  return prisma.person.findFirst({
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
    }
  });
}