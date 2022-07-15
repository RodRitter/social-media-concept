import React from "react";
import styled from "styled-components";
import PostList from "../containers/PostList";
import RecentSignUps from "./RecentSignUps";

const LeftSection = styled.div`
    flex: 8;
`;

const RightSection = styled.div`
    flex: 4;

    > div {
        margin-bottom: 30px;
    }
`;

const PublicFeed = () => {
    return (
        <>
            <LeftSection>
                <PostList />
            </LeftSection>
            <RightSection>
                <RecentSignUps />
            </RightSection>
        </>
    );
};

export default PublicFeed;
