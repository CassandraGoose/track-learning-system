import React from 'react';
import { getCompetency } from '../../../lib/queries';
import { notFound } from 'next/navigation';
import { Proof } from '../../../lib/interface';
export default async function Page({
  params,
}: {
  params: { competencyId: string };
}) {
  const competency = await getCompetency(
    'cljvusdou00003ntltwo9mhm5',
    params.competencyId,
  );

  if (!competency) {
    notFound();
  }

  const proofs = competency.proofs;
  return (
    <section className="mx-12 my-12 flex flex-col items-center">
      <p className="self-start pb-8 text-2xl">Competency: {competency.title}</p>
      {!!proofs && proofs.length > 0 && (
        <table className="table table-zebra table-lg">
          <thead>
            <tr>
              <th>Title</th>
              <th>Description</th>
              <th>Proof</th>
              <th>Date Added</th>
              <th>Date Updated</th>
            </tr>
          </thead>
        </table>
      )}
      <div className="card card-compact w-96 bg-base-100 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-bright">Add New Proof</h2>
          <form className="flex flex-col space-y-2">
            <label className="label-text" htmlFor="proofTitle">
              Proof Title
            </label>
            <input
              className="input input-bordered w-full bg-bright"
              type="text"
              id="proofTitle"
              name="proofTitle"
            />
            <label className="label-text" htmlFor="proofJustification">
              Proof Description
            </label>
            <textarea
              className="textarea textarea-bordered bg-bright"
              id="proofDescription"
              name="proofDescription"
            />
            <label className="label-text" htmlFor="proofJustification">
              Proof
            </label>
            <textarea
              className="textarea textarea-bordered bg-bright"
              id="proofJustification"
              name="proofJustification"
            />
            <div className="card-actions mt-2 justify-end">
              <button className="btn-bright btn btn-outline">Add</button>
            </div>
          </form>
        </div>
      </div>
    </section>
  );
}
