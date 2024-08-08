"use client";
import { Post } from "@/lib/types";
import { NextPage } from "next";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { FaBookmark, FaCommentDots, FaHeart } from "react-icons/fa";
import { GoPlus, GoVerified } from "react-icons/go";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";
import { IoIosShareAlt } from "react-icons/io";

interface IProps {
  post: Post;
  isShowingOnHome?: boolean;
}

const PostCard: NextPage<IProps> = ({ post, isShowingOnHome }) => {
  const [showCaption, setShowCaption] = useState(false);
  const [playing, setPlaying] = useState(false);
  const [isHover, setIsHover] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);

  const onVideoPress = () => {
    if (playing) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setPlaying(!playing);
  };

  const onVideoMute = () => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
    }
    setIsVideoMuted(!isVideoMuted);
  };

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  if (!isShowingOnHome) {
    return (
      <div>
        <Link href={`/detail/${post._id}`}>
          <video
            loop
            src={post.video.asset.url}
            className="w-[250px] md:w-full rounded-xl cursor-pointer"
          />
        </Link>
        <div className="flex gap-2 -mt-8 items-center ml-4">
          <p className="text-copy-light text-lg font-medium flex gap-1 items-center">
            <BsFillPlayFill className="text-2xl" />
            {post.likes?.length || 0}
          </p>
        </div>
        <Link href={`/detail/${post._id}`}>
          <p className="mt-5 text-md text-gray-800 cursor-pointer w-210">
            {post.caption}
          </p>
        </Link>
      </div>
    );
  }

  return (
    <div className="relative flex justify-center items-center">
      <div
        onMouseEnter={() => setIsHover(true)}
        onMouseLeave={() => setIsHover(false)}
        className="relative w-[200px] lg:w-[480px] h-[80vh] rounded-2xl overflow-hidden"
      >
        <video
          loop
          muted
          autoPlay
          ref={videoRef}
          src={post.video.asset.url}
          className="w-full h-full object-cover"
        />
        <div className="w-full absolute bottom-0 z-20 bg-gradient-to-t from-black p-5">
          <Link href={`/profile/${post.postedBy?._id}`}>
            <h3 className="my-3 text-copy-light text-sm font-normal leading-tight flex items-center">
              {post.postedBy.userName}{" "}
              <GoVerified className="text-blue-400 text-md" />
            </h3>
          </Link>
          <div
            className={`flex ${
              showCaption ? "flex-col" : "flex-row items-center"
            }`}
          >
            <p
              className={`flex-1 my-3 text-copy-light text-sm font-normal leading-tight ${
                showCaption ? "line-clamp-6" : "line-clamp-1"
              }`}
            >
              {post.caption}
            </p>
            <button
              onClick={() => setShowCaption(!showCaption)}
              className="text-copy-light text-sm font-normal leading-tight"
            >
              <Link href={`/post/${post._id}`}>
                {showCaption ? "show less" : "read more"}
              </Link>
            </button>
          </div>
          {isHover && (
            <div className="py-1 flex items-center justify-between">
              <button onClick={onVideoPress}>
                {playing ? (
                  <BsFillPauseFill className="text-2xl text-copy" />
                ) : (
                  <BsFillPlayFill className="text-2xl text-copy" />
                )}
              </button>
              <button onClick={onVideoMute}>
                {isVideoMuted ? (
                  <HiVolumeOff className="text-2xl text-copy" />
                ) : (
                  <HiVolumeUp className="text-2xl text-copy" />
                )}
              </button>
            </div>
          )}
        </div>
      </div>
      <div className="w-16 h-full flex flex-col justify-center items-center gap-4 p-2">
        <ul className="h-full flex flex-col items-center justify-end gap-4">
          <li className="w-12 h-12 bg-white rounded-full">
            <Link href="/">
              <Image
                src={post.postedBy?.image}
                alt={post.postedBy?.userName}
                layout="responsive"
                width={60}
                height={60}
                className="rounded-full"
              />
            </Link>
            <span className="absolute -bottom-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-6 h-6 bg-red-500 hover:bg-red-700 rounded-full flex items-center justify-center cursor-pointer">
              <GoPlus className="text-white" />
            </span>
          </li>
          <li className="cursor-pointer">
            <div className="w-12 h-12 bg-[#ffffff1f] hover:bg-[#ffffff11] rounded-full flex items-center justify-center">
              <FaHeart className="text-white text-xl" />
            </div>
            <span className="mt-3 block text-copy-lighter text-xs font-semibold leading-tight text-center">
              44.3K
            </span>
          </li>
          <li className="cursor-pointer">
            <div className="w-12 h-12 bg-[#ffffff1f] hover:bg-[#ffffff11] rounded-full flex items-center justify-center">
              <FaCommentDots className="text-white text-xl" />
            </div>
            <span className="mt-3 block text-copy-lighter text-xs font-semibold leading-tight text-center">
              44.3K
            </span>
          </li>
          <li className="cursor-pointer">
            <div className="w-12 h-12 bg-[#ffffff1f] hover:bg-[#ffffff11] rounded-full flex items-center justify-center">
              <FaBookmark className="text-white text-xl" />
            </div>
            <span className="mt-3 block text-copy-lighter text-xs font-semibold leading-tight text-center">
              44.3K
            </span>
          </li>
          <li className="cursor-pointer">
            <div className="w-12 h-12 bg-[#ffffff1f] hover:bg-[#ffffff11] rounded-full flex items-center justify-center">
              <IoIosShareAlt className="text-white text-xl" />
            </div>
            <span className="mt-3 block text-copy-lighter text-xs font-semibold leading-tight text-center">
              44.3K
            </span>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default PostCard;
