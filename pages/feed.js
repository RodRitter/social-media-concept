import React, { useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "../lib/ThemeProvider";
import { themes } from "../globals";
import { useSession } from "next-auth/react";
import { usePosts } from "../hooks/usePosts";

import Header from "../containers/Header";
import LoggedFeed from "../containers/LoggedFeed";

const FeedWrapper = styled.div`
    background: ${({ theme }) => theme.mainBackground};
    color: ${({ theme }) => theme.text};
    height: 100%;
    overflow: auto;
`;

const InnerWrapper = styled.div`
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 20px;
    display: flex;

    > div {
        padding: 10px;
    }

    @media screen and (max-width: 1000px) {
        flex-direction: column;
    }
`;

const Feed = ({ className }) => {
    const { theme, setTheme } = useTheme();
    const { data: session, status, loading } = useSession();

    const toggle = () => {
        setTheme(theme === themes.dark ? themes.light : themes.dark);
    };

    return (
        <FeedWrapper theme={theme} className={className}>
            <Header session={session} authenticating={loading} />
            <InnerWrapper>
                {session && <LoggedFeed authenticating={loading} />}
            </InnerWrapper>
        </FeedWrapper>
    );
};

export default Feed;
