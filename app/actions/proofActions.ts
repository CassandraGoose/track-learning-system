'use server';
import {
  createProof,
  deleteProof,
  getProof,
} from '@/app/lib/queries';
import { checkUser } from '@/app/actions/actions';
import { z } from 'zod';
import { redirect } from 'next/navigation';

//******** PROOF STUFF ********//

const proofSchema = z.object({
  title: z
    .string({
      invalid_type_error: 'Title must be a string',
      required_error: 'Title is required',
    })
    .min(1, { message: 'Title is required' }),
  description: z.string({ invalid_type_error: 'Description must be a string' }),
  justification: z
    .string({
      invalid_type_error: 'Justification must be a string',
      required_error: 'Justification is required',
    })
    .min(1, { message: 'Justification is required' }),
  competencyId: z
    .string({
      invalid_type_error: 'Competency ID must be a string',
      required_error: 'Competency ID is required',
    })
    .min(1, { message: 'Competency ID is required' }),
});

export async function submitProof(competencyId: string, formData: FormData) {
  const user = await checkUser();

  if (!user) {
    redirect('/login');
  }

  const data = {
    title: formData.get('proofTitle') as string,
    description: formData.get('proofDescription') as string,
    justification: formData.get('proofJustification') as string,
    competencyId,
  };

  const validatedFields = proofSchema.safeParse(data);

  if (!validatedFields.success) {
    return { error: validatedFields.error.flatten().fieldErrors };
  }

  await createProof(data);
  return { message: `Added proof ${data.title}` };
}

export async function removeProof(proofId: number) {
  const user = await checkUser();

  if (!user) {
    redirect('/login');
  }

  await deleteProof(proofId);
}

export async function showProof(proofId: string) {
  return await getProof(proofId);
}
