import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { modalVariants } from "../../utils/variants/variants";
import { InputStyle } from "../../utils/style/mixins";
import { useRecoilState } from "recoil";
import { editorState } from "../../store/atom";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";

const EditSpecial = ({ setPage }) => {
  const { id } = useParams();
  const [editInfo, setEditInfo] = useRecoilState(editorState);
  const navigate = useNavigate();
  const onNext = () => {
    if (editInfo.category !== "survey") navigate(`/party/${id}/edit`);
    else setPage(3);
  };
  console.log(editInfo.expirationDate);
  return (
    <SpecialInfoWrapper
      variants={modalVariants}
      initial="start"
      animate="animate"
    >
      <InputWrappers>
        <h1>게시물 작성하기</h1>
        {(editInfo.category === "homework" || editInfo.category === "vote") && (
          <>
            <div className="top-infos">
              <InputWrapper>
                <span>제출 기한</span>
                <input
                  min={new Date().toISOString().slice(0, -8)}
                  onChange={(event) =>
                    setEditInfo({
                      ...editInfo,
                      expirationDate: event.target.value,
                    })
                  }
                  value={editInfo.expirationDate}
                  type="datetime-local"
                  className="date"
                />
              </InputWrapper>
              <InputWrapper>
                <span>중요도</span>
                <select
                  onChange={(e) =>
                    setEditInfo({ ...editInfo, important: e.target.value })
                  }
                  value={editInfo.important}
                >
                  <option value="0">0</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4</option>
                  <option value="5">5</option>
                </select>
              </InputWrapper>
            </div>
            {editInfo.category === "vote" && (
              <InputWrapper>
                <span>투표 목록</span>
                <input
                  placeholder="ex ) 피자 햄버거 짜장면"
                  onChange={(event) =>
                    setEditInfo({
                      ...editInfo,
                      optionList: event.target.value,
                    })
                  }
                  value={editInfo.optionList}
                  type="text"
                />
              </InputWrapper>
            )}
          </>
        )}
      </InputWrappers>
      <Info>
        <ul className="info">
          <li className="title">카테고리</li>
          {editInfo.category === "board" && <li className="value">게시글</li>}
          {editInfo.category === "homework" && <li className="value">과제</li>}
          {editInfo.category === "vote" && <li className="value">투표</li>}
          {editInfo.category === "notice" && (
            <li className="value">공지사항</li>
          )}
          {editInfo.category === "survey" && (
            <li className="value">설문조사</li>
          )}
        </ul>
        <ul className="info">
          <li className="title">글 제목</li>
          <li className="value">
            {editInfo.title === "" ? "-" : editInfo.title}
          </li>
        </ul>
        <ul className="info">
          <li className="title">부제</li>
          <li className="value">
            {editInfo.subtitle === "" ? "-" : editInfo.subtitle}
          </li>
        </ul>
        <ul className="info">
          <li className="title">해시태그</li>
          <li className="value">
            {editInfo.hashtagList === "" ? "-" : editInfo.hashtagList}
          </li>
        </ul>
      </Info>
      <ButtonWrapper>
        <button onClick={() => setPage(1)}>이전으로</button>
        <button className="next" onClick={onNext}>
          다음으로
        </button>
      </ButtonWrapper>
    </SpecialInfoWrapper>
  );
};

const Info = styled.section`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 1rem;

  .info {
    width: 100%;
    justify-content: flex-start;
    display: flex;
    align-items: center;
    gap: 0.8rem;

    .title {
      width: 6rem;
      font-size: 1.4rem;
    }

    .value {
      color: #676767;
      font-size: 1.25rem;
    }
  }
`;

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
  width: 75%;
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

const InputWrapper = styled.section`
  display: flex;
  gap: 0.6rem;
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
  justify-content: space-around;
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

  h1 {
    font-size: 2rem;
    color: ${(props) => props.theme.color.zeroFour};
    font-weight: 700;
    text-align: center;
  }

  input {
    color: ${(props) => props.theme.color.zeroThree} !important;
    height: 3rem !important;
    width: 100% !important;
    font-size: 1.15rem !important;
    padding-left: 0.8rem !important;
    font-weight: 500;
    ${InputStyle}
  }

  .date {
    font-size: 1rem !important;
  }
`;

export default EditSpecial;
