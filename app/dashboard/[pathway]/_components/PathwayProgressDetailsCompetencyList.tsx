'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Competency, ContentArea } from '../../../lib/interface';

export default function PathwayProgressDetailsCompetencyList({ contentArea, pathwayId}: { contentArea: ContentArea, pathwayId: string }) {
  const [collapsed, setCollapsed] = useState(false);

  const checkCompetencyCompleted = (competency: Competency) => {
    return competency.proofs && competency.proofs.length > 0;
  };

  return (<div key={contentArea.id} className="w-full rounded-md border border-secondary bg-bright p-4">
  <div>
    <div className="flex items-center justify-between">
    <p className="text-xl">{contentArea.title}</p>

      <button
        data-testid="toggle-competency-details"
        className="text-4xl"
        aria-controls={`${contentArea.title}-details`}
        aria-expanded={!collapsed}
        onClick={() => setCollapsed(!collapsed)}
      >
        {collapsed ? '-' : '+'}
      </button>
    </div>
  </div>
  <div
    className={` ${collapsed ? 'block' : 'hidden'} overflow-x-auto`}
    id={`${contentArea.title}-details`}
  >
    <table className="table table-xs">
      <thead>
        <tr>
          <th className="text-primary">Completed</th>
          <th className="text-primary">Competency</th>
          <th className="text-primary">Description</th>
        </tr>
      </thead>
      <tbody>
        {contentArea.competencies.map((competency: Competency) => (
          <tr key={competency.id}>
            <td>
              <span
                className="flex items-center space-x-3 pl-4 text-xl"
                data-testid="completed-check"
              >
                {checkCompetencyCompleted(competency) ? '✓' : null}
              </span>
            </td>
            <td>
              <span className="flex items-center space-x-3">
                <p>{competency.title}</p>
              </span>
            </td>
            <td>
              <p>{competency.description}</p>
            </td>
            <td>
              <Link
                data-testid="view-proofs"
                href={`/dashboard/${pathwayId}/${competency.id}`}
                className="btn btn-secondary"
              >
                Proof
              </Link>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>);
}