import React from "react";
import type { TaskStatus, AgentStep, ActionSuggestion } from "../lib/types";

interface Props {
  task?: TaskStatus | null;
}

const roleColors: Record<string, string> = {
  planner: "text-sky-300 bg-sky-900/40 border-sky-700/60",
  infra: "text-emerald-300 bg-emerald-900/30 border-emerald-700/60",
  security: "text-rose-300 bg-rose-900/30 border-rose-700/60",
  aggregator: "text-amber-200 bg-amber-900/40 border-amber-700/60",
  fix: "text-indigo-200 bg-indigo-900/40 border-indigo-700/60"
};

const TaskDetail: React.FC<Props> = ({ task }) => {
  if (!task) {
    return (
      <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 md:p-5 flex items-center justify-center text-sm text-slate-500">
        Select a task to inspect the multi-agent trace and suggested actions.
      </div>
    );
  }

  const { steps, actions, description } = task;

  return (
    <div className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 md:p-5 space-y-4">
      <div>
        <div className="text-xs uppercase tracking-[0.18em] text-slate-500 mb-1">
          Task
        </div>
        <p className="text-sm md:text-base text-slate-100">{description}</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4">
        <div className="md:col-span-2 space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">Agent trace</h3>
            <span className="text-[11px] text-slate-500">
              {steps.length} step{steps.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="space-y-2">
            {steps.map((s: AgentStep, idx) => {
              const color =
                roleColors[s.role] ?? "text-slate-200 bg-slate-800/60 border-slate-700";
              return (
                <div
                  key={idx}
                  className={`border rounded-xl px-3 py-2 text-xs md:text-sm flex gap-3 items-start ${color}`}
                >
                  <div className="flex flex-col items-center pt-0.5">
                    <div className="h-2 w-2 rounded-full bg-slate-950/90" />
                    {idx < steps.length - 1 && (
                      <div className="flex-1 w-px bg-slate-700/80 mt-1" />
                    )}
                  </div>
                  <div className="flex-1 space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="font-semibold">
                        {s.role.toUpperCase()} · {s.agent}
                      </span>
                      <span className="text-[11px] text-slate-300">
                        step {idx + 1}
                      </span>
                    </div>
                    {s.output && (
                      <pre className="text-[11px] text-slate-200/90 bg-slate-950/30 rounded-lg px-2 py-1 overflow-x-auto">
                        {JSON.stringify(s.output, null, 2)}
                      </pre>
                    )}
                  </div>
                </div>
              );
            })}
            {steps.length === 0 && (
              <div className="text-xs text-slate-500 italic">
                No agent trace available for this task.
              </div>
            )}
          </div>
        </div>

        <div className="space-y-3">
          <div className="flex justify-between items-center">
            <h3 className="text-sm font-semibold">Suggested actions</h3>
            <span className="text-[11px] text-slate-500">
              {actions.length} item{actions.length === 1 ? "" : "s"}
            </span>
          </div>
          <div className="space-y-2">
            {actions.map((a: ActionSuggestion) => (
              <div
                key={a.id}
                className="border border-slate-700 rounded-xl px-3 py-2 bg-slate-950/60 text-xs md:text-sm space-y-1"
              >
                <div className="flex justify-between items-center gap-2">
                  <span className="font-semibold text-slate-100">{a.title}</span>
                  <span
                    className={`inline-flex items-center px-2 py-0.5 rounded-full text-[11px] ${
                      a.risk_level === "low"
                        ? "bg-emerald-500/20 text-emerald-300 border border-emerald-500/40"
                        : a.risk_level === "high"
                        ? "bg-rose-500/20 text-rose-300 border border-rose-500/40"
                        : "bg-amber-500/20 text-amber-200 border border-amber-500/40"
                    }`}
                  >
                    {a.risk_level} risk
                  </span>
                </div>
                {a.command && (
                  <pre className="mt-1 bg-slate-900/80 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-200 overflow-x-auto">
                    {a.command}
                  </pre>
                )}
                {a.config_diff && (
                  <pre className="mt-1 bg-slate-900/80 border border-slate-700 rounded-lg px-2 py-1 text-[11px] text-slate-200 overflow-x-auto">
                    {a.config_diff}
                  </pre>
                )}
                <p className="text-[11px] text-slate-300">{a.rationale}</p>
                <button className="mt-1 inline-flex items-center justify-center px-2.5 py-1 rounded-full bg-indigo-500/80 hover:bg-indigo-400 text-[11px] font-medium">
                  Copy command
                </button>
              </div>
            ))}
            {actions.length === 0 && (
              <div className="text-xs text-slate-500 italic">
                No actions generated. Check the trace for context or rerun with
                a different prompt.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TaskDetail;
