import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "../../types";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";
import { sortTasks, exportTasks, importTasks } from "../../utils/taskUtils";
import type { SortType } from "../../utils/taskUtils";
import { ArrowDownTrayIcon } from "@heroicons/react/16/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/16/solid";

type Filter = {
  status?: TaskStatus | "";
  priority?: "low" | "medium" | "high" | "";
};

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<Filter>({ status: "", priority: "" });
  const [sortBy, setSortBy] = useState<SortType>("");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  function handleAddTask(taskData: Omit<Task, "id">) {
    const newTask: Task = { id: Date.now().toString(), ...taskData };
    setTasks((prev) => [...prev, newTask]);
    setShowForm(false);
  }

  function handleEditTask(updatedTask: Task) {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  }

  function handleDelete(taskId: string) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }

  function handleStatusChange(taskId: string, taskStatus: TaskStatus) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: taskStatus } : task,
      ),
    );
  }

  function handleFilterChange(newFilters: Filter) {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }

  const filteredTasks = tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });

  const sortedTasks =
    sortBy === "" ? filteredTasks : sortTasks(filteredTasks, sortBy);

  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inprogress: tasks.filter((t) => t.status === "in-progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  return (
    <div className="bg-indigo-200 min-h-screen p-6 flex flex-col items-center gap-6">
      <h1 className="text-4xl font-semibold text-center">Task Dashboard</h1>

      <button
        className="px-4 py-2 border-2 rounded-md font-bold hover:bg-indigo-300 transition"
        onClick={() => {
          setEditingTask(null);
          setShowForm(true);
        }}
      >
        Add New Task
      </button>

      {showForm && (
        <TaskForm
          onAddTask={handleAddTask}
          taskToEdit={editingTask || undefined}
          onEditTask={(task) => {
            handleEditTask(task);
            setEditingTask(null);
            setShowForm(false);
          }}
          onClose={() => {
            setEditingTask(null);
            setShowForm(false);
          }}
        />
      )}

      <TaskFilter onFilterChange={handleFilterChange} />

      <button
        onClick={() => exportTasks(tasks)}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        <div className="flex gap-[10px]">
        <ArrowDownTrayIcon className="h-5 w-5"/>
        Export Tasks
        </div>
      </button>

      <button
        type="button"
        onClick={() => document.getElementById("import-file")?.click()}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        <div className="flex gap-[10px]">
        <ArrowUpOnSquareIcon className="h-5 w-5"/>
        Import Tasks
        </div>
      </button>

      <input
        id="import-file"
        type="file"
        accept="application/json"
        onChange={(e) => importTasks(e, setTasks)}
        className="hidden"
      />
      <div className="flex flex-col gap-2 items-center">
        <label htmlFor="sort" className=" font-bold">
          Sort:
        </label>
        <select
          id="sort"
          value={sortBy}
          onChange={(e) =>
            setSortBy(e.target.value as "title" | "dueDate" | "")
          }
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
          onEdit={(task) => {
            setEditingTask(task);
            setShowForm(true);
          }}
        />
      </div>
    </div>
  );
}

export default Dashboard;
