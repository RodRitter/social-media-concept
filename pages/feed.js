import React, { useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "../lib/ThemeProvider";
import { themes } from "../globals";
import { useSession } from "next-auth/react";

import Header from "../containers/Header";
import LoggedFeed from "../containers/LoggedFeed";
import PublicFeed from "../containers/PublicFeed";
import Snackbar from "../components/Snackbar";

const FeedWrapper = styled.div`
    background: ${({ theme }) => theme.mainBackground};
    color: ${({ theme }) => theme.text};
    height: 100%;
    overflow: auto;
`;

const InnerWrapper = styled.div`
    max-width: 1400px;
    margin: 0 auto;
    display: flex;

    > div {
        padding: 10px 20px;
    }
`;

const StyledSnackbar = styled(Snackbar)`
    position: fixed;
    left: 50%;
    translate: transformX(-50%);
    z-index: 20;
`;

const Feed = ({ className }) => {
    const { theme, setTheme } = useTheme();
    const { data: session, status } = useSession();

    const toggle = () => {
        setTheme(theme === themes.dark ? themes.light : themes.dark);
    };

    return (
        <FeedWrapper theme={theme} className={className}>
            <StyledSnackbar variant="error">This is a snackbar</StyledSnackbar>

            <Header session={session} authenticating={status === "loading"} />
            <InnerWrapper>
                {session ? (
                    <LoggedFeed authenticating={status === "loading"} />
                ) : (
                    <PublicFeed authenticating={status === "loading"} />
                )}
            </InnerWrapper>
        </FeedWrapper>
    );
};

export default Feed;
