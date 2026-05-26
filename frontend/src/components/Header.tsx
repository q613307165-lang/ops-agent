import React from "react";

const Header: React.FC = () => {
  return (
    <header className="h-16 border-b border-slate-800 flex items-center px-4 md:px-6 justify-between bg-slate-950/70 backdrop-blur">
      <div className="flex flex-col">
        <h1 className="text-base md:text-lg font-semibold">
          Operations Assistant
        </h1>
        <p className="text-xs md:text-sm text-slate-400">
          Multi-agent orchestration for real-world ops workflows
        </p>
      </div>
      <div className="flex items-center gap-3 text-xs md:text-sm">
        <span className="text-slate-400 hidden sm:inline">Model</span>
        <span className="px-2 py-1 rounded-full bg-slate-900 text-slate-100 border border-slate-700">
          LLM Orchestrated
        </span>
      </div>
    </header>
  );
};

export default Header;
