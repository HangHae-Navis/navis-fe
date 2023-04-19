
import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { getSurveyForAdmin, } from "../../utils/api/api";
import { useSearchParams } from "react-router-dom";
import { SurveyModalRegistModalBackGround, SurveyModalSubmitFileContainer, SurveyModalSubmitFileModalWrapper, SurveyModalSurveyAnswerBox } from "../../utils/style/componentLayout";

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
