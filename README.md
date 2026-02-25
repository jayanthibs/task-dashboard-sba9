<h1 align="center">Task Dashboard</h1>

A React + TypeScript Task Management Dashboard with full CRUD functionality, filtering, sorting, search, statistics, and JSON import/export.

## Installation

* Clone the repository:
````bash
git clone https://github.com/jayanthibs/task-dashboard-sba9.git
cd task-dashboard-sba9
````
* Install dependencies:
````bash
npm install
````
* Run the development server:
````bash
npm run dev
````
* Open the browser at http://localhost:5173 (Vite default port).

## Project Structure

````bash
task-dashboard/
├── src/
│   ├── components/
│   │   ├── TaskList/
│   │   │   ├── TaskList.tsx
│   │   │   └── TaskItem.tsx
│   │   ├── TaskForm/
│   │   │   └── TaskForm.tsx
│   │   ├── TaskFilter/
│   │   │   └── TaskFilter.tsx
│   │   └── Dashboard/
│   │       └── Dashboard.tsx
│   ├── types/
│   │   └── index.ts
│   ├── utils/
│   │   └── taskUtils.ts
│   ├── App.tsx
├── main.tsx
└── package.json
````
## Features

 - Add, Edit, Delete tasks
 - Filter by status and priority
 - Search tasks (debounced search)
 - Sort by title or due date
 - Task statistics
 - Import & Export tasks (JSON)
 - Persistent storage with localStorage

 ## Technologies

 - React 18 – Functional components and hooks.
 - TypeScript – Strong typing for components, props, and utilities.
 - Tailwind CSS – Responsive and modern styling.
 - LocalStorage – Simple client-side persistence.

 ## Usage

 - Click "Add New Task" to create a task.
 - Use the Edit button on any task to update it.
 - Delete tasks using the Delete button.
 - Filter tasks using Status or Priority dropdowns.
 - Sort tasks using the Sort By dropdown.
 - Use the Search bar to find tasks by title.
 - Export tasks using the Export Tasks button.
 - Import tasks using the Import Tasks file input.

 ## Components and Props

 ## Dashboard

Main container component that manages:
 - State
 - CRUD logic
 - Filtering
 - Sorting
 - Statistics
 - Import/Export

### Example Usage
````bash
import Dashboard from "./components/Dashboard/Dashboard";

function App() {
  return <Dashboard />;
}

export default App;
````

## TaskForm

Handles both adding and editing tasks.

### Props
````bash
interface TaskFormProps {
  onAddTask: (task: Omit<Task, "id">) => void;
  taskToEdit?: Task;
  onEditTask?: (task: Task) => void;
  onClose?: () => void;
}
````
### Example Usage (Add Mode)
````bash
<TaskForm
  onAddTask={(task) => console.log("New Task:", task)}
/>
````
### Example Usage (Edit Mode)
````bash
<TaskForm
  taskToEdit={selectedTask}
  onEditTask={(updatedTask) => console.log("Updated:", updatedTask)}
  onClose={() => setShowForm(false)}
/>
````

## TaskList

Displays tasks and includes search functionality.

### Props
````bash
interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit: (task: Task) => void;
}
````
### Example Usage
````bash
<TaskList
  tasks={tasks}
  onStatusChange={(id, status) => handleStatusChange(id, status)}
  onDelete={(id) => handleDelete(id)}
  onEdit={(task) => setEditingTask(task)}
/>
````
## TaskItem
Represents a single task card.
### Props
````bash
interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
  onEdit?: (task: Task) => void;
}
````
### Example Usage
````bash
<TaskItem
  task={task}
  onStatusChange={(id, status) => console.log(id, status)}
  onDelete={(id) => console.log("Delete:", id)}
  onEdit={(task) => console.log("Edit:", task)}
/>
````
## TaskFilter
Filters tasks by status and priority.

### Props
````bash
interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: "low" | "medium" | "high";
  }) => void;
}
````
### Example Usage
````bash
<TaskFilter
  onFilterChange={(filters) => {
    console.log("Filters changed:", filters);
  }}
/>
````

## Utilities

Includes:
 - sortTasks(tasks, sortBy)
 - validateTask(task)
 - exportTasks(tasks)
 - importTasks(event, setTasks)

 ## Reflections:

- How you implemented React and TypeScript features

I built the project using React functional components and hooks like useState to manage tasks and form data, and useEffect to save tasks in localStorage and handle side effects. I passed data and functions between components using props to keep the app organized. With TypeScript, I created interfaces and types to define the structure of a task and component props, which helped prevent errors and made the code more reliable and easier to maintain.

- The challenges you encountered and how you overcame them

One of the main challenges I faced was managing state between multiple components, especially when handling editing and filtering tasks. I solved this by lifting the state up to the Dashboard component and passing data and functions down through props. Another challenge was handling TypeScript errors when defining task types and props. I overcame this by creating clear interfaces and using proper types like union types and utility types (Omit). I also faced issues with keeping tasks saved after refresh, which I fixed by using useEffect with localStorage to persist the data.

- Your approach to component composition and state management

I structured the app with small, reusable components, each handling a single responsibility. The main state (tasks, filters, editing) is kept in the Dashboard and passed down via props. I used useState for local state and useEffect for side effects like saving to localStorage, keeping the data flow predictable and components reusable.