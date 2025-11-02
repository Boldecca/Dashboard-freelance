// src/models/index.ts
export interface Client {
  id: string;
  name: string;
  email?: string;
}

export interface Project {
  id: string;
  clientId: string;
  name: string;
  status?: string;
}

export interface Payment {
  id: string;
  projectId: string;
  amount: number;
  date: string;
}
