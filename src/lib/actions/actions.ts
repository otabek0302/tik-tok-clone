import { allPostsQuery, postDetailQuery } from "@/utils/queries";
import { client } from "@/utils/sanity";

export const fetchPosts = async () => {
    try {
        const query = allPostsQuery();
        const data = await client.fetch(query);
        return data;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
};