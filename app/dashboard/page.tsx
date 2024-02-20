import Link from 'next/link';
import { getUserPathways } from '../lib/queries';
import { notFound, redirect } from 'next/navigation';
import { caluclateProgress } from '../lib/utilities';
import { checkUser } from '@/app/actions/actions';

export default async function Page() {
  const user = await checkUser();

  if (!user) {
    redirect('/login');
  }

  let userPathways = await getUserPathways();

  if (!userPathways) {
    notFound();
  }

  const pathways = userPathways.pathways;

  return (
    <section className='mx-12 flex flex-col space-y-12'>
      <h2 className={`text-4xl self-center mt-8 `}>
        My Pathways
      </h2>
      {pathways && pathways.length > 0 ? pathways.map((pathway) => {
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
                    data-testid='view-pathway'
                    href={`/dashboard/${pathway.id}`}
                    className='btn btn-secondary text-bright'>
                    View Pathway
                  </Link>
                </div>
              </div>
              <div className='p-8'>
                <div
                  data-testid="progress-radial"
                  className='radial-progress bg-secondary text-bright border-4 border-secondary'
                  style={{
                    ['--value' as string]: caluclateProgress(pathway),
                    ['--size' as string]: '8rem',
                  }}>
                  {caluclateProgress(pathway)}%
                </div>
              </div>
            </div>
          </article>
        );
      }) : <div className="flex flex-col justify-center items-center">
              <p>You don&apos;t have any pathways.</p>
              <Link href="/pathways" className="btn btn-primary my-4">Add a pathway</Link>
            </div>}
    </section>
  );
}
