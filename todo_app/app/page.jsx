"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import Sidebar from "@/components/Sidebar";
import TaskForm from "@/components/TaskForm";

function Page() {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [tasks, setTasks] = useState([]);
  useEffect(() => {
    console.log("Updated Tasks Array:", tasks);
  }, [tasks]);

  const [archiveTask, setArchiveTask] = useState([]);
  useEffect(() => {
    console.log("Archived Tasks Array:", archiveTask);
  }, [archiveTask]);

  const [deleteTask, setDeleteTask] = useState([]);
  useEffect(() => {
    console.log("Deleted Task Array: = ", deleteTask);
  }, [deleteTask]);

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = {
      id: Date.now(),
      title: title,
      description: desc,
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

    if (tasksToArchive) {
      setArchiveTask((archivedTask) => [tasksToArchive, ...archivedTask]);
    }
  };

  const deleteHanlder = (id) => {
    const taskToDelete = tasks.find((task) => task.id === id);

    setTasks((oldtask) => oldtask.filter((task) => task.id !== id));

    if (taskToDelete) {
      setDeleteTask((deletedTask) => [taskToDelete, ...deleteTask]);
    }
  };

  let renderTask = (
    <p className="text-center mt-10 text-zinc-500">
      No tasks yet! Add one above.
    </p>
  );
  if (tasks.length > 0) {
    renderTask = (
      <div className="flex flex-wrap gap-5 mt-10">
        {tasks.map((task) => (
          <div
            key={task.id}
            className={`border-zinc-400 border-1 p-2 flex flex-col w-65 rounded-md ${
              task.isCompleted ? "bg-emerald-700" : "bg-transparent"
            }`}
          >
            <span className="text-lg font-bold">{task.title}</span>
            <span className="text-md font-normal">{task.description}</span>
            <span className=" text-sm font-extralight flex gap-5 mt-3">
              <button
                className="text-emerald-500 p-1 rounded-sm cursor-pointer"
                onClick={() => {
                  CompletedHandler(task.id);
                }}
              >
                <Image src="/done.svg" height={18} width={18} alt="Completed" />
              </button>
              <button
                className="text-sky-500 p-1 rounded-sm cursor-pointer"
                onClick={() => {
                  archiveHandler(task.id);
                }}
              >
                <Image
                  src="/archive.svg"
                  height={18}
                  width={18}
                  alt="archive"
                />
              </button>
              <button
                className="text-rose-500 p-1 rounded-sm cursor-pointer"
                onClick={() => {
                  deleteHanlder(task.id);
                }}
              >
                <Image src="/delete.svg" height={18} width={18} alt="Trash" />
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="flex h-screen w-screen">
      <Sidebar />
      <TaskForm />
    </div>
  );
}

export default Page;
