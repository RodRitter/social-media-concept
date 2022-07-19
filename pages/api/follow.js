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
            case "GET":
                const userData = await db
                    .collection("users")
                    .findOne({ _id: ObjectId(_id) });

                const followIds = userData.following || [];
                const followObjIds = followIds.map((fid) => ObjectId(fid));
                const followArr = await db
                    .collection("users")
                    .find({ _id: { $in: followObjIds } })
                    .toArray();

                // Convert to object mapped by _id
                // const followData = followArr.reduce(
                //     (a, v) => ({ ...a, [v._id]: v }),
                //     {}
                // );

                return res.status(200).json({
                    following: userData.following || [],
                    followingData: followArr || [],
                });
            case "POST":
                const parsedBody = JSON.parse(req.body);
                const { followId } = parsedBody;
                let isFollow = false;

                const sessionUser = await db
                    .collection("users")
                    .findOne({ _id: ObjectId(_id) });

                let newFollowing = [];
                if (sessionUser.following) {
                    const match = sessionUser.following.find(
                        (f) => f === followId
                    );

                    if (match) {
                        // Remove from array
                        const filtered = sessionUser.following.filter(
                            (f) => f !== followId
                        );
                        newFollowing = filtered;
                    } else {
                        // add
                        isFollow = true;
                        newFollowing = [...sessionUser.following, followId];
                    }
                } else {
                    isFollow = true;
                    newFollowing = [followId];
                }

                await db
                    .collection("users")
                    .updateOne(
                        { _id: ObjectId(_id) },
                        { $set: { following: newFollowing } }
                    );

                const updated = await db
                    .collection("users")
                    .findOne({ _id: ObjectId(followId) });

                return res.status(200).json({
                    user: updated,
                    isFollowing: isFollow,
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
