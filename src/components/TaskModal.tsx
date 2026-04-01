import { useState } from "react";
import type { Task, Status } from "../types/task";
import { useTasks } from "../context/TaskContext";

interface Props {
  task: Task;
  onClose: () => void;
}

const TaskModal = ({ task, onClose }: Props) => {
  const { updateTask } = useTasks();

  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [status, setStatus] = useState<Status>(task.status);

  const handleSave = () => {
    updateTask(task.id, { title, description, status });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      {/* Modal box */}
      <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-6 relative animate-fadeIn">
        {/* Close button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-800"
        >
          ✕
        </button>

        {/* Title */}
        <h2 className="text-2xl font-bold text-gray-800 mb-4">Task Details</h2>

        {/* Editable Fields */}
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Title
            </label>
            <input
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Description
            </label>
            <textarea
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 h-28"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-600 mb-1">
              Status
            </label>
            <select
              className="w-full border border-gray-300 px-3 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={status}
              onChange={(e) => setStatus(e.target.value as Status)}
            >
              <option value="todo">To Do</option>
              <option value="inprogress">In Progress</option>
              <option value="done">Done</option>
            </select>
          </div>
        </div>

        {/* Action buttons */}
        <div className="mt-6 flex justify-end gap-3">
          <button
            className="px-4 py-2 rounded-lg border border-gray-300 hover:bg-gray-100 transition"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 rounded-lg bg-blue-500 text-white hover:bg-blue-600 transition"
            onClick={handleSave}
          >
            Save
          </button>
        </div>
      </div>
    </div>
  );
};

export default TaskModal;