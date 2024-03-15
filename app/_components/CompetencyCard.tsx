import { Competency, ContentArea } from "../lib/interface";
import ProofButtons from "../profile/_components/ProofButtons";

export default function CompetencyCard({competency}: { competency: Competency }) {
  return (
    <div
      key={competency.id}
      className="border-black card rounded-md border md:max-w-[32%]"
    >
      <div className="card-body h-[70%] overflow-y-hidden">
        <p className="card-title" data-testid="competency-title">
          {competency.title}
        </p>
        <p className="line-clamp-5 text-ellipsis">{competency.description}</p>
        <div className="flex flex-wrap space-y-2 md:space-x-2 md:space-y-0">
          {competency.contentAreas &&
            competency.contentAreas.map((contentArea: ContentArea) => {
              return (
                <div
                  className="badge badge-outline h-fit md:h-5"
                  key={contentArea.id}
                  data-testid="competency-content-area-badge"
                >
                  {contentArea.title}
                </div>
              );
            })}
        </div>
      </div>
      {competency?.proofs?.length && (<div className="card-body card-actions flex flex-col bg-primary text-bright">
        <p className="text-sm">Proof of competency:</p>
         <ProofButtons competency={competency} />
      </div>)}
    </div>
  );
}
