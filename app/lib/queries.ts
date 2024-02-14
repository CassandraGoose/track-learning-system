'use server';

import prisma from '@/app/lib/prisma';

export async function getPathwaysByEmail() {
  try {
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
  } catch (error) {
    console.error(error);
  }
}

export async function getPathwayByUserId(userId: string, pathwayId: string) {
  try {
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

  } catch (error) {
    console.error(error);
  }
}

export async function getCompetency(userId: string, competencyId: string) {
  try {
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
  } catch (error) {
    console.error(error);
  }
}

export async function createProof(data: {
  userId: string;
  title: string;
  description: string;
  justification: string;
  competencyId: string;
}) {
  try {
    return await prisma.proof.create({
      data: {
        title: data.title,
        description: data.description,
        justification: data.justification,
        personId: data.userId,
        competencyId: parseInt(data.competencyId),
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProof(proofId: number) {
  try {
    return await prisma.proof.delete({
      where: {
        id: proofId,
      },
    });
  } catch (error) {
    console.error(error);
  }
}