import React, { useState } from "react";
import styled from "styled-components";
import MarkdownEditor from "../components/edit/MarkdownEditor";
import MarkdownRender from "../components/edit/MarkdownRender";

const EditPost = () => {
  const [markdownInfo, setmarkdownInfo] = useState({
    title: "",
    subtitle: "",
  });
  return (
    <EditPostWrapper>
      <MarkdownWrapper>
        <MarkdownEditor
          markdownInfo={markdownInfo}
          setmarkdownInfo={setmarkdownInfo}
        />
        <MarkdownRender markdownInfo={markdownInfo} />
      </MarkdownWrapper>
    </EditPostWrapper>
  );
};

const EditPostWrapper = styled.section`
  margin: 0 auto;
  max-width: 108rem;
`;

const MarkdownWrapper = styled.section`
  display: flex;
  gap: 1.8rem;
`;

export default EditPost;
