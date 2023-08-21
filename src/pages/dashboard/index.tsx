import { Pathway } from '../../lib/interface';
import { GetStaticProps, InferGetStaticPropsType } from 'next';
import Link from 'next/link';
import { getPathwaysByEmail } from '../../lib/queries';

export const getStaticProps: GetStaticProps = async () => {
  try {
    const pathwayData = await getPathwaysByEmail();
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
      <h2 className={`text-4xl self-center mt-8 `} data-cy='pathways-title'>
        My Pathways
      </h2>
      {pathways.pathways.map((pathway: Pathway) => {
        return (
          <article
            className='card w-full border rounded-md border-black'
            key={pathway.id}
            data-cy='pathway-card'>
            <div className='flex'>
              <div className='card-body'>
                <p className='card-title'>{pathway.title}</p>
                <p>{pathway.description}</p>
                <div className='card-actions'>
                  <Link
                    href={`/dashboard/${pathway.id}`}
                    className='btn btn-secondary'>
                    View Pathway
                  </Link>
                </div>
              </div>
              <div className='p-8'>
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
          </article>
        );
      })}
    </section>
  );
}
