import { motion } from "framer-motion";
import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { flexCenter } from "../../utils/style/mixins";
import { modalVariants } from "../../utils/variants/variants";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { postFeedback, postGroup, postGroupApply, PutGroup, putHomeWorkData } from "../../utils/api/api";
import Input from "../../element/Input";
import Button from "../../element/Button";
import Test from "../../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import { useNavigate, useParams } from "react-router";
import { useRecoilState, useResetRecoilState } from "recoil";
import { partyInfoState, partyRegistModalState } from "../../store/atom";
import { InputStyle } from "../../utils/style/mixins";
import { ShortCheck } from "../../element/DateCheck";
import { toast } from "react-toastify";
import { useSearchParams } from "react-router-dom";

const ShowSubmitFile = (props) =>{
  const [searchParams, setSearchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");
  const detailId = searchParams.get("detailId");
  const [inputValue, setInputValue] = useState('');
    const [fileContainer, setFileContainer] = useState([])
    useEffect(() => {
      console.log(props)
    }, [])

    
  const postfeedback = useMutation(postFeedback, {
    onSuccess: ({data}) => {
      console.log("피드백 성공")
      toast.success("피드백 성공.");
      props.res.refetch()
      props.setShowModal(false)
    }
  })
  const ModalClose = (event) => {
    if (event.target === event.currentTarget) {
        props.setShowModal(false)
    }
  };

  const handleInputChange = (event) => {
    const { value } = event.target;
    setInputValue(value);
  };

    const onFeedback = (data) =>{
      console.log(data)
      console.log(inputValue); // 입력한 값 출력

      
    const payload = {
      groupId,
      detailId,
      subjectId: props.courrentModalContent.subjectId,
      data : inputValue,
      check : data
    }
    const res = postfeedback.mutateAsync(payload)
    }

    useEffect(() => {
        for(let i = 0; i < props.courrentModalContent.fileList.length; i++){
            const a = {file: props.courrentModalContent.fileList[i], name : props.courrentModalContent.fileName[i] }
            console.log(a)
            setFileContainer(fileContainer => [...fileContainer, a])
        }
    }, [])
    return(<RegistModalBackGround onClick={ModalClose}>

        <SubmitFileModalWrapper>
            <SubmitFileContainer>
                <SubmitTitle>
                <h1 className="buttontitle">{props.courrentModalContent.nickname}</h1>
                <h1 className="infocontent">{ShortCheck(props.courrentModalContent.createdAt)} 제출함{props.courrentModalContent.late == true ? <span> (지각)</span> :null} </h1>
                
                </SubmitTitle>
                <h1 className="buttontitleoff">제출 파일 목록</h1>
                {fileContainer.map((item) => (<a key = {item.file} href={`${item.file}?download=true`} className="filetext">&middot; {item.name}</a>))}
            </SubmitFileContainer>
            <FeedbackContainer>
              {props.courrentModalContent.feedbackList[0] == 'None'
              ?
              <>
              <FeedbackInput type="text" value={inputValue} onChange={handleInputChange}></FeedbackInput>
              <FeedbackInputBox>
            <FeedbackButton className="rejecttext" onClick={() =>onFeedback(true)}>확정하기</FeedbackButton>
            <FeedbackButton className="infocontent"onClick={() => onFeedback(false)}>반려하기</FeedbackButton>
              </FeedbackInputBox>
              </>
              
              : //답안을 새로 제출했는가 안했는가를 따져야 하는데 이는 어쩌지?
              props.courrentModalContent.submitCheck == false && props.courrentModalContent.updateSubject == true
              ?
              <>
              <FeedbackBox>
                {props.courrentModalContent.submitCheck == true
                ?<h1 className="buttontitle">내가 남긴 피드백 (확정)</h1>
              :<h1 className="buttontitle">내가 남긴 피드백 (반려)</h1>
              }
              <h1 className="infocontent">{props.courrentModalContent.feedbackList[0]}</h1>
              
              </FeedbackBox>
              <FeedbackInput type="text" value={inputValue} onChange={handleInputChange}></FeedbackInput>
              <FeedbackInputBox>
            <FeedbackButton className="rejecttext" onClick={() =>onFeedback(true)}>확정하기</FeedbackButton>
            <FeedbackButton className="infocontent"onClick={() => onFeedback(false)}>반려하기</FeedbackButton>
              </FeedbackInputBox>
              </>
              :
              <FeedbackBox>
              <h1 className="buttontitle">내가 남긴 피드백</h1>
              {props.courrentModalContent.feedbackList.map((item, index) => (
                <h1 key = {item + index} className="infocontent">{index + 1}번 : {item}</h1>
              ))}
              </FeedbackBox>
              }
        </FeedbackContainer>
        </SubmitFileModalWrapper>
    </RegistModalBackGround>)
}

export default ShowSubmitFile

const FeedbackBox = styled.div`
display: flex;
align-items: flex-start;
flex-direction: column;
max-width: 40rem;
  word-wrap: break-word; /* 또는 overflow-wrap: break-word; */
  white-space: pre-line;
  gap:1rem;
`

const FeedbackButton = styled.button`
  cursor: pointer;
  width: 13rem;
  height: 5rem;
  background-color: transparent;
  border-radius: 2.4rem;
  border: 0.1rem solid #5D5A88;
`
const FeedbackInputBox = styled.div`
display: flex;
align-items: center;
flex-direction: row;
justify-content: space-between;
text-align: center;
gap: 2rem;
`

const FeedbackInput = styled.textarea`
width : 45rem;
min-height: 10rem; /* 최소 높이 */
border: 1px solid gray;
border-radius: 5px;
font-size: 16px;
resize:none;
  color: black;
  height: auto; /* 높이 자동 조절 */
  overflow-y: hidden; /* 자동 조절되는 높이가 넘칠 때 스크롤이 생기지 않도록 함 */
`

const FeedbackContainer = styled.div`
  display:flex;
align-items: center;
flex-direction: column;
gap:2rem
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
  .filetext {
  font-weight: 700;
  font-size: 2.2rem;
  }
.buttontitle {
  font-weight: 700;
  font-size: 2.4rem;
  color: #5D5A88;
}
.buttontitleoff {
  font-weight: 400;
  font-size: 2.4rem;
  color: #9795B5;
}
.infotitle{
  font-weight: 700;
  font-size: 2.4rem;
  color: #5D5A88;
}

.rejecttext{
  font-weight: 400;
  font-size: 1.8rem;
  color: #5D5A88
}

.infocontent{
  font-weight: 400;
  font-size: 1.8rem;
  color: #9795B5
}
`;
const SubmitTitle = styled.div`
display: flex;
align-items: center;
flex-direction: row;
justify-content: space-between;
text-align: center;
gap: 2rem;
`

const SubmitFileContainer = styled.div`
min-width: 80%;
min-height: 80%;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const SubmitFileModalWrapper = styled(motion.section)`
  min-width: 60rem;
  min-height: 30rem;
  display: flex;
align-items: flex-start;
  flex-direction: column;
  padding: 4rem;
  border-radius: 2.5rem;     
  background-color: #F2F1FA; 
  gap: 10rem;
`;
