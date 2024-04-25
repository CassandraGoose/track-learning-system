import { Fragment } from 'react';
import { Competency, Pathway, ContentArea } from '../../../lib/interface';
import PathwayProgressDetailsCompetencyList from './PathwayProgressDetailsCompetencyList';

export default function PathwayProgressDetails({
  pathway,
  pathwayId,
}: {
  pathway: Pathway;
  pathwayId: string;
}) {
  const totalCompetencies = pathway.contentAreas.reduce((acc, contentArea) => {
    acc.push(...contentArea.competencies);
    return acc;
  }, [] as Competency[]);

  const getCompletedCompetencies = (contentAreas: ContentArea[]) => {
    return totalCompetencies.reduce((acc, competency) => {
      if (competency.proofs && competency.proofs.length > 0) acc++;
      return acc;
    }, 0);
  };

  return (
    <div className="mt-0 flex flex-col items-start justify-center space-y-6">
      <p className="text-xl" data-testid="competency-progress">
        {getCompletedCompetencies(pathway.contentAreas)} /{' '}
        {totalCompetencies.length} competencies met
      </p>
      {pathway.contentAreas.map((contentArea) => {
        return (
          <Fragment key={contentArea.id}>
            <PathwayProgressDetailsCompetencyList
              contentArea={contentArea}
              pathwayId={pathwayId}
            />
          </Fragment>
        );
      })}
    </div>
  );
}
