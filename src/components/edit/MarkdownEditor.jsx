import ReactCodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import styled from "styled-components";
import { useRecoilState } from "recoil";
import { useCallback } from "react";
import { markdownState } from "../../store/atom";
import { postBoard } from "../../utils/api/api";
import { useMutation } from "react-query";
import { useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputStyle } from "../../utils/style/mixins";
import Button from "../../element/Button";

const MarkdownEditor = () => {
  const { id } = useParams();
  const [markdownValue, setMarkdownValue] = useRecoilState(markdownState);
  const { register, watch, handleSubmit } = useForm();
  const onChange = useCallback((value) => {
    setMarkdownValue(value);
  }, []);
  const boardMutation = useMutation((data) =>
    postBoard(id, data, {
      "Content-Type": "multipart/form-data",
    })
  );
  const onSubmit = async (data) => {
    const requestDto = new FormData();
    requestDto.append("title", data.title);
    requestDto.append("subtitle", data.subtitle);
    requestDto.append("content", markdownValue);
    requestDto.append("important", 0);
    requestDto.append("hashtagList", data.tags);

    for (const [key, value] of requestDto.entries()) {
      console.log(key, value, typeof value);
    }
    const res = await boardMutation.mutateAsync(id, requestDto);
  };
  console.log(watch());
  return (
    <MarkdownEditorWrapper onSubmit={handleSubmit(onSubmit)}>
      <InputWrapper>
        <h2>카테고리</h2>
        <select {...register("writing")}>
          <option value="게시글">게시글</option>
          <option value="과제">과제</option>
          <option value="투표">투표</option>
          <option value="공지사항">공지사항</option>
        </select>
        <h2>중요도</h2>
        <select {...register("important")}>
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
          type="text"
          {...register("tags")}
          placeholder="#해시태그 #해시태그"
        />
      </InputWrapper>{" "}
      <InputWrapper>
        <h1>업로드</h1>
        <input tyoe="text" placeholder="#해시태그 #해시태그" />
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
      <div className="buttonWrapper">
        <Button onClick={onSubmit}>게시하기</Button>
      </div>
    </MarkdownEditorWrapper>
  );
};

const MarkdownEditorWrapper = styled.form`
  * {
    font-size: 1.5rem;
  }
  background-color: ${(props) => props.theme.color.zeroOne};
  padding: 1.2rem;
  width: 52%;
  font-family: Pretendard !important;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  font-size: 1.3rem;
  border-radius: 2rem;

  .buttonWrapper {
    justify-self: flex-end;
    align-self: flex-end;
  }
`;

const InputWrapper = styled.section`
  width: 85%;
  display: flex;
  align-items: center;
  gap: 1rem;
  h1 {
    color: ${(props) => props.theme.color.zeroFour};
    width: 7rem;
  }
  h2 {
    color: ${(props) => props.theme.color.zeroFour};
    width: fit-content;
  }
  input {
    ${InputStyle}
  }
  select {
    width: 8rem;
    border-radius: 5rem;
    padding-left: 0.6rem;
    height: 4.2rem;
    border: 0.1rem solid ${(props) => props.theme.color.zeroTwo};
    color: ${(props) => props.theme.color.zeroThree};
    &:focus {
      outline: none;
    }
    font-size: 1.3rem;
  }
`;

const ReactMarkdownEditor = styled(ReactCodeMirror)`
  * {
    outline: none !important;
  }

  .cm-selectionBackground {
    background-color: #e7e7fc !important;
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

export default MarkdownEditor;
