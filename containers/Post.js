import React from "react";
import styled from "styled-components";
import { ThumbsUp, Plus } from "react-feather";
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
    margin-bottom: 0;
`;

const BadgeProfileStyled = styled(BadgeProfile)``;

const FollowButton = styled(Button)`
    margin-left: 20px;
`;

const PostPanel = styled.div`
    font-size: 1.1rem;
    padding: 10px;
    color: ${({ theme }) => theme.mediumText};
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

const Post = ({ likes, canAdd, children }) => {
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
                {canAdd && (
                    <FollowButton variant="link" icon={<Plus />}>
                        Add Friend
                    </FollowButton>
                )}
            </PostInfoWrapper>
            <PostPanel theme={theme}>{children}</PostPanel>
            {likes && (
                <ActionsSection>
                    <Button variant="secondary" icon={<ThumbsUp />}>
                        {likes > 0 ? likes : null}
                    </Button>
                </ActionsSection>
            )}
        </PostWrapper>
    );
};

export default Post;
