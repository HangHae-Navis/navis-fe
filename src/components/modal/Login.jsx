import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginModalState } from "../../store/atom";
import Signin from "../login/Signin";
import Signup from "../login/Signup";
import { flexCenter } from "../../utils/style/mixins";
import { modalVariants } from "../../utils/variants/variants";

const Login = () => {
  const setLoginModal = useSetRecoilState(loginModalState);
  const [isSignin, setIsSignIn] = useState(true);
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
      >
        <ContentWrapper></ContentWrapper>
        {isSignin === true ? (
          <Signin setIsSignIn={setIsSignIn} />
        ) : (
          <Signup setIsSignIn={setIsSignIn} />
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
  background-color: rgba(0, 0, 0, 0.5);
  ${flexCenter}
`;

const LoginModalWrapper = styled(motion.section)`
  max-width: 80rem;
  max-height: 70rem;
  width: 94.5vw;
  @media (max-width: 750px) {
    width: 70vw;
    height: 55rem;
  }
  height: 80vw;
  display: flex;
  background-color: white;
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
