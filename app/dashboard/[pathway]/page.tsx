import React from 'react';
import { notFound, redirect } from 'next/navigation';
import { getSingleUserPathway } from '../../lib/queries';
import { checkUser } from '@/app/actions/actions';
import { caluclateProgress } from '../../lib/utilities';
import PathwayProgressDetails from './_components/PathwayProgressDetails';
import { Pathway } from '../../lib/interface';

export default async function Page({
  params,
}: {
  params: { pathway: string };
}) {
  const user = await checkUser();

  if (!user) {
    redirect('/login');
  }

  const pathway = params.pathway;
  const userPathway = await getSingleUserPathway(pathway);

  if (!userPathway) {
    notFound();
  }

  const selectedPathway = userPathway.pathways[0] as Pathway;
  const progress = caluclateProgress(selectedPathway);

  return (
    <section className="mx-12 my-12 flex flex-col items-center">
      <div className="border-black flex w-full justify-between rounded-md border p-8">
        <div className="flex w-full flex-col space-y-8">
          <h1 className="text-2xl" data-testid="pathway-title">
            {selectedPathway.title}
          </h1>
          <div className="flex items-center">
            <progress
              className="progress progress-secondary"
              value={progress}
              max="100"
            ></progress>
            <span className="text-secondary">{progress}%</span>
          </div>
          <h2 data-testid="pathway-description">
            {selectedPathway.description}
          </h2>
          <PathwayProgressDetails
            pathway={selectedPathway}
            pathwayId={pathway}
          />
        </div>
      </div>
    </section>
  );
}
