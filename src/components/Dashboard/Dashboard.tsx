import { useEffect, useState } from "react";
import type { Task } from "../../types";
import type { TaskStatus } from "../../types";
import TaskList from "../TaskList/TaskList";
import { sortTasks, exportTasks, importTasks } from "../../utils/taskUtils";
import type { SortType } from "../../utils/taskUtils";

import TaskFilter from "../TaskFilter/TaskFilter";
import TaskForm from "../TaskForm/TaskForm";

type Filter = {
  status?: TaskStatus | "";
  priority?: "low" | "medium" | "high" | "";
};

function Dashboard() {
  // const [tasks, setTasks] = useState<Task[]>([]);
  const [filters, setFilters] = useState({ status: "", priority: "" });
  const [showForm, setShowForm] = useState(false);
  const [sortBy, setSortBy] = useState<SortType>("");

  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(taskData: Omit<Task, "id">) {
    const newTask: Task = {
      id: Date.now().toString(), // unique ID
      ...taskData,
    };
    setTasks((prev) => [...prev, newTask]);
    setShowForm(false);
  }

  function handleStatusChange(taskId: string, taskStatus: TaskStatus) {
    setTasks((prev) =>
      prev.map((task) => {
        if (task.id === taskId) {
          return { ...task, status: taskStatus };
        } else {
          return task;
        }
      }),
    );
  }

  function handleDelete(taskId: string) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  function handleFilterChange(newFilters: Filter) {
    setFilters((prev) => ({
      ...prev,
      ...newFilters,
    }));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });

  const sortedTasks =
    sortBy === "" ? filteredTasks : sortTasks(filteredTasks, sortBy);

  function handleSort(event: React.ChangeEvent<HTMLSelectElement>) {
    setSortBy(event.target.value as "title" | "dueDate" | "");
  }

  const stats = {
    total: tasks.length,
    completed: tasks.filter((task) => task.status === "completed").length,
    inprogress: tasks.filter((task) => task.status === "in-progress").length,
    pending: tasks.filter((task) => task.status === "pending").length,
  };

  return (
    <div className="bg-indigo-200 min-h-screen p-6 flex flex-col items-center gap-6">
      <h1 className="text-4xl font-semibold text-center">Task Dashboard</h1>

      <button
        className="px-4 py-2 border-2 rounded-md font-bold hover:bg-indigo-300 transition"
        onClick={() => setShowForm(true)}
      >
        Add New Task
      </button>

      {showForm && <TaskForm onAddTask={handleAddTask} />}

      <TaskFilter onFilterChange={handleFilterChange} />

      {/* export */}
      <button onClick={() => exportTasks(tasks)} className="border-1 rounded-lg p-2">
        Export Tasks
      </button>

      {/* import */}
      <label htmlFor="import-file" className="border-1 rounded-lg p-2">
        Import Tasks
      </label>
      <input
        id="import-file"
        type="file"
        accept="application/json"
        onChange={(e) => importTasks(e, setTasks)}
        className="border-1 rounded-lg p-2"
      />

      <div className="flex flex-col gap-2 items-center">
        <label htmlFor="sort" className=" font-bold">
          Sort:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={handleSort}
          className="px-2 py-1 border-1 rounded-md font-semibold"
        >
          <option value="">Sort By</option>
          <option value="dueDate">Due Date</option>
          <option value="title">Title</option>
        </select>
      </div>

      <div className="flex gap-4 text-sm font-semibold">
        <p>Total Tasks: {stats.total}</p>
        <p>Completed: {stats.completed}</p>
        <p>In Progress: {stats.inprogress}</p>
        <p>Pending: {stats.pending}</p>
      </div>

      <div className="flex flex-col gap-4 w-full max-w-md">
        <TaskList
          tasks={sortedTasks}
          onStatusChange={handleStatusChange}
          onDelete={handleDelete}
        />
      </div>
    </div>
  );
}
export default Dashboard;
