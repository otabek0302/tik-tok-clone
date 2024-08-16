"use client";
import { useEffect, useRef, useState, useCallback } from "react";
import { Video } from "../../../types";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../../../store/authStore";
import Image from "next/image";
import LikeButton from "./LikeButton";
import Comments from "./Comments";
import axios from "axios";
import { CiPlay1 } from "react-icons/ci";
import { BsFillPauseFill, BsFillPlayFill } from "react-icons/bs";
import { HiVolumeOff, HiVolumeUp } from "react-icons/hi";

interface IUserProfile {
  _id: string;
}

interface IProps {
  postDetails: any;
}

const PostDetails = ({ postDetails }: IProps) => {
  const [playing, setPlaying] = useState(false);
  const [isVideoMuted, setIsVideoMuted] = useState(false);
  const [comment, setComment] = useState<string>("");
  const [isPostingComment, setIsPostingComment] = useState<boolean>(false);
  const [post, setPost] = useState<Video>(postDetails);

  const videoRef = useRef<HTMLVideoElement>(null);
  const { userProfile }: { userProfile: IUserProfile | null } = useAuthStore();

  const onVideoPress = useCallback(() => {
    if (playing) {
      videoRef.current?.pause();
    } else {
      videoRef.current?.play();
    }
    setPlaying(!playing);
  }, [playing]);

  const onVideoMute = useCallback(() => {
    if (videoRef.current) {
      videoRef.current.muted = !isVideoMuted;
    }
    setIsVideoMuted(!isVideoMuted);
  }, [isVideoMuted]);

  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.muted = isVideoMuted;
    }
  }, [isVideoMuted]);

  const handleLike = useCallback(
    async (like: boolean) => {
      if (userProfile && post) {
        try {
          const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
          const res = await axios.put(`${BASE_URL}/api/like`, {
            userId: userProfile._id,
            postId: post._id,
            like,
          });

          setPost((prevPost) => {
            if (!prevPost) return prevPost;
            return { ...prevPost, likes: res.data.likes };
          });
        } catch (error) {
          console.error("Failed to like the post:", error);
        }
      }
    },
    [userProfile, post]
  );

  const addComment = async (e: { preventDefault: () => void }) => {
    e.preventDefault();

    if (userProfile && post && comment.trim()) {
      setIsPostingComment(true);
      try {
        const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL;
        const res = await axios.put(`${BASE_URL}/api/post/${post._id}`, {
          userId: userProfile._id,
          comment,
        });

        if (post) {
          setPost({
            ...post,
            comments: res.data.comments,
          });
        }

        setComment("");
      } catch (error) {
        console.error("Failed to add a comment:", error);
      } finally {
        setIsPostingComment(false);
      }
    }
  };

  return (
    <div className="flex flex-col md:flex-row">
      <div className="flex-1">
        <div className="relative w-[200px] lg:w-[480px] h-[80vh] mx-auto rounded-2xl overflow-hidden">
          <div className="h-full relative">
            <video
              ref={videoRef}
              onClick={onVideoPress}
              loop
              src={post.video?.asset?.url}
              className="h-full w-full object-cover cursor-pointer"
              aria-label="Video"
            ></video>
            {!playing && (
              <div className="absolute inset-0 flex justify-center items-center bg-black bg-opacity-45">
                <button
                  onClick={onVideoPress}
                  aria-label="Play video"
                  className="bg-white bg-opacity-70 w-16 h-16 p-2 flex justify-center items-center rounded-full shadow-lg"
                >
                  <CiPlay1 className="text-xl fill-black" />
                </button>
              </div>
            )}
            <div className="w-full absolute bottom-0 z-20 bg-gradient-to-t from-black p-5">
              {playing && (
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
            {userProfile && (
              <LikeButton
                likes={post.likes}
                handleLike={() => handleLike(true)}
                handleDislike={() => handleLike(false)}
              />
            )}
          </div>
        </div>
      </div>

      <div className="max-w-md w-full h-full bg-white bg-opacity-10 rounded-s-xl p-7">
        <div className="flex gap-4 mb-4 w-full cursor-pointer items-center">
          <Image
            width={60}
            height={60}
            alt="User profile"
            className="rounded-full"
            src={post.postedBy.image || "/avatar.png"}
            aria-label="User profile image"
          />
          <div>
            <div className="text-copy text-xl font-bold lowercase tracking-wider flex gap-2 items-center">
              <span>{post.postedBy.userName.replace(/\s+/g, "")}</span>
              <GoVerified
                className="text-blue-400 text-xl"
                aria-label="Verified user"
              />
            </div>
            <p className="text-copy-light text-sm">{post.postedBy.userName}</p>
          </div>
        </div>
        <div className="mb-4">
          <p className="text-md text-copy-lighter">{post.caption}</p>
        </div>
        <div className="relative">
          <Comments
            comment={comment}
            setComment={setComment}
            addComment={addComment}
            comments={post.comments}
            isPostingComment={isPostingComment}
          />
        </div>
      </div>
    </div>
  );
};

export default PostDetails;
