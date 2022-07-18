import { getSession } from "next-auth/react";
import { connectToDatabase } from "../../lib/mongodb";
import { POST_MAX_CHARS, POST_RATE_LIMIT } from "../../globals";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const session = await getSession({ req });

    if (session) {
        const {
            method,
            query: { post },
        } = req;

        const { db } = await connectToDatabase();

        switch (method) {
            case "GET":
                if (session) {
                    // Get posts for user
                } else {
                    // Get public posts
                }
                break;
            case "POST":
                const { _id } = session.user;

                // Post rate limiter (anti-spam)
                const latestPost = await db
                    .collection("posts")
                    .find({ userId: _id })
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

                const parsedBody = JSON.parse(req.body);
                const { post } = parsedBody;

                // Post characters length
                if (post.length === 0 || post.length > POST_MAX_CHARS) {
                    return res.status(400).json({
                        error: "POST_CHARACTER_LENGTH",
                        secondsLeft: POST_RATE_LIMIT - secondsSinceLast,
                    });
                }

                const insertedPost = db.collection("posts").insertOne({
                    userId: _id,
                    post,
                    date: new Date(),
                });

                res.status(200).json({
                    post: insertedPost,
                    session,
                });
                break;
            default:
                break;
        }
    } else {
        res.status(400).json({
            error: "NO_SESSION",
            session,
        });
    }
};
