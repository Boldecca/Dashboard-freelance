// utils.ts
import type { Project, Client, Payment } from "./models";

/** Count paid vs unpaid projects */
export function countPaidUnpaid(projects: Project[]) {
  return projects.reduce(
    (acc, p) => {
      if (p.paymentStatus === "paid") acc.paid++;
      else acc.unpaid++;
      return acc;
    },
    { paid: 0, unpaid: 0 }
  );
}

/** Safe client lookup by ID with narrowing */
export function findClientById(clients: Client[], id?: string | null): Client | undefined {
  if (!id) return undefined;
  return clients.find((c) => c.id === id);
}

/** Validate & record a new payment (returns Payment or throws) */
export function validateAndCreatePayment(projectId: string, amount: number): Payment {
  if (!projectId || typeof projectId !== "string") throw new Error("Invalid projectId");
  if (typeof amount !== "number" || amount <= 0) throw new Error("Amount must be > 0");
  const payment: Payment = { projectId, amount, date: new Date().toISOString() };
  return payment;
}

/** Filter projects by status or payment state */
export function filterProjects(
  projects: Project[],
  opts?: { status?: Project["status"]; paymentStatus?: Project["paymentStatus"] }
) {
  return projects.filter((p) => {
    if (opts?.status && p.status !== opts.status) return false;
    if (opts?.paymentStatus && p.paymentStatus !== opts.paymentStatus) return false;
    return true;
  });
}

/** Search clients or projects by name/title */
export function searchByName<T extends { name?: string; title?: string }>(items: T[], q: string) {
  const normalized = q.trim().toLowerCase();
  if (!normalized) return items;
  return items.filter((it) => ((it.name ?? it.title) ?? "").toLowerCase().includes(normalized));
}
