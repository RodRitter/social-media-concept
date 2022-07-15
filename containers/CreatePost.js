import React, { useState } from "react";
import styled from "styled-components";
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

    &:focus {
        outline: none;
    }
`;

const HintText = styled.div`
    position: absolute;
    bottom: 15px;
    right: 20px;
`;

const CreatePost = () => {
    const { theme } = useTheme();
    const [showHint, setShowHint] = useState(false);

    const onValueChange = (value) => {
        setShowHint(value.length > 0);
    };

    return (
        <CreatePostWrapper>
            <h1>Create a post</h1>
            <CreatePostInputWrapper theme={theme}>
                <BadgeProfile img="/img/profile-1.jpg" />
                <TextAreaStyled
                    placeholder="What can you share today?"
                    rows={1}
                    onChange={onValueChange}
                />
                {showHint && (
                    <HintText>
                        Hit <b>enter</b> to post
                    </HintText>
                )}
            </CreatePostInputWrapper>
        </CreatePostWrapper>
    );
};

export default CreatePost;
