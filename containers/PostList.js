import React from "react";
import styled from "styled-components";
import Post from "./Post";

const PostListWrapper = styled.div``;

const PostList = ({ heading }) => {
    return (
        <PostListWrapper>
            <h1>{heading}</h1>

            <Post />
            <Post />
            <Post />
        </PostListWrapper>
    );
};

export default PostList;
