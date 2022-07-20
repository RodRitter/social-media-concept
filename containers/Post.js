import React, { useEffect } from "react";
import styled, { keyframes } from "styled-components";
import { ThumbsUp, Plus, Trash2, Loader } from "react-feather";
import { useSession } from "next-auth/react";
import { useTheme } from "../lib/ThemeProvider";
import { useFollows } from "../hooks/useFollows";
import { useModal } from "../hooks/useModal";
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
    font-size: 1rem;
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

    svg {
        width: 15px;
    }

    > button span {
        font-size: 1rem;
    }
`;

const DeleteButton = styled(Button)`
    font-size: 1rem;
    color: ${({ theme }) => theme.errorRed};
    > svg {
        margin: 0;
    }
`;

const loaderRotate = keyframes`
    0% {
        transform: rotate(0deg);
    }
    100% {
        transform: rotate(360deg);
    }
`;

const loaderFadeIn = keyframes`
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
`;

const LikeLoader = styled.div`
    position: relative;
    flex: 0;
    width: 18px;
    height: 40px;
    animation: ${loaderFadeIn} 0.2s ease-in 1;

    > svg {
        width: 18px;
        height: 18px;
        position: relative;
        top: 30%;
        transform: translateY(-50%);
        animation: ${loaderRotate} 0.8s linear infinite;
    }
`;

const Post = ({
    likes,
    author,
    date,
    likePost,
    children,
    deletePost,
    isFollowing,
    getFollows,
    loadingLike,
}) => {
    const { theme, setTheme } = useTheme();
    const { data: session, status } = useSession();
    const { followUnfollow, loading } = useFollows();
    const { closeModal, setModal } = useModal();

    const deletePrompt = () => {
        setModal("Do you want to delete this post?", [
            {
                label: "Yes, delete it.",
                onClick: () => {
                    // Delete
                    deletePost();
                    // Close
                    closeModal();
                },
                variant: "secondary",
            },
            {
                label: "No thanks",
                onClick: () => {
                    closeModal();
                },
                variant: "secondary",
            },
        ]);
    };

    const getDateString = (postDate) => {
        const diff = new Date() - new Date(postDate);
        const mins = diff / 1000 / 60;

        if (mins < 2) return "a few seconds ago";
        if (mins < 20) return "a few minutes ago";
        if (mins < 40) return "about half an hour ago";
        if (mins < 90) return "about an hour ago";
        if (mins / 60 / 24 < 1) return "about a day ago";
        if (mins / 60 / 24 < 24)
            return `about ${Math.ceil(mins / 60)} hours ago`;

        return `about ${Math.ceil(mins / 60 / 24)} days ago`;
    };

    const likeButtonVariant = () => {
        const match = likes.find((like) => like === session.user._id);
        return match ? "primary" : "link";
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
                {session.user._id === author._id && (
                    <DeleteButton
                        variant="link"
                        theme={theme}
                        onClick={deletePrompt}
                    >
                        <Trash2 />
                    </DeleteButton>
                )}
                {session.user._id !== author._id && (
                    <FollowButton
                        variant="link"
                        icon={<Plus />}
                        onClick={() =>
                            followUnfollow(author._id, () => getFollows())
                        }
                    >
                        {isFollowing ? "Unfollow" : "Follow"}
                    </FollowButton>
                )}
            </PostInfoWrapper>
            <PostPanel theme={theme}>{children}</PostPanel>
            {session && likes !== undefined && (
                <ActionsSection>
                    {loadingLike || loading ? (
                        <LikeLoader>
                            <Loader />
                        </LikeLoader>
                    ) : null}
                    <Button
                        variant={likeButtonVariant()}
                        icon={<ThumbsUp />}
                        onClick={likePost}
                    >
                        <span>{likes.length}</span>
                    </Button>
                </ActionsSection>
            )}
        </PostWrapper>
    );
};

export default Post;
