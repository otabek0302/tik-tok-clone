import { client } from '@/utils/sanity';
import { NextResponse } from 'next/server';
import { v4 as uuidv4 } from 'uuid';

export async function PUT(request: Request) {
    try {
        const { userId, postId, like } = await request.json();

        if (!postId || !userId) {
            return NextResponse.json({ error: 'Post id and User id are required' }, { status: 400 });
        }

        if (!postId || typeof postId !== 'string') {
            return NextResponse.json({ error: 'Invalid post ID' }, { status: 400 });
        }

        const data =
            like
                ? await client.patch(postId).setIfMissing({ likes: [] })
                    .insert('after', 'likes[-1]', [
                        {
                            _key: uuidv4(),
                            _ref: userId,
                        },
                    ]).commit()
                : await client.patch(postId).unset([`likes[_ref=="${userId}"]`]).commit();

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error updating post comments:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}