import PostCard from "@/components/ui/PostCard";
import { fetchPosts } from "@/lib/actions/actions";
import { Post } from "@/lib/types";

export default async function Home() {
  const data = await fetchPosts().then((posts) => {
    return posts;
  });

  return (
    <div className="flex flex-col gap-10 videos h-full">
      {data.length ? (
        data?.map((post: Post) => (
          <PostCard postDetails={post} isShowingOnHome key={post._id} />
        ))
      ) : (
        <div className="w-full h-screen flex justify-center items-center">
          <h1 className="text-copy-light text-4xl font-semibold leading-normal">
            There no Videos
          </h1>
        </div>
      )}
    </div>
  );
}
