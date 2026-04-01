import { useState } from "react";
import { DndContext, closestCenter, type DragEndEvent } from "@dnd-kit/core";
import Column from "./components/Column";
import { useTasks } from "./context/TaskContext";
import { v4 as uuidv4 } from "uuid";

function App() {
  const { tasks, addTask, updateTask } = useTasks();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // ➕ Add Task
  const handleAddTask = () => {
    if (!title.trim()) return;

    addTask({
      id: uuidv4(),
      title,
      description,
      status: "todo",
    });

    setTitle("");
    setDescription("");
  };

  // 🔥 Drag End Logic
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over) return;

    const taskId = active.id as string;
    const newStatus = over.id as "todo" | "inprogress" | "done";

    const task = tasks.find((t) => t.id === taskId);
    if (!task) return;

    if (task.status !== newStatus) {
      updateTask(taskId, { status: newStatus });
    }
  };

  return (
    <DndContext collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
      <div className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-4xl font-bold mb-6 text-center text-gray-800">
          Kanban Board
        </h1>

        {/* ➕ Add Task Form */}
        <div className="bg-white p-6 rounded-2xl shadow-md max-w-xl mx-auto mb-8 border-t-4 border-blue-500">
          <h2 className="font-semibold text-lg mb-4 text-gray-700">Add New Task</h2>

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border border-gray-300 rounded-lg px-4 py-2 w-full mb-4 focus:outline-none focus:ring-2 focus:ring-blue-400"
          />

          <button
            onClick={handleAddTask}
            className="bg-blue-500 hover:bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg w-full transition-colors"
          >
            Add Task
          </button>
        </div>

        {/* 🧱 Kanban Columns */}
        <div className="flex flex-wrap gap-6 justify-center">
          <Column
            title="To Do"
            status="todo"
            tasks={tasks.filter((t) => t.status === "todo")}
          />
          <Column
            title="In Progress"
            status="inprogress"
            tasks={tasks.filter((t) => t.status === "inprogress")}
          />
          <Column
            title="Done"
            status="done"
            tasks={tasks.filter((t) => t.status === "done")}
          />
        </div>
      </div>
    </DndContext>
  );
}

export default App;