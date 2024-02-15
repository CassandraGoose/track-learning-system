import React from 'react';
import { notFound } from 'next/navigation';
import { getCompetency } from '@/app/lib/queries';
import NewProofForm from '@/app/dashboard/[pathway]/[competencyId]/_components/NewProofForm';
import ProofList from './_components/ProofList';

export default async function Page({
  params,
}: {
  params: { competencyId: string };
}) {
  const competencyId = params.competencyId;
  const competency = await getCompetency(
    'cljvusdou00003ntltwo9mhm5',
    competencyId,
  );

  if (!competency) {
    notFound();
  }
  const proofs = competency.proofs;

  return (
    <section className="mx-12 my-12 flex flex-col items-center">
      <p className="self-start pb-8 text-2xl" data-testid="competency-title">
        Competency: {competency?.title}
      </p>
      <div className="flex w-full justify-between">
        <ProofList proofs={proofs} />
        <NewProofForm
          userId="cljvusdou00003ntltwo9mhm5"
          competencyId={competencyId}
        />
      </div>
    </section>
  );
}
