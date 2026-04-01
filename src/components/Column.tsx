import { useDroppable } from "@dnd-kit/core";
import type { Task, Status } from "../types/task";
import TaskCard from "./TaskCard";

interface Props {
  title: string;
  status: Status;
  tasks: Task[];
}

const Column = ({ title, status, tasks }: Props) => {
  const { setNodeRef } = useDroppable({
    id: status, // Important for DnD
  });

  // Optional: color border for status
  const getStatusColor = () => {
    if (status === "todo") return "border-t-4 border-blue-400";
    if (status === "inprogress") return "border-t-4 border-yellow-400";
    return "border-t-4 border-green-400"; // done
  };

  return (
    <div
      ref={setNodeRef}
      className={`bg-white p-5 rounded-2xl w-80 min-h-[350px] shadow-md ${getStatusColor()} transition-all`}
    >
      {/* Column Title */}
      <h2 className="font-bold text-gray-800 text-lg mb-4 text-center">{title}</h2>

      {/* Task List */}
      <div className="space-y-3">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}

        {/* Empty state */}
        {tasks.length === 0 && (
          <p className="text-gray-400 text-sm italic text-center">
            No tasks here yet
          </p>
        )}
      </div>
    </div>
  );
};

export default Column;