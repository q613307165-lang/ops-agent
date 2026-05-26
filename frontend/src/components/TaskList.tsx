import React from "react";
import type { TaskStatus } from "../lib/types";

interface Props {
  tasks: TaskStatus[];
  activeId?: string;
  onSelect: (taskId: string) => void;
}

const statusColors: Record<string, string> = {
  pending: "bg-slate-500",
  running: "bg-amber-400",
  completed: "bg-emerald-400",
  failed: "bg-rose-500"
};

const TaskList: React.FC<Props> = ({ tasks, activeId, onSelect }) => {
  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-3 md:p-4">
      <div className="flex justify-between items-center mb-2">
        <h3 className="text-sm font-semibold">Recent tasks</h3>
        <span className="text-[11px] text-slate-500">
          {tasks.length} session{tasks.length === 1 ? "" : "s"}
        </span>
      </div>
      <div className="space-y-2 max-h-[260px] overflow-y-auto pr-1">
        {tasks.map((t) => (
          <button
            key={t.id}
            onClick={() => onSelect(t.id)}
            className={`w-full text-left px-3 py-2 rounded-xl text-xs md:text-sm border transition ${
              t.id === activeId
                ? "border-indigo-500 bg-slate-900"
                : "border-slate-800 bg-slate-950/60 hover:bg-slate-900/80"
            }`}
          >
            <div className="flex items-center justify-between gap-2 mb-1">
              <span className="line-clamp-1">{t.description}</span>
              <span
                className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] ${
                  statusColors[t.status] ?? "bg-slate-600"
                } text-slate-950`}
              >
                <span className="h-1.5 w-1.5 rounded-full bg-slate-950/80" />
                {t.status}
              </span>
            </div>
            {t.error && (
              <div className="text-[11px] text-rose-400 line-clamp-1">
                {t.error}
              </div>
            )}
          </button>
        ))}
        {tasks.length === 0 && (
          <div className="text-xs text-slate-500 italic">
            No tasks yet. Start by running an investigation.
          </div>
        )}
      </div>
    </div>
  );
};

export default TaskList;
