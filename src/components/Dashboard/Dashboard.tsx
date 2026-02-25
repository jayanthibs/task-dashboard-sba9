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

      {/* rendering TaskForm */}

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
      {/* rendering TaskFilter */}
      <TaskFilter onFilterChange={handleFilterChange} />

      {/* export tasks */}
      <button
        onClick={() => exportTasks(tasks)}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        <div className="flex gap-[10px]">
          <ArrowDownTrayIcon className="h-5 w-5" />
          Export Tasks
        </div>
      </button>

      {/* import tasks */}
      <button
        type="button"
        onClick={() => document.getElementById("import-file")?.click()}
        className="bg-indigo-600 text-white px-4 py-2 rounded"
      >
        <div className="flex gap-[10px]">
          <ArrowUpOnSquareIcon className="h-5 w-5" />
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

      {/* rendering sorting */}

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

      {/* rendering stats */}
      <div className="flex gap-4 text-sm font-semibold">
        <p>Total Tasks: {stats.total}</p>
        <p>Completed: {stats.completed}</p>
        <p>In Progress: {stats.inprogress}</p>
        <p>Pending: {stats.pending}</p>
      </div>
      
      {/* rendering TaskList */}
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
