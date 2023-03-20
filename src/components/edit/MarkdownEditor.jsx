import ReactCodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import styled from "styled-components";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useCallback } from "react";
import { markdownInfoState, markdownState } from "../../store/atom";
import {
  postBoard,
  postHomework,
  postNotice,
  postVote,
} from "../../utils/api/api";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import { useForm } from "react-hook-form";
import { InputStyle } from "../../utils/style/mixins";
import Button from "../../element/Button";
import { toast } from "react-toastify";

const MarkdownEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [markdownValue, setMarkdownValue] = useRecoilState(markdownState);
  const [markdownInfo, setmarkdownInfo] = useRecoilState(markdownInfoState);
  const resetMarkdownValue = useResetRecoilState(markdownState);
  const { register, handleSubmit, watch, reset } = useForm({
    defaultValues: {
      important: "0",
    },
  });
  const onMarkdownEditorChange = useCallback((value) => {
    setMarkdownValue(value);
  }, []);
  const boardMutation = useMutation((data) => postBoard(id, data), {
    onSuccess: () => {
      toast.success("게시글이 등록되었습니다", {
        toastId: "boardSuccess",
      });
      resetMarkdownValue();
      reset();
      navigate(`/party/${id}`);
    },
  });
  const noticeMutation = useMutation((data) => postNotice(id, data), {
    onSuccess: () => {
      toast.success("공지가 등록되었습니다", {
        toastId: "noticeSuccess",
      });
      resetMarkdownValue();
      reset();
      navigate(`/party/${id}`);
    },
  });
  const voteMutation = useMutation((data) => postVote(id, data), {
    onSuccess: () => {
      toast.success("투표가 등록되었습니다", {
        toastId: "voteSuccess",
      });
      resetMarkdownValue();
      reset();
      navigate(`/party/${id}`);
    },
  });

  const homeWorkMutation = useMutation((data) => postHomework(id, data), {
    onSuccess: () => {
      toast.success("과제가 등록되었습니다", {
        toastId: "homeWorkSuccess",
      });
      resetMarkdownValue();
      reset();
      navigate(`/party/${id}`);
    },
  });

  const onSubmit = async (data) => {
    const requestDto = new FormData();
    requestDto.append("title", markdownInfo.title);
    requestDto.append("subtitle", data.subtitle);
    requestDto.append("content", markdownValue);
    requestDto.append("important", data.important);
    requestDto.append("hashtagList", data.tags);
    if (data.writing === "게시글") {
      const res = await boardMutation.mutateAsync(requestDto);
    } else if (data.writing === "공지사항") {
      const res = await noticeMutation.mutateAsync(requestDto);
    } else if (data.writing === "과제") {
      requestDto.append(
        "expirationDate",
        new Date(data.datetime).getTime() / 1000
      );
      const res = await homeWorkMutation.mutateAsync(requestDto);
    } else if (data.writing === "투표") {
      requestDto.append("optionList", data.votes);
      const res = await voteMutation.mutateAsync(requestDto);
    }
  };

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
        {watch().writing === "과제" && (
          <>
            <h2>중요도</h2>
            <select
              {...register("important")}
              disabled={watch().writing !== "과제" ? true : false}
            >
              <option value="0">0</option>
              <option value="1">1</option>
              <option value="2">2</option>
              <option value="3">3</option>
              <option value="4">4</option>
              <option value="5">5</option>
            </select>
          </>
        )}
        {watch().writing === "투표" && (
          <>
            <h2>투표</h2>
            <input
              className="vote"
              type="text"
              {...register("votes")}
              placeholder="ex ) 햄버거 피자 치킨"
            />
          </>
        )}
      </InputWrapper>
      <InputWrapper>
        <h1>글 제목</h1>
        <input
          type="text"
          placeholder="글 제목을 입력해주세요."
          onChange={(e) => {
            setmarkdownInfo({ ...markdown, title: e.target.value });
          }}
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
          placeholder="ex) 공부 수학 미적분"
        />
      </InputWrapper>
      <InputWrapper>
        <h1>마감 기한</h1>
        <input
          min={new Date().toISOString().slice(0, -8)}
          type="datetime-local"
          {...register("datetime")}
          disabled={
            watch().writing === "과제" || watch().writing === "투표"
              ? false
              : true
          }
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
        onChange={onMarkdownEditorChange}
        height={"460px"}
      />
      <div className="buttonWrapper">
        <Button>게시하기</Button>
      </div>
    </MarkdownEditorWrapper>
  );
};

const MarkdownEditorWrapper = styled.form`
  * {
    font-size: 1.5rem;
  }
  background-color: ${(props) => props.theme.color.zeroOne};
  padding: 3.7rem 3.2rem;
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
    width: fit-content;
  }
  input {
    width: 85% !important;
    ${InputStyle}
  }
  .vote {
    width: 45% !important;
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

  overflow-y: hidden;

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
