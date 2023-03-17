import React from "react";
import styled from "styled-components";
import MarkdownEditor from "../components/edit/MarkdownEditor";
import MarkdownRender from "../components/edit/MarkdownRender";

const EditPost = () => {
  return (
    <EditPostWrapper>
      <MarkdownEditor />
      <MarkdownRender />
    </EditPostWrapper>
  );
};

const EditPostWrapper = styled.section`
  display: flex;
  margin-top: -3rem;
`;

export default EditPost;
