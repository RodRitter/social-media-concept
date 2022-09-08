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

    > h1 {
        margin-bottom: 40px;
    }
`;

const FeatureRow = styled.div`
    display: flex;
    padding-bottom: 60px;
    max-width: 1000px;
    align-items: center;

    > div {
        flex: 1;
        &:first-child {
            margin-right: 20px;
        }
    }
`;

const FeatureImageWrapper = styled.div`
    position: relative;

    padding-right: 30px;
    &:nth-child(even) {
        padding-left: 30px;
    }

    img {
        width: 100%;
        border-radius: 15px;
    }
`;

const FeatureText = styled.div`
    margin-bottom: 10px;
    h1 {
        font-size: 20px;
        margin-bottom: 5px;
        color: #008dfa;
        font-weight: normal;
    }

    p {
        font-size: 18px;
        margin: 0;
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
                <h1>Crowdly - social media experiment</h1>
                <h1>Demo Features</h1>
                <FeatureRow>
                    <FeatureText>
                        <h1>Create a post</h1>
                        <p>
                            You can create a post which is added to the public
                            feed. They are rate limited so you can post every 30
                            seconds
                        </p>
                    </FeatureText>
                    <FeatureImageWrapper>
                        <img
                            src="/img/features/feature-posts.png"
                            alt="feature-1"
                        />
                    </FeatureImageWrapper>
                </FeatureRow>

                <FeatureRow>
                    <FeatureText>
                        <h1>Like posts</h1>
                        <p>You can like other users posts</p>
                    </FeatureText>
                    <FeatureImageWrapper>
                        <img
                            src="/img/features/feature-like.png"
                            alt="feature-1"
                        />
                    </FeatureImageWrapper>
                </FeatureRow>

                <FeatureRow>
                    <FeatureText>
                        <h1>Post feeds & filtering</h1>
                        <p>
                            You are able to filter your post feed by your own,
                            your follows, or the public feed.
                        </p>
                    </FeatureText>
                    <FeatureImageWrapper>
                        <img
                            src="/img/features/feature-filtering.png"
                            alt="feature-1"
                        />
                    </FeatureImageWrapper>
                </FeatureRow>
            </InnerWrapper>
        </FeedWrapper>
    );
};

export default Feed;
