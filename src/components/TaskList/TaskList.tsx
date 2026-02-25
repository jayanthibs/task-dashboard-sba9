import { useEffect, useState, useMemo } from "react";
import type {  TaskListProps, Task } from "../../types";
import { TaskItem } from "./TaskItem";

function TaskList({ tasks, onStatusChange, onDelete, onEdit }: TaskListProps) {
  const [searchTask, setSearchTask] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Task[]>([]);

  const isTyping = useMemo(() => searchTask !== debouncedQuery, [debouncedQuery, searchTask]);

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchTask);
      setFilteredData(
        searchTask
          ? tasks.filter((item) =>
              item.title.toLowerCase().includes(searchTask.toLowerCase())
            )
          : []
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTask, tasks]);

  const taskElement = tasks.map((task) => (
    <TaskItem
      key={task.id}
      task={task}
      onStatusChange={onStatusChange}
      onDelete={onDelete}
      onEdit={onEdit} // pass edit handler
    />
  ));

  return (
    <>
      <label htmlFor="searchTask" className="sr-only">Search Task</label>
      <input
        type="search"
        id="searchTask"
        placeholder="Search for Task"
        value={searchTask}
        onChange={(e) => setSearchTask(e.target.value)}
        className="border-1 rounded-lg h-10 w-125 bg-white"
      />

      {isTyping && <p>Searching...</p>}

      {filteredData.length > 0 && (
        <div className="mb-2">
          <h2 className="font-semibold">Search Results:</h2>
          {filteredData.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onStatusChange={onStatusChange}
              onDelete={onDelete}
              onEdit={onEdit} // support editing from search
            />
          ))}
        </div>
      )}

      <h1 className="font-semibold">Tasks:</h1>
      {taskElement}
    </>
  );
}

export default TaskList;