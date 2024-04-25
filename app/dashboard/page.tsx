import Link from 'next/link';
import { getUserPathways } from '../lib/queries';
import { notFound, redirect } from 'next/navigation';
import { caluclateProgress } from '../lib/utilities';
import { checkUser } from '@/app/actions/actions';
import PathwayCard from '../_components/PathwayCard';
import { Pathway } from '../lib/interface';

export default async function Page() {
  const user = await checkUser();

  if (!user) {
    redirect('/login');
  }

  let userPathways = await getUserPathways();

  if (!userPathways) {
    notFound();
  }

  const pathways = userPathways.pathways || [];

  const createCardActionChild = (id: number) => (
    <div className="card-actions">
      <Link
        data-testid="view-pathway"
        href={`/dashboard/${id}`}
        className="btn btn-secondary text-bright"
      >
        View Pathway
      </Link>
    </div>
  );

  const createCardBottomChild = (pathway: Pathway) => (
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
  );
  return (
    <section className="mx-12 flex flex-col space-y-12">
      <h2 className={`mt-8 self-center text-4xl `}>My Pathways</h2>
      {pathways && pathways.length > 0 ? (
        pathways.map((pathway) => {
          return (
            <PathwayCard
              key={pathway.id}
              title={pathway.title}
              description={pathway.description}
              cardActionChild={createCardActionChild(pathway.id)}
              rightBlockChild={createCardBottomChild(pathway)}
            />
          );
        })
      ) : (
        <div className="flex flex-col items-center justify-center">
          <p>You don&apos;t have any pathways.</p>
          <Link href="/pathways" className="btn btn-primary my-4">
            Add a pathway
          </Link>
        </div>
      )}
    </section>
  );
}
