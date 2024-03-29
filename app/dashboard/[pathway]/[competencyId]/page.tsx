import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getUserCompetency } from '@/app/lib/queries';
import { checkUser } from '@/app/actions/actions';
import NewProofForm from './_components/NewProofForm';
import ProofList from './_components/ProofList';

export default async function Page({
  params,
}: {
  params: { competencyId: string };
}) {
  const user = await checkUser();

  if (!user) {
    redirect('/login');
  }

  const competencyId = params.competencyId;
  const competency = await getUserCompetency(competencyId);

  if (!competency) {
    notFound();
  }
  const proofs = competency.proofs;

  return (
    <section className="mx-12 my-12 flex flex-col items-center">
      <p className="self-start pb-8 text-2xl" data-testid="competency-title">
        Competency: {competency?.title}
      </p>
      <div className="flex w-full justify-between md:flex-row flex-col md:space-y-0 space-y-10">
        <ProofList proofs={proofs} />
        <NewProofForm competencyId={competencyId} />
      </div>
    </section>
  );
}
