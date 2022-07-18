import React, { useState, useEffect } from "react";
import useSWR from "swr";
import { useStore } from "../lib/StoreProvider";
import { useSnackbar } from "../lib/SnackbarProvider";

const STORE_KEY = "posts";

export const usePosts = () => {
    const [feedType, setFeedType] = useState("public");
    const [fetchingPosts, setFetchingPosts] = useState(false);
    const { store, setStore } = useStore();
    const { setSnackbarOpen, setSnackbarContent, setSnackbarVariant } =
        useSnackbar();

    const fetchPosts = (hard) => {
        if (!fetchingPosts) {
            if (hard) {
                setStore(STORE_KEY, []);
            }
            setFetchingPosts(true);
            fetch(`/api/post?feed=${feedType}`, {
                method: "GET",
                mode: "cors",
            })
                .then((result) => result.json())
                .then((res) => {
                    if (res.error) {
                        setSnackbarVariant("error");
                        setSnackbarContent(res.error);
                        setSnackbarOpen(true);
                    } else if (res.posts) {
                        setStore(STORE_KEY, res.posts);
                    }
                })
                .finally(() => {
                    setFetchingPosts(false);
                });
        }
    };

    const fetcher = () => fetchPosts();
    const { data, error } = useSWR("/api/user", fetcher, {
        refreshInterval: 5000,
    });

    const likePost = (postId) => {
        fetch(`/api/like`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ postId }),
        })
            .then((result) => result.json())
            .then((res) => {
                fetchPosts();
            })
            .finally(() => {});
    };

    return {
        fetchingPosts,
        setFeedType,
        feedType,
        fetchPosts,
        posts: store[STORE_KEY],
        likePost,
    };
};
