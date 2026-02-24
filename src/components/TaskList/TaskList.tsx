import { useEffect, useState, useMemo } from "react";
import type { TaskStatus } from "../../types";
import type { TaskListProps } from "../../types";
import { TaskItem } from "./TaskItem";
import type { Task } from "../../types";

function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps) {
  const [searchTask, setSearchTask] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Task[]>([]);

  const isTyping = useMemo(() => {
      if (searchTask === debouncedQuery) {
        return false;
      } else {
        return true;
      }
    }, [debouncedQuery, searchTask]);
  

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(() => searchTask);
      setFilteredData(
        searchTask ? tasks.filter((item) => item.title.toLowerCase().includes(searchTask.toLowerCase()) ) : [],
      );
    }, 500);

    return () => {
      clearTimeout(timer);
    };

  }, [searchTask]);

  function handleStatusChange(taskId: string, taskStatus: TaskStatus) {
    onStatusChange(taskId, taskStatus);
  }

  function handleDelete(taskId: string) {
    onDelete(taskId);
  }

  const taskElement = tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      onStatusChange={handleStatusChange}
      onDelete={handleDelete}
    />
  ));

  return (
    <>
      <label htmlFor="searchTask"></label>
      <input
        type="search"
        id="searchTask"
        placeholder="Search for Task"
        value={searchTask}
        onChange={(e) => setSearchTask(e.target.value)}
        className="border-1 rounded-lg h-10 w-125 bg-white"
      />

      {isTyping && <p>Searching...</p>}
      {filteredData.map((task) => (
        <p key={task.id}>{task.title}</p>
      ))}

      <h1 className="font-semibold">Tasks:</h1>
      {taskElement}
    </>
  );
}

export default TaskList;
