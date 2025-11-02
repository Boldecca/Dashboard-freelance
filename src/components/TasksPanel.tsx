import type React from "react";
import { useState } from "react";
import type { Task } from "../models";

type Props = {
  tasks: Task[];
  onUpdateTaskStatus: (taskId: string, status: Task["status"]) => void;
};

export const TasksPanel: React.FC<Props> = ({ tasks, onUpdateTaskStatus }) => {
  const [statusFilter, setStatusFilter] = useState<"all" | Task["status"]>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | Task["priority"]>("all");
  const [query, setQuery] = useState("");

  const totals = {
    total: tasks.length,
    todo: tasks.filter((t) => t.status === "todo").length,
    inProgress: tasks.filter((t) => t.status === "in-progress").length,
    done: tasks.filter((t) => t.status === "done").length,
    high: tasks.filter((t) => t.priority === "high").length,
  };

  const filtered = tasks.filter((t) => {
    if (statusFilter !== "all" && t.status !== statusFilter) return false;
    if (priorityFilter !== "all" && t.priority !== priorityFilter) return false;
    if (query && !t.title.toLowerCase().includes(query.toLowerCase())) return false;
    return true;
  });

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-neutral-200">Tasks</h2>

      <div className="grid grid-cols-1 sm:grid-cols-3 lg:grid-cols-5 gap-3">
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm">
          <div className="text-sm text-neutral-400">Total Tasks</div>
          <div className="mt-1 text-2xl font-semibold">{totals.total}</div>
        </div>
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm">
          <div className="text-sm text-blue-300">To Do</div>
          <div className="mt-1 text-2xl font-semibold">{totals.todo}</div>
        </div>
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm">
          <div className="text-sm text-amber-300">In Progress</div>
          <div className="mt-1 text-2xl font-semibold">{totals.inProgress}</div>
        </div>
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm">
          <div className="text-sm text-emerald-300">Done</div>
          <div className="mt-1 text-2xl font-semibold">{totals.done}</div>
        </div>
        <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm">
          <div className="text-sm text-rose-300">High</div>
          <div className="mt-1 text-2xl font-semibold">{totals.high}</div>
        </div>
      </div>

      <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm">
        <div className="flex flex-wrap items-center gap-2">
          <div className="text-sm text-neutral-300">Status</div>
          {(["all", "todo", "in-progress", "done"] as const).map((s) => (
            <button
              key={s}
              onClick={() => setStatusFilter(s)}
              className={`px-3 py-1 rounded-md text-sm border transition-colors ${
                statusFilter === s
                  ? "bg-white text-neutral-900 border-white"
                  : "bg-neutral-900 text-neutral-300 border-neutral-700 hover:bg-neutral-800"
              }`}
            >
              {s === "all" ? "All" : s.replace("-", " ")}
            </button>
          ))}
        </div>
        <div className="mt-3 flex flex-wrap items-center gap-2">
          <div className="text-sm text-neutral-300">Priority</div>
          {(["all", "low", "medium", "high"] as const).map((p) => (
            <button
              key={p}
              onClick={() => setPriorityFilter(p)}
              className={`px-3 py-1 rounded-md text-sm border transition-colors ${
                priorityFilter === p
                  ? "bg-white text-neutral-900 border-white"
                  : "bg-neutral-900 text-neutral-300 border-neutral-700 hover:bg-neutral-800"
              }`}
            >
              {p.charAt(0).toUpperCase() + p.slice(1)}
            </button>
          ))}
        </div>
        <div className="mt-3">
          <input
            className="w-full px-3 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/10"
            placeholder="Search tasks..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm min-h-[140px] flex items-center justify-center text-neutral-400">
          {filtered.length === 0 ? "No tasks match your filters" : (
            <ul className="w-full space-y-2">
              {filtered.map((t) => (
                <li key={t.id} className="flex items-center justify-between bg-neutral-800/50 border border-neutral-700 rounded-lg px-3 py-2">
                  <div>
                    <div className="font-medium text-neutral-200">{t.title}</div>
                    <div className="text-xs text-neutral-400">{t.priority}</div>
                  </div>
                  <select
                    className="px-2 py-1 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-200 text-sm"
                    value={t.status}
                    onChange={(e) => onUpdateTaskStatus(t.id, e.target.value as Task["status"])}
                  >
                    <option value="todo">todo</option>
                    <option value="in-progress">in-progress</option>
                    <option value="done">done</option>
                  </select>
                </li>
              ))}
            </ul>
          )}
        </div>
        <div className="p-6 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm min-h-[140px] flex items-center justify-center text-neutral-400">
          Select a task to view details
        </div>
      </div>
    </section>
  );
}
