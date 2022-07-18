import { getSession } from "next-auth/react";
import { ObjectId } from "bson";
import { connectToDatabase } from "../../lib/mongodb";
import { POST_MAX_CHARS, POST_RATE_LIMIT } from "../../globals";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const session = await getSession({ req });

    if (session) {
        const {
            method,
            query: { post, feed },
        } = req;

        const { db } = await connectToDatabase();
        const { _id } = session.user;

        switch (method) {
            case "GET":
                let findQuery;
                switch (feed) {
                    case "public":
                        findQuery = {};
                        break;
                    case "friends":
                    // Mongodb: find( { _id : { $in : [1,2,3,4] } } );
                    // Search for friends
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
                    .limit(10)
                    .sort({ date: -1 })
                    .toArray();

                return res.status(200).json({
                    posts,
                    info: req.query,
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

                    console.log(secondsSinceLast, POST_RATE_LIMIT);

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
                    userId: ObjectId(_id),
                    post,
                    likes: [],
                    date: new Date(),
                });

                return res.status(200).json({
                    post: insertedPost,
                });
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
