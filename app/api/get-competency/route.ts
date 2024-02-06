import { getCompetency } from '../../lib/queries';
import { type NextRequest } from 'next/server';

export async function GET(req: NextRequest) {
  const userId = req.nextUrl.searchParams.get('userId');
  const competencyId = req.nextUrl.searchParams.get('competencyId');
  const competencies = await getCompetency(userId!, competencyId!);

  return Response.json(competencies);
}