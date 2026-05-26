import React, { useState } from "react";

interface Props {
  onSubmit: (description: string) => Promise<void>;
  loading: boolean;
}

const TaskForm: React.FC<Props> = ({ onSubmit, loading }) => {
  const [description, setDescription] = useState(
    "检查最近 24 小时所有 Web 服务异常并给出修复建议"
  );

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!description.trim()) return;
    await onSubmit(description.trim());
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-slate-900/70 border border-slate-800 rounded-2xl p-4 md:p-5 shadow-xl shadow-slate-950/40"
    >
      <div className="flex justify-between items-center mb-3">
        <div>
          <h2 className="text-sm md:text-base font-semibold">
            New troubleshooting task
          </h2>
          <p className="text-xs md:text-sm text-slate-400">
            Describe what you want the ops agent to investigate.
          </p>
        </div>
        <span className="hidden md:inline text-[11px] uppercase tracking-[0.2em] text-slate-500">
          Planner → Infra → Security → Fix
        </span>
      </div>
      <div className="space-y-3">
        <textarea
          className="w-full min-h-[80px] bg-slate-950/70 border border-slate-700 rounded-xl px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-indigo-500/60 focus:border-indigo-500 resize-y"
          placeholder="e.g. 检查最近 24 小时 502 / TLS 异常，基于监控 + 日志 + 拓扑给出修复建议"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <div className="flex justify-between items-center gap-2">
          <span className="text-[11px] text-slate-500">
            建议写成自然语言目标，Agent 会自动拆解任务。
          </span>
          <button
            type="submit"
            disabled={loading}
            className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-indigo-500 hover:bg-indigo-400 disabled:opacity-60 text-xs font-semibold shadow shadow-indigo-500/30"
          >
            {loading && (
              <span className="h-3 w-3 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
            )}
            Run investigation
          </button>
        </div>
      </div>
    </form>
  );
};

export default TaskForm;
