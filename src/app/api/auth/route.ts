import { client } from "@/utils/sanity";

interface UserResponse {
    _id: string;
    _type: string;
    userName: any;
    image: any;
}

export async function POST(request: Request, response: Response) {
    try {
        const user = await request.json();

        if (!user) {
            return new Response("Interval Error", {
                status: 400,
            })
        }

        const result = await client.createOrReplace({
            _type: 'user',
            _id: user.username,
            ...user
        });

        const response: UserResponse = {
            _id: result._id,
            _type: result._type,
            userName: result.userName,
            image: result.image
        };

        const responseBodyJson = JSON.stringify(response);

        return new Response(responseBodyJson, {
            status: 200,
            headers: {
                'Content-Type': 'application/json'
            }
        });

    } catch (error) {
        return new Response("Th server is error.", { status: 500 });
    }
}