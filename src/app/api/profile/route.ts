import { allUsersQuery } from '@/utils/queries';
import { client } from '@/utils/sanity';

export async function GET() {
    try {
        const query = allUsersQuery();
        const data = await client.fetch(query);

        return new Response(JSON.stringify(data), {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });
    } catch (error) {
        console.error('Error fetching users:', error);
        return new Response("Server error.", { status: 500 });
    }
}