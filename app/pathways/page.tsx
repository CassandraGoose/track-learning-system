import { Suspense } from 'react';
import { notFound } from 'next/navigation';
import Link from 'next/link';
import { getFilteredPathways, getFilteredPathwaysCount } from '../lib/queries';
import PathwayCard from '../_components/PathwayCard';
import { Competency } from '../lib/interface';
import ContentAreaPill from '../_components/ContentAreaPill';
import Search from '../_components/Search';
import Pagination from '../_components/Pagination';

export default async function Page({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string };
}) {
  const query = searchParams?.query || '';
  const currentPage = Number(searchParams?.page) || 1;

  let pathways = await getFilteredPathways(query, currentPage);
  let pagesCount = (await getFilteredPathwaysCount(query)) || 6;
  pagesCount = Math.ceil(pagesCount / 6);

  if (!pathways) {
    notFound();
  }

  const createContentAreaList = (competencies: Competency[]) => {
    if (!competencies) notFound();
    return competencies.map((competency) => {
      if (!competency.contentAreas) notFound();

      return competency.contentAreas.map((contentArea) => {
        return { title: contentArea.title, parentId: competency.id };
      });
    });
  };

  const createCardActionChild = (competencies: Competency[]) => {
    const contentAreas = createContentAreaList(competencies);

    return (
      <div className="flex flex-wrap">
        {contentAreas
          .flat()
          .map((contentArea: { title: string; parentId: number }) => (
            <span
              className="mr-2"
              key={contentArea.title + contentArea.parentId}
            >
              <ContentAreaPill contentArea={contentArea.title} />
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
      <Search />
      {pathways.length > 0 ? (
        <Suspense key={query + currentPage} fallback={<div>Loading...</div>}>
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
        </Suspense>
      ) : (
        <div> No pathways match that search criteria. </div>
      )}
      <div className="flex items-center justify-center">
        <Pagination totalPages={pagesCount} />
      </div>
    </section>
  );
}
