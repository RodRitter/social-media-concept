import React from "react";
import styled, { keyframes } from "styled-components";
import { ThumbsUp, Plus } from "react-feather";
import { useSession } from "next-auth/react";
import { useTheme } from "../lib/ThemeProvider";
import BadgeProfile from "../components/BadgeProfile";
import Button from "../components/Button";

const fadeIn = keyframes`
  0% {
    margin-top: -5px;
    opacity: 0.2;
  }

  100% {
    margin-top: 0;
    opacity: 1;
  }
`;

const PostWrapper = styled.div`
    margin-bottom: 20px;
    padding: 20px;
    border: 1px solid ${({ theme }) => theme.postBorder};
    border-radius: 10px;
    animation: ${fadeIn} 0.2s ease-out 1;
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
    margin-top: 0;
    display: flex;
    justify-content: flex-end;
    align-items: center;

    > * {
        margin-left: 20px;
    }

    > button span {
        font-size: 1.1rem;
    }
`;

const Post = ({ likes, canAdd, author, date, postAuthorId, children }) => {
    const { theme, setTheme } = useTheme();
    const { data: session, status } = useSession();

    const getDateString = (postDate) => {
        const diff = new Date() - new Date(postDate);
        const mins = diff / 1000 / 60;

        if (mins < 2) return "a few seconds ago";
        if (mins < 20) return "a few minutes ago";
        if (mins < 40) return "about half an hour ago";
        if (mins < 90) return "about an hour ago";
        if (mins / 24 < 1) return "about an day ago";
        if (mins / 24 < 24) return `about ${Math.ceil(mins / 24)} hours ago`;

        return `about ${Math.floor(mins / 60 / 24)} days ago`;
    };

    return (
        <PostWrapper theme={theme}>
            <PostInfoWrapper>
                {author && (
                    <BadgeProfileStyled
                        img={author.image}
                        topText={author.name}
                        bottomText={getDateString(date)}
                        onClick={() => {}}
                    />
                )}
                {canAdd && (
                    <FollowButton variant="link" icon={<Plus />}>
                        Add Friend
                    </FollowButton>
                )}
            </PostInfoWrapper>
            <PostPanel theme={theme}>{children}</PostPanel>
            {session &&
                likes !== undefined &&
                session.user._id !== postAuthorId && (
                    <ActionsSection>
                        <Button variant="link" icon={<ThumbsUp />}>
                            <span>{likes}</span>
                        </Button>
                    </ActionsSection>
                )}
        </PostWrapper>
    );
};

export default Post;
