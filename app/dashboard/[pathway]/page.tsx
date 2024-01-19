import React from "react";
import { notFound } from 'next/navigation';
import { getPathwayByUserId } from "../../lib/queries";
import PathwayProgressDetails from "../../components/PathwayProgressDetails";

export default async function Pathway({ params }: { params: { pathway: string }}) {
  const pathway = params.pathway;
  const userPathway = await getPathwayByUserId("cljvusdou00003ntltwo9mhm5",
  pathway)

  if (!userPathway) {
    notFound();
  }

  const selectedPathway = userPathway.pathways[0];
  
  return (
    <section className="flex flex-col my-12 items-center mx-12">
      <div className="flex w-full p-8 justify-between border rounded-md border-black">
        <div className="flex flex-col space-y-8 w-full">
          <h1 className="text-2xl" data-testid="pathway-title">
            {selectedPathway.title}
          </h1>
          <div className="flex items-center">
            <progress
              className="progress progress-secondary"
              value={70}
              max="100"
            ></progress>
            <span className="text-secondary">70%</span>
          </div>
          <h2 data-testid="pathway-description">{selectedPathway.description}</h2>
          <PathwayProgressDetails contentAreas={selectedPathway.contentArea} />
        </div>
      </div>
    </section>
  );
}
