import { postDetailQuery } from '@/utils/queries';
import { client } from '@/utils/sanity';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

// Function to handle GET requests
export async function GET(request: Request) {
    try {
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!id || typeof id !== 'string') {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const query = postDetailQuery(id);
        const data = await client.fetch(query);

        if (data.length === 0) {
            return NextResponse.json({ error: 'Post not found' }, { status: 404 });
        }

        return NextResponse.json(data[0], { status: 200 });
    } catch (error) {
        console.error('Error fetching post details:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}

// Function to handle PUT requests
export async function PUT(request: Request) {
    try {
        const { comment, userId } = await request.json();
        const url = new URL(request.url);
        const id = url.searchParams.get('id');

        if (!comment || !userId) {
            return NextResponse.json({ error: 'Comment and userId are required' }, { status: 400 });
        }

        if (!id || typeof id !== 'string') {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const data = await client
            .patch(id)
            .setIfMissing({ comments: [] })
            .insert('after', 'comments[-1]', [
                {
                    comment,
                    _key: uuidv4(),
                    postedBy: { _type: 'postedBy', _ref: userId },
                },
            ])
            .commit();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error updating post comments:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}