// Context.tsx
import React, { createContext, useContext, useReducer, ReactNode } from "react";
import { reducer } from "./reducer";
import { initialState as baseInitial } from "./actions";
import type { State, Action } from "./actions";
import type { Client, Project, Payment } from "../models";

// Example initial data (2 clients, 2 projects, 1 payment)
const nowISO = new Date().toISOString();
const seededState: State = {
  clients: [
    { id: "c1", name: "Acme Corp", country: "USA", email: "contact@acme.com" },
    { id: "c2", name: "Beta LLC", country: "Kenya" }, // email optional
  ],
  projects: [
    { id: "p1", clientId: "c1", title: "Website Redesign", budget: 3000, status: "in-progress", paymentStatus: "unpaid" },
    { id: "p2", clientId: "c2", title: "Mobile App", budget: 5000, status: "pending", paymentStatus: "paid" },
  ],
  payments: [{ projectId: "p2", amount: 5000, date: nowISO }],
};

type Dispatch = (action: Action) => void;

const GlobalStateContext = createContext<{ state: State; dispatch: Dispatch } | undefined>(undefined);

export const GlobalStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, seededState);
  return <GlobalStateContext.Provider value={{ state, dispatch }}>{children}</GlobalStateContext.Provider>;
};

export const useGlobalState = () => {
  const ctx = useContext(GlobalStateContext);
  if (!ctx) throw new Error("useGlobalState must be used within GlobalStateProvider");
  return ctx;
};
