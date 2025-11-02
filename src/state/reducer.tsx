// reducer.tsx
import { State, initialState, Action } from "./actions";
import type { Project } from "../models";

export function reducer(state: State, action: Action): State {
  switch (action.type) {
    case "ADD_CLIENT":
      return { ...state, clients: [...state.clients, action.payload] };

    case "ADD_PROJECT":
      return { ...state, projects: [...state.projects, action.payload] };

    case "ADD_PAYMENT": {
      const payment = action.payload;
      // Mark project as paid if exists
      const projects = state.projects.map((p) =>
        p.id === payment.projectId ? { ...p, paymentStatus: "paid" } : p
      );
      return { ...state, payments: [...state.payments, payment], projects };
    }

    case "MARK_PROJECT_PAID": {
      const { projectId, payment } = action.payload;
      const exists = state.projects.some((p) => p.id === projectId);
      if (!exists) return state;
      const projects = state.projects.map((p) =>
        p.id === projectId ? { ...p, paymentStatus: "paid" } : p
      );
      return { ...state, projects, payments: [...state.payments, payment] };
    }

    case "UPDATE_PROJECT_STATUS": {
      const { projectId, status } = action.payload;
      return {
        ...state,
        projects: state.projects.map((p) => (p.id === projectId ? { ...p, status } : p)),
      };
    }

    case "DELETE_PROJECT":
      return {
        ...state,
        projects: state.projects.filter((p) => p.id !== action.payload.projectId),
        payments: state.payments.filter((pay) => pay.projectId !== action.payload.projectId),
      };

    default:
      return state;
  }
}
