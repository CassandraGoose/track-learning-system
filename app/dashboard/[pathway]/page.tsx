import React from 'react';
import { notFound } from 'next/navigation';
import { getPathwayByUserId } from '../../lib/queries';
import PathwayProgressDetails from './_components/PathwayProgressDetails';
import { Pathway } from '../../lib/interface';

export default async function Page({
  params,
}: {
  params: { pathway: string };
}) {
  const pathway = params.pathway;
  const userPathway = await getPathwayByUserId(
    'cljvusdou00003ntltwo9mhm5',
    pathway,
  );

  if (!userPathway) {
    notFound();
  }

  const selectedPathway = userPathway.pathways[0] as Pathway;

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
              value={70}
              max="100"
            ></progress>
            <span className="text-secondary">70%</span>
          </div>
          <h2 data-testid="pathway-description">
            {selectedPathway.description}
          </h2>
          <PathwayProgressDetails
            contentAreas={selectedPathway.contentArea}
            pathwayId={pathway}
          />
        </div>
      </div>
    </section>
  );
}