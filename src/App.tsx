// src/App.tsx
import { StateProvider, useAppState } from "./state/context";
import { DashboardStats } from "./components/DashboardStats";
import { ProjectList } from "./components/ProjectList";
import { validateAndCreatePayment } from "./utils";

function DashboardContent() {
  const { state, dispatch } = useAppState();

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

  return (
    <div className="min-h-screen bg-neutral-950 text-neutral-100">
      <header className="border-b border-neutral-800 bg-neutral-950/70 backdrop-blur supports-[backdrop-filter]:bg-neutral-950/60">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-3xl font-semibold tracking-tight">Freelance Dashboard</h1>
          <p className="mt-1 text-sm text-neutral-400">Manage your clients, projects, and payments</p>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-8 space-y-8">
        <section>
          <h2 className="text-lg font-semibold mb-4 text-neutral-200">Overview</h2>
          <DashboardStats projects={state.projects} clients={state.clients} payments={state.payments} />
        </section>
        <section>
          <h2 className="text-lg font-semibold mb-4 text-neutral-200">Projects</h2>
          <ProjectList
            projects={state.projects}
            clients={state.clients}
            onMarkPaid={onMarkPaid}
            onChangeStatus={onChangeStatus}
          />
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
