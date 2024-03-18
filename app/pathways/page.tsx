import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getAllPathways } from '../lib/queries';
import PathwayCard from '../_components/PathwayCard';
import { Competency } from '../lib/interface';
import ContentAreaPill from '../_components/ContentAreaPill';

export default async function Page() {
  let pathways = await getAllPathways();

  if (!pathways) {
    notFound();
  }

  const createContentAreaList = (competencies: Competency[]) => {
    if (!competencies) notFound();
    return competencies.map((competency) => {
      if (!competency.contentAreas) notFound();

      return competency.contentAreas.map((contentArea) => {
        return contentArea.title;
      });
    });
  };

  const createCardActionChild = (competencies: Competency[]) => {
    const contentAreas = createContentAreaList(competencies);

    return (
      <div className="flex flex-wrap">
        {contentAreas.flat().map((contentArea: string) => (
          <span className="mr-2" key={contentArea}>
            <ContentAreaPill contentArea={contentArea} />
          </span>
        ))}
      </div>
    );
  };

  const createRightBlockChild = (id: number) => (
    <div className="">
      <Link
        data-testid="view-pathway"
        href={`/pathways/${id}`}
        className="btn btn-secondary m-8 text-bright md:min-w-44"
      >
        Pathway Details
      </Link>
    </div>
  );

  return (
    <section className="mx-12 flex flex-col space-y-12">
      <h2 className={`mt-8 self-center text-4xl `}>Available Pathways</h2>
      <form className="w-full flex justify-center items-center">
        <label className="input input-bordered bg-bright input-primary flex items-center gap-2">
          <input type="text" className="grow bg-bright" placeholder="Search" />
          <kbd className="kbd kbd-sm text-bright">⌘</kbd>
          <kbd className="kbd kbd-sm text-bright">K</kbd>
        </label>
      </form>
      {pathways.map((pathway) => {
        return (
          <PathwayCard
            key={pathway.id}
            title={pathway.title}
            description={pathway.description}
            rightBlockChild={createRightBlockChild(pathway.id)}
            cardActionChild={createCardActionChild(pathway.competencies)}
          />
        );
      })}
    </section>
  );
}
