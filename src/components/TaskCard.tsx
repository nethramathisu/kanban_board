import type { Task } from "../types/task";
import { useTasks } from "../context/TaskContext";
import { useDraggable } from "@dnd-kit/core";
import { useState } from "react";
import TaskModal from "./TaskModal";

const statusColors: Record<string, string> = {
  todo: "border-blue-400",
  inprogress: "border-yellow-400",
  done: "border-green-400",
};

const TaskCard = ({ task }: { task: Task }) => {
  const [editingTask, setEditingTask] = useState(false);
  const [title, setTitle] = useState(task.title);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const { deleteTask, updateTask } = useTasks();

  const { attributes, listeners, setNodeRef, transform } = useDraggable({
    id: task.id,
  });

  const style = {
    transform: transform ? `translate(${transform.x}px, ${transform.y}px)` : undefined,
  };

  const handleSave = () => {
    updateTask(task.id, { title });
    setEditingTask(false);
  };

  return (
    <>
      <div
        ref={setNodeRef}
        style={style}
        className={`bg-white p-5 rounded-2xl shadow-lg border-t-4 ${statusColors[task.status]} border border-gray-200 hover:shadow-xl transition-transform duration-150 flex flex-col gap-3`}
      >
        {/* Drag handle */}
        <div
          {...listeners}
          {...attributes}
          className="cursor-grab text-gray-400 text-sm select-none"
        >
          ⠿ Drag
        </div>

        {/* Task content */}
        <div className="cursor-pointer" onClick={() => setIsModalOpen(true)}>
          {!editingTask && (
            <>
              <h3 className="font-bold text-gray-800 text-lg truncate">{task.title}</h3>
              <p className="text-gray-600 text-sm line-clamp-3">
                {task.description || "No description"}
              </p>
            </>
          )}
        </div>

        {/* Inline Edit */}
        {editingTask && (
          <div className="flex items-center gap-2 justify-start">
            <input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-36 border border-gray-300 rounded-lg px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSave}
              className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded-lg transition"
            >
              Save
            </button>
          </div>
        )}

        {/* Action buttons */}
        <div className="flex gap-2 justify-end">
          <button
            className="text-blue-500 hover:underline text-sm font-medium"
            onClick={() => setEditingTask(!editingTask)}
          >
            Edit
          </button>
          <button
            onClick={() => deleteTask(task.id)}
            className="text-red-500 hover:underline text-sm font-medium"
          >
            Delete
          </button>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && <TaskModal task={task} onClose={() => setIsModalOpen(false)} />}
    </>
  );
};

export default TaskCard;