import prisma from '@/lib/prisma';

import { GetStaticProps, InferGetStaticPropsType } from 'next';



export const getStaticProps: GetStaticProps = async () => {
  try {
    const pathwayData = await prisma.person.findFirst({
      where: {
        email: process.env.TEST_USER_EMAIL,
      },
      include: {
        pathways: {
          include: {
            contentArea: {
              include: {
                competencies: {
                  include: {
                    proofs: true,
                  },
                },
              },
            },
          },
        },
      },
    });
    // nextjs gets mad if you just straight up pop the returned object into props, so we'll try stringifying and parsing for now.
    // i'm sure there's a better solution, but this will work for now.
    return {
      props: { pathways: JSON.parse(JSON.stringify(pathwayData)) },
      revalidate: 10,
    };
  } catch (e) {
    // apparently, it's not good practice to do try/catches in getStaticProps because next will just auto-handle errors that are thrown. I'm going ot leave
    // this try catch in for now, but i'll make a ticket to revisit this after gathering some intel.
    // https://github.com/vercel/next.js/discussions/11180#discussioncomment-2399
    console.error(e);
    throw new Error('Failed to fetch');
  }
};

export default function Home({
  pathways,
}: InferGetStaticPropsType<typeof getStaticProps>) {
  return (
    <section className='mx-12 flex flex-col space-y-12'>
      <h2 className='text-4xl self-center mt-8'>My Pathways</h2>
      {pathways.pathways.map((pathway: Pathway) => {
        return (
          <div
            key={pathway.id}
            className='bg-gray-light block drop-shadow-lg p-6 space-y-3'>
            <div className='flex justify-between items-center'>
              <div className='flex flex-col '>
                <h5 className='text-lg'>{pathway.title}</h5>
                <p>{pathway.description}</p>
              </div>
              <button type='button' className='bg-blue p-2'>
                View Pathway
              </button>
            </div>
            <div className='mb-6 h-5 w-full bg-gray-mid'>
              <div
                className='h-5 bg-purple-light text-center'
                style={{ width: '25%' }}>
                25%
              </div>
            </div>
          </div>
        );
      })}
    </section>
  );
}
