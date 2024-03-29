import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { InputStyle } from "../../utils/style/mixins";
import { editReadyState } from "../../store/atom";
import { useRecoilState, useSetRecoilState } from "recoil";
import { editorState } from "../../store/atom";
import { modalVariants } from "../../utils/variants/variants";
import { toast } from "react-toastify";
import { useParams } from "react-router-dom";

const EditCommon = ({ reset, setPage, role }) => {
  const setIsOpen = useSetRecoilState(editReadyState);
  const [editor, setEditorState] = useRecoilState(editorState);
  const pam = useParams();
  const nextPage = () => {
    //그룹 아이디가 20이 아닌데,
    pam.id != 20 ?
    editor.category != "board" ?role == "USER"
    ?toast.error("권한이 없습니다.")
    :editor.title === "" ?toast.error("게시글의 제목을 입력해주세요", {toastId: "nextError",}) :setPage(2)
    :editor.title === "" ?toast.error("게시글의 제목을 입력해주세요", {toastId: "nextError",}) : setPage(2)
    :toast.error("가이드 그룹에서는 게시글을 작성하실 수 없습니다.")
    }

  const onCancel = () => {
    setIsOpen(false);
    reset();
  };
  return (
    <CommonInfoWrapper
      variants={modalVariants}
      initial="start"
      animate="animate"
    >
      <h1>게시글 작성하기</h1>
      <InputWrappers>
        <InputWrapper>
          <span>카테고리</span>
          <select
            onChange={(e) =>
              setEditorState({ ...editor, category: e.target.value })
            }
            value={editor.category}
          >
            <option value="board">게시글</option>
            <option value="homework">과제</option>
            <option value="vote">투표</option>
            <option value="notice">공지사항</option>
            <option value="survey">설문조사</option>
          </select>
        </InputWrapper>
        <InputWrapper>
          <span>글 제목</span>
          <input
            type="text"
            placeholder="글 제목을 입력해 주세요."
            value={editor.title}
            onChange={(e) =>
              setEditorState({ ...editor, title: e.target.value })
            }
          />
        </InputWrapper>
        
        {editor.category != "survey"
        ?
        <InputWrapper>
          <span>부제</span>
          <input
            type="text"
            placeholder="부제를 입력해 주세요."
            value={editor.subtitle}
            onChange={(e) =>
              setEditorState({ ...editor, subtitle: e.target.value })
            }
          />
        </InputWrapper>
        :null}
        <InputWrapper>
          <span>해시태그</span>
          <input
            onChange={(e) =>
              setEditorState({ ...editor, hashtagList: e.target.value })
            }
            type="text"
            placeholder="해시태그 ) #Navis #게시글"
            value={editor.hashtagList}
          />
        </InputWrapper>
      </InputWrappers>
      <ButtonWrapper>
        <button className="close" onClick={onCancel}>
          취소하기
        </button>
        <button className="next" onClick={nextPage}>
          다음으로
        </button>
      </ButtonWrapper>
    </CommonInfoWrapper>
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
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  span {
    width: 5rem;
    white-space: nowrap;
    font-size: 1.15rem;
  }
`;

const InputWrapper = styled.section`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

const CommonInfoWrapper = styled(motion.section)`
  z-index: 999;
  max-width: 60rem;
  width: 100vw;
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
  }

  input {
    color: ${(props) => props.theme.color.zeroThree} !important;
    height: 3rem !important;
    width: 100% !important;
    font-size: 1.2rem !important;
    font-weight: 500;
    ${InputStyle}
  }
`;

export default EditCommon;
