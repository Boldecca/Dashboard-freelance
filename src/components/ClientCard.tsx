// ClientCard.tsx
import type React from "react";
import type { Client } from "../models";

type Props = {
  client: Client;
};

export const ClientCard: React.FC<Props> = ({ client }) => {
  return (
    <div className="p-4 bg-white border rounded-xl shadow-sm">
      <h3 className="font-semibold tracking-tight">{client.name}</h3>
      <div className="mt-1 text-sm text-slate-600">
        <p>{client.country ?? <span className="italic text-slate-400">No country</span>}</p>
        <p>{client.email ?? <em className="text-slate-400">No email provided</em>}</p>
      </div>
      <div className="mt-2 text-xs text-slate-400">ID: {client.id}</div>
    </div>
  );
};
