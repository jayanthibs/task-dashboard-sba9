import type { ChangeEvent } from "react";
import type { TaskItemProps, TaskStatus } from "../../types";

function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps) {
  function handleStatusChange(e: ChangeEvent<HTMLSelectElement>) {
    onStatusChange(task.id, e.target.value as TaskStatus);
  }

  function handleDelete() {
    onDelete(task.id);
  }

  return (
    <>
      {/* <div>
                <div>
                    <div>
                        
                        <h3>{task.id}-{task.title} </h3>
                        <p>{task.description}</p>
                    </div>
                    <div>
                        <select defaultValue={task.status} onChange={handleStatusChange}>
                            <option value="pending">Pending</option>
                            <option value="in-progress">In Progress</option>
                            <option value="completed">Completed</option>
                        </select>
                        <button onClick={handleDelete}>Delete</button>
                    </div>
                </div>
                <div>
                    <div>Priority: {task.priority}</div>
                    <div>Due: {task.dueDate}</div>
                </div>
            </div> */}

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
              onClick={handleDelete}
              className="delete-btn font-medium cursor-pointer hover:text-red-700 text-red-500"
            >
              Delete
            </button>
          </div>
        </div>

        {/* Footer */}
        <div className="task-footer flex gap-4 mt-2 text-sm">
          <div className={`priority ${task.priority}`}>
            Priority: {task.priority}
          </div>
          <div className="due-date text-gray-500">Due: {task.dueDate}</div>
        </div>
      </div>
    </>
  );
}

export { TaskItem };
