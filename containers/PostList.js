import React, { useState, useEffect } from "react";
import styled, { keyframes } from "styled-components";
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

const Loading = styled.div`
    overflow: hidden;
    height: 80px;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
    animation: ${loadingIntro} 0.1s ease-in-out;

    > span {
        flex: 1;
        text-align: center;
        color: ${({ theme }) => theme.lightText};
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
                        <span>Fetching posts</span>
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
