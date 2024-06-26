import React, { Fragment } from 'react';
import { notFound, redirect } from 'next/navigation';
import { getSinglePathway, getSingleUserPathway } from '../../lib/queries';
import CompetencyCard from '@/app/_components/CompetencyCard';
import FollowPathwayButton from '../_components/FollowPathwayButton';
import { checkUser } from '@/app/actions/actions';

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

  const user = await checkUser();
  let userPathways;
  let hasPathway;
  if (!!user) {
    userPathways = await getSingleUserPathway(singlePathway.id.toString());
    hasPathway = userPathways?.pathways.find(
      (pathway) => pathway.id === singlePathway.id,
    );
  }

  return (
    <section className="mx-12 my-12 flex flex-col items-center">
      <div className="border-black flex w-full justify-between rounded-md border p-8">
        <div className="flex w-full flex-col space-y-8">
          <div className="w-ful flex items-center justify-between">
            <h1 className="text-2xl" data-testid="pathway-title">
              {singlePathway.title}
            </h1>
            {!!user && (
              <FollowPathwayButton
                pathway={singlePathway}
                hasPathway={!!hasPathway}
              />
            )}
          </div>
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
            <div>
              {singlePathway.contentAreas.map((contentArea) => {
                return (
                  <>
                    <hr />
                    <section
                      className="my-8 flex flex-col items-center"
                      key={contentArea.id}
                    >
                      <h2 className="text-xl">{contentArea.title}</h2>
                      <div className="card-body flex w-full flex-row flex-wrap justify-start">
                        {contentArea.competencies.map((competency) => {
                          return (
                            <Fragment key={competency.id}>
                              <CompetencyCard competency={competency} />
                            </Fragment>
                          );
                        })}
                      </div>
                    </section>
                  </>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
