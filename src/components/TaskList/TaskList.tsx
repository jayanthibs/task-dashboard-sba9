import type { TaskStatus } from "../../types";
import type { TaskListProps } from "../../types";
import { TaskItem } from "./TaskItem";

function TaskList({ tasks, onStatusChange, onDelete }: TaskListProps){

    function handleStatusChange (taskId: string, taskStatus: TaskStatus) {
        onStatusChange(taskId,taskStatus);
    }

    function handleDelete (taskId: string ) {
        onDelete(taskId);
    }

    const taskElement = tasks.map((task) => <TaskItem key={task.id} task={task} onStatusChange={handleStatusChange} onDelete={handleDelete} />);

    return (
        <>
        <h1 className="font-semibold">Tasks:</h1>
            {taskElement}
        </>
    )
}

export default TaskList;