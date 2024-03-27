'use client';
import { useState } from 'react';
import { redirect } from 'next/navigation';
import { User } from 'lucia';
import { Pathway } from '@/app/lib/interface';
import { useFormStatus } from 'react-dom';
import { connectPathway } from '@/app/actions/pathwayActions';

export default function FollowPathwayButton({
  pathway,
  user,
  hasPathway,
}: {
  pathway: Pathway;
  user: User | null;
  hasPathway: boolean;
}) {
  const { pending } = useFormStatus();
  const [errorMessage, setErrorMessage] = useState<string>('');

  return user && !hasPathway ? (
    <form
      action={async () => {
        const message = await connectPathway(pathway.id);
        if (message.error) {
          setErrorMessage(message.error);
        } else {
          return redirect(`/dashboard/${message.id}`);
        }
      }}
    >
      <button
        className="btn btn-secondary text-bright"
        type="submit"
        aria-disabled={pending}
      >
        {pending ? (
          <span className="loading loading-spinner loading-sm bg-loading"></span>
        ) : (
          'Follow This Pathway'
        )}
      </button>
      <div className="label">
        <span className="label-text-alt text-error">{errorMessage}</span>
      </div>
    </form>
  ) : null;
}
