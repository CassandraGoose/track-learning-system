import React from 'react';
import type { GetServerSideProps, InferGetServerSidePropsType } from 'next';
import { getPathwayByUserId } from '../../lib/queries';
import PathwayProgressDetails from '../../components/PathwayProgressDetails';

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
            <div className="flex items-center">
            <progress className="progress progress-secondary" value={70} max="100" ></progress>
          <span className="text-secondary">70%</span>  
            </div>
          
            <h2 data-cy='pathway-description'>{selectedPathway.description}</h2>
            <div>
              <PathwayProgressDetails contentAreas={selectedPathway.contentArea} />
              {/* {selectedPathway.contentArea.map((contentArea: ContentArea) => {
                return (
                  
                );
              })} */}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
