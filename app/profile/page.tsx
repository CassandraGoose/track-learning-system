import { getPathwaysByEmail } from '../lib/queries';
import { notFound } from 'next/navigation';
import { caluclateProgress } from '../lib/utilities';
import { Pathway, Competency, ContentArea } from '../lib/interface';

export default async function Page() {
  let userPathways = await getPathwaysByEmail();

  if (!userPathways) {
    notFound();
  }

  const pathways = userPathways.pathways;

  const getAllContentAreaForPathway = (pathway: Pathway): string[] => {
    const contentAreas = new Set();
    pathway.competencies.forEach((competency: Competency) => {
      competency.contentAreas!.forEach((contentArea) => {
        contentAreas.add(contentArea.title);
      });
    });
    return Array.from(contentAreas) as string[];
  }

  return (
    <section className="mx-12 flex flex-col">
      <div className="my-12 flex items-center space-x-10">
        <div className="flex flex-col justify-center">
          <p className="text-4xl">{userPathways.username}</p>
          <p className="text-2xl">{userPathways.firstName} {userPathways.lastName}</p>
          <p>{userPathways.bio}</p>
        </div>
      </div>
      <hr />
      <div className="space-y-12">
        <p className="mt-12 text-2xl">Pathways</p>
        {pathways &&
          pathways.map((pathway : Pathway) => {
            return (
              <article
                className="border-black card w-full rounded-md border"
                key={pathway.id}
                data-testid="pathway-card"
              >
                <div className="flex">
                  <div className="card-body">
                    <p className="card-title">{pathway.title}</p>
                    <p>{pathway.description}</p>
                    <div className="card-actions flex">
                      {getAllContentAreaForPathway(pathway).map((contentArea: string) => {
                        return (<div className="badge badge-outline" key={contentArea}>{contentArea}</div>);
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
                  {pathway.competencies.map((competency) => {
                    return (
                      <div
                        key={competency.id}
                        className="border-black card max-w-sm rounded-md border"
                      >
                        <div className="card-body">
                          <p className="card-title">{competency.title}</p>
                          <p>{competency.description}</p>
                          <div className="card-actions flex flex-col">
                            {competency.proofs.length > 0 ? (<ul className="flex flex-wrap justify-start">
                              {competency.proofs.map((proof) => {
                                return (
                                  <li key={proof.id} className="mr-2 mt-2">
                                    <button className="btn btn-secondary">
                                      {proof.title}
                                    </button>
                                  </li>
                                );
                              })}
                            </ul>) : (<p>No proofs to show</p>)}
                            {competency.contentAreas && competency.contentAreas.map((contentArea: ContentArea) => {
                              return <div className="badge badge-outline" key={contentArea.id}>{contentArea.title}</div>
                            })}
                          </div>
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
