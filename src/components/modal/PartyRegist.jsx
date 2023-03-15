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
import { useMutation, useQuery } from "react-query";
import { getPartyPage, postGroup} from "../../utils/api/api";
import Input from "../../element/Input";
import Button from "../../element/Button";

const PartyRegist = (props) => {
  const { register, formState: errors, handleSubmit } = useForm();
  const [isOpen, setisOpen] = useState(true);
  const postgroup = useMutation(postGroup, {onSuccess: ({data}) => {
    window.alert("등록 성공! 디테일 페이지가 구현되면 그쪽으로 네비찍을 예정!")
    window.location.reload()
  }})

  const ModalClose = (event) => {
    if (event.target == event.currentTarget) {
      props.isOpen(false);
    }
  };  

  //리액트 훅 폼으로 POST 보낼 Json 생성, 후에 이미지 추가되면 FormData로변경되어야함
  const onPost = async (data) =>{
    const postRequest ={
      groupName : data.groupname,
      groupInfo : data.groupinfo
    }
      const res = await postgroup.mutateAsync(postRequest)
  }

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
      <form onSubmit={handleSubmit(onPost)}>
      <RegistInputContainer>

      <Input
          placeholder="그룹명을 입력하세요."
          register={register}
          name="groupname"
          type="text"
          label="그룹명"
        />
        <Input
          placeholder="그룹설명을 입력하세요."
          register={register}
          name="groupinfo"
          type="text"
          label="그룹설명"
        />
        <Button>그룹 생성하기</Button>


      </RegistInputContainer>
      </form>
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
  flex-direction: column;
  justify-content: center;
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
