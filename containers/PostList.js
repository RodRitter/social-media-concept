import React from "react";
import styled from "styled-components";
import Post from "./Post";

const PostListWrapper = styled.div``;

const PostList = ({ heading, children }) => {
    return (
        <PostListWrapper>
            <h1>{heading}</h1>
            {children}
        </PostListWrapper>
    );
};

export default PostList;
