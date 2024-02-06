import { createProof } from '../../lib/queries';

export async function POST(req: Request) {
  const data = await req.json();
  const addProof = await createProof(data);

  return Response.json(addProof);
}