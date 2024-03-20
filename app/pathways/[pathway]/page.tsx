import React, { Fragment } from 'react';
import { notFound, redirect } from 'next/navigation';
import { getSinglePathway } from '../../lib/queries';
import { Pathway } from '../../lib/interface';
import CompetencyCard from '@/app/_components/CompetencyCard';

export default async function Page({
  params,
}: {
  params: { pathway: string };
}) {
  const pathway = params.pathway;
  const singlePathway = await getSinglePathway(pathway);

  if (!singlePathway) {
    notFound();
  }

  return (
    <section className="mx-12 my-12 flex flex-col items-center">
      <div className="border-black flex w-full justify-between rounded-md border p-8">
        <div className="flex w-full flex-col space-y-8">
          <h1 className="text-2xl" data-testid="pathway-title">
            {singlePathway.title}
          </h1>
          <p data-testid="pathway-description">{singlePathway.description}</p>
          <div className="flex flex-col items-center justify-center space-y-8">
            <h2 className="text-xl ">What will you learn?</h2>
            <p className="text-center">
              Below, you can find a list of competencies that describe what
              skills and knowledge you will need to progress through your
              pathway. You can proove that you have mastered the competencies
              below by uploading artifacts (called &apos;proofs&apos;) to act as
              proof of your skills and knowledge.
            </p>
            <div className="card-body flex flex-row flex-wrap w-full">
              {singlePathway.competencies.map((competency) => {
                return (
                  <Fragment key={competency.id}>
                    <CompetencyCard competency={competency} />
                  </Fragment>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
