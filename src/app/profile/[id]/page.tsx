import ProfileDetails from "@/components/ui/ProfileDetails";

export interface User {
  _id: string;
  _type: string;
  userName: string;
  image: string;
}

interface UserParams {
  params: {
    id: string;
  };
}

export async function generateStaticParams() {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Ensure BASE_URL is defined
  try {
    const res = await fetch(`${BASE_URL}/profile`);
    
    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }
    const data: User[] = await res.json();

    return data.map((user) => ({
      id: user._id.toString(),
    }));
  } catch (error) {
    console.error("Error generating static params:", error);
    return []; // Return an empty array in case of error
  }
}

// Fetch the post data based on the ID
async function getProfile(id: string) {
  const BASE_URL = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:3000"; // Ensure BASE_URL is defined
  try {
    const res = await fetch(`${BASE_URL}/api/profile/${id}`);
    if (!res.ok) {
      throw new Error("Failed to fetch profile");
    }
    const post: User = await res.json();
    return post;
  } catch (error) {
    console.error("Error fetching profile:", error);
    return null;
  }
}

export default async function Post({ params }: UserParams) {
  const { id } = params;
  const profile = await getProfile(id);

  if (!profile) {
    return <h1>Profile not found</h1>;
  }

  return (
    <div>
      <ProfileDetails profile={profile} />
    </div>
  );
}
