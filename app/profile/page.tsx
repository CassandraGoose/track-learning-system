import { getUserPathways, getProof } from '../lib/queries';
import { notFound } from 'next/navigation';
import { caluclateProgress } from '../lib/utilities';
import { Pathway, Competency, ContentArea } from '../lib/interface';
import Modal from "@/app/profile/_components/Modal";
import ProofButtons from './_components/ProofButtons';

export default async function Page({ searchParams }: { searchParams?: { showModal: boolean, proof?: string }}) {
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
      { showModal && <Modal /> }
      <div className="my-12 flex items-center space-x-10">
        <div className="flex flex-col justify-center">
          <p className="text-4xl" data-testid="username">{userPathways.username}</p>
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
                <div className="flex md:flex-row flex-col">
                  <div className="card-body">
                    <p className="card-title" data-testid="pathway-card-title">{pathway.title}</p>
                    <p data-testid="data-card-description">{pathway.description}</p>
                    <div className="card-actions flex">
                      {getAllContentAreaForPathway(pathway).map(
                        (contentArea: string) => {
                          return (
                            <div
                              className="badge badge-outline"
                              data-testid="content-area-badge"
                              key={contentArea}
                            >
                              {contentArea}
                            </div>
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
                      <div
                        key={competency.id}
                        className="border-black card md:max-w-[32%] rounded-md border"
                      >
                        <div className="card-body h-[70%] overflow-y-hidden">
                          <p className="card-title" data-testid="competency-title">{competency.title}</p>
                          <p className="text-ellipsis line-clamp-5">{competency.description}</p>
                          <div className="flex md:space-x-2 space-y-2 md:space-y-0 flex-wrap">
                            {competency.contentAreas &&
                              competency.contentAreas.map(
                                (contentArea: ContentArea) => {
                                  return (
                                    <div
                                      className="badge badge-outline md:h-5 h-fit"
                                      key={contentArea.id}
                                      data-testid="competency-content-area-badge"
                                    >
                                      {contentArea.title}
                                    </div>
                                  );
                                },
                              )}
                          </div>
                        </div>
                        <div className="card-body card-actions flex flex-col bg-primary text-bright">
                          <p className="text-sm">
                            Proof of competency:
                          </p>
                          <ProofButtons competency={competency} />
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
