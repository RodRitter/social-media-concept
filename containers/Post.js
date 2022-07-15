import React from "react";
import styled from "styled-components";
import { ThumbsUp } from "react-feather";
import { useTheme } from "../lib/ThemeProvider";
import BadgeProfile from "../components/BadgeProfile";
import Button from "../components/Button";

const PostWrapper = styled.div`
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid ${({ theme }) => theme.postBorder};
    border-radius: 10px;
`;

const PostInfoWrapper = styled.div`
    display: flex;
    justify-content: space-between;
`;

const BadgeProfileStyled = styled(BadgeProfile)``;

const FollowButton = styled(Button)``;

const PostPanel = styled.div`
    font-size: 1.2rem;
    padding: 10px;
`;

const ActionsSection = styled.div`
    margin-top: 20px;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > * {
        margin-left: 20px;
    }
`;

const ActionsInfo = styled.div`
    color: gray;
    display: flex;
    align-items: center;
    font-size: 1.1rem;
`;

const LikeIcon = styled(ThumbsUp)`
    width: 18px;
    margin-right: 5px;
`;

const Post = () => {
    const { theme, setTheme } = useTheme();

    return (
        <PostWrapper theme={theme}>
            <PostInfoWrapper>
                <BadgeProfileStyled
                    img="/img/profile-1.jpg"
                    topText="John Doe"
                    bottomText="Posted Today at 10.35"
                    onClick={() => {}}
                />
                <FollowButton variant="secondary">Add Friend</FollowButton>
            </PostInfoWrapper>
            <PostPanel>
                This is a test post. This is a test post. This is a test post.
                This is a test post. This is a test post. This is a test post.
                This is a test post. This is a test post. This is a test post.
                This is a test post.
            </PostPanel>
            <ActionsSection>
                <Button variant="secondary" icon={<ThumbsUp />}>
                    5
                </Button>
            </ActionsSection>
        </PostWrapper>
    );
};

export default Post;
