import { useEffect, useState } from "react";
import { NextPage } from "next";

import useAuthStore from "../../../store/authStore";
import { FaHeart } from "react-icons/fa";

interface IProps {
  likes: any;
  handleLike: () => void;
  handleDislike: () => void;
  fixed: boolean;
}

const LikeButton: NextPage<IProps> = ({
  likes,
  handleLike,
  handleDislike,
  fixed
}) => {
  const [alreadyLiked, setAlreadyLiked] = useState(false);
  const { userProfile }: any = useAuthStore();
  let filterLikes = likes?.filter(
    (item: any) => item._ref === userProfile?._id
  );

  useEffect(() => {
    if (filterLikes?.length > 0) {
      setAlreadyLiked(true);
    } else {
      setAlreadyLiked(false);
    }
  }, [filterLikes, likes]);

  return (
    <div className={`${fixed ? "block" : "absolute top-0 right-4 gap-6 mt-4"} `}>
      <div className="flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <button onClick={handleDislike}>
            <FaHeart className="text-xl md:text-xl fill-red-600" />
          </button>
        ) : (
          <button onClick={handleLike}>
            <FaHeart className="text-xl md:text-xl fill-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LikeButton;
