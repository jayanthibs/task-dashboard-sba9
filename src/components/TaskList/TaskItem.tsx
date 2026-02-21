import type { ChangeEvent } from "react";
import type { TaskItemProps, TaskStatus } from "../../types";

function TaskItem({ task, onStatusChange, onDelete }: TaskItemProps){

    function handleStatusChange (e: ChangeEvent<HTMLSelectElement>) {
        onStatusChange(task.id , e.target.value as TaskStatus)
    }

    function handleDelete () {
        onDelete(task.id )
    }

    return (
        <>
            <div>
                <div>
                    <div>
                        
                        <h3>{task.id} - {task.title} </h3>
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
            </div>
        </>
    )
}

export { TaskItem }