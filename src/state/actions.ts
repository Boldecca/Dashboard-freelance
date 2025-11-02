// actions.ts
import type { Payment, Project, Client } from "../models";

export type State = {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
};

export const initialState: State = {
  clients: [],
  projects: [],
  payments: [],
};

// Discriminated union for actions
export type Action =
  | { type: "ADD_CLIENT"; payload: Client }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "ADD_PAYMENT"; payload: Payment }
  | { type: "MARK_PROJECT_PAID"; payload: { projectId: string; payment: Payment } }
  | { type: "UPDATE_PROJECT_STATUS"; payload: { projectId: string; status: Project["status"] } }
  | { type: "DELETE_PROJECT"; payload: { projectId: string } };
