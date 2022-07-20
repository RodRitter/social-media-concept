import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Loader } from "react-feather";
import { useSession } from "next-auth/react";
import { useTheme } from "../lib/ThemeProvider";
import { useSnackbar } from "../lib/SnackbarProvider";
import { usePosts } from "../hooks/usePosts";
import { POST_MAX_CHARS, ERROR_MSGS } from "../globals";
import BadgeProfile from "../components/BadgeProfile";
import TextArea from "../components/TextArea";
import Panel from "../components/Panel";

const CreatePostWrapper = styled.div`
    margin-bottom: 40px;
`;

const CreatePostInputWrapper = styled(Panel)`
    display: flex;
    position: relative;
`;

const TextAreaStyled = styled(TextArea)`
    flex: 1;
    font-size: 1rem;
    margin-top: 25px;
    transition: all linear 0.1s;

    ${({ posting }) => posting && "opacity: 0.5;"}

    &:focus {
        outline: none;
    }
`;

const HintText = styled.div`
    position: absolute;
    bottom: 15px;
    right: 20px;
    display: flex;
    align-items: center;
    opacity: 0.8;
`;

const EnterKey = styled.div`
    margin: 0 10px;
    height: 24px;
    padding: 0 5px;
    border-radius: 2px;
    font-size: 1rem;
    border: 1px solid ${({ theme }) => theme.text};
`;

const CharLimitText = styled.div`
    position: absolute;
    top: 15px;
    right: 20px;
    font-size: 0.9rem;
`;

const PostingLoader = styled(Loader)`
    height: 18px;
    margin-right: 10px;
`;

const CreatePost = () => {
    const { theme } = useTheme();
    const { setSnackbarOpen, setSnackbarContent, setSnackbarVariant } =
        useSnackbar();

    const { data: session, status } = useSession();
    const { createPost, fetchPosts } = usePosts();

    const [value, setValue] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [chars, setChars] = useState(value.length);
    const [posting, setPosting] = useState(false);

    const onKeyDown = (event) => {
        if (
            event.key === "Enter" &&
            (value.length === 0 || value.length > POST_MAX_CHARS)
        ) {
            event.preventDefault();
            return;
        }

        if (event.key === "Enter" && !posting) {
            event.preventDefault();
            // Post
            setPosting(true);
            createPost(value, (res) => {
                setSnackbarOpen(false);
                if (res.error) {
                    setSnackbarContent(ERROR_MSGS[res.error] || res.error);
                    setSnackbarVariant("error");
                } else {
                    setSnackbarVariant("success");
                    setSnackbarContent("Posted successfully!");
                    // Remove text in input
                    onValueChange("");
                }

                setSnackbarOpen(true);
                setPosting(false);
                fetchPosts();
            });
        }
    };

    const onValueChange = (value) => {
        if (value.length <= POST_MAX_CHARS) {
            setValue(value);
            setChars(value.length);
        }
        setShowHint(value.length > 0);
    };

    return (
        <CreatePostWrapper>
            <h1>Create a post</h1>
            <CreatePostInputWrapper theme={theme}>
                <BadgeProfile img={session.user.image} />
                <TextAreaStyled
                    placeholder="What can you share today?"
                    rows={1}
                    onChange={onValueChange}
                    onKeyDown={onKeyDown}
                    value={value}
                    posting={posting}
                />
                {showHint && (
                    <>
                        {posting ? (
                            <HintText>
                                <PostingLoader /> Posting
                            </HintText>
                        ) : (
                            <HintText>
                                press <EnterKey theme={theme}>enter</EnterKey>{" "}
                                to post
                            </HintText>
                        )}
                        <CharLimitText>
                            {chars} / {POST_MAX_CHARS}
                        </CharLimitText>
                    </>
                )}
            </CreatePostInputWrapper>
        </CreatePostWrapper>
    );
};

export default CreatePost;
