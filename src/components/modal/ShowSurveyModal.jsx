
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getSurveyForAdmin, } from "../../utils/api/api";
import { useSearchParams } from "react-router-dom";
import styled from "styled-components";
import { motion } from "framer-motion";
import { flexCenter } from "../../utils/style/mixins";

const ShowSurveyModal = (props) => {
  const [searchParams, setSearchParams] = useSearchParams();
  const groupId = searchParams.get("groupId");
  const detailId = searchParams.get("detailId");

  const getDetail = useQuery(
    ["adminsurveyget", { id: props.id , groupId, detailId}],
    () => getSurveyForAdmin({ id: props.names.id , groupId, detailId})
  );

  const ModalClose = (event) => {
    if (event.target === event.currentTarget) {
      props.setShowModal(prevState => ({
        ...prevState,
        isModalOpen: false // 변경할 속성
      }));
    }
  };
  
  if (
    getDetail.isLoading ||
    getDetail.isError
  ) {
    return <></>;
  }

  return (<SurveyModalRegistModalBackGround onClick={ModalClose}>

    <SurveyModalSubmitFileModalWrapper>
      <SurveyModalSubmitFileContainer>
        <h1 className="buttontitle">작성자 : {props.names.name}</h1>
        
        {props.DTO.map((item, index) => {
          switch (item.type) {
            case 'CHECKBOX':
              return (<SurveyModalSurveyAnswerBox key = {item + index}>
                <h1 className="buttontitle">{index+1}번. {item.question}</h1>
                {item.options.split(", ").map((iteminoption, indexdetail) => (
                  getDetail?.data?.data?.data[index]?.answers.split(", ").indexOf(iteminoption) !== -1
                ?
                <h1 key = {iteminoption + indexdetail} className="rejecttext">{indexdetail + 1}. {iteminoption} (선택함)</h1>
                :
                <h1 key = {iteminoption + indexdetail} className="infocontent">{indexdetail + 1}. {iteminoption} </h1>
        ))}
              </SurveyModalSurveyAnswerBox>)
            case 'DESCRIPTIVE':
              return (<SurveyModalSurveyAnswerBox key = {item + index}>
                <h1 className="buttontitle">{index+1}번. {item.question}</h1>
                <h1 className="rejecttext">응답 : {getDetail?.data?.data?.data[index].answers}</h1>
              </SurveyModalSurveyAnswerBox>)
            case "OBJECTIVE":
              return (<SurveyModalSurveyAnswerBox key = {item + index}>
                <h1 className="buttontitle">{index+1}번. {item.question}</h1>
                {item.options.split(", ").map((iteminoption, indexdeatil0) => (
                  iteminoption == getDetail?.data?.data?.data[index].answers
                ?
                <h1 key = {iteminoption + indexdeatil0} className="rejecttext">{indexdeatil0 + 1}. {iteminoption} (선택함)</h1>
                :
                <h1 key = {iteminoption + indexdeatil0} className="infocontent">{indexdeatil0 + 1}. {iteminoption} </h1>
                ))}
              </SurveyModalSurveyAnswerBox>)
            default:
              return null
          }

        })}
      </SurveyModalSubmitFileContainer>
    </SurveyModalSubmitFileModalWrapper>
  </SurveyModalRegistModalBackGround>)
}

export default ShowSurveyModal

const SurveyModalSurveyAnswerBox = styled.div`
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

const SurveyModalRegistModalBackGround = styled.div`    
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
  font-weight: 500;
  font-size: 1.8rem;
  color: #5D5A88
}

.infocontent{
  font-weight: 400;
  font-size: 1.8rem;
  color: #9795B5
}
`;

const SurveyModalSubmitFileContainer = styled.div`
min-width: 100%;
min-height: 90%;
padding-bottom: 2rem;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: flex-start;
  gap: 2rem;
`;

const SurveyModalSubmitFileModalWrapper = styled(motion.section)` 
  width: 40vw;
  min-height: 40vw;
  overflow-y: auto;  
  max-height: 90vh;  
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

