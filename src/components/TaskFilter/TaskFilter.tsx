// // types/index.ts
// export interface TaskFilterProps {
//   onFilterChange: (filters: {
//     status?: TaskStatus;
//     priority?: 'low' | 'medium' | 'high';
//   }) => void;
// }
import type { TaskFilterProps, TaskStatus } from "../../types";
function TaskFilter({ onFilterChange }: TaskFilterProps) {
  function handleStatusChange(e : React.ChangeEvent<HTMLSelectElement>) {
    onFilterChange({status: e.target.value as TaskStatus});
  }
 function handlePriorityChange(e : React.ChangeEvent<HTMLSelectElement>) {
    onFilterChange({priority: e.target.value as 'low' | 'medium' | 'high'});
  }
  
  return (
    <div className="flex gap-[100px] mt-20 justify-center font-bold">
    <div>
      <h1 className="p-1">Filter by Status:</h1>
      <select
       
        onChange={handleStatusChange}
        defaultValue="All Statuses"
        className="border-1 rounded-md p-2"
      >
        <option value="" >All Statuses</option>
        <option value="pending">Pending</option>
        <option value="in-progress">In Progress</option>
        <option value="completed">Completed</option>
      </select>
      </div>
      <div>
       <h1 className="p-1">Filter by Priority:</h1>
      <select defaultValue="All Priorities" onChange={handlePriorityChange}  className="border-1 rounded-md p-2">
                <option value="">All Priorities</option>
        <option value="low">low</option>
        <option value="medium">medium</option>
        <option value="high">high</option>
      </select>
    </div>
    </div>
  );
}
export default TaskFilter;