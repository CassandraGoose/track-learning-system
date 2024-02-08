'use server';
import { createProof } from '@/app/lib/queries';

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

  await createProof(data);
  return { message: `Added proof ${data.title}` };
}
