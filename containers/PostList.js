import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";

import { Loader } from "react-feather";
import { usePosts } from "../hooks/usePosts";
import { useTheme } from "../lib/ThemeProvider";
import { useFollows } from "../hooks/useFollows";
import { POST_FEEDS, FEED_REFRESH_INTERVAL } from "../globals";
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

const loadingIntro = keyframes`
  0% {
    height: 0;
  }

  50% {
    height: 0;
  }

  100% {
    height: 80px;
  }
`;

const loadingSpinner = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const Loading = styled.div`
    overflow: hidden;
    height: 80px;
    font-size: 1rem;
    animation: ${loadingIntro} 0.1s ease-in-out;
    text-align: center;

    > div {
        color: ${({ theme }) => theme.lightText};
        line-height: 20px;
        margin-left: 10px;
    }

    > svg {
        width: 20px;
        height: 20px;
        animation: ${loadingSpinner} 1.2s linear infinite;
    }
`;

const PostList = ({ heading }) => {
    const {
        fetchPosts,
        posts,
        likePost,
        deletePost,
        feedType,
        setFeedType,
        loading,
        loadingLike,
    } = usePosts();

    const { getFollows, follows } = useFollows();
    const { theme } = useTheme();

    return (
        <PostListWrapper>
            <h1>{heading}</h1>
            <SelectGroup>
                <SelectButton
                    variant={feedType !== POST_FEEDS.USER && "secondary"}
                    onClick={() => {
                        setFeedType(POST_FEEDS.USER);
                    }}
                >
                    Your posts
                </SelectButton>
                <SelectButton
                    variant={feedType !== POST_FEEDS.FOLLOWING && "secondary"}
                    onClick={() => {
                        setFeedType(POST_FEEDS.FOLLOWING);
                    }}
                >
                    Following
                </SelectButton>
                <SelectButton
                    variant={feedType !== POST_FEEDS.PUBLIC && "secondary"}
                    onClick={() => {
                        setFeedType(POST_FEEDS.PUBLIC);
                    }}
                >
                    Public
                </SelectButton>
            </SelectGroup>
            <PostsWrapper>
                {loading && (
                    <Loading theme={theme}>
                        <Loader />
                        <div>Fetching posts</div>
                    </Loading>
                )}
                {posts &&
                    posts.map((post) => {
                        return (
                            <Post
                                key={post._id}
                                postAuthorId={post.userId}
                                author={post.author[0]}
                                date={post.date}
                                likes={post.likes}
                                likePost={() => {
                                    likePost(post._id, () => {
                                        fetchPosts();
                                    });
                                }}
                                loadingLike={loadingLike}
                                deletePost={() =>
                                    deletePost(post._id, () => fetchPosts())
                                }
                                isFollowing={follows.find(
                                    (f) => f === post.author[0]._id
                                )}
                                getFollows={getFollows}
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
