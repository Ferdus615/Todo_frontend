"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

// Helper functions
const getLocalData = (key) => {
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(key);
    return stored ? JSON.parse(stored) : [];
  }
  return [];
};

const saveLocalData = (key, data) => {
  if (typeof window !== "undefined") {
    localStorage.setItem(key, JSON.stringify(data));
  }
};

function Page() {
  const [mounted, setMounted] = useState(false);

  // Wait until the client mounts before rendering
  useEffect(() => {
    setMounted(true);
  }, []);

  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [tasks, setTasks] = useState([]);
  const [archiveTask, setArchiveTask] = useState([]);
  const [deleteTask, setDeleteTask] = useState([]);

  // Load from localStorage after mount
  useEffect(() => {
    if (mounted) {
      setTasks(getLocalData("tasks"));
      setArchiveTask(getLocalData("archive"));
      setDeleteTask(getLocalData("trash"));
    }
  }, [mounted]);

  // Save changes
  useEffect(() => {
    if (mounted) saveLocalData("tasks", tasks);
  }, [tasks, mounted]);

  useEffect(() => {
    if (mounted) saveLocalData("archive", archiveTask);
  }, [archiveTask, mounted]);

  useEffect(() => {
    if (mounted) saveLocalData("trash", deleteTask);
  }, [deleteTask, mounted]);

  const handleTitle = (e) => setTitle(e.target.value);
  const handleDesc = (e) => setDesc(e.target.value);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!title.trim() || !desc.trim()) return;

    const newTask = {
      id: Date.now(),
      title: title.trim(),
      description: desc.trim(),
      isCompleted: false,
    };

    setTasks((oldTask) => [newTask, ...oldTask]);
    setTitle("");
    setDesc("");
  };

  const CompletedHandler = (id) => {
    setTasks((oldTask) =>
      oldTask.map((task) =>
        task.id === id ? { ...task, isCompleted: !task.isCompleted } : task
      )
    );
  };

  const archiveHandler = (id) => {
    const tasksToArchive = tasks.find((task) => task.id === id);
    setTasks((oldTask) => oldTask.filter((task) => task.id !== id));
    if (tasksToArchive)
      setArchiveTask((archivedTask) => [tasksToArchive, ...archivedTask]);
  };

  const deleteHandler = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);
    setTasks((oldtask) => oldtask.filter((task) => task.id !== id));
    if (taskToDelete)
      setDeleteTask((deletedTask) => [taskToDelete, ...deletedTask]);
  };

  // Avoid rendering server markup before hydration
  if (!mounted) {
    return (
      <div className="flex justify-center items-center h-screen text-zinc-400">
        Loading tasks...
      </div>
    );
  }

  let renderTask =
    tasks.length === 0 ? (
      <p className="text-center mt-10 text-zinc-500">
        No tasks yet! Add one above.
      </p>
    ) : (
      <div className="flex flex-wrap gap-5 mt-10">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`border border-zinc-400 p-3 flex flex-col w-64 rounded-md shadow-sm transition-all duration-200 ${
              task.isCompleted ? "bg-emerald-700 text-white" : "bg-[#1e1e1e]"
            }`}
          >
            <span className="text-lg font-bold">{task.title}</span>
            <span className="text-sm font-light">{task.description}</span>
            <div className="text-sm flex gap-5 mt-3">
              <button
                className="p-1 rounded-sm hover:scale-110 transition"
                onClick={() => CompletedHandler(task.id)}
              >
                <Image src="/done.svg" height={18} width={18} alt="Completed" />
              </button>
              <button
                className="p-1 rounded-sm hover:scale-110 transition"
                onClick={() => archiveHandler(task.id)}
              >
                <Image
                  src="/archive.svg"
                  height={18}
                  width={18}
                  alt="Archive"
                />
              </button>
              <button
                className="p-1 rounded-sm hover:scale-110 transition"
                onClick={() => deleteHandler(task.id)}
              >
                <Image src="/delete.svg" height={18} width={18} alt="Trash" />
              </button>
            </div>
          </div>
        ))}
      </div>
    );

  return (
    <div className="flex h-screen w-screen text-white bg-[#0e141b]">
      {/* Sidebar */}
      <aside className="flex flex-col min-w-32 gap-5 p-5 bg-[#101720]">
        <div className="flex justify-center items-center">
          <Image src="/logo.svg" height={50} width={40} alt="logo" />
        </div>
        <button className="text-sm pt-1 flex gap-2 items-center font-extralight cursor-pointer">
          <Image src="/add.svg" height={18} width={18} alt="Add task" />
          <span>New task</span>
        </button>
        <button className="text-sm pt-1 flex gap-2 items-center font-extralight cursor-pointer">
          <Image src="/archiveBox.svg" height={18} width={18} alt="Archiver" />
          <span>Archiver</span>
        </button>
        <button className="text-sm pt-1 flex gap-2 items-center font-extralight cursor-pointer">
          <Image src="/trash.svg" height={18} width={18} alt="Trash" />
          <span>Trash</span>
        </button>
      </aside>

      {/* Main content */}
      <div className="flex-grow p-5 overflow-y-auto">
        <h1 className="text-center text-3xl font-medium mb-10">My Todo List</h1>
        <form onSubmit={handleSubmit} className="flex justify-center gap-2">
          <input
            placeholder="Enter task title..."
            className="border border-zinc-500 rounded-sm w-60 p-1 text-sm bg-transparent text-white"
            value={title}
            onChange={handleTitle}
          />
          <input
            placeholder="Enter description..."
            className="border border-zinc-500 rounded-sm w-60 p-1 text-sm bg-transparent text-white"
            value={desc}
            onChange={handleDesc}
          />
          <button
            type="submit"
            className="border border-zinc-500 bg-emerald-700 hover:bg-emerald-800 rounded-sm text-white px-3 py-1 text-sm"
          >
            Add Task
          </button>
        </form>

        <div>{renderTask}</div>
      </div>
    </div>
  );
}

export default Page;
