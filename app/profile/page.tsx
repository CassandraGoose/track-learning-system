import { Fragment } from 'react';
import { getUserPathways } from '../lib/queries';
import { notFound } from 'next/navigation';
import { caluclateProgress } from '../lib/utilities';
import { Pathway, Competency } from '../lib/interface';
import Modal from '@/app/profile/_components/Modal';
import ContentAreaPill from '../_components/ContentAreaPill';
import CompetencyCard from '../_components/CompetencyCard';

export default async function Page({
  searchParams,
}: {
  searchParams?: { showModal: boolean; proof?: string };
}) {
  let userPathways = await getUserPathways();

  if (!userPathways) {
    notFound();
  }

  const pathways = userPathways.pathways;
  const showModal = searchParams?.showModal;

  const getAllContentAreaForPathway = (pathway: Pathway): string[] => {
    const contentAreas = new Set();
    pathway.competencies.forEach((competency: Competency) => {
      competency.contentAreas!.forEach((contentArea) => {
        contentAreas.add(contentArea.title);
      });
    });
    return Array.from(contentAreas) as string[];
  };

  return (
    <section className="mx-12 flex flex-col">
      {showModal && <Modal />}
      <div className="my-12 flex items-center space-x-10">
        <div className="flex flex-col justify-center">
          <p className="text-4xl" data-testid="username">
            {userPathways.username}
          </p>
          <p className="text-2xl" data-testid="user-fullname">
            {userPathways.firstName} {userPathways.lastName}
          </p>
          <p data-testid="user-bio">{userPathways.bio}</p>
        </div>
      </div>
      <hr />
      <div className="space-y-12">
        <p className="mt-12 text-2xl">Pathways</p>
        {pathways &&
          pathways.map((pathway: Pathway) => {
            return (
              <article
                className="border-black card w-full rounded-md border"
                key={pathway.id}
                data-testid="pathway-card"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="card-body">
                    <p className="card-title" data-testid="pathway-card-title">
                      {pathway.title}
                    </p>
                    <p data-testid="data-card-description">
                      {pathway.description}
                    </p>
                    <div className="card-actions flex">
                      {getAllContentAreaForPathway(pathway).map(
                        (contentArea: string) => {
                          return (
                            <span key={contentArea}>
                              <ContentAreaPill contentArea={contentArea} />
                            </span>
                          );
                        },
                      )}
                    </div>
                  </div>
                  <div className="p-8">
                    <div
                      data-testid="progress-radial"
                      className="radial-progress border-4 border-secondary bg-secondary text-bright"
                      style={{
                        ['--value' as string]: caluclateProgress(pathway),
                        ['--size' as string]: '8rem',
                      }}
                    >
                      {caluclateProgress(pathway)}%
                    </div>
                  </div>
                </div>
                <div className="card-body flex flex-row flex-wrap">
                  {pathway.competencies.map((competency) => {
                    return (
                      <Fragment key={competency.id}>
                        <CompetencyCard
                          key={competency.id}
                          competency={competency}
                        />
                      </Fragment>
                    );
                  })}
                </div>
              </article>
            );
          })}
      </div>
    </section>
  );
}
