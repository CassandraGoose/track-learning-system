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
  const [titleError, setTitleError] = React.useState<string>('');
  const [descriptionError, setDescriptionError] = React.useState<string>('');
  const [justificationError, setJustificationError] =
    React.useState<string>('');
  const [generalError, setGeneralError] = React.useState<string>('');

  type zodError = {
    title?: string[] | undefined;
    description?: string[] | undefined;
    justification?: string[] | undefined;
    userId?: string[] | undefined;
    competencyId?: string[] | undefined;
  };
  // since we're using the form action, clearing the form becomes an issue
  // but it's convention to utilize the form action, so we must persist.
  const formRef = useRef<HTMLFormElement>(null);

  const setErrorMessage = (error: zodError) => {
    setTitleError(error.title?.join(' ') || '');
    setDescriptionError(error.description?.join(' ') || '');
    setJustificationError(error.justification?.join(' ') || '');
    setGeneralError(
      error.userId?.join(' ') ||
        error.competencyId?.join(' ') ||
        'An error occurred',
    );
  };

  return (
    <div className="card card-compact bg-base-100 shadow-xl w-96 h-min">
      <div className="card-body">
        <h2 className="card-title text-bright">Add New Proof</h2>
        <form
          ref={formRef}
          className="flex flex-col space-y-2"
          action={async (formData) => {
            const submitProofWithIdentifiers = submitProof.bind(
              null,
              identifiers,
            );

            const message = await submitProofWithIdentifiers(formData);

            if (message.error) {
              setErrorMessage(message.error);
            }

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
            required
          />
          <div className="label">
            <span className="label-text-alt text-error">{titleError}</span>
          </div>
          <label className="label-text" htmlFor="proofJustification">
            Proof Description
          </label>
          <textarea
            className="textarea textarea-bordered bg-bright"
            id="proofDescription"
            name="proofDescription"
          />
          <div className="label">
            <span className="label-text-alt text-error">
              {descriptionError}
            </span>
          </div>
          <label className="label-text" htmlFor="proofJustification">
            Proof
          </label>
          <textarea
            className="textarea textarea-bordered bg-bright"
            id="proofJustification"
            name="proofJustification"
            required
          />
          <div className="label">
            <span className="label-text-alt text-error">
              {justificationError}
            </span>
          </div>
          <div className="card-actions mt-2 justify-end">
            <button type="submit" className="btn-bright btn btn-outline">
              Add
            </button>
            <div className="label">
              <span className="label-text-alt text-error">{generalError}</span>
            </div>
          </div>
        </form>
      </div>
    </div>
  );
}
