import { useState } from "react";
import type { Task } from "../../types";
import type { TaskStatus } from "../../types";
import TaskList from "../TaskList/TaskList";

import TaskFilter from "../TaskFilter/TaskFilter";
import TaskForm from "../TaskForm/TaskForm";

type Filter = {
  status?: TaskStatus | "";
  priority?: "low" | "medium" | "high" | "";
};

function Dashboard() {
  const [tasks, setTasks] = useState<Task[]>([]);

  const [filters, setFilters] = useState({ status: "", priority: "" });


function handleAddTask(id: string,title: string, description: string, status: TaskStatus, priority: 'low' | 'medium' | 'high' , dueDate: string ){

    const newTask: Task = {
        id,
        title,
        description,
        status,
        priority,
        dueDate

    }

    setTasks((prev) => [...prev, newTask]);
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

  return (
    <div className="bg-indigo-200 min-h-screen  ">
    
      <h1 className="text-center text-4xl p-8 font-semibold">Task Dashboard</h1>
      <TaskForm onAddTask ={handleAddTask} />
      
      <TaskFilter onFilterChange={handleFilterChange}/>
      <TaskList
        tasks={filteredTasks}
        onStatusChange={handleStatusChange}
        onDelete={handleDelete}
      />
    </div>
  );
}
export default Dashboard;
