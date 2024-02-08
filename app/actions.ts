'use server';
import { createProof } from '@/app/lib/queries';
import { revalidateTag } from 'next/cache';

export async function submitProof(
  identifiers: { userId: string; competencyId: string },
  formData: FormData,
) {
  const data = {
    title: formData.get('proofTitle') as string,
    description: formData.get('proofDescription') as string,
    justification: formData.get('proofJustification') as string,
    userId: identifiers.userId,
    competencyId: identifiers.competencyId,
  };
  try {
    await createProof(data);
  } catch (error) {
    console.error(error);
  }

  return { message: `Added proof ${data.title}` };
}
