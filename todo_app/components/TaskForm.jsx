import React from "react";

const TaskForm = () => {
  return (
    <div className="flex-grow p-5">
      <h1 className="text-center text-3xl font-medium mb-10">My Todo List</h1>
      <form /* onSubmit={handleSubmit} */ className="flex justify-center gap-2">
        <input
          placeholder="Enter task here."
          className="border border-[beige] rounded-sm w-50 p-1 text-sm"
        //   value={title}
          //   onChange={handleTitle}
        />
        <input
          placeholder="Enter description here."
          className="border border-[beige] rounded-sm w-50 p-1 text-sm"
        //   value={desc}
          //   onChange={handleDesc}
        />
        <button
          type="submit"
          className="border border-[beige] bg-black rounded-sm text-white w-50 p-1 text-sm"
        >
          Add Task
        </button>
      </form>

      {/* <div>{renderTask}</div> */}
    </div>
  );
};

export default TaskForm;
