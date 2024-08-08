"use client";

import Link from "next/link";
import Footer from "./Footer";
import SuggestedAccounts from "../ui/SuggestedAccounts";

import { usePathname } from "next/navigation";
import { useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { ImCancelCircle } from "react-icons/im";
import { sidebarNav } from "@/utils/constants";

import { useGoogleLogin } from "@react-oauth/google";
import { createOrGetUser } from "@/utils";

import axios from "axios";
import useAuthStore from "../../../store/authStore";

const Sidebar = () => {
  const pathname = usePathname();
  const [showSidebar, setShowSidebar] = useState<Boolean>(true);

  const { userProfile, addUser } = useAuthStore();


  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get("https://www.googleapis.com/oauth2/v3/userinfo", {
          headers: { Authorization: `Bearer ${tokenResponse.access_token}` },
        })
        .then((res: { data: any }) => res.data);

      createOrGetUser(userInfo, addUser);
    },
    onError: (error) => console.log("Login Failed:", error),
  });

  return (
    <div>
      <div
        className="block xl:hidden m-2 ml-4 mt-3 text-xl"
        onClick={() => setShowSidebar(!showSidebar)}
      >
        {showSidebar ? <ImCancelCircle /> : <AiOutlineMenu />}
      </div>
      {showSidebar && (
        <div className="xl:w-[240px] w-20 flex flex-col justify-start mb-4 border-r-[0.5px] border-border xl:border-0 p-3 ">
          <ul className="xl:border-b-[0.5px] border-border xl:pb-4">
            {sidebarNav.map((nav, i) => (
              <Link href={nav.link} key={i}>
                <li
                  className={`${
                    pathname === nav.link ? "active-link" : "link"
                  }`}
                >
                  <p className="text-2xl">{nav.icon}</p>
                  <span className="capitalize hidden xl:block">{nav.name}</span>
                </li>
              </Link>
            ))}
          </ul>
          {userProfile ? (
            <SuggestedAccounts profile={userProfile} />
          ) : (
            <div className="py-2">
              <p className="mb-4 text-copy-lighter text-sm leading-normal font-normal">
                Log in to follow creators, like videos, and view comments.
              </p>
              <button
                onClick={() => login()}
                className="w-full flex gap-1.5 items-center justify-center border-2 border-primary rounded-sm px-4 py-2.5 bg-white bg-opacity-[0.08]"
              >
                <span className="text-primary text-sm font-bold leading-normal">
                  Log in
                </span>
              </button>
            </div>
          )}
          <Footer />
        </div>
      )}
    </div>
  );
};

export default Sidebar;
