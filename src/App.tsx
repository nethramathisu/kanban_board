import { useState } from "react";
import { DndContext, type DragEndEvent } from "@dnd-kit/core";
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
      updateTask({
        ...task,
        status: newStatus,
      });
    }
  };

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className="p-6 min-h-screen bg-gray-50">
        <h1 className="text-3xl font-bold mb-6 text-center">
          Kanban Board
        </h1>

        {/* ➕ Add Task UI */}
        <div className="bg-white p-4 rounded shadow mb-6 max-w-xl mx-auto">
          <h2 className="font-semibold mb-3">Add Task</h2>

          <input
            type="text"
            placeholder="Task title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />

          <textarea
            placeholder="Description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="border p-2 w-full mb-2 rounded"
          />

          <button
            onClick={handleAddTask}
            className="bg-blue-500 text-white px-4 py-2 rounded w-full hover:bg-blue-600"
          >
            Add Task
          </button>
        </div>

        {/* 🧱 Columns */}
        <div className="flex gap-6 justify-center flex-wrap">
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