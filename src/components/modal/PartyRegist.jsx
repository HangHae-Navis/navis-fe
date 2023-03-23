import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { flexCenter } from "../../utils/style/mixins";
import { modalVariants } from "../../utils/variants/variants";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postGroup, postGroupApply, PutGroup } from "../../utils/api/api";
import Input from "../../element/Input";
import Button from "../../element/Button";
import Test from "../../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import { useNavigate } from "react-router";
import { useRecoilState } from "recoil";
import { partyRegistModalState } from "../../store/atom";

const PartyRegist = () => {
  const navi = useNavigate();
  const { register, formState: errors, handleSubmit } = useForm();
  const [images, setImages] = useState(Test);
  const [postImages, setPostImages] = useState(null);
  const [modalChange, setModalChange] = useState(true);
  const [isPut, setIsPut] = useState(true);
  const [currentPage, setCurrentPage] = useState();
  const [isOpen, setIsOpen] = useRecoilState(partyRegistModalState);
  const postgroup = useMutation(postGroup, {
    onSuccess: ({ data }) => {
      console.log(data);
      window.alert("등록 성공!");
      navi(`/party/${data.data}`);
    },
  });
  const putgroup = useMutation(PutGroup, {
    onSuccess: ({ data }) => {
      console.log(data);
      window.alert("등록 성공!");
      navi(`/main`);
    },
  });

  const postParticipation = useMutation(postGroupApply, {
    onSuccess: ({ data }) => {
      console.log(data);
      window.alert("참가 성공!");
      navi(`/party/${data.data}`);
    },
  });

  useEffect(() => {
    return () => {
      setCurrentPage(window.location.pathname);
      currentPage == "/main" ? setIsPut(false) : setIsPut(true);
    };
  }, []);

  const ModalClose = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
    }
  };
  console.log(currentPage);

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
  const onPostOrPut = async (data) => {
    const postRequest = new FormData();
    if (data.groupname != null) {
      postRequest.append("groupName", data.groupname);
    }
    if (data.groupinfo != null) {
      postRequest.append("groupInfo", data.groupinfo);
    }
    if (postImages != null) {
      postRequest.append("groupImage", postImages);
    }
    console.log(postRequest);
    for (const [key, value] of postRequest.entries()) {
      console.log(key, value);
    }
    if (currentPage === "/main") {
      const res = await postgroup.mutateAsync(postRequest);
    } else {
      const url = "/party/44/admin";
      const regex = /\/party\/(\d+)\/admin/; // 정규식

      const match = url.match(regex); // 문자열과 정규식을 비교하여 매치되는 부분 추출

      const partyId = match[1]; // 매치된 부분 중 첫 번째 괄호 안에 있는 숫자 추출
      console.log(partyId); // 44 출력
      const payload = {
        ID: partyId,
        form: postRequest,
      };
      const res = await putgroup.mutateAsync(payload);
    }
  };
  const onParticipation = async (data) => {
    const payload = { groupCode: data.code };
    const res = await postParticipation.mutateAsync(payload);
  };

  return (
    <RegistModalBackGround onClick={ModalClose}>
      <RegistModalWrapper
        variants={modalVariants}
        initial="start"
        animate="animate"
        exit="exit"
      >
        <TopButtonBox>
          {currentPage === "/main" ? (
            <>
              <Button onClick={() => setModalChange(true)}>
                {" "}
                그룹 생성하기
              </Button>
              <Button onClick={() => setModalChange(false)}>
                그룹 참여하기
              </Button>
            </>
          ) : null}
        </TopButtonBox>
        {modalChange === true ? (
          <>
            <h1>그룹 생성하기</h1>
            <form onSubmit={handleSubmit(onPostOrPut)}>
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
                  isput={isPut}
                />
                <Input
                  placeholder="그룹설명을 입력하세요."
                  register={register}
                  name="groupinfo"
                  type="text"
                  label="그룹설명"
                  isput={isPut}
                />
                {currentPage === "/main" ? (
                  <>
                    <Button>그룹 생성하기</Button>
                  </>
                ) : (
                  <Button>그룹 수정하기</Button>
                )}
              </RegistInputContainer>
            </form>
          </>
        ) : (
          <>
            <form onSubmit={handleSubmit(onParticipation)}>
              <Input
                placeholder="초대 코드를 입력하세요."
                register={register}
                name="code"
                type="text"
                label="code"
              />
              <Button>그룹 참여하기</Button>
            </form>
          </>
        )}
      </RegistModalWrapper>
    </RegistModalBackGround>
  );
};

const TopButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const RegistModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
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
