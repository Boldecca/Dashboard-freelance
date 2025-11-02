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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      <div className="p-5 bg-white border rounded-xl shadow-sm">
        <h5 className="text-sm font-medium text-slate-500">Total Clients</h5>
        <p className="mt-1 text-2xl font-semibold">{clients.length}</p>
      </div>
      <div className="p-5 bg-white border rounded-xl shadow-sm">
        <h5 className="text-sm font-medium text-slate-500">Total Projects</h5>
        <p className="mt-1 text-2xl font-semibold">{projects.length}</p>
      </div>
      <div className="p-5 bg-white border rounded-xl shadow-sm">
        <h5 className="text-sm font-medium text-slate-500">Payments</h5>
        <p className="mt-1 text-2xl font-semibold">{payments.length}</p>
        <p className="mt-1 text-sm text-slate-500">Paid projects: {paid}</p>
      </div>
      <div className="p-5 bg-white border rounded-xl shadow-sm">
        <h5 className="text-sm font-medium text-slate-500">Unpaid Projects</h5>
        <p className="mt-1 text-2xl font-semibold">{unpaid}</p>
      </div>
    </div>
  );
};

