import type { Task } from "../types";
export type SortType = "title" | "dueDate" | "";

// sort tasks by title / due date
export function sortTasks(tasks: Task[], sortBy: SortType): Task[] {
  if (sortBy === "") return tasks;

  return [...tasks].sort((a, b) => {
    if (sortBy === "title") {
      return a.title.localeCompare(b.title);
    }

    if (sortBy === "dueDate") {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    }

    return 0;
  });
}

// validate task in form
export const validateTask = (data: Omit<Task, "id">) => {
  const errors = {
    title: "",
    description: "",
    dueDate: "",
  };

  if (!data.title.trim()) {
    errors.title = "Please enter a title!";
  }

  if (!data.description.trim()) {
    errors.description = "Please enter a description!";
  }

  if (!data.dueDate) {
    errors.dueDate = "Please enter a due date!";
  }

  const isValid = !errors.title && !errors.description && !errors.dueDate;

  return { errors, isValid };
};

// export/import tasks to a file
export const exportTasks = (tasks: Task[]) => {
  const blob = new Blob([JSON.stringify(tasks)], { type: "application/json" }); // new blob (browser binary object)

  const link = document.createElement("a"); // create fake anchor element
  link.href = URL.createObjectURL(blob);
  link.download = `tasks-${Date.now().toString()}.json`; // tell browser it's a download > date/time in file name
  link.click(); // triggers click > file is downloaded
};

export const importTasks = (
  e: React.ChangeEvent<HTMLInputElement>,
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>,
) => {
  const file = e.target.files?.[0]; // grabs the first uploaded file; "?" prevents errors if undefined
  if (!file) return; // stop if no file was selected

  const reader = new FileReader(); // create a browser file reader
  // runs after file is fully read
  reader.onload = () => {
    // file content as string
    if (reader.result) {
      // convert JSON string to array > setter updates state > triggers rerender and localStorage
      setTasks(JSON.parse(reader.result as string)); // uses setTasks that is in Dashboard
    }
  };
  reader.readAsText(file); // starts file reading
};
