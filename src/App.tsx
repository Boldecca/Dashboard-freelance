// src/App.tsx
import React from "react";
import { StateProvider } from "./state/context";
import { DashboardStats } from "./components/DashboardStats";
import { ProjectList } from "./components/ProjectList";

function App() {
  return (
    <StateProvider>
      <div className="App p-4">
        <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
        <DashboardStats />
        <ProjectList />
      </div>
    </StateProvider>
  );
}

export default App;
