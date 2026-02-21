// types/index.ts
export type TaskStatus = 'pending' | 'in-progress' | 'completed';
 
export interface Task {
   id: string;
  title: string;
  description: string;
  status: TaskStatus;
  priority: 'low' | 'medium' | 'high';
  dueDate: string;
}
 

export interface TaskFormProps {
  onAddTask: (
    id: string,
    title: string,
    description: string,
    status: TaskStatus,
    priority: "low" | "medium" | "high",
    dueDate: string,
  ) => void;
}
export interface TaskListProps {
  tasks: Task[];
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}


// types/index.ts
export interface TaskItemProps {
  task: Task;
  onStatusChange: (taskId: string, newStatus: TaskStatus) => void;
  onDelete: (taskId: string) => void;
}


// types/index.ts
export interface TaskFilterProps {
  onFilterChange: (filters: {
    status?: TaskStatus;
    priority?: 'low' | 'medium' | 'high';
  }) => void;
}