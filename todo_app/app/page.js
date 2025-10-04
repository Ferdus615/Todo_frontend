"use client";
import React, { useState } from "react";

const page = () => {
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const handleTitle = (e) => {
    setTitle(e.target.value);
  };

  const handleDesc = (e) => {
    setDesc(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(title);
    console.log(desc);
    setTitle("");
    setDesc("");
  };

  return (
    <div className="p-5">
      <h1>My Todo List</h1>

      <form onSubmit={handleSubmit} className="flex flex-col gap-2">
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
    </div>
  );
};

export default page;
