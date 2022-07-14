import React from "react";
import styled from "styled-components";
import { useTheme } from "../../lib/ThemeProvider";

const TextAreaStyled = styled.textarea`
  font-family: "DM Sans", sans-serif;
  color: ${({ theme }) => theme.text};
  background: transparent;
  border: none;
  resize: none;
`;

const TextArea = ({ placeholder, className }) => {
  const { theme } = useTheme();

  return (
    <TextAreaStyled
      theme={theme}
      placeholder={placeholder}
      className={className}
    >
      index
    </TextAreaStyled>
  );
};

export default TextArea;
