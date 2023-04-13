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

const ShowSurveyModal = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");
  const detailId = searchParams.get("detailId");
  const [inputValue, setInputValue] = useState('');
  const [fileContainer, setFileContainer] = useState([])
  useEffect(() => {
    console.log(props)
    console.log(props.names.id)
    console.log(props.names.name)
  }, [])

  const ModalClose = (event) => {
    if (event.target === event.currentTarget) {
      props.setShowModal(false)
    }
  };
  return (<RegistModalBackGround onClick={ModalClose}>

    <SubmitFileModalWrapper>
      <SubmitFileContainer>
        <h1 className="buttontitle">작성자 : {props.names.name}</h1>
        
        {props.DTO.map((item, index) => {
          switch (item.type) {
            case 'CHECKBOX':
              return (<SurveyAnswerBox>
                <h1 className="buttontitle">{index+1}번. {item.question}</h1>
                {item.options.split(", ").map((iteminoption, index) => (
                  item.answerCount.split(", ")[index] == 1
                ?
                <h1 key = {iteminoption + index} className="rejecttext">{index + 1}. {iteminoption} (선택함)</h1>
                :
                <h1 key = {iteminoption + index} className="infocontent">{index + 1}. {iteminoption} </h1>
                ))}
              </SurveyAnswerBox>)
            case 'DESCRIPTIVE':
              return (<SurveyAnswerBox>
                <h1 className="buttontitle">{index+1}번. {item.question}</h1>
                <h1 className="rejecttext">응답 : {item.answerCount}</h1>
              </SurveyAnswerBox>)
            case "OBJECTIVE":
              return (<SurveyAnswerBox>
                <h1 className="buttontitle">{index+1}번. {item.question}</h1>
                {item.options.split(", ").map((iteminoption, index) => (
                  item.answerCount.split(", ")[index] == 1
                ?
                <h1 key = {iteminoption + index} className="rejecttext">{index + 1}. {iteminoption} (선택함)</h1>
                :
                <h1 key = {iteminoption + index} className="infocontent">{index + 1}. {iteminoption} </h1>
                ))}
              </SurveyAnswerBox>)
            default:
              return null
          }

        })}
      </SubmitFileContainer>
    </SubmitFileModalWrapper>
  </RegistModalBackGround>)
}

export default ShowSurveyModal

const SurveyAnswerBox = styled.div`
align-items: flex-start;
flex-direction: column;
display: flex;
gap: 1rem;
    width: 100%;
    padding: 2rem;
    background-color: white;
border-radius: 2.4rem;
border: 0.2rem solid #C0C0C0;
    white-space: pre-wrap;
    text-overflow: ellipsis;
    word-break: break-all;
`
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
min-width: 100%;
min-height: 90%;
padding-top: 2rem;
padding-bottom: 2rem;
  display: flex;
  align-items: flex-start;
  flex-direction: column;
  justify-content: center;
  gap: 2rem;
`;

const SubmitFileModalWrapper = styled(motion.section)`
  width: 40vw;
  min-height: 30vw;
  overflow-y: auto;  /* 세로축 스크롤을 사용합니다. */
  max-height: 80vh;  /* 최대 높이를 지정합니다. */
  display: flex;
align-items: flex-start;
  flex-direction: column;
  padding: 4rem;
  border-radius: 2.5rem;     
  background-color: #F2F1FA; 
  gap: 10rem;
  ::-webkit-scrollbar {
    display: none;
  }
`;
