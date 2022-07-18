import React, { useEffect } from "react";
import styled from "styled-components";
import CreatePost from "../containers/CreatePost";
import FriendList from "../containers/FriendList";
import GroupList from "../containers/GroupList";
import PostList from "../containers/PostList";

const LeftSection = styled.div`
    flex: 8;
`;

const RightSection = styled.div`
    flex: 4;
`;

const RightInner = styled.div`
    position: -webkit-sticky;
    position: sticky;
    top: 40px;

    > div {
        margin-bottom: 30px;
    }
`;

const LoggedFeed = () => {
    return (
        <>
            <LeftSection>
                <CreatePost />
                <PostList />
            </LeftSection>
            <RightSection>
                <RightInner>
                    <FriendList />
                    <GroupList />
                </RightInner>
            </RightSection>
        </>
    );
};

export default LoggedFeed;
