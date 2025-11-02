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
    <div className="App p-4">
      <h1 className="text-2xl font-bold mb-4">Dashboard</h1>
      <DashboardStats projects={state.projects} clients={state.clients} payments={state.payments} />
      <ProjectList
        projects={state.projects}
        clients={state.clients}
        onMarkPaid={onMarkPaid}
        onChangeStatus={onChangeStatus}
      />
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
