'use server';
import {
  addPathwayToUser
} from '@/app/lib/queries';
import { checkUser } from '@/app/actions/actions';
import { Pathway } from '../lib/interface';

interface Message {
  id?: string | number;
  error?: string;
}
export async function connectPathway(pathwayId: number): Promise<Message> {
  const user = await checkUser();

  if (!user) {
    return { error: 'You must be signed in to complete this action.'};
  }

  const newPathway = await addPathwayToUser(pathwayId) as Pathway;

  return { id: newPathway.id };
}