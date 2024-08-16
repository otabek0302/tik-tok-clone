import { singleUserQuery, userCreatedPostsQuery, userLikedPostsQuery } from '@/utils/queries';
import { client } from '@/utils/sanity';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.pathname.split('/').pop();

        if (!id || typeof id !== 'string') {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }


        const query = singleUserQuery(id);
        const userVideosQuery = userCreatedPostsQuery(id)
        const userLikedVideosQuery = userLikedPostsQuery(id);

        const user = await client.fetch(query);
        const userVideos = await client.fetch(userVideosQuery);
        const userLikedVideos = await client.fetch(userLikedVideosQuery);

        const data = { user: user[0], userVideos, userLikedVideos };

        if (!data) {
            return NextResponse.json({ error: 'Profile not found' }, { status: 404 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching post details:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}