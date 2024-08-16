import PostDetails from "@/components/ui/PostDetails";

interface Post {
  _id: string;
  video: {
    asset: {
      url: string;
    };
  };
  postedBy: {
    _id: string;
    image: string;
    userName: string;
  };
  caption: string;
  likes: any[];
  comments: any[];
}

interface PostParams {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Ensure BASE_URL is defined
  try {
    const res = await fetch(`${BASE_URL}/api/post`);
    if (!res.ok) {
      throw new Error("Failed to fetch posts");
    }
    const data: Post[] = await res.json();

    return data.map((post) => ({
      id: post._id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return []; // Return an empty array in case of error
  }
}

// Fetch the post data based on the ID
async function getPost(id: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Ensure BASE_URL is defined
  try {
    const res = await fetch(`${BASE_URL}/api/post/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch post");
    }
    const post: Post = await res.json();
    return post;
  } catch (error) {
    console.error("Error fetching post:", error);
    return null;
  }
}

export default async function Post({ params }: PostParams) {
  const { id } = params;
  const post = await getPost(id);

  if (!post) {
    return <h1>Post not found</h1>;
  }

  return (
    <div>
        <PostDetails postDetails={post} />
    </div>
  );
}
