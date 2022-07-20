import React from "react";
import styled from "styled-components";
import Panel from "../components/Panel";
import { useTheme } from "../lib/ThemeProvider";
import BadgeProfile from "../components/BadgeProfile";

const LargeBadgeProfile = styled(BadgeProfile)`
    margin-bottom: 10px;

    &:last-child {
        margin-bottom: 0;
    }
`;

const CardHeading = styled.h2`
    margin: 5px 10px 20px 10px;
`;

const FeatureList = styled.div`
    padding: 0 10px;

    p {
        span {
            font-weight: bold;
            color: ${({ theme }) => theme.lightText};
        }
        color: gray;
    }
`;

const GroupList = () => {
    const { theme } = useTheme();
    return (
        <Panel>
            <CardHeading>Project Features</CardHeading>

            <FeatureList theme={theme}>
                <p>
                    <span>Character Limit</span>: Posts have a character limit,
                    which is displayed in the text input if you've entered more
                    than 1 character.
                </p>
                <p>
                    <span>Rate/Spam Limiting</span>: There is a 30s wait time
                    between post updates to avoid spam. An notification will let
                    you know when you hit the rate limit.
                </p>
                <p>
                    <span>Filtering</span>: You are able to filter your post
                    feed by your own, your follows, or the public feed.
                </p>
                <p>
                    <span>Liking</span>: You can like any post, including your
                    own.
                </p>
                <p>
                    <span>Following</span>: You can follow other users, by
                    clicking follow on one of their posts.
                </p>
            </FeatureList>
        </Panel>
    );
};

export default GroupList;
