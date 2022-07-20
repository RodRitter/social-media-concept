import React, { useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "../lib/ThemeProvider";
import { themes } from "../globals";
import { useSession } from "next-auth/react";

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
    display: flex;

    p,
    li {
        color: ${({ theme }) => theme.lightText};
        text-align: justify;
    }

    h2 {
        color: ${({ theme }) => theme.lightText};
    }

    > div {
        padding: 10px 20px;
        width: 75%;

        @media screen and (max-width: 1000px) {
            width: 100%;
        }
    }
`;

const Feed = ({ className }) => {
    const { theme, setTheme } = useTheme();
    const { data: session, status } = useSession();

    // TODO Create an alternate theme
    const toggle = () => {
        setTheme(theme === themes.dark ? themes.light : themes.dark);
    };

    return (
        <FeedWrapper theme={theme} className={className}>
            <Header session={false} authenticating={status === "loading"} />
            <InnerWrapper theme={theme}>
                <div>
                    <h1>crowdly - a social media experiment</h1>
                    <h2>Why did I build this?</h2>
                    <p>
                        It was a challenge to develop an end-to-end application
                        that is interactive and uses real data.
                    </p>
                    <h2>What was used?</h2>
                    <ul>
                        <li>
                            NextJS - A React-based framework for server-side
                            rendering
                        </li>
                        <li>
                            NextAuth - A plugin for NextJS, making it easy to
                            implement user authentication
                        </li>
                        <li>
                            MongoDB - A no-SQL database. Specifically I used
                            Atlas, their cloud-based solution
                        </li>
                        <li>Deployed with Vercel</li>
                    </ul>
                </div>
            </InnerWrapper>
        </FeedWrapper>
    );
};

export default Feed;
