import { Fragment } from 'react';
import { getUserPathways } from '../lib/queries';
import { notFound } from 'next/navigation';
import { caluclateProgress } from '../lib/utilities';
import { Pathway, Competency, ContentArea } from '../lib/interface';
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
                      {pathway.contentAreas.map((contentArea: ContentArea) => {
                        return (
                          <span
                            className="mr-2"
                            key={contentArea.title + contentArea.id}
                          >
                            <ContentAreaPill contentArea={contentArea.title} />
                          </span>
                        );
                      })}
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
                  {pathway.contentAreas.map((contentArea: ContentArea) => {
                    return (
                      <div key={contentArea.id} className="flex flex-col">
                        <p className="text-xl">{contentArea.title}</p>
                        <div className="card-body flex w-full flex-row flex-wrap justify-start">
                          {contentArea.competencies.map(
                            (competency: Competency) => {
                              return (
                                <CompetencyCard
                                  key={competency.id}
                                  competency={competency}
                                />
                              );
                            },
                          )}
                        </div>
                      </div>
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
