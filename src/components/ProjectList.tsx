// ProjectList.tsx
import React from "react";
import type { Project, Client } from "../models";
import { findClientById } from "../utils";

type Props = {
  projects: Project[];
  clients: Client[];
  onMarkPaid: (projectId: string) => void;
  onChangeStatus: (projectId: string, status: Project["status"]) => void;
};

export const ProjectList: React.FC<Props> = ({ projects, clients, onMarkPaid, onChangeStatus }) => {
  return (
    <div className="space-y-3">
      {projects.map((p) => {
        const client = findClientById(clients, p.clientId);
        return (
          <div key={p.id} className="p-3 border rounded flex justify-between items-center">
            <div>
              <h4 className="font-medium">{p.title}</h4>
              <p className="text-sm">{client ? client.name : <em>Client not found</em>}</p>
              <p className="text-sm">Budget: ${p.budget}</p>
              <p className="text-sm">Status: <strong>{p.status}</strong></p>
              <p className="text-sm">Payment: <strong>{p.paymentStatus}</strong></p>
            </div>
            <div className="flex flex-col gap-2">
              {p.paymentStatus === "unpaid" && (
                <button className="px-3 py-1 rounded bg-green-500 text-white" onClick={() => onMarkPaid(p.id)}>
                  Mark Paid
                </button>
              )}
              <select
                value={p.status}
                onChange={(e) => onChangeStatus(p.id, e.target.value as Project["status"])}
              >
                <option value="pending">pending</option>
                <option value="in-progress">in-progress</option>
                <option value="completed">completed</option>
              </select>
            </div>
          </div>
        );
      })}
    </div>
  );
};
