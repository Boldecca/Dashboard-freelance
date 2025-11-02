// DashboardStats.tsx
import type React from "react";
import type { Project, Client, Payment } from "../models";
import { countPaidUnpaid } from "../utils";

type Props = {
  projects: Project[];
  clients: Client[];
  payments: Payment[];
};

export const DashboardStats: React.FC<Props> = ({ projects, clients: _clients, payments: _payments }) => {
  const { paid, unpaid } = countPaidUnpaid(projects);
  const totalBudget = projects.reduce((sum, p) => sum + (p.budget ?? 0), 0);
  const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm">
        <h5 className="text-sm font-medium text-neutral-500">Total Projects</h5>
        <p className="mt-1 text-2xl font-semibold text-black">{projects.length}</p>
      </div>
      <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm">
        <h5 className="text-sm font-medium text-neutral-500">Paid</h5>
        <p className="mt-1 text-2xl font-semibold text-black">{paid}</p>
      </div>
      <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm">
        <h5 className="text-sm font-medium text-neutral-500">Unpaid</h5>
        <p className="mt-1 text-2xl font-semibold text-black">{unpaid}</p>
      </div>
      <div className="p-6 bg-white border border-neutral-200 rounded-2xl shadow-sm">
        <h5 className="text-sm font-medium text-neutral-500">Total Budget</h5>
        <p className="mt-1 text-2xl font-semibold text-black">{fmt.format(totalBudget)}</p>
      </div>
    </div>
  );
};

