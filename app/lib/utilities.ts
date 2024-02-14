
import { Pathway } from '../lib/interface';

export const caluclateProgress = (pathway: Pathway) => {
  return pathway.contentArea.reduce((acc, contentArea) => {
    let totalCompetencies = 0;
    const completedProofs = contentArea.competencies.reduce((compAcc, competency) => {
      totalCompetencies++;
      return competency.proofs.length > 0 ? compAcc + 1 : compAcc;
    }, 0);
    return acc + (completedProofs / totalCompetencies) * 100;
  }, 0);
};