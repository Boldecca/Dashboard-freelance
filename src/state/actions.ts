// src/state/actions.ts
import type { Client, Project, Payment } from "../models";

// --- State shape ---
export type State = {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
};

// --- Initial state ---
export const initialState: State = {
  clients: [],
  projects: [],
  payments: [],
};

// --- Actions ---
export type Action =
  | { type: "ADD_CLIENT"; payload: Client }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "ADD_PAYMENT"; payload: Payment };

// ✅ Export reducer here too
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_CLIENT":
      return { ...state, clients: [...state.clients, action.payload] };

    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };

    case "ADD_PAYMENT":
      return { ...state, payments: [...state.payments, action.payload] };

    default:
      return state;
  }
}
