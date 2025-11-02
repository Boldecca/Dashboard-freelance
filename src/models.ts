// models.ts
export interface Client {
  id: string;
  name: string;
  country: string;
  email?: string;
}

export type ProjectStatus = "pending" | "in-progress" | "completed";
export type PaymentState = "paid" | "unpaid";

export interface Project {
  id: string;
  clientId: string;
  title: string;
  budget: number;
  status: ProjectStatus;
  paymentStatus: PaymentState;
}

export interface Payment {
  projectId: string;
  amount: number;
  date: string; // ISO
}
