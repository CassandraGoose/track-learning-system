import { Competency, ContentArea } from "../lib/interface";
import ProofButtons from "../profile/_components/ProofButtons";

export default function CompetencyCard({competency}: { competency: Competency }) {
  return (
    <div
      key={competency.id}
      className="border-black card rounded-md border md:w-[32%] w-full"
    >
      <div className="card-body max-h-80">
        <p className="card-title items-start grow-0" data-testid="competency-title">
          {competency.title}
        </p>
        <p className="text-clamp-5 overflow-hidden ">{competency.description}</p>
      </div>
    {competency?.proofs?.length ? (<div className="card-body card-actions flex flex-col bg-primary text-bright">
        <p className="text-sm">Proof of competency:</p>
         <ProofButtons competency={competency} />
      </div>): null}
    </div>
  );
}
