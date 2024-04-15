import { Pathway } from '../lib/interface';

export const caluclateProgress = (pathway: Pathway) => {
  let totalCompetencies = 0;
  const total = pathway.competencies.reduce((acc, competency) => {
    totalCompetencies++;
    return competency.proofs!.length > 0 ? acc + 1 : acc;
  }, 0);
  return (total / totalCompetencies) * 100;
};