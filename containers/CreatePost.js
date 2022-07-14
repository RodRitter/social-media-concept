import React from "react";
import styled from "styled-components";
import { useTheme } from "../lib/ThemeProvider";
import BadgeProfile from "../components/BadgeProfile";
import TextArea from "../components/TextArea";
import Panel from "../components/Panel";
import Button from "../components/Button";

const CreatePostWrapper = styled.div``;

const CreatePostInputWrapper = styled(Panel)`
  display: flex;
`;

const TextAreaStyled = styled(TextArea)`
  flex: 1;
  font-size: 1.1rem;
  padding-top: 20px;

  &:focus {
    outline: none;
  }
`;

const CreatePost = () => {
  const { theme } = useTheme();

  return (
    <CreatePostWrapper>
      <h1>Create a post</h1>
      <CreatePostInputWrapper theme={theme}>
        <BadgeProfile img="/img/profile-1.jpg" />
        <TextAreaStyled placeholder="What can you share today?" rows={1} />
      </CreatePostInputWrapper>
    </CreatePostWrapper>
  );
};

export default CreatePost;
