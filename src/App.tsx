// App.tsx
import React from "react";
import { GlobalStateProvider, useGlobalState } from "./state/Context";
import { DashboardStats } from "./components/DashboardStats";
import { ProjectList } from "./components/ProjectList";
import { ClientCard } from "./components/ClientCard";
import { validateAndCreatePayment } from "./utils";

const AppInner = () => {
  const { state, dispatch } = useGlobalState();

  const handleMarkPaid = (projectId: string) => {
    try {
      // Basic validation + payment creation (example uses full project budget as payment)
      const project = state.projects.find((p) => p.id === projectId);
      if (!project) {
        alert("Project not found");
        return;
      }
      const payment = validateAndCreatePayment(projectId, project.budget);
      dispatch({ type: "MARK_PROJECT_PAID", payload: { projectId, payment } });
    } catch (err: any) {
      alert("Payment error: " + err.message);
    }
  };

  const handleChangeStatus = (projectId: string, status: any) => {
    dispatch({ type: "UPDATE_PROJECT_STATUS", payload: { projectId, status } });
  };

  return (
    <div className="p-6 max-w-5xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Freelance Management Dashboard</h1>

      <section className="mb-6">
        <DashboardStats projects={state.projects} clients={state.clients} payments={state.payments} />
      </section>

      <section className="mb-6 grid grid-cols-2 gap-6">
        <div>
          <h2 className="text-xl font-semibold mb-2">Clients</h2>
          <div className="space-y-3">
            {state.clients.map((c) => (
              <ClientCard key={c.id} client={c} />
            ))}
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-2">Projects</h2>
          <ProjectList
            projects={state.projects}
            clients={state.clients}
            onMarkPaid={handleMarkPaid}
            onChangeStatus={handleChangeStatus}
          />
        </div>
      </section>

      <section>
        <h2 className="text-lg font-semibold mb-2">Payments</h2>
        <table className="w-full border-collapse">
          <thead>
            <tr>
              <th className="text-left">Project ID</th>
              <th className="text-left">Amount</th>
              <th className="text-left">Date</th>
            </tr>
          </thead>
          <tbody>
            {state.payments.map((p, idx) => (
              <tr key={idx}>
                <td>{p.projectId}</td>
                <td>${p.amount}</td>
                <td>{p.date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </div>
  );
};

export const App = () => (
  <GlobalStateProvider>
    <AppInner />
  </GlobalStateProvider>
);

export default App;
