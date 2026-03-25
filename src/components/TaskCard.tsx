import type{ Task } from "../types/task";
import { useTasks } from "../context/TaskContext";
import { useDraggable } from "@dnd-kit/core";

const TaskCard = ({ task }: { task: Task }) => {
  const { deleteTask } = useTasks();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform
      ? `translate(${transform.x}px, ${transform.y}px)`
      : undefined,
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className="bg-white p-3 rounded shadow"
    >
      {/*  DRAG HANDLE ONLY */}
      <div
        {...listeners}
        {...attributes}
        className="cursor-grab text-gray-400 mb-2"
      >
        ⠿ Drag
      </div>

      <h3 className="font-semibold">{task.title}</h3>
      <p className="text-sm text-gray-600">{task.description}</p>

      {/*  DELETE NOW WORKS */}
      <button
        onClick={() => deleteTask(task.id)}
        className="text-red-500 text-sm mt-2"
      >
        Delete
      </button>
    </div>
  );
};

export default TaskCard;