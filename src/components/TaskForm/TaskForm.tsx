import type { Task } from "../../types";
import { useState, useEffect } from "react";
import type { TaskFormProps } from "../../types";
import { validateTask } from "../../utils/taskUtils";
function TaskForm({ onAddTask, taskToEdit, onEditTask, onClose }: TaskFormProps) {
  const [formData, setFormData] = useState<Omit<Task, "id">>({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    dueDate: "",
  });
  const [errors, setErrors] = useState({
    title: "",
    description: "",
    dueDate: "",
  });
  // Prefill form if editing
  useEffect(() => {
    if (taskToEdit) {
      setFormData({
        title: taskToEdit.title,
        description: taskToEdit.description,
        status: taskToEdit.status,
        priority: taskToEdit.priority,
        dueDate: taskToEdit.dueDate,
      });
    }
  }, [taskToEdit]);
  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const { errors, isValid } = validateTask(formData);
    setErrors(errors);
    if (!isValid) return;
    if (taskToEdit && onEditTask) {
      // Save edits
      onEditTask({ ...taskToEdit, ...formData });
    } else {
      // Add new task
      onAddTask(formData);
    }
    // Reset form
    setFormData({
      title: "",
      description: "",
      status: "pending",
      priority: "low",
      dueDate: "",
    });
    if (onClose) onClose();
  }
  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  }
  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-2 bg-white p-4 rounded-2xl w-72"
    >
      <label>Title:</label>
      <input
        name="title"
        value={formData.title}
        onChange={handleChange}
        className="border p-1 rounded"
      />
      {errors.title && <span className="text-red-500">{errors.title}</span>}
      <label>Description:</label>
      <textarea
        name="description"
        value={formData.description}
        onChange={handleChange}
        className="border p-1 rounded"
      />
      {errors.description && <span className="text-red-500">{errors.description}</span>}
      <label>Status:</label>
      <select name="status" value={formData.status} onChange={handleChange} className="border p-1 rounded">
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      <label>Priority:</label>
      <select name="priority" value={formData.priority} onChange={handleChange} className="border p-1 rounded">
        <option value="low">Low</option>
        <option value="medium">Medium</option>
        <option value="high">High</option>
      </select>
      <label>Due Date:</label>
      <input type="date" name="dueDate" value={formData.dueDate} onChange={handleChange} className="border p-1 rounded" />
      {errors.dueDate && <span className="text-red-500">{errors.dueDate}</span>}
      <div className="flex gap-2 mt-2">
        <button type="submit" className="bg-indigo-600 text-white px-4 py-1 rounded">
          {taskToEdit ? "Save Changes" : "Add Task"}
        </button>
        {onClose && (
          <button type="button" onClick={onClose} className="border px-4 py-1 rounded">
            Cancel
          </button>
        )}
      </div>
    </form>
  );
}
export default TaskForm;