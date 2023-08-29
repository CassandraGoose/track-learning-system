import React from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getPathwayByUserId } from '../../lib/queries';
import { ContentArea, Competency } from '../../lib/interface';

export const getServerSideProps: GetServerSideProps = async (context) => {
  const { pathway } = context.params! as { pathway: string };
  // temporarily set up just to grab user 1's version of this pathway. when we have auth, we'll change this.
  try {
    const userPathway = await getPathwayByUserId(
      'cljvusdou00003ntltwo9mhm5',
      pathway
    );

    return {
      props: {
        pathway: JSON.parse(JSON.stringify(userPathway)),
      },
    };
  } catch (e) {
    // apparently, it's not good practice to do try/catches in getStaticProps because next will just auto-handle errors that are thrown. I'm going ot leave
    // this try catch in for now, but i'll make a ticket to revisit this after gathering some intel.
    // https://github.com/vercel/next.js/discussions/11180#discussioncomment-2399
    console.error(e);
    throw new Error('Failed to fetch');
  }
};

export default function Pathway({
  pathway,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const selectedPathway = pathway.pathways[0];
  console.log(selectedPathway);
  return (
    <section className='flex flex-col my-12 items-center mx-12'>
      <div className='flex w-full p-8 justify-between border rounded-md border-black'>
        <div className='flex flex-col space-y-8'>
          <div className='flex flex-col'>
            <h1 className='text-2xl' data-cy='pathway-title'>
              {selectedPathway.title}
            </h1>
            <h2 data-cy='pathway-description'>{selectedPathway.description}</h2>
            <div>
              {selectedPathway.contentArea.map((contentArea: ContentArea) => {
                return (
                  <table className='table'>
                    <caption>
                      <p>{contentArea.title}</p>
                      <p>{contentArea.description}</p>
                    </caption>
                    <thead>
                      <tr>
                        <th>Prgoress</th>
                        <th>Competency</th>
                        <th>Description</th>
                        <th></th>
                      </tr>
                    </thead>
                    <tbody>
                      {contentArea.competencies.map(
                        (competency: Competency) => {
                          return (
                            <tr key={competency.id}>
                              <td>
                                <span className='flex items-center space-x-3'>
                                  <span>✅</span>
                                </span>
                              </td>
                              <td>
                                <span className='flex items-center space-x-3'>
                                  <p>{competency.title}</p>
                                </span>
                              </td>
                              <td>
                                <p>{competency.description}</p>
                              </td>
                              <td>
                                <button className='btn btn-secondary'>
                                  Proof
                                </button>
                              </td>
                            </tr>
                          );
                        }
                      )}
                    </tbody>
                  </table>
                );
              })}
            </div>
          </div>
        </div>
        <div className='flex mt-0'>
          <div
            className='radial-progress bg-secondary text-secondary-content border-4 border-secondary'
            style={{
              ['--value' as string]: 70,
              ['--size' as string]: '8rem',
            }}>
            70%
          </div>
        </div>
      </div>
    </section>
  );
}
