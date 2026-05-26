import axios from "axios";
import type { TaskStatus } from "./types";

const API_BASE = import.meta.env.VITE_API_BASE ?? "http://localhost:8000";

export async function createTask(description: string, targets?: string[]): Promise<TaskStatus> {
  const res = await axios.post<TaskStatus>(`${API_BASE}/tasks`, {
    description,
    targets: targets && targets.length > 0 ? targets : undefined
  });
  return res.data;
}

export async function fetchTask(taskId: string): Promise<TaskStatus> {
  const res = await axios.get<TaskStatus>(`${API_BASE}/tasks/${taskId}`);
  return res.data;
}
