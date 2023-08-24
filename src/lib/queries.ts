import prisma from '@/lib/prisma';

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

export async function getPathwayByUserId(userId:string, pathwayId:string) {
  console.log('prod test userId:', userId);
  console.log('prod test pathwayId:', pathwayId);
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
    }
  });
}