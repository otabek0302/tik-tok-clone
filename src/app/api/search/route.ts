import { NextRequest, NextResponse } from 'next/server';
import { searchPostsQuery } from '@/utils/queries';
import { client } from '@/utils/sanity';

export async function GET(request: NextRequest) {
    try {
        // Extract and validate the query parameter
        const { searchParams } = new URL(request.url);
        const query = searchParams.get('query');

        if (!query || typeof query !== 'string') {
            return NextResponse.json({ error: 'Invalid search key' }, { status: 400 });
        }

        console.log(query);

        // Fetch data using the query
        const queryStr = searchPostsQuery(query);
        const data = await client.fetch(queryStr);

        if (data.length === 0) {
            return NextResponse.json({ error: 'No results found' }, { status: 404 });
        }

        return NextResponse.json(data, { status: 200 });
    } catch (error) {
        console.error('Error fetching post details:', error);
        return NextResponse.json({ error: 'Internal server error' }, { status: 500 });
    }
}