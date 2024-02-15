'use client';
import { Proof } from '@/app/lib/interface';
import { removeProof } from '@/app/actions';
import { useRouter } from 'next/navigation';

export default function ProofList({ proofs }: { proofs: Proof[] }) {
  const router = useRouter();

  return (
    !!proofs &&
    proofs.length > 0 && (
      <div className="w-2/3">
        <table className="table w-full" data-testid="proof-table">
          <thead>
            <tr>
              <th className="text-primary">Title</th>
              <th className="text-primary">Description</th>
              <th className="text-primary">Proof</th>
            </tr>
          </thead>
          <tbody>
            {proofs.map((proof: Proof) => (
              <tr key={proof.id}>
                <td>
                  <p data-testid="proof-title">{proof.title}</p>
                </td>
                <td>
                  <p data-testid="proof-description">{proof.description}</p>
                </td>
                <td>
                  <p data-testid="proof-justification">{proof.justification}</p>
                </td>
                <td>
                  <button
                    data-testid="delete-proof"
                    onClick={() => {
                      removeProof(proof.id);
                      router.refresh();
                    }}
                    className="btn btn-secondary"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    )
  );
}
