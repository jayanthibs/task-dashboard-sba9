import type { FormProps } from "../../types";
import { useState } from "react";
import type { TaskFormProps } from "../../types";

function TaskForm({ onAddTask }: TaskFormProps) {
  const [formData, setFormData] = useState<FormProps>({
    title: "",
    description: "",
    status: "pending",
    priority: "low",
    dueDate: "",
  });

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    onAddTask(
      formData.title,
      formData.description,
      formData.status,
      formData.priority,
      formData.dueDate,
    );
    
    setFormData({
      
      title: "",
      description: "",
      status: "pending",
      priority: "low",
      dueDate: "",
    });
  }

  function handleChange(
    event: React.ChangeEvent<
      HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement
    >,
  ) {
    const { name, value } = event.target;

    setFormData((prevFormData) => ({
      ...prevFormData, // Spread existing state
      [name]: value, // Update changed field using computed property name
    }));
  }

  return (
    <>
      {/* <h1 className="text-center">Add new Task</h1> */}

      <form
        onSubmit={handleSubmit}
        className="flex flex-col gap-[10px] bg-white  items-center w-150 m-auto mt-7 rounded-2xl "
      >
       
        
       
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={formData.title}
            onChange={handleChange}
            className="border-1 w-70 rounded-md"
          />
       
       
          <label htmlFor="description">Description:</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="border-1 h-30 w-70 rounded-md"
          />
       
        
          <label htmlFor="status">Status:</label>
          <select
            onChange={handleChange}
            id="status"
            name="status"
            value={formData.status}
            className="border-1 w-70 rounded-md"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
          </select>
       
       
          <label htmlFor="priority">Priority:</label>
          <select
            value={formData.priority}
            id="priority"
            name="priority"
            onChange={handleChange}
            className="border-1 w-70 rounded-md"
          >
            <option value="low">low</option>
            <option value="medium">medium</option>
            <option value="high">high</option>
          </select>
        
        
          <label htmlFor="dueDate">Due Date:</label>
          <input
            type="date"
            id="dueDate"
            name="dueDate"
            value={formData.dueDate}
            onChange={handleChange}
            className="border-1 w-70 rounded-md"
          />
      
        
          <button type="submit" className="border-1 mb-5 w-70 rounded-md bg-indigo-600">
            Add Task
          </button>
        
      </form>
    </>
  );
}

export default TaskForm;
