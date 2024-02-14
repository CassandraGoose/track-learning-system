import { getPathwaysByEmail } from '../lib/queries';
import { notFound } from 'next/navigation';
import { caluclateProgress } from '../lib/utilities';
import Avatar from '../../public/temp_profile_image.png';
import Image from 'next/image';

export default async function Page() {
  let pathways = await getPathwaysByEmail();

  if (!pathways) {
    notFound();
  }

  return (
    <section className="mx-12 flex flex-col">
      <div className="my-12 flex items-center space-x-10">
        <div className=" flex h-40 w-1/3 justify-center">
          <Image
            className="h-full w-auto rounded-full"
            src={Avatar}
            alt="default avatar blank face"
          />
        </div>
        <div className="flex flex-col justify-center">
          <p className="text-4xl">USERNAME</p>
          <p>title</p>
        </div>
      </div>
      <hr />
      <div className="space-y-12">
        <p className="mt-12 text-2xl">Pathways</p>
        {pathways &&
          pathways.pathways.map((pathway) => {
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
                      <div className="badge badge-outline">Fashion</div>
                      <div className="badge badge-outline">Products</div>
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
                  {pathway.contentArea[0].competencies.map((competency) => {
                    return (
                      <div
                        key={competency.id}
                        className="border-black card max-w-sm rounded-md border"
                      >
                        <div className="card-body">
                          <p className="card-title">{competency.title}</p>
                          <p>{competency.description}</p>
                          <div className="card-actions">
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
