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
  background-color: rgba(0, 0, 0, 0.5);
  ${flexCenter}
`;

const LoginModalWrapper = styled(motion.section)`
  width: 60rem;
  height: 50rem;
  display: flex;
  background-color: white;
`;

const ContentWrapper = styled.section`
  width: 50%;
  height: 100%;
  background-color: white;
`;

export default Login;
