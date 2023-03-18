import { motion } from "framer-motion";
import React, { useState } from "react";
import styled from "styled-components";
import { flexCenter } from "../../utils/style/mixins";
import { modalVariants } from "../../utils/variants/variants";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postGroup, postGroupApply } from "../../utils/api/api";
import Input from "../../element/Input";
import Button from "../../element/Button";
import Test from "../../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import { useNavigate } from "react-router";

const PartyRegist = (props) => {
  const navi = useNavigate()
  const { register, formState: errors, handleSubmit } = useForm();
  const [images, setImages] = useState(Test);
  const [postImages, setPostImages] = useState(null);
  const [modalChange, setModalChange] = useState(true);
  const postgroup = useMutation(postGroup, {
    onSuccess: ({ data }) => {
      console.log(data)
      window.alert(
        "등록 성공!"
      );
      navi(`/party/${data.data}`)
    },
  });

  const postParticipation = useMutation(postGroupApply, {
    onSuccess: ({ data }) => {
      console.log(data)
      window.alert(
        "참가 성공!"
      );
      navi(`/party/${data.data}`)
    },
  })

  const ModalClose = (event) => {
    if (event.target === event.currentTarget) {
      props.isOpen(false);
    }
  };

  const ImageHandler = (event) => {
    console.log("핸들러 발동");
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setImages(reader.result);
    };
    setPostImages(file);
    if (file != null) {
      console.log("에베베베베");
      reader.readAsDataURL(file);
    } else {
      setImages(Test);
      setPostImages(null);
      console.log(postImages);
    }
  };

  //리액트 훅 폼으로 POST 보낼 Json 생성, 후에 이미지 추가되면 FormData로변경되어야함
  const onPost = async (data) => {
    const postRequest = new FormData();
    postRequest.append("groupName", data.groupname);
    postRequest.append("groupInfo", data.groupinfo);
    if (postImages != null) {
      postRequest.append("groupImage", postImages);
    }
    console.log(postRequest);
    for (const [key, value] of postRequest.entries()) {
      console.log(key, value);
    }
    const res = await postgroup.mutateAsync(postRequest);
  };

  const onParticipation = async (data) =>{
    const payload = { "groupCode" : data.code}
    const res = await postParticipation.mutateAsync(payload);
  }

  return (
    <RegistModalBackGround onClick={ModalClose}>
      
      <RegistModalWrapper
        variants={modalVariants}
        initial="start"
        animate="animate"
        exit="exit"
      >
        <TopButtonBox>
        <Button onClick={() => setModalChange(true)}> 그룹 생성하기</Button>
        <Button onClick={() => setModalChange(false)}>그룹 참여하기</Button>
        </TopButtonBox>
        {modalChange === true ? <>
        <h1>그룹 생성하기</h1>
        <form onSubmit={handleSubmit(onPost)}>
          <RegistInputContainer>
            <img
              src={images ? images : Test}
              alt="이미지를 가져와 주십시오"
              value={images}
              style={{ width: "400px", height: "240px" }}
            />
            <input
              type="file"
              accept="image/jpeg, image/png"
              onChange={ImageHandler}
            ></input>
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
        </form></>
        : <>
        <form onSubmit={handleSubmit(onParticipation)}>
            <Input
              placeholder="초대 코드를 입력하세요."
              register={register}
              name="code"
              type="text"
              label="code"
            />
            <Button>그룹 참여하기</Button>
        </form></>}
      </RegistModalWrapper>
    </RegistModalBackGround>
  );
};

const TopButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`

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
`;

const RegistModalWrapper = styled(motion.section)`
  width: 60rem;
  height: 70rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 5rem;
  background-color: white;
`;

export default PartyRegist;
