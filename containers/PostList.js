import React from "react";
import styled from "styled-components";
import Post from "./Post";

const PostListWrapper = styled.div``;

const PostList = () => {
    return (
        <PostListWrapper>
            <h1>Posts for you</h1>

            <Post />
            <Post />
            <Post />
        </PostListWrapper>
    );
};

export default PostList;
