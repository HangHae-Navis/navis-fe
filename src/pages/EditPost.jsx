import React from "react";
import styled from "styled-components";
import MarkdownEditor from "../components/edit/MarkdownEditor";
import MarkdownRender from "../components/edit/MarkdownRender";

const EditPost = () => {
  return (
    <EditPostWrapper>
      <MarkdownWrapper>
        <MarkdownEditor />
        <MarkdownRender />
      </MarkdownWrapper>
    </EditPostWrapper>
  );
};

const EditPostWrapper = styled.section`
  display: flex;
  flex-direction: column;
  margin: 0 auto;
  max-width: 108rem;
`;

const MarkdownWrapper = styled.section`
  display: flex;
`;

export default EditPost;
