import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { usePosts } from "../hooks/usePosts";
import Button from "../components/Button";
import Post from "./Post";

const PostListWrapper = styled.div``;

const SelectGroup = styled.div`
    > button {
        display: inline-block;
        border-radius: 0;
    }
    > button:first-child {
        border-right: none;
        border-radius: 5px 0 0 5px;
    }

    > button:last-child {
        border-left: none;
        border-radius: 0 5px 5px 0;
    }
`;
const SelectButton = styled(Button)``;

const PostsWrapper = styled.div`
    margin-top: 30px;
`;

const PostList = ({ heading }) => {
    const {
        fetchingPosts,
        setFeedType,
        feedType,
        fetchPosts,
        posts,
        likePost,
    } = usePosts();

    useEffect(() => {
        fetchPosts(true);
    }, []);

    useEffect(() => {
        fetchPosts(true);
    }, [feedType]);

    const switchFeed = (feed) => {
        if (!fetchingPosts) {
            setFeedType(feed);
        }
    };

    return (
        <PostListWrapper>
            <h1>{heading}</h1>
            <SelectGroup>
                <SelectButton
                    variant={feedType !== "user" && "secondary"}
                    onClick={() => switchFeed("user")}
                >
                    Your posts
                </SelectButton>
                <SelectButton
                    variant={feedType !== "friends" && "secondary"}
                    onClick={() => switchFeed("friends")}
                >
                    Your friends
                </SelectButton>
                <SelectButton
                    variant={feedType !== "public" && "secondary"}
                    onClick={() => switchFeed("public")}
                >
                    Public
                </SelectButton>
            </SelectGroup>
            <PostsWrapper>
                {posts &&
                    posts.map((post) => {
                        return (
                            <Post
                                key={post._id}
                                postAuthorId={post.userId}
                                author={post.author[0]}
                                date={post.date}
                                likes={post.likes}
                                likePost={() => likePost(post._id)}
                            >
                                {post.post}
                            </Post>
                        );
                    })}
            </PostsWrapper>
        </PostListWrapper>
    );
};

export default PostList;
