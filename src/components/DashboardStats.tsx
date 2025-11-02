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
    <div className="grid grid-cols-3 gap-4">
      <div className="p-3 border rounded">
        <h5 className="font-semibold">Total Clients</h5>
        <p>{clients.length}</p>
      </div>
      <div className="p-3 border rounded">
        <h5 className="font-semibold">Total Projects</h5>
        <p>{projects.length}</p>
      </div>
      <div className="p-3 border rounded">
        <h5 className="font-semibold">Payments</h5>
        <p>Total: {payments.length} (Paid projects: {paid}, Unpaid: {unpaid})</p>
      </div>
    </div>
  );
};

