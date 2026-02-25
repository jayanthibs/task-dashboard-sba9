import { useEffect, useState, useMemo } from "react";
import type { TaskListProps, Task } from "../../types";
import { TaskItem } from "./TaskItem";
import { MagnifyingGlassIcon } from "@heroicons/react/16/solid";

function TaskList({ tasks, onStatusChange, onDelete, onEdit }: TaskListProps) {
  //useState for searching the task
  const [searchTask, setSearchTask] = useState("");
  const [debouncedQuery, setDebouncedQuery] = useState("");
  const [filteredData, setFilteredData] = useState<Task[]>([]);
  //creating useMemo
  const isTyping = useMemo(
    () => searchTask !== debouncedQuery,
    [debouncedQuery, searchTask],
  );

  //useEffect to filter task based on searched input
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedQuery(searchTask);
      setFilteredData(
        searchTask
          ? tasks.filter((item) =>
              item.title.toLowerCase().includes(searchTask.toLowerCase()),
            )
          : [],
      );
    }, 500);

    return () => clearTimeout(timer);
  }, [searchTask, tasks]);

  // iterating through tasks and creating jsx for each task
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
      {/* rendering search task */}
      <div className="relative w-full max-w-md">
        <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />

        <input
          type="search"
          placeholder="Search tasks..."
          value={searchTask}
          onChange={(e) => setSearchTask(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-400 bg-white"
        />
      </div>
      {/* displaying searched data */}

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
      {/* displaying all the tasks */}
      <h1 className="font-semibold">Tasks:</h1>
      {taskElement}
    </>
  );
}

export default TaskList;
