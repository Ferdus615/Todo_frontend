"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";

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
    // console.log(`Tasks: ${[...tasks]}`);

    setTitle("");
    setDesc("");
  };

  const CompletedHandler = (id) => {};

  const archiveHandler = (id) => {
    const tasksToArchive = tasks.find((task) => task.id === id);

    setTasks((oldTask) => oldTask.filter((task) => task.id !== id));

    if (tasksToArchive) {
      setArchiveTask((archivedTask) => [tasksToArchive, ...archivedTask]);
    }
  };

  const deleteHanlder = (id) => {
    setTasks((oldtask) => oldtask.filter((task) => task.id !== id));
  };

  let renderTask = (
    <p className="text-center mt-10 text-zinc-500">
      No tasks yet! Add one above.
    </p>
  );
  if (tasks.length > 0) {
    renderTask = (
      <div className="flex gap-5 mt-10">
        {tasks.map((task, index) => (
          <div
            key={index}
            className="border-zinc-400 border-1 p-2 flex flex-col w-65 rounded-md"
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
                <Image
                  src="/checkbox.svg"
                  height={20}
                  width={20}
                  alt="Completed"
                />
              </button>
              <button
                className="text-sky-500 p-1 rounded-sm cursor-pointer"
                onClick={() => {
                  archiveHandler(task.id);
                }}
              >
                <Image
                  src="/folder-download.svg"
                  height={20}
                  width={20}
                  alt="archive"
                />
              </button>
              <button
                className="text-rose-500 p-1 rounded-sm cursor-pointer"
                onClick={() => {
                  deleteHanlder(task.id);
                }}
              >
                <Image src="/trash.svg" height={20} width={20} alt="Trash" />
              </button>
            </span>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="p-5">
      <aside></aside>
      <h1 className="text-center text-3xl font-medium text-emerald-400 mb-10">
        My Todo List
      </h1>
      <form onSubmit={handleSubmit} className="flex justify-center gap-2">
        <input
          placeholder="Enter task here."
          className="border-1 border-black rounded-sm w-50 p-1"
          value={title}
          onChange={handleTitle}
        />
        <input
          placeholder="Enter description here."
          className="border-1 border-black rounded-sm w-50 p-1"
          value={desc}
          onChange={handleDesc}
        />
        <button
          type="submit"
          className="border-1 border-black bg-black rounded-sm text-white w-50 p-1"
        >
          Add Task
        </button>
      </form>

      <div>{renderTask}</div>
    </div>
  );
}

export default Page;
