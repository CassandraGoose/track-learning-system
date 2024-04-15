'use server';

import prisma from '@/app/lib/prisma';
import { checkUser } from '@/app/actions/actions';
import { redirect } from 'next/navigation';

export async function getUserPathways() {
  const user = await checkUser();

  if (!user) {
    redirect('/login');
  }

  try {
    return await prisma.person.findFirst({
      where: {
        id: user.id,
      },
      include: {
        pathways: {
          include: {
            competencies: {
              include: {
                contentAreas: true,
                proofs: true,
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

export async function getSingleUserPathway(pathwayId: string) {
  const user = await checkUser();

  if (!user) {
    redirect('/login');
  }

  try {
    return await prisma.person.findFirst({
      where: {
        id: user.id,
      },
      include: {
        pathways: {
          where: {
            id: parseInt(pathwayId),
          },
          include: {
            competencies: {
              include: {
                proofs: true,
                contentAreas: true,
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

export async function getUserCompetency(competencyId: string) {
  const user = await checkUser();

  if (!user) {
    redirect('/login');
  }

  try {
    return await prisma.competency.findFirst({
      where: {
        id: parseInt(competencyId),
      },
      include: {
        proofs: {
          where: {
            personId: user.id,
          },
        },
        contentAreas: true,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function createProof(data: {
  title: string;
  description: string;
  justification: string;
  competencyId: string;
}) {
  const user = await checkUser();

  if (!user) {
    redirect('/login');
  }

  try {
    return await prisma.proof.create({
      data: {
        title: data.title,
        description: data.description,
        justification: data.justification,
        personId: user.id,
        competencyId: parseInt(data.competencyId),
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function deleteProof(proofId: number) {
  const user = await checkUser();

  if (!user) {
    redirect('/login');
  }

  try {
    return await prisma.proof.delete({
      where: {
        id: proofId,
        personId: user.id,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getProof(proof: string) {
  // read only for profile, so no need for auth.
  try {
    return await prisma.proof.findFirst({
      where: {
        id: parseInt(proof),
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function createUser({
  username,
  hashedPassword,
  email,
  firstName,
  lastName,
  bio,
}: {
  username: string;
  hashedPassword: string;
  email: string;
  firstName: string;
  lastName: string;
  bio: string;
}) {
  try {
    return await prisma.person.create({
      data: {
        username: username,
        hashedPassword: hashedPassword,
        email,
        firstName,
        lastName,
        bio,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getUser(username: string) {
  try {
    return await prisma.person.findUnique({
      where: {
        username: username,
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getFilteredPathways(query: string, page: number) {
  const offset = (page - 1) * 6;

  try {
    return await prisma.pathway.findMany({
      skip: offset,
      take: 6,
      where: {
        title: {
          contains: query,
          mode: 'insensitive',
        },
      },
      include: {
        competencies: {
          include: {
            contentAreas: true,
          },
        },
      },
      orderBy: {
        title: 'asc',
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getFilteredPathwaysCount(query: string) {
  try {
    return await prisma.pathway.count({
      where: {
        title: {
          contains: query,
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getAllPathways() {
  try {
    return await prisma.pathway.findMany({
      include: {
        competencies: {
          include: {
            contentAreas: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function getSinglePathway(pathwayId: string) {
  try {
    return await prisma.pathway.findFirst({
      where: {
        id: parseInt(pathwayId),
      },
      include: {
        competencies: {
          include: {
            contentAreas: true,
          },
        },
      },
    });
  } catch (error) {
    console.error(error);
  }
}

export async function addPathwayToUser(pathwayId: number) {
  const user = await checkUser();

  if (!user) {
    return { message: 'You must be signed in to complete this action.'};
  }

  try {
    return await prisma.pathway.update({
      where: {id: pathwayId},
      data: {
        persons: {
          connect: [
            {
              id: user.id,
            }
          ]
        }
      }
    })
  } catch (error) {
    return error;
    console.error(error);
  }
}
