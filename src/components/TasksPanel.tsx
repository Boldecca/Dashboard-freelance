import type React from "react";
import { useMemo, useState } from "react";
import type { Task, Client, Project } from "../models";

type Props = {
  tasks: Task[];
  onUpdateTaskStatus: (taskId: string, status: Task["status"]) => void;
  onAddTask: (task: Task) => void;
  clients: Client[];
  projects: Project[];
};

export const TasksPanel: React.FC<Props> = ({ tasks, onUpdateTaskStatus, onAddTask, clients, projects }) => {
  const [statusFilter, setStatusFilter] = useState<"all" | Task["status"]>("all");
  const [priorityFilter, setPriorityFilter] = useState<"all" | Task["priority"]>("all");
  const [query, setQuery] = useState("");
  const [newTitle, setNewTitle] = useState("");
  const [newClientId, setNewClientId] = useState<string>("");
  const [newProjectId, setNewProjectId] = useState<string>("");
  const [newStatus, setNewStatus] = useState<Task["status"]>("todo");
  const [newPriority, setNewPriority] = useState<Task["priority"]>("medium");

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

  const projectsForClient = useMemo(
    () => projects.filter((p) => (newClientId ? p.clientId === newClientId : true)),
    [projects, newClientId]
  );

  const handleAdd = () => {
    const pid = newProjectId || projectsForClient[0]?.id;
    if (!newTitle.trim() || !pid) return;
    const task: Task = {
      id: `task-${Date.now()}`,
      projectId: pid,
      title: newTitle.trim(),
      status: newStatus,
      priority: newPriority,
    };
    onAddTask(task);
    setNewTitle("");
    // keep client/project selections
  };

  return (
    <section className="space-y-4">
      <h2 className="text-lg font-semibold text-neutral-200">Tasks</h2>

      {/* Create Task */}
      <div className="p-4 bg-neutral-900 border border-neutral-800 rounded-xl shadow-sm">
        <div className="grid grid-cols-1 md:grid-cols-5 gap-3">
          <input
            className="md:col-span-2 px-3 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-200 placeholder-neutral-400 focus:outline-none focus:ring-2 focus:ring-white/10"
            placeholder="Task title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
          />
          <select
            className="px-3 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-200"
            value={newClientId}
            onChange={(e) => {
              setNewClientId(e.target.value);
              setNewProjectId("");
            }}
          >
            <option value="">All clients</option>
            {clients.map((c) => (
              <option key={c.id} value={c.id}>{c.name}</option>
            ))}
          </select>
          <select
            className="px-3 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-200"
            value={newProjectId}
            onChange={(e) => setNewProjectId(e.target.value)}
          >
            <option value="">Select project</option>
            {projectsForClient.map((p) => (
              <option key={p.id} value={p.id}>{p.title}</option>
            ))}
          </select>
          <div className="flex items-center gap-2">
            <select
              className="px-3 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-200"
              value={newStatus}
              onChange={(e) => setNewStatus(e.target.value as Task["status"]) }
            >
              <option value="todo">todo</option>
              <option value="in-progress">in-progress</option>
              <option value="done">done</option>
            </select>
            <select
              className="px-3 py-2 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-200"
              value={newPriority}
              onChange={(e) => setNewPriority(e.target.value as Task["priority"]) }
            >
              <option value="low">low</option>
              <option value="medium">medium</option>
              <option value="high">high</option>
            </select>
            <button
              onClick={handleAdd}
              className="px-3 py-2 rounded-md bg-white text-neutral-900 text-sm font-medium hover:bg-neutral-200 active:scale-[0.99] transition"
            >
              Add Task
            </button>
          </div>
        </div>
        <div className="mt-2 text-xs text-neutral-400">Tip: Select a client to narrow the project list. The task is linked to the selected project; client name comes from that project.</div>
      </div>

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
                <li key={t.id} className="flex items-center justify-between bg-neutral-800/50 border border-neutral-700 rounded-lg px-3 py-2 transition hover:border-neutral-600">
                  <div className="min-w-0">
                    <div className="font-medium text-neutral-200">{t.title}</div>
                    <div className="text-xs text-neutral-400">{t.priority}</div>
                  </div>
                  <div className="flex items-center gap-2 flex-shrink-0">
                    <span
                      className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium border transition-colors ${
                        t.status === "done"
                          ? "bg-emerald-900/40 text-emerald-300 border-emerald-800"
                          : t.status === "in-progress"
                          ? "bg-amber-900/40 text-amber-300 border-amber-800"
                          : "bg-neutral-900 text-neutral-300 border-neutral-700"
                      }`}
                    >
                      {t.status}
                    </span>
                    <select
                      className="px-2 py-1 rounded-md border border-neutral-700 bg-neutral-800 text-neutral-200 text-sm"
                      value={t.status}
                      onChange={(e) => onUpdateTaskStatus(t.id, e.target.value as Task["status"])}
                    >
                      <option value="todo">todo</option>
                      <option value="in-progress">in-progress</option>
                      <option value="done">done</option>
                    </select>
                  </div>
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
