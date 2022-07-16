import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { Loader } from "react-feather";
import { useTheme } from "../lib/ThemeProvider";
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
    font-size: 1.1rem;
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

const CHAR_LIMIT = 200;

const CreatePost = () => {
    const { theme } = useTheme();
    const [value, setValue] = useState("");
    const [showHint, setShowHint] = useState(false);
    const [chars, setChars] = useState(value.length);
    const [posting, setPosting] = useState(false);

    const onKeyDown = (event) => {
        if (posting) {
            event.preventDefault();
            return;
        }

        if (event.key === "Enter") {
            event.preventDefault();
            // Post
            setPosting(true);
        }
    };

    const onValueChange = (value) => {
        if (value.length <= CHAR_LIMIT) {
            setValue(value);
            setChars(value.length);
        }
        setShowHint(value.length > 0);
    };

    useEffect(() => {
        if (posting) {
            setTimeout(() => {
                setPosting(false);
                onValueChange("");
            }, 2000);
        }
    }, [posting]);

    return (
        <CreatePostWrapper>
            <h1>Create a post</h1>
            <CreatePostInputWrapper theme={theme}>
                <BadgeProfile img="/img/profile-1.jpg" />
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
                            {chars} / {CHAR_LIMIT}
                        </CharLimitText>
                    </>
                )}
            </CreatePostInputWrapper>
        </CreatePostWrapper>
    );
};

export default CreatePost;
