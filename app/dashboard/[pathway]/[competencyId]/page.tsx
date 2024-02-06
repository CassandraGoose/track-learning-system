'use client';

import React, { FormEvent, useEffect, useState } from 'react';
import { notFound } from 'next/navigation';
import { Competency, Proof } from '@/app/lib/interface';

export default function Page({ params }: { params: { competencyId: string } }) {
  const [competency, setCompetency] = useState<Competency | null>(null);
  const [newProof, setNewProof] = useState<{
    title: string;
    description: string;
    justification: string;
  }>({ title: '', description: '', justification: '' });

  useEffect(() => {
    const getCompetency = async () => {
      const data = await fetch(
        `/api/get-competency?userId=${'cljvusdou00003ntltwo9mhm5'}&competencyId=${params.competencyId}`,
      );
      const competency = await data.json();

      if (!competency) {
        notFound();
      }

      setCompetency(competency);
    };

    getCompetency();
  }, [params.competencyId]);

  const proofs = competency?.proofs;

  const submitProof = async (e: FormEvent) => {
    e.preventDefault();
    let data;
    try {
      data = await fetch(`/api/create-proof`, {
        method: 'POST',
        body: JSON.stringify({
          ...newProof,
          competencyId: params.competencyId,
          userId: 'cljvusdou00003ntltwo9mhm5',
        }),
      });
    } catch (error) {
      console.error('Error creating proof', error);
    } finally {
      // possibly want some kind of custom hook for this so we don't type it out twice?
      const getCompetency = async () => {
        const data = await fetch(
          `/api/get-competency?userId=${'cljvusdou00003ntltwo9mhm5'}&competencyId=${params.competencyId}`,
        );
        const competency = await data.json();

        if (!competency) {
          notFound();
        }
        setCompetency(competency);
      };

      getCompetency();

    }
  };
  // maybe should separate out the form into its own component
  // then might be able to have it be server component or something.
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
        <div className="card card-compact w-96 bg-base-100 shadow-xl">
          <div className="card-body">
            <h2 className="card-title text-bright">Add New Proof</h2>
            <form className="flex flex-col space-y-2" onSubmit={submitProof}>
              <label className="label-text" htmlFor="proofTitle">
                Proof Title
              </label>
              <input
                value={newProof.title}
                onChange={(e) =>
                  setNewProof({ ...newProof, title: e.target.value })
                }
                className="input input-bordered w-full bg-bright"
                type="text"
                id="proofTitle"
                name="proofTitle"
              />
              <label className="label-text" htmlFor="proofJustification">
                Proof Description
              </label>
              <textarea
                value={newProof.description}
                onChange={(e) =>
                  setNewProof({ ...newProof, description: e.target.value })
                }
                className="textarea textarea-bordered bg-bright"
                id="proofDescription"
                name="proofDescription"
              />
              <label className="label-text" htmlFor="proofJustification">
                Proof
              </label>
              <textarea
                value={newProof.justification}
                onChange={(e) =>
                  setNewProof({ ...newProof, justification: e.target.value })
                }
                className="textarea textarea-bordered bg-bright"
                id="proofJustification"
                name="proofJustification"
              />
              <div className="card-actions mt-2 justify-end">
                <button type="submit" className="btn-bright btn btn-outline">
                  Add
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
