import React, { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import { useTheme } from "../../lib/ThemeProvider";

const TextAreaStyled = styled.textarea`
    font-family: "DM Sans", sans-serif;
    color: ${({ theme }) => theme.text};
    background: transparent;
    border: none;
    resize: none;
    line-height: 1.5rem;
`;

const TextArea = ({ placeholder, onChange, onKeyDown, value, className }) => {
    const { theme } = useTheme();
    const textAreaRef = useRef();

    const resizeToFit = () => {
        // Resize textarea to match content
        if (textAreaRef && textAreaRef.current) {
            const el = textAreaRef.current;
            el.style.height = "";
            el.style.height = el.scrollHeight + "px";
        }
    };

    useEffect(resizeToFit, []);

    const onTextChange = (event) => {
        onChange(event.target.value, event.key);
        resizeToFit();
    };

    const onKeyDownHandler = (event) => {
        if (onKeyDown) {
            onKeyDown(event);
        }
    };

    return (
        <TextAreaStyled
            ref={textAreaRef}
            onChange={onTextChange}
            onKeyDown={onKeyDownHandler}
            theme={theme}
            placeholder={placeholder}
            className={className}
            value={value}
        />
    );
};

export default TextArea;
