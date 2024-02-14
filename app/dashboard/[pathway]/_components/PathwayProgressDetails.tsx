"use client";

import { useState } from "react";
import { ContentArea, Competency } from "../../../lib/interface";
import Link from "next/link";

export default function PathwayProgressDetails({ contentAreas, pathwayId }: { contentAreas: ContentArea[], pathwayId: string }) {
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
      {contentAreas.map((contentArea: ContentArea) => (
        <div
          key={contentArea.id}
          className="w-full border border-secondary bg-bright mt-16 rounded-md p-4"
        >
          <div>
            <div className="flex justify-between">
              <p className="font-medium text-lg" data-testid="content-area-title">
                {contentArea.title}
              </p>
              <button
                data-testid="toggle-competency-details"
                className="text-4xl"
                aria-controls={`${contentArea.title}-details`}
                aria-expanded={!collapsed}
                onClick={() => setCollapsed(!collapsed)}
              >
                {collapsed ? "-" : "+"}
              </button>
            </div>
            <p data-testid="content-area-description">{contentArea.description}</p>
            <div className="flex items-center justify-center pt-8">
              <p className="font-thin" data-testid="competency-progress">
                {getCompletedCompetencies(contentArea.competencies)} / {contentArea.competencies.length} competencies met
              </p>
            </div>
          </div>
          <div
            className={` ${collapsed ? "block" : "hidden"}`}
            id={`${contentArea.title}-details`}
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
                {contentArea.competencies.map((competency: Competency) => (
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
      ))}
    </div>
  );
}
