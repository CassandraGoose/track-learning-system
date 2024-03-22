'use client';

import { usePathname } from 'next/navigation';
import { Competency } from '@/app/lib/interface';
import Link from 'next/link';

export default function ProofButtons({
  competency,
}: {
  competency: Competency;
}) {
  const pathname = usePathname();

  return competency.proofs && competency.proofs.length > 0 ? (
    <div>
      <ul className="flex flex-wrap justify-start">
        {competency.proofs.map((proof) => {
          return (
            <li key={proof.id} className="mr-2 mt-2">
              <Link
                data-testid="proof-title"
                href={`${pathname}/?showModal=true&proof=${proof.id}`}
                className="btn-bright btn btn-outline"
              >
                {proof.title}
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  ) : (
    <p>No proofs to show</p>
  );
}
