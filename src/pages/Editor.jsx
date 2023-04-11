import React from "react";
import styled from "styled-components";
import { InputStyle } from "../utils/style/mixins";
import { useState } from "react";

const Editor = () => {
  const [width, setWidth] = useState(0);
  return (
    <EditorWrapper>
      <h1>게시글을 입력해주세요</h1>
      <input placeholder="제목을 입력해주세요" />
    </EditorWrapper>
  );
};

const EditorWrapper = styled.section`
  position: absolute;
  width: 90vw;
  top: 40%;
  left: 50%;
  transform: translate(-50%, -50%);
  display: flex;
  flex-direction: column;
  gap: 3rem;

  h1 {
    color: ${(props) => props.theme.color.zeroFour};
    text-align: center;
    font-size: 3rem;
  }

  input {
    color: ${(props) => props.theme.color.zeroThree} !important;
    height: 6rem !important;
    width: 100% !important;
    font-size: 2.4rem !important;
    font-weight: 500;
    ${InputStyle}
  }
`;

export default Editor;
