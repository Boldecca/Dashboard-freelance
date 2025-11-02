// src/models/index.ts
export interface Client {
  id: string;
  name: string;
  email?: string;
  country?: string;
}

export interface Project {
  id: string;
  clientId: string;
  title: string;
  budget: number;
  status: "pending" | "in-progress" | "completed";
  paymentStatus: "paid" | "unpaid";
}

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  date: string;
}
