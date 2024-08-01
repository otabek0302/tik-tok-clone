"use client";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";

import { BiPlus } from "react-icons/bi";
import { LuSend } from "react-icons/lu";
import { AiOutlineTikTok } from "react-icons/ai";
import { LiaComment } from "react-icons/lia";
import { IoIosSearch } from "react-icons/io";

const Navbar = () => {
  return (
    <div className="w-full flex justify-between items-center border-b-[0.5px] border-border py-2 px-4">
      <div className="mr-5 min-w-[300px]">
        <Link href="/" className="flex gap-0.5">
          <AiOutlineTikTok className="text-4xl text-copy" />
          <span className="text-2xl font-black pt-1 text-copy">Tik Tok</span>
        </Link>
      </div>
      <div className="flex-1 flex justify-center">
        <div className="flex items-center justify-center max-w-[500px] h-[46px] rounded-full overflow-hidden w-full bg-white bg-opacity-[0.3]">
          <input
            type="text"
            placeholder="Search"
            className="w-full h-full bg-transparent py-2 px-4 text-base text-copy placeholder:text-copy-lighter placeholder:font-light focus:outline-none"
          />
          <button className="flex gap-1.5 items-center justify-center h-9 rounded-sm px-4 border-l-[0.5px] border-border text-copy-lighter hover:text-copy">
            <IoIosSearch className="text-2xl" />
          </button>
        </div>
      </div>
      <div className="ml-5">
        <div className="flex items-center">
          <div className="mr-5">
            <Link href="/">
              <button className="flex gap-1.5 items-center justify-center h-9 rounded-sm px-4 bg-white bg-opacity-[0.08]">
                <BiPlus className="text-2xl text-copy" />
                <span className="text-copy text-base leading-normal">
                  Upload
                </span>
              </button>
            </Link>
          </div>
          <div className="flex gap-5">
            <Link href="/">
              <button className="px-2 relative hover:after:block after:hidden after:content-['Message'] after:absolute after:top-10 after:left-1/2 after:-translate-x-1/2 after:text-copy after:px-3.5 after:py-2 after:bg-white after:bg-opacity-[0.3] after:rounded-xl">
                <LuSend className="text-2xl text-copy" />
              </button>
            </Link>
            <Link href="/">
              <button className="px-2 relative hover:after:block after:hidden after:content-['Inbox'] after:absolute after:top-10 after:left-1/2 after:-translate-x-1/2 after:text-copy after:px-3.5 after:py-2 after:bg-white after:bg-opacity-[0.3] after:rounded-xl">
                <LiaComment className="text-2xl text-copy" />
              </button>
            </Link>
          </div>
          <div className="ml-7">
            <div className="relative overflow-hidden rounded-full w-8 h-8 bg-white">
              <Image
                src="/avatar.png"
                fill
                alt="Avatar"
                className="object-center object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
