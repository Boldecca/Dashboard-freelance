// src/state/reducer.tsx
import type { State, Action } from "./actions";

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
