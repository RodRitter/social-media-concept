import { getSession } from "next-auth/react";
import { ObjectId } from "bson";
import { connectToDatabase } from "../../lib/mongodb";

// eslint-disable-next-line import/no-anonymous-default-export
export default async (req, res) => {
    const session = await getSession({ req });

    if (session) {
        const {
            method,
            query: { postId },
        } = req;

        const { db } = await connectToDatabase();
        const { _id } = session.user;

        switch (method) {
            case "POST":
                const parsedBody = JSON.parse(req.body);
                const { postId } = parsedBody;

                // fetch likes
                const likedPost = await db
                    .collection("posts")
                    .findOne({ _id: ObjectId(postId) });

                if (likedPost && likedPost.likes) {
                    const match = likedPost.likes.find((likeUser) => {
                        return likeUser === _id;
                    });

                    if (!match) {
                        // add user to like list
                        const newList = [...likedPost.likes, _id];

                        const newPost = await db
                            .collection("posts")
                            .updateOne(
                                { _id: ObjectId(postId) },
                                { $set: { likes: newList } }
                            );

                        return res.status(200).json({
                            post: newPost,
                        });
                    } else {
                        // remove from list
                        const newList = likedPost.likes.filter(
                            (likeUser) => likeUser !== _id
                        );

                        const newPost = await db
                            .collection("posts")
                            .updateOne(
                                { _id: ObjectId(postId) },
                                { $set: { likes: newList } }
                            );

                        return res.status(200).json({
                            post: newPost,
                        });
                    }

                    return res.status(200).json({
                        post: likedPost,
                    });
                }
                // check if this user has already liked
                // toggle on/off
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
