import type React from "react";
import type { Payment, Project, Client } from "../models";

type Props = {
  payments: Payment[];
  projects: Project[];
  clients: Client[];
};

export const PaymentsList: React.FC<Props> = ({ payments, projects, clients }) => {
  const fmt = new Intl.NumberFormat(undefined, { style: "currency", currency: "USD", maximumFractionDigits: 0 });
  const getProject = (id: string) => projects.find((p) => p.id === id);
  const getClient = (id: string) => clients.find((c) => c.id === id);

  if (payments.length === 0) {
    return (
      <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm text-center text-neutral-400">
        No payments recorded yet.
      </div>
    );
  }

  return (
    <div className="overflow-x-auto bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm">
      <table className="min-w-full text-sm">
        <thead className="text-neutral-400">
          <tr>
            <th className="text-left px-4 py-3">Project</th>
            <th className="text-left px-4 py-3">Client</th>
            <th className="text-left px-4 py-3">Amount</th>
            <th className="text-left px-4 py-3">Date</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-neutral-800 text-neutral-200">
          {payments.map((pay) => {
            const proj = getProject(pay.projectId);
            const client = proj ? getClient(proj.clientId) : undefined;
            return (
              <tr key={pay.id} className="hover:bg-neutral-800/40">
                <td className="px-4 py-3">{proj ? proj.title : <em className="text-neutral-400">Project not found</em>}</td>
                <td className="px-4 py-3">{client ? client.name : <em className="text-neutral-400">Client not found</em>}</td>
                <td className="px-4 py-3 font-semibold">{fmt.format(pay.amount)}</td>
                <td className="px-4 py-3">{new Date(pay.date).toISOString()}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}
