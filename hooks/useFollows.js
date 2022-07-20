import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useStore } from "../lib/StoreProvider";
import { useSnackbar } from "../lib/SnackbarProvider";

const FOLLOWS_STORE_KEY = "following";

export const useFollows = () => {
    const [loading, setLoading] = useState(false);
    const { store, setStore, following, setFollowing } = useStore();
    const { setSnackbarOpen, setSnackbarContent, setSnackbarVariant } =
        useSnackbar();

    const getFollows = (callback) => {
        fetch("/api/follow", {
            method: "GET",
            mode: "cors",
        })
            .then((result) => result.json())
            .then((res) => {
                if (!res.error && res.following) {
                    setFollowing({
                        follows: res.following,
                        followData: res.followingData,
                    });
                    if (callback) callback(res);
                }
            });
    };

    const followUnfollow = (userId, callback) => {
        setLoading(true);
        fetch("/api/follow", {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ followId: userId }),
        })
            .then((result) => result.json())
            .then((res) => {
                if (!res.error && res.user) {
                    setSnackbarVariant(
                        `${res.isFollowing ? "success" : "error"}`
                    );

                    setSnackbarContent(
                        `${
                            res.isFollowing ? "Following" : "Stopped following"
                        } ${res.user.name}`
                    );

                    setSnackbarOpen(true);
                }
                if (callback) callback(res);
                setLoading(false);
            });
    };

    return {
        followUnfollow,
        getFollows,
        follows: following.follows || [],
        followData: following.followData || [],
        loading,
    };
};
