import React from 'react';
import { notFound } from 'next/navigation';
import { Proof } from '@/app/lib/interface';
import { getCompetency } from '@/app/lib/queries';
import NewProofForm from '@/app/components/NewProofForm';
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
      <p className="self-start pb-8 text-2xl">
        Competency: {competency?.title}
      </p>
      <div className="flex w-full justify-between">
        {!!proofs && proofs.length > 0 && (
          <table className="table w-2/3">
            <thead>
              <tr>
                <th>Title</th>
                <th>Description</th>
                <th>Proof</th>
              </tr>
            </thead>
            <tbody>
              {proofs.map((proof: Proof) => (
                <tr key={proof.id}>
                  <td>
                    <span className="flex items-center space-x-3">
                      <p>{proof.title}</p>
                    </span>
                  </td>
                  <td>
                    <p>{proof.description}</p>
                  </td>
                  <td>
                    <p>{proof.justification}</p>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
        <NewProofForm
          userId="cljvusdou00003ntltwo9mhm5"
          competencyId={competencyId}
        />
      </div>
    </section>
  );
}
