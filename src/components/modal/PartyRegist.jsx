import { motion } from "framer-motion";
import React, { useRef, useState } from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginModalState } from "../../store/atom";
import Signin from "../login/Signin";
import Signup from "../login/Signup";
import { flexCenter } from "../../utils/style/mixins";
import { modalVariants } from "../../utils/variants/variants";
import { useForm } from "react-hook-form";
import { useQuery } from "react-query";
import { getPartyPage } from "../../utils/api/api";

const PartyRegist = (props) => {
  const { register, formState: errors, handleSubmit } = useForm();
  const [isOpen, setisOpen] = useState(true);
  const partyGet = useQuery(['party'], getPartyPage,{onSuccess: (data) =>{console.log(data)}})

  
  const ModalClose = (event) => {
    if (event.target == event.currentTarget) {
      props.isOpen(false);
    }
  }; 

  return (
    <RegistModalBackGround
      onClick={ModalClose}
    >
      <RegistModalWrapper
        variants={modalVariants}
        initial="start"
        animate="animate"
        exit="exit"
      >

      <h1>그룹 생성하기</h1>
      <RegistInputContainer>

      <RegistInputLeftBox>


      </RegistInputLeftBox>
      <RegistInputLeftBox>
        
      </RegistInputLeftBox>

      </RegistInputContainer>
      </RegistModalWrapper>
    </RegistModalBackGround>
  );
};

const RegistModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  background-color: rgba(0, 0, 0, 0.5);
  ${flexCenter}
`;

const RegistInputContainer = styled.div`
  width: 50rem;
  height: 60rem;
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  background-color: wheat;
`

const RegistInputLeftBox = styled.div`
width: 23rem;
height: 60rem;
display: flex;
align-items: center;
flex-direction: column;
justify-content: center;
background-color: cyan;
`

const RegistModalWrapper = styled(motion.section)`
  width: 60rem;
  height: 70rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
  background-color: white;
`;

const ContentWrapper = styled.section`
  width: 50%;
  height: 100%;
  background-color: wheat;
`;



export default PartyRegist;
