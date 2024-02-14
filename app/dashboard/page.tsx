import { Pathway } from '../lib/interface';
import Link from 'next/link';
import { getPathwaysByEmail } from '../lib/queries';
import { notFound } from 'next/navigation';

export default async function Page() {
  let pathways = await getPathwaysByEmail();

  if (!pathways) {
    notFound();
  }

  const caluclateProgress = (pathway: Pathway) => {
    const thing =  pathway.contentArea.reduce((acc, contentArea) => {
      let totalCompetencies = 0;
      const completedProofs = contentArea.competencies.reduce((compAcc, competency) => {
        totalCompetencies++;
        return competency.proofs.length > 0 ? compAcc + 1 : compAcc;
      }, 0);
      console.log('totalProfs', totalCompetencies, 'completedProofs', completedProofs);
      console.log(completedProofs / totalCompetencies)
      return acc + (completedProofs / totalCompetencies) * 100;
    }, 0);
    return thing;
  };

  return (
    <section className='mx-12 flex flex-col space-y-12'>
      <h2 className={`text-4xl self-center mt-8 `}>
        My Pathways
      </h2>
      {pathways && pathways.pathways.map((pathway) => {
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
                    ['--value' as string]: caluclateProgress(pathway),
                    ['--size' as string]: '8rem',
                  }}>
                  {caluclateProgress(pathway)}%
                </div>
              </div>
            </div>
          </article>
        );
      })}
    </section>
  );
}
