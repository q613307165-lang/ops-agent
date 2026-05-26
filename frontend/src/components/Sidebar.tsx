import React from "react";

const Sidebar: React.FC = () => {
  return (
    <aside className="w-64 bg-slate-950 border-r border-slate-800 hidden md:flex flex-col">
      <div className="h-16 flex items-center px-6 border-b border-slate-800">
        <span className="text-lg font-semibold tracking-tight">
          <span className="text-indigo-400">Ops</span> Agent
        </span>
      </div>
      <nav className="flex-1 px-4 py-4 space-y-2 text-sm">
        <div className="text-slate-400 uppercase tracking-[0.16em] text-[11px] px-2">
          Console
        </div>
        <button className="w-full text-left px-2 py-2 rounded-lg bg-slate-900 text-slate-100 font-medium flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Troubleshooting
        </button>
        <button className="w-full text-left px-2 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-slate-100">
          History
        </button>
        <button className="w-full text-left px-2 py-2 rounded-lg text-slate-400 hover:bg-slate-900 hover:text-slate-100">
          Settings
        </button>
      </nav>
      <div className="px-4 py-4 border-t border-slate-800 text-xs text-slate-500">
        <div className="flex items-center justify-between">
          <span>Env</span>
          <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-slate-900">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400" />
            dev
          </span>
        </div>
      </div>
    </aside>
  );
};

export default Sidebar;
