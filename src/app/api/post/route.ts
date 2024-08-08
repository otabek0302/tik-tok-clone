import { allPostsQuery } from '@/utils/queries';
import { client } from '@/utils/sanity';

interface PostResponse {
    doc: any;
}

export async function GET() {
    try {
        const query = allPostsQuery();
        const data = await client.fetch(query);

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error fetching posts:', error);
        return new Response("Server error.", { status: 500 });
    }
}

export async function POST(request: Request) {
    try {
        const doc = await request.json();

        await client.create(doc);

        return new Response(JSON.stringify(doc), {
            status: 201, // Status code for resource creation
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error creating document:', error);
        return new Response("Server error.", { status: 500 });
    }
}