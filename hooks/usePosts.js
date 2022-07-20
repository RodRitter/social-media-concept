import React, { useState, useEffect } from "react";
import { useStore } from "../lib/StoreProvider";
import { useFollows } from "./useFollows";
import { POST_FEEDS } from "../globals";

const fetcher = (url, method, onResult) => {
    fetch(url, {
        method: method,
        mode: "cors",
    })
        .then((result) => result.json())
        .then(onResult);
};

const POSTS_STORE_KEY = "posts";

export const usePosts = () => {
    const { store, setStore } = useStore();
    const [loading, setLoading] = useState(false);
    const [loadingLike, setLoadingLike] = useState(false);
    const [feedType, setFeedType] = useState(POST_FEEDS.PUBLIC);
    const { getFollows } = useFollows();

    const fetchPosts = (callback) => {
        setLoading(true);
        fetch(`/api/post?feed=${feedType}`, {
            method: "GET",
            mode: "cors",
        })
            .then((result) => result.json())
            .then((res) => {
                setStore(POSTS_STORE_KEY, res.posts);
                if (callback) callback(res);
            })
            .finally(() => setLoading(false));
    };

    useEffect(() => {
        fetchPosts();
        getFollows();
    }, [feedType]);

    const createPost = (post, callback) => {
        setLoading(true);
        fetch(`/api/post`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ post }),
        })
            .then((result) => result.json())
            .then((res) => {
                if (callback) callback(res);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    const likePost = (postId, callback) => {
        setLoadingLike(true);
        fetch(`/api/like`, {
            method: "POST",
            mode: "cors",
            body: JSON.stringify({ postId }),
        })
            .then((result) => result.json())
            .then((res) => {
                callback(res);
                setLoadingLike(false);
            });
    };

    const deletePost = (postId, callback) => {
        setLoading(true);
        fetch(`/api/post`, {
            method: "DELETE",
            mode: "cors",
            body: JSON.stringify({ postId }),
        })
            .then((result) => result.json())
            .then((res) => {
                if (callback) callback(res);
            })
            .finally(() => {
                setLoading(false);
            });
    };

    return {
        loading,
        posts: store[POSTS_STORE_KEY],
        fetchPosts,
        createPost,
        likePost,
        loadingLike,
        feedType,
        setFeedType,
        deletePost,
    };
};
