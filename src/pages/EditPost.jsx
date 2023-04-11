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
  margin: 0 auto;
  max-width: 108rem;
  margin-top: 14rem;
`;

const MarkdownWrapper = styled.section`
  display: flex;
  gap: 1.8rem;
`;

export default EditPost;
