import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { modalVariants } from "../../utils/variants/variants";
import { InputStyle } from "../../utils/style/mixins";
import { useRecoilState } from "recoil";
import { editorState } from "../../store/atom";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { useState } from "react";
import { v4 } from "uuid";

const EditSurvey = ({ setPage }) => {
  const { id } = useParams();
  const [editInfo, setEditInfo] = useRecoilState(editorState);
  const navigate = useNavigate();
  const onNext = () => {
    if (editInfo.category !== "survey") navigate(`/party/${id}/edit`);
    else setPage(3);
  };
  const [dd, setDD] = useState([
    {
      id: `${v4()}`,
      type: "DESCRIPTIVE",
      question: "",
      options: "",
    },
  ]);
  const onAdd = () => {
    setDD([
      ...dd,
      {
        id: `${v4()}`,
        type: "DESCRIPTIVE",
        question: "",
        options: "",
      },
    ]);
  };

  const onDelete = () => {
    const newDD = [...dd];
    newDD.pop(); // 맨 마지막 요소를 제거
    setDD(newDD);
  };

  const onTypeChange = (event, id) => {
    const newDD = dd.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          question: "",
          options: "",
          type: event.target.value,
        };
      }
      return item;
    });
    setDD(newDD);
  };

  const onQuestionChange = (event, id) => {
    const newDD = dd.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          question: event.target.value,
        };
      }
      return item;
    });
    setDD(newDD);
  };

  const onOptionsChange = (event, id) => {
    const newDD = dd.map((item) => {
      if (item.id === id) {
        return {
          ...item,
          options: event.target.value,
        };
      }
      return item;
    });
    setDD(newDD);
  };

  return (
    <SpecialInfoWrapper
      variants={modalVariants}
      initial="start"
      animate="animate"
    >
      <InputWrappers>
        <div className="head">
          <h1>게시물 작성하기</h1>
          <div className="menu">
            <span onClick={onAdd}>추가</span>
            {dd.length !== 1 && <span onClick={onDelete}>삭제</span>}
          </div>
        </div>
        {editInfo.category === "survey" && (
          <SurveyWrapper>
            {dd.map((ddd) => (
              <SurveyList key={ddd.id}>
                <span>형식</span>
                <select
                  value={ddd.type}
                  onChange={(event) => onTypeChange(event, ddd.id)}
                >
                  <option value="DESCRIPTIVE">서술형</option>
                  <option value="CHECKBOX">체크박스</option>
                  <option value="OBJECTIVE">객관식</option>
                </select>
                <span>문항</span>
                <input
                  type="text"
                  value={ddd.question}
                  onChange={(event) => onQuestionChange(event, ddd.id)}
                  placeholder="설문 문항"
                />
                {ddd.type !== "DESCRIPTIVE" && (
                  <>
                    <span>옵션</span>
                    <input
                      type="text"
                      value={ddd.options}
                      onChange={(event) => onOptionsChange(event, ddd.id)}
                      placeholder="파란색 빨간색 보라색"
                    />
                  </>
                )}
              </SurveyList>
            ))}
          </SurveyWrapper>
        )}
      </InputWrappers>
      <ButtonWrapper>
        <button onClick={() => setPage(2)}>이전으로</button>
        <button className="next" onClick={onNext}>
          게시하기
        </button>
      </ButtonWrapper>
    </SpecialInfoWrapper>
  );
};

const ButtonWrapper = styled.section`
  display: flex;
  gap: 1rem;
  align-items: center;
  button {
    cursor: pointer;
    background: #eeeeee;
    border-radius: 2.5rem;
    border: 0.1rem solid ${(props) => props.theme.color.zeroThree};
    font-size: 1.25rem;
    height: 3.5rem;
    padding: 0.4rem 1.6rem;
  }
  .next {
    border: none;
    color: #ffffff;
    background-color: ${(props) => props.theme.color.zeroFour};
  }
`;

const InputWrappers = styled.section`
  width: 88%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  span {
    width: 5rem;
    white-space: nowrap;
    font-size: 1.4rem;
  }

  .top-infos {
    padding-top: 7rem;
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: flex-start;
    input {
      width: 15rem !important;
    }
  }
`;

const SurveyWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  width: 100%;
  justify-content: flex-start;
  gap: 0.6rem;
  height: 16rem;
  overflow-y: auto;
  margin: 2rem 0;
`;

const SurveyList = styled.li`
  display: flex;
  width: 100%;
  gap: 0.8rem;
  align-items: center;
  justify-content: flex-start;
`;

const SpecialInfoWrapper = styled(motion.section)`
  z-index: 999;
  max-width: 60rem;
  width: 90vw;
  height: 45rem;
  background-color: #eeeeee;
  border-radius: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-evenly;
  align-items: center;

  select {
    width: 7.5rem;
    border-radius: 5rem;
    padding-left: 0.4rem;
    margin-left: -0.4rem;
    height: 3rem;
    border: 0.1rem solid ${(props) => props.theme.color.zeroTwo};
    color: ${(props) => props.theme.color.zeroThree};
    &:focus {
      outline: none;
    }
    font-size: 1.3rem;
  }

  .head {
    display: flex;
    align-items: center;
    flex-direction: column;

    h1 {
      font-size: 2rem;
      color: ${(props) => props.theme.color.zeroFour};
      font-weight: 700;
      text-align: center;
    }
    span {
      color: ${(props) => props.theme.color.zeroThree};
      cursor: pointer;
      font-size: 1.15rem;
    }
    .menu {
      width: 100%;
      text-align: right;
      span {
        padding: 0 0.6rem;
      }
      align-items: center;
    }
  }

  input {
    color: ${(props) => props.theme.color.zeroThree} !important;
    height: 3rem !important;
    width: 100% !important;
    font-size: 1.05rem !important;
    padding-left: 0.8rem !important;
    font-weight: 500;
    ${InputStyle}
  }

  .date {
    font-size: 1rem !important;
  }
`;

export default EditSurvey;
