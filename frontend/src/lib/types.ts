export type AgentRole = "planner" | "infra" | "security" | "fix" | "aggregator";

export interface AgentStep {
  agent: string;
  role: AgentRole;
  input: Record<string, unknown>;
  output?: Record<string, unknown> | null;
}

export type RiskLevel = "low" | "medium" | "high";

export interface ActionSuggestion {
  id: string;
  title: string;
  command?: string | null;
  config_diff?: string | null;
  risk_level: RiskLevel;
  rationale: string;
}

export type TaskStatusValue = "pending" | "running" | "completed" | "failed";

export interface TaskStatus {
  id: string;
  description: string;
  status: TaskStatusValue;
  steps: AgentStep[];
  actions: ActionSuggestion[];
  error?: string | null;
}
