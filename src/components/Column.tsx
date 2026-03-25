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
    id: status, // VERY IMPORTANT
  });

  return (
    <div ref={setNodeRef} className="bg-gray-100 p-4 rounded w-80 min-h-[300px]">
      <h2 className="font-bold mb-4">{title}</h2>

      <div className="space-y-2">
        {tasks.map((task) => (
          <TaskCard key={task.id} task={task} />
        ))}
      </div>
    </div>
  );
};

export default Column;