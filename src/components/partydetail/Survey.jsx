import React from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useState } from "react";
import Button from "../../element/Button";
import { useEffect } from "react";
import { useMutation } from "react-query";
import { postSurveyData, putSurveyData } from "../../utils/api/api";
import { FullDateCheck } from "../../element/DateCheck";
import ShowSurveyModal from "../modal/ShowSurveyModal";
import SlideChart from "../party/SlideChart";
import { Checkbox } from "./CheckBox";
import { SurveyRadioButton } from "./SurveyRadioButton";

const Survey = (props) => {
  const [values, setValues] = useState(
    props?.res?.data?.data?.data?.questionResponseDto?.map((item) => ({
      questionId: item.id,
      answerList: [""],
    }))
  );
  const [isSubmit, setIsSubmit] = useState(props?.res?.data?.data?.data?.submit);
  const [adminSwitch, setAdminSwitch] = useState(false);
  const [individualState, setIndividualState] = useState({
    isModalOpen: false,
    modalID: {
      id: "",
      name: "",
    },
  });
  useEffect(() => {
    setIsSubmit(props.res?.data?.data?.data?.submit);
  }, [props.res?.data?.data?.data?.submit]);

  const postsurvey = useMutation(postSurveyData, {
    onSuccess: ({ data }) => {
      toast.success("설문이 작성되었습니다.");
    },
  });

  const putsurvey = useMutation(putSurveyData, {
    onSuccess: ({ data }) => {
      toast.success("설문이 수정되었습니다.");
      setIsSubmit(true);
    },
  });
  const changeInputList = ({ value, id, survId, isList }) => {
    let val = [...values];
    isList == true
      ? (val[id].answerList = value)
      : (val[id].answerList = [value]);
    setValues(val);
  };

  const IndividualModalOn = (props) => {
    setIndividualState({
      ...individualState,
      isModalOpen: true,
      modalID: {
        id: props.id,
        name: props.name,
      },
    });
  };

  const onPost = () => {
    const payload = {
      groupId: props.groupId,
      detailId: props.detailId,
      data: { answerRequestDto: values },
    };
    if (props.submit == true) {
      const res = putsurvey.mutateAsync(payload);
      setIsSubmit(true);
    } else {
      const res = postsurvey.mutateAsync(payload);
      setIsSubmit(true);
    }
  };

  return (
    <>
      {individualState.isModalOpen == true ? (
        <ShowSurveyModal
        setShowModal={setIndividualState}
        questions={props?.res?.data?.data?.data?.submitResponseDto}
        names={individualState.modalID}
          DTO={props?.res?.data?.data?.data?.answerList}
        />
      ) : null}
      <SurveyBackground>
        {props?.role === "USER" ? (
          <>
            <TitleBox>
              <h1 className="name">
                총 {props?.res?.data?.data?.data?.questionResponseDto.length}개
                항목이 있습니다.
              </h1>
              <h1 className="smalltitle">
                만료일자 :{" "}
                {FullDateCheck(props?.res?.data?.data?.data?.expirationDate)}{" "}
              </h1>
            </TitleBox>
            {isSubmit == false ? (
              <>
                {props?.list?.map((item, index) => {
                  switch (item.type) {
                    case "CHECKBOX":
                      return (
                        <SurveyTypeCheckBox key={index}>
                          <h1 className="name">
                            {index + 1}. {item.question}
                          </h1>
                          <Checkbox
                            id={index}
                            props={item.optionList}
                            changefunc={changeInputList}
                            survId={item.id}
                          ></Checkbox>
                        </SurveyTypeCheckBox>
                      );
                    case "DESCRIPTIVE":
                      return (
                        <SurveyTypeDescriptive key={index}>
                          <h1 className="name">
                            {index + 1}. {item.question}
                          </h1>

                          <InputWrapper>
                            <div className="form">
                              <section className="center">
                                <div className="inputLayout">
                                  <textarea
                                    value={values[index]?.answerList}
                                    onChange={(e) =>
                                      changeInputList({
                                        value: e.target.value,
                                        id: index,
                                        isList: false,
                                      })
                                    }
                                  />
                                </div>
                              </section>
                            </div>
                          </InputWrapper>
                        </SurveyTypeDescriptive>
                      );
                    case "OBJECTIVE":
                      return (
                        <SurveyTypeObjective key={index}>
                          <h1 className="name">
                            {index + 1}. {item.question}
                          </h1>
                          <SurveyRadioButton
                            id={index}
                            props={item.optionList}
                            survId={item.id}
                            changefunc={changeInputList}
                          />
                        </SurveyTypeObjective>
                      );
                    default:
                      return null;
                  }
                })}
                <Button onClick={onPost}>등록하기</Button>
              </>
            ) : (
              <>
                <h1 className="name">설문에 응해주셔서 감사합니다.</h1>
                <Button onClick={() => setIsSubmit(false)}>다시하기</Button>
              </>
            )}
          </>
        ) : (
          <>
            <TitleBox>
              <h1 className="name">
                총 {props?.res?.data?.data?.data?.answerList?.length}개 항목이
                있습니다.
              </h1>
              <h1 className="smalltitle">
                만료일자 :{" "}
                {FullDateCheck(props?.res?.data?.data?.data?.expirationDate)}{" "}
              </h1>
            </TitleBox>
            <AdminBox>
              <Button
                transparent={adminSwitch}
                color="rgb(88, 85, 133)"
                onClick={() => setAdminSwitch(false)}
              >
                전체통계
              </Button>
              <Button
                transparent={!adminSwitch}
                color="rgb(88, 85, 133)"
                onClick={() => setAdminSwitch(true)}
              >
                개별응답
              </Button>
            </AdminBox>
            {adminSwitch === false ? (
              props?.res?.data?.data?.data?.answerList?.map((item, index) => {
                switch (item.type) {
                  case "CHECKBOX":
                    return (
                      <SurveyTypeCheckBox key={index}>
                        <h1 className="name">
                          {index + 1}. {item.question}
                        </h1>
                        {item.options.split(", ").map((iteminoption, index) => (
                          <SlideChart
                            key={index}
                            option={iteminoption}
                            voteMax={item.answerCount
                              .split(", ")
                              .reduce((acc, curr) => acc + parseInt(curr), 0)}
                            count={item.answerCount.split(", ")[index]}
                          ></SlideChart>
                        ))}
                      </SurveyTypeCheckBox>
                    );
                  case "DESCRIPTIVE":
                    return (
                      <SurveyTypeDescriptive key={index}>
                        <h1 className="name">
                          {index + 1}. {item.question}
                        </h1>
                        {item.answerCount.split("|| ").map((item, index) => (
                          <AnswerBox key={index}>
                            <h1 className="smallname">{item}</h1>
                          </AnswerBox>
                        ))}
                      </SurveyTypeDescriptive>
                    );
                  case "OBJECTIVE":
                    return (
                      <SurveyTypeObjective key={index}>
                        <h1 className="name">
                          {index + 1}. {item.question}
                        </h1>
                        {item.options.split(", ").map((iteminoption, index) => (
                          <SlideChart
                            key={index}
                            option={iteminoption}
                            voteMax={item.answerCount
                              .split(", ")
                              .reduce((acc, curr) => acc + parseInt(curr), 0)}
                            count={item.answerCount.split(", ")[index]}
                          ></SlideChart>
                        ))}
                      </SurveyTypeObjective>
                    );
                  default:
                    return null;
                }
              })
            ) : (
              <IndividualSurveyBox>
                <IndividualSurveyContainer>
                  <h1 className="name">
                    {props?.res?.data?.data?.data?.submitResponseDto.length}명이
                    응답함
                  </h1>
                  {props?.res?.data?.data?.data?.submitResponseDto.map(
                    (item, index) => (
                      <SubmitterContainer key={index}>
                        <h1 className="smallname">{item.nickname}</h1>
                        <SubmiterButton
                          onClick={() =>
                            IndividualModalOn({
                              name: item.nickname,
                              id: item.userId,
                            })
                          }
                        >
                          응답보기
                        </SubmiterButton>
                      </SubmitterContainer>
                    )
                  )}
                </IndividualSurveyContainer>
              </IndividualSurveyBox>
            )}
          </>
        )}
        {/* */} {/* */}
      </SurveyBackground>
    </>
  );
};

export default Survey;

const SubmiterButton = styled.button`
  width: 10rem;
  height: 4rem;
  background-color: #5d5a88;
  cursor: pointer;
  color: white;
  border-radius: 2.4rem;
  border: 0.1rem solid #5d5a88;
  font-weight: 400;
  font-size: 1.6rem;
`;
const SubmitterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;
const IndividualSurveyContainer = styled.div`
  width: ${({ width }) => width || "25vw"};
  max-width: 100%;
  height: 100%;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  border-radius: 4rem;
  border: 0.2rem solid ${({ borderColor }) => borderColor || "#D4D2E3"};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  padding: 5rem;
  gap: 2rem;
  background-color: white;
  .buttontext {
    font-weight: 400;
    font-size: 1.4rem;
    color: #5d5a88;
  }
  .filename {
    font-weight: 400;
    font-size: 1.6rem;
    color: #9795b5;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .name {
    font-weight: 400;
    font-size: 2.2rem;
    color: #5d5a88;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .smallname {
    font-weight: 400;
    font-size: 1.8rem;
    color: #9795b5;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .date {
    font-weight: 400;
    font-size: 2rem;
    color: #9795b5;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
const IndividualSurveyBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  text-align: center;
  justify-content: center;
`;

const AdminBox = styled.div`
  width: 100%;
  align-items: center;
  flex-direction: row;
  display: flex;
  justify-content: center;
  gap: 2rem;
`;

const AnswerBox = styled.div`
  align-items: flex-start;
  flex-direction: column;
  display: flex;
  gap: 1rem;
  width: 90%;
  background-color: #f6f6f6;
  padding: 1rem;
  border-radius: 1.6rem;
`;

const TitleBox = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const InputWrapper = styled.section`
  width: 100%;
  display: flex;
  gap: 1rem;

  .center {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .form {
    width: 100%;
    .inputLayout {
      display: flex;
      align-items: center;
      textarea {
        background-color: #f6f6f6;
        border-radius: 1.6rem;
        width: 100%;
        border-radius: 0.4rem;
        border: none;
        font-size: 1.1rem;
        padding: 0.8rem;
        resize: none;
        &:focus {
          outline: none;
        }
      }
    }
  }
`;

const SurveyTypeDescriptive = styled.div`
  align-items: flex-start;
  flex-direction: column;
  display: flex;
  gap: 1rem;
  width: 90%;
  padding: 2rem;
  background-color: white;
  border-radius: 2.4rem;
  border: 0.2rem solid #c0c0c0;
  overflow: hidden;
  white-space: pre-wrap;
  text-overflow: ellipsis;
  word-break: break-all;
`;

const SurveyTypeCheckBox = styled.div`
  align-items: flex-start;
  flex-direction: column;
  display: flex;
  gap: 1rem;
  width: 90%;
  padding: 2rem;
  background-color: white;
  border-radius: 2.4rem;
  border: 0.2rem solid #c0c0c0;
`;

const SurveyTypeObjective = styled.div`
  align-items: flex-start;
  flex-direction: column;
  display: flex;
  justify-content: flex-start;
  gap: 1rem;
  width: 90%;
  padding: 2rem;
  background-color: white;
  border-radius: 2.4rem;
  border: 0.2rem solid #c0c0c0;
`;

const SurveyBackground = styled.div`
  width: 100%;
  height: 100%;
  gap: 2rem;
  align-items: flex-start;
  flex-direction: column;
  display: flex;
  background-color: #f6f6f6;
  padding: 2rem;
  overflow: hidden;
  border-radius: 2.4rem;
  .buttontext {
    font-weight: 400;
    font-size: 1.4rem;
    color: #5d5a88;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .filename {
    font-weight: 400;
    font-size: 1.6rem;
    color: #9795b5;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .name {
    font-weight: 400;
    font-size: 2.2rem;
    color: #222222;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .smalltitle {
    font-weight: 300;
    font-size: 1.3rem;
    color: #222222;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .smallname {
    font-weight: 400;
    font-size: 1.8rem;
    color: #222222;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    word-break: break-all;
  }
  .date {
    font-weight: 400;
    font-size: 2rem;
    color: #9795b5;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    word-break: break-all;
  }
`;
