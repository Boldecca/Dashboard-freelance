// DashboardStats.tsx
import type React from "react";
import type { Project, Client, Payment } from "../models";
import { countPaidUnpaid } from "../utils";

type Props = {
  projects: Project[];
  clients: Client[];
  payments: Payment[];
};

export const DashboardStats: React.FC<Props> = ({ projects, clients, payments }) => {
  const { paid, unpaid } = countPaidUnpaid(projects);
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget ?? 0), 0);
  const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm">
        <h5 className="text-sm font-medium text-neutral-400">Total Clients</h5>
        <p className="mt-1 text-2xl font-semibold">{clients.length}</p>
      </div>
      <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm">
        <h5 className="text-sm font-medium text-neutral-400">Total Projects</h5>
        <p className="mt-1 text-2xl font-semibold">{projects.length}</p>
      </div>
      <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm">
        <h5 className="text-sm font-medium text-neutral-400">Paid / Unpaid</h5>
        <p className="mt-1 text-2xl font-semibold">{paid} / {unpaid}</p>
      </div>
      <div className="p-5 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm">
        <h5 className="text-sm font-medium text-neutral-400">Total Budget</h5>
        <p className="mt-1 text-2xl font-semibold">{fmt.format(totalBudget)}</p>
      </div>
    </div>
  );
};

