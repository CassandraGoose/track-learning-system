'use client';
import React, { useRef } from 'react';
import { useRouter } from 'next/navigation';
import { submitProof } from '@/app/actions/proofActions';

export default function NewProofForm({
  competencyId,
}: {
  competencyId: string;
}) {
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
    competencyId?: string[] | undefined;
  };

  const formRef = useRef<HTMLFormElement>(null);

  const setErrorMessage = (error: zodError) => {
    setTitleError(error.title?.join(' ') || '');
    setDescriptionError(error.description?.join(' ') || '');
    setJustificationError(error.justification?.join(' ') || '');
    setGeneralError(error.competencyId?.join(' ') || 'An error occurred');
  };

  return (
    <div className="card card-compact w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2
          className="card-title text-bright"
          data-testid="new-proof-form-title"
        >
          Add New Proof
        </h2>
        <form
          data-testid="new-proof-form"
          ref={formRef}
          className="flex flex-col space-y-2"
          action={async (formData) => {
            // since we're using the form action, clearing the form becomes an issue
            // but it's convention to utilize the form action, so we must persist.
            const submitProofWithIdentifiers = submitProof.bind(
              null,
              competencyId,
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
            data-testid="proof-title-input"
            className="input input-bordered w-full bg-bright"
            type="text"
            id="proofTitle"
            name="proofTitle"
            required
          />
          <div className="label">
            <span className="label-text-alt text-error">{titleError}</span>
          </div>
          <label className="label-text" htmlFor="proofDescription">
            Proof Description
          </label>
          <textarea
            data-testid="proof-description-textarea"
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
            data-testid="proof-justification-textarea"
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
            <button
              data-testid="new-proof-submit"
              type="submit"
              className="btn-bright btn btn-outline"
            >
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
