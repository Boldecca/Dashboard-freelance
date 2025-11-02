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
  const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return (
    <div className="space-y-4">
      {projects.map((p) => {
        const client = findClientById(clients, p.clientId);
        return (
          <div key={p.id} className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-sm">
            <div className="flex items-start justify-between gap-4">
              <div>
                <h4 className="font-medium text-black">{p.title}</h4>
                <p className="text-sm text-neutral-500">{client ? client.name : <em>Client not found</em>}</p>
              </div>
              <div className="flex flex-wrap items-center gap-2 pt-1">
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${p.status === "completed" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : p.status === "in-progress" ? "bg-blue-50 text-blue-700 border-blue-200" : "bg-neutral-50 text-neutral-700 border-neutral-200"}`}>{p.status}</span>
                <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border ${p.paymentStatus === "paid" ? "bg-emerald-50 text-emerald-700 border-emerald-200" : "bg-rose-50 text-rose-700 border-rose-200"}`}>{p.paymentStatus}</span>
              </div>
            </div>

            <div className="mt-4 flex items-center justify-between text-sm">
              <div className="text-neutral-400">Budget:</div>
              <div className="font-semibold text-black">{fmt.format(p.budget)}</div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              {p.paymentStatus === "unpaid" && (
                <button
                  className="w-full px-3 py-2 rounded-md bg-black text-white text-sm font-medium hover:bg-neutral-900 transition-colors"
                  onClick={() => onMarkPaid(p.id)}
                >
                  Mark as Paid
                </button>
              )}
              <div className="flex items-center gap-2">
                <select
                  className="px-3 py-2 rounded-md border border-neutral-300 bg-white text-sm"
                  value={p.status}
                  onChange={(e) => onChangeStatus(p.id, e.target.value as Project["status"])}
                >
                  <option value="pending">pending</option>
                  <option value="in-progress">in-progress</option>
                  <option value="completed">completed</option>
                </select>
                <span
                  className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border transition-colors ${
                    p.status === "completed"
                      ? "bg-emerald-50 text-emerald-700 border-emerald-200"
                      : p.status === "in-progress"
                      ? "bg-blue-50 text-blue-700 border-blue-200"
                      : "bg-neutral-50 text-neutral-700 border-neutral-200"
                  }`}
                >
                  {p.status}
                </span>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
