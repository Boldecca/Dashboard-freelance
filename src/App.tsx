// src/App.tsx
import { useState } from "react";
import { StateProvider, useAppState } from "./state/context";
import { DashboardStats } from "./components/DashboardStats";
import { ProjectList } from "./components/ProjectList";
import { validateAndCreatePayment } from "./utils";
import { searchByName } from "./utils";
import { type Client } from "./models";

function DashboardContent() {
  const { state, dispatch } = useAppState();
  const [clientsQuery, setClientsQuery] = useState("");
  const [projectsQuery, setProjectsQuery] = useState("");

  const onChangeStatus = (projectId: string, status: import("./models").Project["status"]) => {
    dispatch({ type: "UPDATE_PROJECT_STATUS", payload: { projectId, status } });
  };

  const onMarkPaid = (projectId: string) => {
    const project = state.projects.find((p) => p.id === projectId);
    if (!project) return;
    const payment = validateAndCreatePayment(projectId, project.budget);
    dispatch({ type: "ADD_PAYMENT", payload: payment });
    dispatch({ type: "MARK_PROJECT_PAID", payload: { projectId } });
  };

  const filteredClients = searchByName<Client>(state.clients, clientsQuery);
  const filteredProjects = searchByName(state.projects, projectsQuery);

  return (
    <div className="min-h-screen bg-white text-black">
      <header className="border-b border-neutral-200 bg-white">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-semibold tracking-tight">Freelance Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-500">Manage your clients, projects, and payments</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4">Overview</h2>
          <DashboardStats projects={state.projects} clients={state.clients} payments={state.payments} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-lg font-semibold mb-3">Clients</h2>
            <input
              className="w-full mb-4 px-4 py-2 rounded-md border border-neutral-300 bg-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Search clients..."
              value={clientsQuery}
              onChange={(e) => setClientsQuery(e.target.value)}
            />
            <div className="space-y-4">
              {filteredClients.map((c) => (
                <div key={c.id} className="p-5 bg-white border border-neutral-200 rounded-2xl shadow-sm">
                  <h3 className="font-medium">{c.name}</h3>
                  <div className="mt-3 text-sm text-neutral-500">
                    <div className="mb-2">
                      <div className="text-neutral-400">Country:</div>
                      <div className="text-black">{c.country ?? "—"}</div>
                    </div>
                    <div>
                      <div className="text-neutral-400">Email:</div>
                      <div className="text-black">{c.email ?? "—"}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <h2 className="text-lg font-semibold mb-3">Projects</h2>
            <input
              className="w-full mb-4 px-4 py-2 rounded-md border border-neutral-300 bg-white placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-black/10"
              placeholder="Search projects..."
              value={projectsQuery}
              onChange={(e) => setProjectsQuery(e.target.value)}
            />
            <ProjectList
              projects={filteredProjects}
              clients={state.clients}
              onMarkPaid={onMarkPaid}
              onChangeStatus={onChangeStatus}
            />
          </div>
        </section>
      </main>
    </div>
  );
}

function App() {
  return (
    <StateProvider>
      <DashboardContent />
    </StateProvider>
  );
}

export default App;
