import { Pathway, Competency } from '../lib/interface';

export const caluclateProgress = (pathway: Pathway) => {
  const totalCombinedCompetencies = pathway.contentAreas.reduce(
    (acc, contentArea) => {
      acc.push(...contentArea.competencies);
      return acc;
    },
    [] as Competency[],
  );

  const totalCompleted = totalCombinedCompetencies.reduce((acc, competency) => {
    if (competency.proofs && competency.proofs.length > 0) acc++;
    return acc;
  }, 0);

  return Math.ceil((totalCompleted / totalCombinedCompetencies.length) * 100);
};
