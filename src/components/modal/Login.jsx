import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginModalState, signinModalState } from "../../store/atom";
import Signin from "../login/Signin";
import Signup from "../login/Signup";
import { flexCenter } from "../../utils/style/mixins";
import { modalVariants } from "../../utils/variants/variants";
import Logo from "../../assets/logo.svg";

const Login = () => {
  const setLoginModal = useSetRecoilState(loginModalState);
  const [issignin, setissignin] = useRecoilState(signinModalState);
  const modalRef = useRef(null);
  return (
    <LoginModalBackGround
      ref={modalRef}
      onClick={(e) => {
        if (modalRef.current === e.target) {
          setLoginModal(false);
        }
      }}
    >
      <LoginModalWrapper
        variants={modalVariants}
        initial="start"
        animate="animate"
        exit="exit"
        issignin={issignin.toString()}
      >
        <img src={Logo} className="logo" alt="logo" />
        {issignin === true ? (
          <Signin setisSignin={setissignin} />
        ) : (
          <Signup setisSignin={setissignin} />
        )}
      </LoginModalWrapper>
    </LoginModalBackGround>
  );
};

const LoginModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0);
  ${flexCenter}
`;

const LoginModalWrapper = styled(motion.section)`
  max-width: 78rem;
  height: ${({ issignin }) => (issignin === "true" ? "75%" : "80%")};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${({ issignin }) => (issignin === "true" ? "0rem" : "2rem")};
  padding-top: ${({ issignin }) => (issignin === "true" ? "10rem" : "5rem")};
  
  @media (max-height: 750px) {
  padding-top: 2rem;
  gap: ${({ issignin }) => (issignin === "true" ? "4rem" : "2rem")};
  }
  padding-bottom: 1rem;
  gap: ${({ issignin }) => (issignin === "true" ? "7rem" : "2rem")};
  width: 91vw;
  border-radius: 2.5rem;

  display: flex;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px); // 블러 효과 추가
`;

export default Login;
