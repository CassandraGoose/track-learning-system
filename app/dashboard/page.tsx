import { Pathway } from '../lib/interface';
import Link from 'next/link';
import { getPathwaysByEmail } from '../lib/queries';

export default async function Home() {
  const pathways = await getPathwaysByEmail();
const chicken = '';
  return (
    <section className='mx-12 flex flex-col space-y-12'>
      <h2 className={`text-4xl self-center mt-8 `}>
        My Pathways
      </h2>
      {pathways && pathways.pathways.map((pathway: Pathway) => {
        return (
          <article
            className='card w-full border rounded-md border-black'
            key={pathway.id}
            data-testid='pathway-card'>
            <div className='flex'>
              <div className='card-body'>
                <p className='card-title'>{pathway.title}</p>
                <p>{pathway.description}</p>
                <div className='card-actions'>
                  <Link
                    href={`/dashboard/${pathway.id}`}
                    className='btn btn-secondary text-bright'>
                    View Pathway
                  </Link>
                </div>
              </div>
              <div className='p-8'>
                <div
                  className='radial-progress bg-secondary text-bright border-4 border-secondary'
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
