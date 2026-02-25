import type { ChangeEvent } from "react";
import type { TaskItemProps, TaskStatus } from "../../types";

function TaskItem({ task, onStatusChange, onDelete, onEdit }: TaskItemProps) {
  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    onStatusChange(task.id, e.target.value as TaskStatus);
  }

  function handleDelete() {
    onDelete(task.id);
  }

  function handleEdit() {
    if (onEdit) onEdit(task); // trigger edit in parent (Dashboard)
  }

  return (
    <div className="task-card p-4 mb-2 w-[500px] bg-white rounded-[12px] border border-gray-300 shadow-sm hover:shadow-md transition-shadow">
      {/* Header */}
      <div className="task-header flex justify-between items-start">
        {/* Title + Description */}
        <div>
          <h3 className="task-title text-[18px] font-semibold m-0">
            {task.title}
          </h3>
          <p className="task-desc text-gray-600 mt-1">{task.description}</p>
        </div>

        {/* Actions */}
        <div className="task-actions flex items-center gap-2">
          <select
            defaultValue={task.status}
            onChange={handleStatusChange}
            className={`status ${task.status} px-2 py-1 rounded-[6px] border border-gray-300 text-sm`}
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>

          <button
            onClick={handleEdit}
            className="edit-btn font-medium cursor-pointer hover:text-blue-700 text-blue-500"
          >
            Edit
          </button>

          <button
            onClick={handleDelete}
            className="delete-btn font-medium cursor-pointer hover:text-red-700 text-red-500"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Footer */}
      <div className="task-footer flex gap-4 mt-2 text-sm">
        <div className="priority text-green-500">Priority: {task.priority}</div>
        <div className="due-date text-black-500">Due: {task.dueDate}</div>
      </div>
    </div>
  );
}

export { TaskItem };