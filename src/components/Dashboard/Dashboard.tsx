import { useEffect, useState } from "react";
import type { Task, TaskStatus } from "../../types";
import TaskList from "../TaskList/TaskList";
import TaskForm from "../TaskForm/TaskForm";
import TaskFilter from "../TaskFilter/TaskFilter";
import { sortTasks, exportTasks, importTasks } from "../../utils/taskUtils";
import type { SortType } from "../../utils/taskUtils";
import { ArrowDownTrayIcon } from "@heroicons/react/16/solid";
import { ArrowUpOnSquareIcon } from "@heroicons/react/16/solid";
//define type for filter
type Filter = {
  status?: TaskStatus | "";
  priority?: "low" | "medium" | "high" | "";
};

function Dashboard() {
  //useStates for tasks, edit, filter, sort
  const [tasks, setTasks] = useState<Task[]>(() => {
    const stored = localStorage.getItem("tasks");
    return stored ? JSON.parse(stored) : [];
  });

  const [showForm, setShowForm] = useState(false);
  const [editingTask, setEditingTask] = useState<Task | null>(null);
  const [filters, setFilters] = useState<Filter>({ status: "", priority: "" });
  const [sortBy, setSortBy] = useState<SortType>("");
  //useEffect for local Storage
  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);
  //function for adding task
  function handleAddTask(taskData: Omit<Task, "id">) {
    const newTask: Task = { id: Date.now().toString(), ...taskData };
    setTasks((prev) => [...prev, newTask]);
    setShowForm(false);
  }
  //function to edit the task
  function handleEditTask(updatedTask: Task) {
    setTasks((prev) =>
      prev.map((task) => (task.id === updatedTask.id ? updatedTask : task)),
    );
  }
  //function to delete the task
  function handleDelete(taskId: string) {
    setTasks((prev) => prev.filter((task) => task.id !== taskId));
  }
  //function to update the status of the task
  function handleStatusChange(taskId: string, taskStatus: TaskStatus) {
    setTasks((prev) =>
      prev.map((task) =>
        task.id === taskId ? { ...task, status: taskStatus } : task,
      ),
    );
  }
  //function to handle the filter
  function handleFilterChange(newFilters: Filter) {
    setFilters((prev) => ({ ...prev, ...newFilters }));
  }
  //filtering the tasks based on status and priority
  const filteredTasks = tasks.filter((task) => {
    if (filters.status && task.status !== filters.status) return false;
    if (filters.priority && task.priority !== filters.priority) return false;
    return true;
  });

  //sorting the tasks based on sort by type
  const sortedTasks =
    sortBy === "" ? filteredTasks : sortTasks(filteredTasks, sortBy);

  // statistics of tasks, counting no of tasks and  counting tasks based on the status
  const stats = {
    total: tasks.length,
    completed: tasks.filter((t) => t.status === "completed").length,
    inprogress: tasks.filter((t) => t.status === "in-progress").length,
    pending: tasks.filter((t) => t.status === "pending").length,
  };

  

  return (
    <div className="min-h-screen bg-indigo-200 py-10 px-6 flex flex-col items-center">
      {/* Header */}
      <div className="text-center mb-8">
        <h1 className="text-4xl font-bold text-slate-900 mb-2">Task Dashboard</h1>
        
      </div>

      {/* Top Controls */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-4xl justify-between">
        <button
          className="px-6 py-2 rounded-md font-bold bg-indigo-600 text-white hover:bg-indigo-700 transition"
          onClick={() => {
            setEditingTask(null);
            setShowForm(true);
          }}
        >
          Add New Task
        </button>

        <div className="flex gap-3 flex-wrap">
          <button
            onClick={() => exportTasks(tasks)}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-100 transition"
          >
            <ArrowDownTrayIcon className="h-5 w-5" />
            Export Tasks
          </button>

          <button
            type="button"
            onClick={() => document.getElementById("import-file")?.click()}
            className="flex items-center gap-2 bg-indigo-50 text-indigo-700 px-4 py-2 rounded-md hover:bg-indigo-100 transition"
          >
            <ArrowUpOnSquareIcon className="h-5 w-5" />
            Import Tasks
          </button>

          <input
            id="import-file"
            type="file"
            accept="application/json"
            onChange={(e) => importTasks(e, setTasks)}
            className="hidden"
          />
        </div>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6 w-full max-w-4xl">
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-indigo-700">Total</p>
          <p className="text-2xl font-bold">{stats.total}</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-emerald-700">Completed</p>
          <p className="text-2xl font-bold">{stats.completed}</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-amber-700">In Progress</p>
          <p className="text-2xl font-bold">{stats.inprogress}</p>
        </div>
        <div className="bg-white rounded-xl p-4 text-center">
          <p className="text-sm font-semibold text-rose-700">Pending</p>
          <p className="text-2xl font-bold">{stats.pending}</p>
        </div>
      </div>

      {/* Filter & Sort */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 w-full max-w-4xl items-center justify-between bg-white/50  backdrop-blur-sm rounded-xl p-4">
        <TaskFilter onFilterChange={handleFilterChange} />

        <div className="flex items-center gap-3 font-bold">
          <label className="font-bold text-slate-700 text-lg">Sort:</label>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as "title" | "dueDate" | "")}
            className="px-3 py-1 rounded-md border border-slate-300"
          >
            <option value="">Sort By</option>
            <option value="dueDate">Due Date</option>
            <option value="title">Title</option>
          </select>
        </div>
      </div>

      {/* Task Form */}
      {showForm && (
        <div className="w-full max-w-4xl mb-6 bg-white rounded-xl shadow-md p-6">
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
        </div>
      )}

      {/* Task List */}
      <div className="w-full max-w-4xl bg-white rounded-xl shadow-md p-6 flex flex-col items-center">
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
