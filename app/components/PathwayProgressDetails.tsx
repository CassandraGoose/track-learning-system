"use client";

import { useState } from "react";
import { ContentArea, Competency } from "../lib/interface";

export default function PathwayProgressDetails({
  contentAreas,
}: {
  contentAreas: [ContentArea];
}) {
  const [collapsed, setCollapsed] = useState(false);

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
                3/7 competencies met
              </p>
            </div>
          </div>
          <div
            className={` ${collapsed ? "block" : "hidden"}`}
            id={`${contentArea.title}-details`}
          >
            <table className="table table-zebra table-lg">
              <thead>
                <tr>
                  <th>Completed</th>
                  <th>Competency</th>
                  <th>Description</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                {contentArea.competencies.map((competency: Competency) => (
                  <tr key={competency.id}>
                    <td>
                      <span className="flex items-center space-x-3">
                        <span>✅</span>
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
                      <button className="btn btn-secondary">Proof</button>
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
