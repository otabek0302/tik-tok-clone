import { useEffect, useState } from "react";
import { MdFavorite } from "react-icons/md";
import { NextPage } from "next";

import useAuthStore from "../../../store/authStore";

interface IProps {
  likes: any;
  handleLike: () => void;
  handleDislike: () => void;
}

const LikeButton: NextPage<IProps> = ({
  likes,
  handleLike,
  handleDislike,
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
    <div className={'absolute top-0 right-4 gap-6'}>
      <div className="mt-4 flex flex-col justify-center items-center cursor-pointer">
        {alreadyLiked ? (
          <button onClick={handleDislike}>
            <MdFavorite className="text-xl md:text-3xl fill-red-600" />
          </button>
        ) : (
          <button onClick={handleLike}>
            <MdFavorite className="text-xl md:text-3xl fill-white" />
          </button>
        )}
      </div>
    </div>
  );
};

export default LikeButton;
