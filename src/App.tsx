// src/App.tsx
import { useState } from "react";
import { StateProvider, useAppState } from "./state/context";
import { DashboardStats } from "./components/DashboardStats";
import { ProjectList } from "./components/ProjectList";
import { validateAndCreatePayment } from "./utils";
import { searchByName } from "./utils";
import { type Client } from "./models";
import { TasksPanel } from "./components/TasksPanel";

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

  const onUpdateTaskStatus = (taskId: string, status: import("./models").Task["status"]) => {
    dispatch({ type: "UPDATE_TASK_STATUS", payload: { taskId, status } });
  };

  const handleAddProject = () => {
    // Ensure at least one client exists
    let clientId = state.clients[0]?.id;
    if (!clientId) {
      clientId = `client-${Date.now()}`;
      const newClient: Client = { id: clientId, name: "New Client", email: "contact@example.com", country: "USA" };
      dispatch({ type: "ADD_CLIENT", payload: newClient });
    }
    const projectId = `proj-${Date.now()}`;
    const newProject = {
      id: projectId,
      clientId,
      title: "New Project",
      budget: 5000,
      status: "pending" as const,
      paymentStatus: "unpaid" as const,
    };
    dispatch({ type: "ADD_PROJECT", payload: newProject });
  };

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-neutral-800 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-semibold tracking-tight">Freelance Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-400">Manage your clients, projects, and payments</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-10">
        <section>
          <h2 className="text-lg font-semibold mb-4 text-neutral-200">Overview</h2>
          <DashboardStats projects={state.projects} clients={state.clients} payments={state.payments} />
        </section>

        <section className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          <div>
            <h2 className="text-lg font-semibold mb-3 text-neutral-200">Clients</h2>
            <input
              className="w-full mb-4 px-4 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/10"
              placeholder="Search clients..."
              value={clientsQuery}
              onChange={(e) => setClientsQuery(e.target.value)}
            />
            <div className="space-y-4">
              {filteredClients.map((c) => (
                <div key={c.id} className="p-5 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm transition hover:shadow-md hover:shadow-black/30">
                  <h3 className="font-medium text-neutral-100">{c.name}</h3>
                  <div className="mt-3 text-sm text-neutral-400">
                    <div className="mb-2">
                      <div className="text-neutral-500">Country:</div>
                      <div className="text-neutral-200">{c.country ?? "—"}</div>
                    </div>
                    <div>
                      <div className="text-neutral-500">Email:</div>
                      <div className="text-neutral-200">{c.email ?? "—"}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div>
            <div className="flex items-center justify-between mb-3">
              <h2 className="text-lg font-semibold text-neutral-200">Projects</h2>
              <button
                onClick={handleAddProject}
                className="inline-flex items-center gap-2 px-3 py-2 rounded-md bg-white text-neutral-900 text-sm font-medium border border-white/10 hover:bg-neutral-200 active:scale-[0.99] transition"
              >
                <span className="text-lg leading-none">+</span>
                New Project
              </button>
            </div>
            <input
              className="w-full mb-4 px-4 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/10"
              placeholder="Search projects..."
              value={projectsQuery}
              onChange={(e) => setProjectsQuery(e.target.value)}
            />

            {filteredProjects.length === 0 ? (
              <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-2xl shadow-sm text-center text-neutral-400">
                <div>No projects yet. Create one to get started!</div>
                <button
                  onClick={handleAddProject}
                  className="mt-4 inline-flex items-center gap-2 px-4 py-2 rounded-md bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-200 transition"
                >
                  <span className="text-lg leading-none">+</span>
                  New Project
                </button>
              </div>
            ) : (
              <ProjectList
                projects={filteredProjects}
                clients={state.clients}
                onMarkPaid={onMarkPaid}
                onChangeStatus={onChangeStatus}
              />
            )}
          </div>
        </section>

        <TasksPanel tasks={state.tasks} onUpdateTaskStatus={onUpdateTaskStatus} />
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
