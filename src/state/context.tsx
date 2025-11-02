// src/state/context.tsx
import { createContext, useReducer, useContext, type ReactNode, type Dispatch } from "react";
import { type State, initialState, type Action, reducer } from "./actions";
interface AppStateContextType {
  state: State;
  dispatch: Dispatch<Action>;
}

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export function StateProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
}

export function useAppState() {
  const context = useContext(AppStateContext);
  if (!context) throw new Error("useAppState must be used within a StateProvider");
  return context;
}
