import React from "react";
import styled from "styled-components";
import MarkdownEditor from "../components/edit/MarkdownEditor";
import MarkdownRender from "../components/edit/MarkdownRender";
import useSmallScreen from "../hook/useSmallScreen";
import { useNavigate } from "react-router-dom";
import { useRecoilValue, useResetRecoilState, useSetRecoilState } from "recoil";
import { editReadyState, editorState } from "../store/atom";
import { useEffect } from "react";

const EditPost = () => {
  const isSmallScreen = useSmallScreen();
  const navigate = useNavigate();
  const editorInfo = useRecoilValue(editorState);
  const resetEditorInfo = useResetRecoilState(editorState);
  const setEditModal = useSetRecoilState(editReadyState);
  useEffect(() => {
    if (editorInfo.title === "") {
      navigate("/main");
      setEditModal(false);
    }
    return () => {
      setEditModal(false);
      resetEditorInfo();
    };
  }, []);

  return (
    <EditPostWrapper>
      <MarkdownWrapper>
        <MarkdownEditor isSmallScreen={isSmallScreen} />
        {isSmallScreen === false && <MarkdownRender />}
      </MarkdownWrapper>
    </EditPostWrapper>
  );
};

const EditPostWrapper = styled.section`
  margin: 0 auto;
  max-width: 120rem;
  margin-top: 14rem;
  width: 92.5%;
`;

const MarkdownWrapper = styled.section`
  display: flex;
  gap: 1.8rem;
`;

export default EditPost;
