import type { Task } from "../types";
export type SortType = "title" | "dueDate";

export function sortTasks(tasks: Task[], sortBy: SortType): Task[] {
  return [...tasks].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "dueDate") {
      return (
        new Date(a.dueDate).getTime() -
        new Date(b.dueDate).getTime()
      );
    }

    return 0;
  });
}