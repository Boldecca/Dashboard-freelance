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
    <div className="min-h-screen bg-slate-50 text-slate-900">
      <header className="border-b bg-white/70 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="max-w-6xl mx-auto px-4 py-4">
          <h1 className="text-2xl font-semibold tracking-tight">Freelance Dashboard</h1>
        </div>
      </header>
      <main className="max-w-6xl mx-auto px-4 py-6 space-y-6">
        <DashboardStats projects={state.projects} clients={state.clients} payments={state.payments} />
        <section>
          <h2 className="text-lg font-semibold mb-3">Projects</h2>
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
