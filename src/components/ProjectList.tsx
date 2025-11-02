// ProjectList.tsx
import type React from "react";
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
          <div key={p.id} className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm flex items-start justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-semibold tracking-tight text-neutral-100">{p.title}</h4>
              <p className="text-sm text-neutral-400">{client ? client.name : <em>Client not found</em>}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center rounded-full bg-neutral-800 px-2 py-0.5 text-xs font-medium text-neutral-300">Budget ${p.budget.toLocaleString()}</span>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${p.status === "completed" ? "bg-emerald-900/40 text-emerald-300" : p.status === "in-progress" ? "bg-amber-900/40 text-amber-300" : "bg-neutral-800 text-neutral-300"}`}>{p.status}</span>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${p.paymentStatus === "paid" ? "bg-emerald-900/40 text-emerald-300" : "bg-rose-900/40 text-rose-300"}`}>{p.paymentStatus}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-[220px]">
              {p.paymentStatus === "unpaid" && (
                <button
                  className="px-3 py-2 rounded-md bg-neutral-200 text-neutral-900 text-sm font-medium hover:bg-white transition-colors"
                  onClick={() => onMarkPaid(p.id)}
                >
                  Mark as Paid
                </button>
              )}
              <select
                className="px-3 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-200 text-sm"
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
