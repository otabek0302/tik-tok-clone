import { Dispatch, SetStateAction } from "react";
import { IUser } from "../../../types";
import { GoVerified } from "react-icons/go";

import useAuthStore from "../../../store/authStore";
import Link from "next/link";
import Image from "next/image";
import NoResults from "./NoResults";

interface IProps {
  isPostingComment: Boolean;
  comment: string;
  setComment: Dispatch<SetStateAction<string>>;
  addComment: (e: React.FormEvent) => void;
  comments: IComment[];
}

interface IComment {
  comment: string;
  length?: number;
  _key: string;
  postedBy: { _ref?: string; _id?: string };
}

const Comments = ({
  comment,
  setComment,
  addComment,
  comments,
  isPostingComment,
}: IProps) => {
  const { userProfile, allUsers }: any = useAuthStore();

  return (
    <div className="border-t-[0.2px] border-white mt-4 lg:pb-0 pb-[100px]">
      <div className="overflow-scroll lg:h-[457px]">
        {comments?.length > 0 ? (
          comments?.map((item: IComment) => {
            const user = allUsers?.find(
              (user: IUser) =>
                user._id === (item.postedBy._ref || item.postedBy._id)
            );
            if (user) {
              return (
                <div className="p-2 items-center" key={item._key}>
                  <Link href={`/profile/${user._id}`}>
                    <div className="flex items-start gap-3">
                      <div className="w-12 h-12">
                        <Image
                          width={48}
                          height={48}
                          className="rounded-full cursor-pointer"
                          src={user.image}
                          alt="user-profile"
                          layout="responsive"
                        />
                      </div>
                      <p className="flex cursor-pointer gap-1 items-center text-copy text-base font-bold leading-6">
                        {user.userName} <GoVerified className="text-blue-400" />
                      </p>
                    </div>
                  </Link>
                  <div>
                    <p className="-mt-5 ml-16 text-[16px] mr-8 text-copy-lighter text-sm">
                      {item.comment}
                    </p>
                  </div>
                </div>
              );
            }
            return null;
          })
        ) : (
          <NoResults text="No Comments Yet! Be First to do add the comment." />
        )}
      </div>
      {userProfile && (
        <form onSubmit={addComment} className="flex flex-col gap-3">
          <input
            value={comment}
            onChange={(e) => setComment(e.target.value)}
            className="px-3 py-2 h-20 text-md font-normal border-2 focus:outline-none focus:border-2 focus:border-gray-300 rounded-xl"
            placeholder="Add comment.."
          />
          <button
            className="bg-white rounded-xl py-2.5 text-dark text-base"
            onClick={addComment}
          >
            {isPostingComment ? "Commenting..." : "Add"}
          </button>
        </form>
      )}
    </div>
  );
};

export default Comments;
