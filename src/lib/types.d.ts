export interface Post {
    caption: string;
    video: {
        asset: {
            _id: string;
            url: string;
        };
    };
    _id: string;
    postedBy: {
        _id: string;
        userName: string;
        image: string;
    };
    likes: {
        postedBy: {
            _id: string;
            userName: string;
            image: string;
        };
    }[];
    comments: {
        comment: string;
        _key: string;
        postedBy: {
            _ref: string;
        };
    }[];
    userId: string;
}

