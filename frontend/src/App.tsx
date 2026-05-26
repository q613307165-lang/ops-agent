import React, { useState } from "react";
import Layout from "./components/Layout";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";
import TaskDetail from "./components/TaskDetail";
import type { TaskStatus } from "./lib/types";
import { createTask } from "./lib/api";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<TaskStatus[]>([]);
  const [activeTaskId, setActiveTaskId] = useState<string | undefined>();
  const [loading, setLoading] = useState(false);

  const handleCreateTask = async (description: string) => {
    try {
      setLoading(true);
      const task = await createTask(description);
      setTasks((prev) => [task, ...prev]);
      setActiveTaskId(task.id);
    } catch (err) {
      console.error("Failed to create task", err);
      alert("Failed to create task, please check console or backend logs.");
    } finally {
      setLoading(false);
    }
  };

  const activeTask = tasks.find((t) => t.id === activeTaskId) ?? tasks[0];

  return (
    <Layout>
      <div className="space-y-4 md:space-y-6">
        <TaskForm onSubmit={handleCreateTask} loading={loading} />
        <div className="grid md:grid-cols-3 gap-4 md:gap-6">
          <div className="md:col-span-1">
            <TaskList
              tasks={tasks}
              activeId={activeTask?.id}
              onSelect={setActiveTaskId}
            />
          </div>
          <div className="md:col-span-2">
            <TaskDetail task={activeTask} />
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default App;
