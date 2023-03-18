import ReactCodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useCallback } from "react";
import { markdownState } from "../../store/atom";
import { postGroupPost } from "../../utils/api/api";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputStyle } from "../../utils/style/mixins";

const MarkdownEditorWrapper = styled.section`
  * {
    font-size: 1.5rem;
  }
  background-color: ${(props) => props.theme.color.zeroOne};
  padding: 3.1rem 1rem;
  width: 52%;
  font-family: Pretendard !important;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  font-size: 1.3rem;
`;

const InputWrapper = styled.section`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 1rem;
  h1 {
    color: ${(props) => props.theme.color.zeroFour};
    width: 7rem;
  }
  h2 {
    color: ${(props) => props.theme.color.zeroFour};
    width: 6.5rem;
  }
  input {
    ${InputStyle}
  }
  select {
    width: 9.4rem;
    border-radius: 5rem;
    padding-left: 0.6rem;
    height: 4.2rem;
    border: 0.1rem solid ${(props) => props.theme.color.zeroTwo};
    color: ${(props) => props.theme.color.zeroThree};
    &:focus {
      outline: none;
    }
  }
`;

const ReactMarkdownEditor = styled(ReactCodeMirror)`
  * {
    outline: none !important;
  }

  .ͼo {
    background-color: #f9f9ff !important;
  }
  .ͼ11 {
    color: #9795b5;
  }
  .ͼ13 {
    color: #9795b5;
  }
`;

const MarkdownEditor = () => {
  const { id } = useParams();
  const [markdownValue, setMarkdownValue] = useRecoilState(markdownState);
  const { register, watch, handleSubmit } = useForm();
  const onChange = useCallback((value) => {
    setMarkdownValue(value);
  }, []);
  const boardMutation = useMutation((data) => postGroupPost(id, data));
  const onSubmit = async (data) => {
    const requestDto = {
      title: data.title,
      subtitle: data.subtitle,
      content: data.content,
    };
    const res = await boardMutation.mutateAsync(requestDto);
  };
  return (
    <MarkdownEditorWrapper>
      <InputWrapper>
        <h2>카테고리</h2>
        <select {...register("writing")}>
          <option value="게시글">게시글</option>
          <option value="과제">과제</option>
          <option value="투표">투표</option>
          <option value="공지사항">공지사항</option>
        </select>
        <h1>중요도</h1>
        <select {...register("star")}>
          <option value="5">5</option>
          <option value="4">4</option>
          <option value="3">3</option>
          <option value="2">2</option>
          <option value="1">1</option>
        </select>
      </InputWrapper>
      <InputWrapper>
        <h1>글 제목</h1>
        <input
          type="text"
          placeholder="글 제목을 입력해주세요."
          {...register("title")}
        />
      </InputWrapper>
      <InputWrapper>
        <h1>안내문구</h1>
        <input
          type="text"
          {...register("subtitle")}
          placeholder="안내문구를 입력해주세요."
        />
      </InputWrapper>
      <InputWrapper>
        <h1>해시태그</h1>
        <input
          tyoe="text"
          {...register("subtitle")}
          placeholder="해시태그를 입력해주세요."
        />
      </InputWrapper>

      <ReactMarkdownEditor
        placeholder={"텍스트를 입력해주세요."}
        basicSetup={{
          lineNumbers: false,
          foldGutter: false,
        }}
        autoFocus={true}
        extensions={[
          markdown({ base: markdownLanguage, codeLanguages: languages }),
        ]}
        value={markdownValue}
        theme={"dark"}
        onChange={onChange}
        height={"70vh"}
      />
    </MarkdownEditorWrapper>
  );
};

export default MarkdownEditor;
