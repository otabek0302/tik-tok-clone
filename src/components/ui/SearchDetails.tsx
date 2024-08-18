"use client";

import { useState, useEffect } from "react";
import { IUser, Video } from "../../../types";
import { useSearchParams } from "next/navigation";
import useAuthStore from "../../../store/authStore";
import NoResults from "./NoResults";
import Image from "next/image";
import Link from "next/link";
import PostCard from "./PostCard";
import { GoVerified } from "react-icons/go";

const SearchDetails = () => {
  const [videos, setVideos] = useState<Video[]>([]);
  const [isAccounts, setIsAccounts] = useState(false);
  const { allUsers } = useAuthStore();

  const searchParams = useSearchParams();
  const search = searchParams.get("query");

  const accountsClass = isAccounts
    ? "border-b-2 border-black text-copy font-bold"
    : "text-copy-lighter font-light";
  const videosClass = !isAccounts
    ? "border-b-2 border-black text-copy font-bold"
    : "text-copy-lighter font-light";

  const searchedAccounts = allUsers?.filter((user: IUser) =>
    user.userName.toLowerCase().includes(search?.toLowerCase() || "")
  );

  const fetchVideos = async () => {
    const BASE_URL =
      process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000";
    try {
      const res = await fetch(`${BASE_URL}/api/search?query=${search}`);
      if (!res.ok) {
        throw new Error("Failed to fetch videos");
      }
      const fetchedVideos: Video[] = await res.json();
      setVideos(fetchedVideos);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  useEffect(() => {
    if (!isAccounts && search) {
      fetchVideos();
    }
  }, [search, isAccounts]);

  return (
    <div>
      <div className="flex gap-10 mb-10 mt-10 py-2 border-b-2 border-gray-200 w-full">
        <p
          className={`text-xl font-semibold cursor-pointer ${accountsClass} mt-2`}
          onClick={() => setIsAccounts(true)}
        >
          Accounts
        </p>
        <p
          className={`text-xl font-semibold cursor-pointer ${videosClass} mt-2`}
          onClick={() => setIsAccounts(false)}
        >
          Videos
        </p>
      </div>
      {isAccounts ? (
        <div className="md:mt-16">
          {searchedAccounts?.length ? (
            searchedAccounts.map((user: IUser, idx: number) => (
              <Link key={idx} href={`/profile/${user._id}`}>
                <div className="flex gap-3 p-2 cursor-pointer font-semibold rounded border-b-2 border-gray-200">
                  <div>
                    <Image
                      width={50}
                      height={50}
                      className="rounded-full"
                      alt="user-profile"
                      src={user.image}
                    />
                  </div>
                  <div>
                    <p className="flex gap-1 items-center text-lg font-bold text-primary">
                      {user.userName} <GoVerified className="text-blue-400" />
                    </p>
                    <p className="capitalize text-gray-400 text-sm">
                      {user.userName}
                    </p>
                  </div>
                </div>
              </Link>
            ))
          ) : (
            <NoResults text={`No Account Results for "${search}"`} />
          )}
        </div>
      ) : (
        <div className="md:mt-16 flex flex-wrap gap-6 md:justify-start">
          {videos?.length ? (
            videos?.map((post: Video, idx: number) => (
              <PostCard postDetails={post} key={idx} />
            ))
          ) : (
            <NoResults text={`No Video Results for "${search}"`} />
          )}
        </div>
      )}
    </div>
  );
};

export default SearchDetails;
