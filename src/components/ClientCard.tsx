// ClientCard.tsx
import type React from "react";
import type { Client } from "../models";

type Props = {
  client: Client;
};

export const ClientCard: React.FC<Props> = ({ client }) => {
  return (
    <div className="p-3 border rounded">
      <h3 className="font-semibold">{client.name}</h3>
      <p>{client.country}</p>
      <p>{client.email ?? <em>No email provided</em>}</p>
      <small className="text-sm text-gray-500">ID: {client.id}</small>
    </div>
  );
};
