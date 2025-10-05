import React from "react";
import Image from "next/image";

const Sidebar = () => {
  return (
    <aside className="flex flex-col min-w-30 gap-5 p-5 bg-[#101720]">
      <div className="flex justify-center items-center">
        <Image src="/logo.svg" height={50} width={40} alt="logo" />
      </div>
      <a
        href="/"
        className="text-sm pt-1 flex gap-2 items-center font-extralight cursor-pointer"
      >
        <Image src="/add.svg" height={18} width={18} alt="Add task" />
        <span>New task</span>
      </a>
      <a
        href="/archiver"
        className="text-sm pt-1 flex gap-2 items-center font-extralight cursor-pointer"
      >
        <Image src="/archiveBox.svg" height={18} width={18} alt="Archiver" />
        <span>Archiver</span>
      </a>
      <a
        href="/trash"
        className="text-sm pt-1 flex gap-2 items-center font-extralight cursor-pointer"
      >
        <Image src="/trash.svg" height={18} width={18} alt="Trash" />
        <span>Trash</span>
      </a>
    </aside>
  );
};

export default Sidebar;
