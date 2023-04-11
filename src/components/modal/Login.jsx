import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginModalState } from "../../store/atom";
import Signin from "../login/Signin";
import Signup from "../login/Signup";
import { flexCenter } from "../../utils/style/mixins";
import { modalVariants } from "../../utils/variants/variants";
import Logo from "../../assets/logo.svg";

const Login = () => {
  const setLoginModal = useSetRecoilState(loginModalState);
  const [issignin, setissignin] = useState(true);
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
      <img src={Logo} className="logo" alt="logo"/>
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
  background-color: rgba(0, 0, 0, 0.0);
  ${flexCenter}
`;

const LoginModalWrapper = styled(motion.section)`
  max-width: 78rem;
  height: ${({ issignin }) => (issignin == "true" ? "75%" : "80%")};
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  margin-top: ${({ issignin }) => (issignin == "true" ? "0rem" : "2rem")};
  padding-top: ${({ issignin }) => (issignin == "true" ? "10rem" : "5rem")};
  padding-bottom: 1rem;
  gap: ${({ issignin }) => (issignin == "true" ? "7rem" : "2rem")};
  width: 94.5vw;
  border-radius: 2.5rem;
  @media (max-width: 750px) {
    width: 70vw;
    height: 55rem;
  }
  display: flex;
  background-color: rgba(255, 255, 255, 0.6);
  backdrop-filter: blur(10px); // 블러 효과 추가
`;

const ContentWrapper = styled.section`
  width: 50%;
  @media (max-width: 750px) {
    width: 0%;
  }
  height: 100%;
  background-color: ${(props) => props.theme.color.zeroTwo};
`;

export default Login;
