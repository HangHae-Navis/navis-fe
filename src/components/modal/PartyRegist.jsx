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
import { useNavigate, useParams } from "react-router";
import { useRecoilState } from "recoil";
import { partyInfoState, partyRegistModalState } from "../../store/atom";
import { InputStyle } from "../../utils/style/mixins";

const PartyRegist = () => {
  const navi = useNavigate();
  const { register, formState: errors, handleSubmit } = useForm();
  const [images, setImages] = useState(Test);
  const [postImages, setPostImages] = useState(null);
  const [titleState, setTitleState] = useState(null);
  const [infoState, setInfoState] = useState(null);
  const [modalChange, setModalChange] = useState(true);
  const [isPut, setIsPut] = useState(true);
  const [currentPage, setCurrentPage] = useState();
  const [isOpen, setIsOpen] = useRecoilState(partyRegistModalState);
  const [partyInfos, setPartyInfos] = useRecoilState(partyInfoState);
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
      setCurrentPage(window.location.pathname)
      currentPage == '/main' ?setIsPut(false) : setIsPut(true)
      console.log(partyInfos)
      console.log(partyInfos.groupName)
      console.log(partyInfos.groupInfo)
      setTitleState(partyInfos.groupName)
      setInfoState(partyInfos.groupInfo)
    };
  }, [])

  const ModalClose = (event) => {
    if (event.target === event.currentTarget) {
      setIsOpen(false);
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
  const onPostOrPut = async (data) => {
    const postRequest = new FormData();
    if(data.groupname != null){
      postRequest.append("groupName", data.groupname);
    }
    if( data.groupinfo != null){
      postRequest.append("groupInfo", data.groupinfo);
    }
    if (postImages != null) {
      postRequest.append("groupImage", postImages);
    }
    console.log(postRequest);
    for (const [key, value] of postRequest.entries()) {
      console.log(key, value);
    }
    if (currentPage == '/main') {
      const res = await postgroup.mutateAsync(postRequest);
    }
    else {
      const url = "/party/44/admin";
      const regex = /\/party\/(\d+)\/admin/; // 정규식

      const match = url.match(regex); // 문자열과 정규식을 비교하여 매치되는 부분 추출

        const partyId = match[1]; // 매치된 부분 중 첫 번째 괄호 안에 있는 숫자 추출
        console.log(partyId); // 44 출력
      const payload = {
        ID: partyId,
        form: postRequest
      }
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
        {currentPage == '/main'
          ? <>
            {modalChange == true
            ?<h1 className="buttontitle" onClick={() => setModalChange(true)}>그룹 생성하기</h1>
            :<h1 className="buttontitleoff" onClick={() => setModalChange(true)}>그룹 생성하기</h1>
            }
            
            {modalChange == false
            ?<h1 className="buttontitle" onClick={() => setModalChange(false)}>그룹 가입하기</h1>
            :<h1 className="buttontitleoff" onClick={() => setModalChange(false)}>그룹 가입하기</h1>
            }
            
          </> : null}

      </TopButtonBox>
        <ModalContentContainer>
        {modalChange === true ? (
    <form onSubmit={handleSubmit(onPostOrPut)}>
          <ModalContentWraper>
          <ModalContentBox>
            
          <ImageInputBox>
            <h1 className="infotitle">그룹 이미지</h1>
                <label htmlFor="file-upload">
                <img
                  src={images ? images : Test}
                  alt="이미지를 가져와 주십시오"
                  value={images}
                  style={{ width: "240px", height: "200px", borderRadius: "24px"}}
                />
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept="image/jpeg, image/png"
                  onChange={ImageHandler}
                  style={{ display: "none" }}
                ></input>
                <div>
                <h1 className="infocontent">그룹을 표현할 이미지를 등록해주세요.</h1>
                </div>
          </ImageInputBox>


              <RegistInputContainer>
                <InputWrapper>
                <h1 className="infotitle">그룹 이름</h1>
                <Input
                  placeholder="그룹명을 입력하세요."
                  register={register}
                  name="groupname"
                  type="text"
                  isput = {isPut}
                  defaultValue= {titleState}
                  width = {'46rem'}
                />
                </InputWrapper>
                <InputWrapper>
                <h1 className="infotitle">그룹 설명</h1>
                <Input
                  placeholder="그룹설명을 입력하세요."
                  register={register}
                  name="groupinfo"
                  type="text"
                  isput = {isPut}
                  defaultValue= {infoState}
                  width = {'46rem'}
                />
                </InputWrapper>
              </RegistInputContainer>
          </ModalContentBox>
                  {currentPage == '/main'
                    ? 
                    <ModalButtonBox>
                      <Button>그룹 생성하기</Button>
                      <Button transparent = {true} onClick={ModalClose}>취소하기</Button>
                    </ModalButtonBox>
                    : <ModalButtonBox>
                      <Button>그룹 수정하기</Button>
                      </ModalButtonBox>}
          </ModalContentWraper>
            </form>
        ) : (
            
            <form onSubmit={handleSubmit(onParticipation)}>
            <InputWrapper>
                <h2>NAVIS GROUP은 초대 코드가 있어야 입장이 가능합니다.</h2>
              <Input
                placeholder="초대 코드를 입력하세요."
                register={register}
                name="code"
                type="text"
                isput = {isPut}
              />
            </InputWrapper>
              <Button>그룹 참여하기</Button>
            </form>
        )}
        </ModalContentContainer>
      </RegistModalWrapper>
    </RegistModalBackGround>
  );
};

const ModalButtonBox = styled.div`
padding-top: 5rem;
display: flex;
flex-direction: row;
align-items: center;
gap: 2rem;
`

const InputWrapper = styled.section`
  width: 90%;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
  h1 {
    color: ${(props) => props.theme.color.zeroFour};
    max-width: 30rem;
  }
  h2 {
  font-weight: 700;
  font-size: 2.2rem;
  color: #5D5A88;
  }
  input {
    width: 85% !important;
    ${InputStyle}
  }
  .vote {
    width: 45% !important;
  }
  select {
    width: 8rem;
    border-radius: 5rem;
    padding-left: 0.6rem;
    height: 4.2rem;
    border: 0.1rem solid ${(props) => props.theme.color.zeroTwo};
    color: ${(props) => props.theme.color.zeroThree};
    &:focus {
      outline: none;
    }
    font-size: 1.3rem;
  }
`;
const ModalContentContainer = styled.div`
  width: 80%;
  height: 80%;
  display: flex;
  flex-direction: column;
  align-items: center;
justify-content: center;
`
const ModalContentWraper = styled.div`
display: flex;
flex-direction: column;
align-items: center;
justify-content: center;
`
const ModalContentBox = styled.div`
width: 80rem;
display: flex;
flex-direction: row;
align-items: center;
justify-content: center;
gap: 3rem;
`
const ShowImage = styled.image`
  width: 24rem;
  height: 20rem;
  border-radius: 1rem;
`

const TopButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 5rem;
  position: relative;
  &::before {
    content: '';
    position: absolute;
    left: calc(50% - 1px);
    top: 0;
    bottom: 0;
    width: 0.2rem;
    background-color: #9795B5;
  }
`;
const ImageInputBox = styled.div`
display: flex;
align-items: flex-start;
flex-direction: column;
justify-content: flex-start;
  gap: 1rem;
`

const RegistModalBackGround = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100vh;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.5);
  ${flexCenter}
.buttontitle {
  font-weight: 700;
  font-size: 3.2rem;
  color: #5D5A88;
}
.buttontitleoff {
  font-weight: 700;
  font-size: 3.2rem;
  color: #9795B5;
}
.infotitle{
  font-weight: 700;
  font-size: 2.4rem;
  color: #5D5A88;
}
.infocontent{
  font-weight: 400;
  font-size: 1.8rem;
  color: #9795B5
}
`;

const RegistInputContainer = styled.div`
width: 50%;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const RegistModalWrapper = styled(motion.section)`
  min-width: 95rem;
  min-height: 70rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  padding: 7rem;
  border-radius: 2.5rem;
  background-color: #F2F1FA;
  gap: 10rem;
`;

export default PartyRegist;
