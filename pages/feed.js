import React from "react";
import styled from "styled-components";
import { useTheme } from "../lib/ThemeProvider";
import { themes } from "../globals";

import Header from "../containers/Header";
import CreatePost from "../containers/CreatePost";
import FriendList from "../containers/FriendList";
import GroupList from "../containers/GroupList";

import Panel from "../components/Panel";
import BadgeProfile from "../components/BadgeProfile";

const FeedWrapper = styled.div`
    background: ${({ theme }) => theme.mainBackground};
    color: ${({ theme }) => theme.text};
    height: 100%;
`;

const InnerWrapper = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    display: flex;

    > div {
        padding: 10px 20px;
    }
`;

const LeftSection = styled.div`
    flex: 8;
`;

const RightSection = styled.div`
    flex: 4;

    > div {
        margin-bottom: 30px;
    }
`;

const Feed = ({ className }) => {
    const { theme, setTheme } = useTheme();

    const toggle = () => {
        setTheme(theme === themes.dark ? themes.light : themes.dark);
    };

    return (
        <FeedWrapper theme={theme} className={className}>
            <Header />
            <InnerWrapper>
                <LeftSection>
                    <CreatePost />
                </LeftSection>
                <RightSection>
                    <FriendList />
                    <GroupList />
                </RightSection>
            </InnerWrapper>
        </FeedWrapper>
    );
};

export default Feed;
