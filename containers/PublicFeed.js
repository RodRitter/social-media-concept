import React from "react";
import styled from "styled-components";
import PostList from "../containers/PostList";
import RecentSignUps from "./RecentSignUps";

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

const PublicFeed = () => {
    return (
        <>
            <LeftSection>
                <PostList heading="Posts by everyone" />
            </LeftSection>
            <RightSection>
                <RightInner>
                    <RecentSignUps />
                </RightInner>
            </RightSection>
        </>
    );
};

export default PublicFeed;
