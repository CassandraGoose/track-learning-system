'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { submitProof } from '@/app/actions';

export default function NewProofForm({
  userId,
  competencyId,
}: {
  userId: string;
  competencyId: string;
}) {
  const identifiers = { userId, competencyId };
  const router = useRouter();

  // since we're using the form action, clearing the form becomes an issue
  // but it's convention to utilize the form action, so we must persist. 
  const formRef = useRef<HTMLFormElement>(null);

  return (
    <form
      ref={formRef}
      className="flex flex-col space-y-2"
      action={async (formData) => {
        const submitProofWithIdentifiers = submitProof.bind(null, identifiers);

        await submitProofWithIdentifiers(formData);
        formRef.current?.reset();
        router.refresh();
      }}
    >
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
        <button type="submit" className="btn-bright btn btn-outline">
          Add
        </button>
      </div>
    </form>
  );
}
