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

const MarkdownEditorWrapper = styled.section`
  * {
    font-size: 1.5rem;
  }
  background-color: #f9f9ff;
  padding: 3.1rem 1rem;
  width: 52%;
  font-family: Pretendard !important;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  font-size: 1.3rem;
`;

const InputWrapper = styled.section`
  width: 70%;
  display: flex;
  gap: 2.1rem;

  h1 {
    width: 6rem;
  }
  input {
    width: 37.4rem;
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
        <h1>카테고리</h1>
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
        <input type="text" {...register("title")} />
      </InputWrapper>
      <InputWrapper>
        <h1>안내문구</h1>
        <input type="text" {...register("subtitle")} />
      </InputWrapper>
      <InputWrapper>
        <h1>해시태그</h1>
        <div className="tags">
          <input type="subtitle" {...register("subtitle")} />
        </div>
      </InputWrapper>

      <ReactCodeMirror
        placeholder={"게시글을 입력해주세요."}
        basicSetup={{
          lineNumbers: false,
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
