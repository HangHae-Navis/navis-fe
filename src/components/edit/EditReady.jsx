import React from "react";
import { useResetRecoilState, useSetRecoilState } from "recoil";
import { editReadyState, editorState } from "../../store/atom";
import { useRef } from "react";
import styled from "styled-components";
import { flexCenter } from "../../utils/style/mixins";
import EditCommon from "./EditCommon";
import { useState } from "react";
import { useEffect } from "react";
import EditSpecial from "./EditSpecial";
import EditSurvey from "./EditSurvey";

const EditReady = () => {
  const reset = useResetRecoilState(editorState);
  const [page, setPage] = useState(1);

  const setIsOpen = useSetRecoilState(editReadyState);
  const modal = useRef();
  const onModalClose = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
      reset();
      setPage(0);
    }
  };

  useEffect(() => {
    return () => {
      setPage(1);
    };
  }, []);

  return (
    <ModalWrapper ref={modal} onClick={onModalClose}>
      {page === 1 && <EditCommon setPage={setPage} reset={reset} />}
      {page === 2 && <EditSpecial setPage={setPage} />}
      {page === 3 && <EditSurvey setPage={setPage} />}
    </ModalWrapper>
  );
};

const ModalWrapper = styled.section`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
  ${flexCenter}
`;

export default EditReady;
