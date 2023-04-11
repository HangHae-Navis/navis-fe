import React from "react";
import { useRecoilState, useResetRecoilState, useSetRecoilState } from "recoil";
import { editReadyState } from "../../store/atom";
import { useRef } from "react";
import styled from "styled-components";

const EditReady = () => {
  const setIsOpen = useSetRecoilState(editReadyState);
  const modal = useRef();
  const ModalClose = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };
  return <ModalWrapper ref={modal}></ModalWrapper>;
};

const ModalWrapper = styled.section`
  position: fixed;
  z-index: 999;
  top: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.6);
`;

export default EditReady;
