// src/state/actions.ts
import type { Client, Project, Payment, Task } from "../models";

// --- State shape ---
export type State = {
  clients: Client[];
  projects: Project[];
  payments: Payment[];
  tasks: Task[];
};

// --- Initial state ---
export const initialState: State = {
  clients: [
    { id: "c-1", name: "Tech Startup Inc", country: "USA", email: "contact@techstartup.com" },
    { id: "c-2", name: "Design Studio Co", country: "Canada", email: "hello@designstudio.ca" },
  ],
  projects: [
    { id: "p-1", clientId: "c-1", title: "E-commerce Platform", budget: 15000, status: "in-progress", paymentStatus: "unpaid" },
    { id: "p-2", clientId: "c-2", title: "Brand Identity Design", budget: 5000, status: "completed", paymentStatus: "paid" },
  ],
  payments: [
    { id: "pay-1", projectId: "p-2", amount: 5000, date: new Date().toISOString() },
  ],
  tasks: [],
};

// --- Actions ---
export type Action =
  | { type: "ADD_CLIENT"; payload: Client }
  | { type: "ADD_PROJECT"; payload: Project }
  | { type: "ADD_PAYMENT"; payload: Payment }
  | { type: "UPDATE_PROJECT_STATUS"; payload: { projectId: string; status: Project["status"] } }
  | { type: "MARK_PROJECT_PAID"; payload: { projectId: string } }
  | { type: "ADD_TASK"; payload: Task }
  | { type: "UPDATE_TASK_STATUS"; payload: { taskId: string; status: Task["status"] } };

// ✅ Export reducer here too
export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_CLIENT":
      return { ...state, clients: [...state.clients, action.payload] };

    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };

    case "ADD_PAYMENT":
      return { ...state, payments: [...state.payments, action.payload] };

    case "UPDATE_PROJECT_STATUS":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.projectId ? { ...p, status: action.payload.status } : p
        ),
      };

    case "MARK_PROJECT_PAID":
      return {
        ...state,
        projects: state.projects.map((p) =>
          p.id === action.payload.projectId ? { ...p, paymentStatus: "paid" } : p
        ),
      };

    case "ADD_TASK":
      return { ...state, tasks: [...state.tasks, action.payload] };

    case "UPDATE_TASK_STATUS":
      return {
        ...state,
        tasks: state.tasks.map((t) =>
          t.id === action.payload.taskId ? { ...t, status: action.payload.status } : t
        ),
      };

    default:
      return state;
  }
}
