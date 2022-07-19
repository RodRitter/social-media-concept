import { getSession } from "next-auth/react";
import { ObjectId } from "bson";
import { connectToDatabase } from "../../lib/mongodb";
import { POST_MAX_CHARS, POST_RATE_LIMIT, POST_FEEDS } from "../../globals";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const session = await getSession({ req });

    if (session) {
        const {
            method,
            query: { feed },
        } = req;

        const { db } = await connectToDatabase();
        const { _id } = session.user;

        switch (method) {
            case "GET":
                let findQuery;
                switch (feed) {
                    case POST_FEEDS.PUBLIC:
                        findQuery = {};
                        break;
                    case POST_FEEDS.FOLLOWING:
                        findQuery = {};
                        break;
                    default:
                        findQuery = { userId: ObjectId(_id) };
                }

                const posts = await db
                    .collection("posts")
                    .aggregate([
                        { $match: findQuery },
                        {
                            $lookup: {
                                from: "users",
                                localField: "userId",
                                foreignField: "_id",
                                as: "author",
                            },
                        },
                    ])
                    .sort({ date: -1 })
                    .limit(50)
                    .toArray();

                return res.status(200).json({
                    posts,
                });
            case "POST":
                // Post rate limiter (anti-spam)
                const latestPost = await db
                    .collection("posts")
                    .find({ userId: ObjectId(_id) })
                    .sort({ date: -1 })
                    .limit(1)
                    .toArray();

                if (latestPost.length > 0) {
                    const _post = latestPost[0];
                    const dateDiff = new Date() - _post.date;
                    const secondsSinceLast = dateDiff / 1000;

                    if (secondsSinceLast < POST_RATE_LIMIT) {
                        return res.status(400).json({
                            error: "RATE_LIMITED",
                            secondsLeft: POST_RATE_LIMIT - secondsSinceLast,
                        });
                    }
                }

                const { post } = JSON.parse(req.body);

                // Post characters length
                if (post.length === 0 || post.length > POST_MAX_CHARS) {
                    return res.status(400).json({
                        error: "POST_CHARACTER_LENGTH",
                        secondsLeft: POST_RATE_LIMIT - secondsSinceLast,
                    });
                }

                const insertedPost = db.collection("posts").insertOne({
                    userId: ObjectId(_id),
                    post,
                    likes: [],
                    date: new Date(),
                });

                return res.status(200).json({
                    post: insertedPost,
                });
            case "DELETE":
                const { postId } = JSON.parse(req.body);

                // Check if this user owns the post
                const deletedPost = await db
                    .collection("posts")
                    .deleteOne({
                        _id: ObjectId(postId),
                        userId: ObjectId(_id),
                    });

                return res.status(200).json({
                    deleted: deletedPost,
                });

                return res.status(400).json({
                    error: "NOT_ALLOWED",
                });

                break;
            default:
                return res.status(400).json({
                    error: "INVALID_METHOD",
                    session,
                });
        }
    } else {
        res.status(400).json({
            error: "NO_SESSION",
            session,
        });
    }
};
