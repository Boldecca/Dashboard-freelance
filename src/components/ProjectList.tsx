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
          <div key={p.id} className="p-4 bg-white border rounded-xl shadow-sm flex items-start justify-between gap-6">
            <div className="space-y-1">
              <h4 className="font-semibold tracking-tight">{p.title}</h4>
              <p className="text-sm text-slate-600">{client ? client.name : <em>Client not found</em>}</p>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className="inline-flex items-center rounded-full bg-slate-100 px-2 py-0.5 text-xs font-medium text-slate-700">Budget ${p.budget}</span>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${p.status === "completed" ? "bg-emerald-100 text-emerald-700" : p.status === "in-progress" ? "bg-amber-100 text-amber-700" : "bg-slate-100 text-slate-700"}`}>{p.status}</span>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${p.paymentStatus === "paid" ? "bg-emerald-100 text-emerald-700" : "bg-rose-100 text-rose-700"}`}>{p.paymentStatus}</span>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row sm:items-center gap-2 min-w-[220px]">
              {p.paymentStatus === "unpaid" && (
                <button
                  className="px-3 py-2 rounded-md bg-emerald-600 text-white text-sm font-medium hover:bg-emerald-700 transition-colors"
                  onClick={() => onMarkPaid(p.id)}
                >
                  Mark Paid
                </button>
              )}
              <select
                className="px-3 py-2 rounded-md border bg-white text-sm"
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
