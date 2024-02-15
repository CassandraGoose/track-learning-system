"use client";

import { useState } from "react";
import { Competency, Pathway } from "../../../lib/interface";
import Link from "next/link";

export default function PathwayProgressDetails({ pathway, pathwayId }: { pathway: Pathway, pathwayId: string }) {
  const [collapsed, setCollapsed] = useState(false);

  const getCompletedCompetencies = (competencies: Competency[]) => {
    return competencies.reduce((acc, competency) => {
      if (competency.proofs.length > 0) acc++;
      return acc;
    }, 0);
  }

  const checkCompetencyCompleted = (competency: Competency) => {
    return competency.proofs.length > 0;
  }

  return (
    <div className="flex justify-center items-start mt-0">
        <div
          className="w-full border border-secondary bg-bright mt-16 rounded-md p-4"
        >
          <div>
            <div className="flex justify-between items-center">
              <p className="text-xl" data-testid="competency-progress">
                {getCompletedCompetencies(pathway.competencies)} / {pathway.competencies.length} competencies met
              </p>
              <button
                data-testid="toggle-competency-details"
                className="text-4xl"
                aria-controls={`${pathway.title}-details`}
                aria-expanded={!collapsed}
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? "-" : "+"}
              </button>
            </div>
          </div>
          <div
            className={` ${collapsed ? "block" : "hidden"}`}
            id={`${pathway.title}-details`}
          >
            <table className="table">
              <thead>
                <tr>
                  <th className="text-primary">Completed</th>
                  <th className="text-primary">Competency</th>
                  <th className="text-primary">Description</th>
                </tr>
              </thead>
              <tbody>
                {pathway.competencies.map((competency: Competency) => (
                  <tr key={competency.id}>
                    <td>
                      <span className="flex items-center space-x-3 pl-4 text-xl" data-testid="completed-check">
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
                        className='btn btn-secondary'>
                        Proof
                      </Link>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
    </div>
  );
}
