import ReactCodeMirror from "@uiw/react-codemirror";
import { markdown, markdownLanguage } from "@codemirror/lang-markdown";
import { languages } from "@codemirror/language-data";
import styled from "styled-components";
import { useRecoilState, useResetRecoilState } from "recoil";
import { useCallback } from "react";
import { editorState } from "../../store/atom";
import {
  postBoard,
  postHomework,
  postNotice,
  postVote,
} from "../../utils/api/api";
import { useMutation } from "react-query";
import { useNavigate, useParams } from "react-router-dom";
import Button from "../../element/Button";
import { toast } from "react-toastify";

const MarkdownEditor = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [editorInfo, setEditorInfo] = useRecoilState(editorState);
  const resetInfo = useResetRecoilState(editorState);
  const onMarkdownEditorChange = useCallback((value) => {
    setEditorInfo({ ...editorInfo, content: value });
  }, []);
  const boardMutation = useMutation((data) => postBoard(id, data), {
    onSuccess: () => {
      toast.success("게시글이 등록되었습니다", {
        toastId: "boardSuccess",
      });
      resetInfo();
      navigate(`/party/${id}`);
    },
  });
  const noticeMutation = useMutation((data) => postNotice(id, data), {
    onSuccess: () => {
      toast.success("공지가 등록되었습니다", {
        toastId: "noticeSuccess",
      });
      resetInfo();
      navigate(`/party/${id}`);
    },
  });
  const voteMutation = useMutation((data) => postVote(id, data), {
    onSuccess: () => {
      toast.success("투표가 등록되었습니다", {
        toastId: "voteSuccess",
      });
      resetInfo();
      navigate(`/party/${id}`);
    },
  });

  const homeWorkMutation = useMutation((data) => postHomework(id, data), {
    onSuccess: () => {
      toast.success("과제가 등록되었습니다", {
        toastId: "homeWorkSuccess",
      });
      resetInfo();
      navigate(`/party/${id}`);
    },
  });

  const onSubmit = async (data) => {
    const requestDto = new FormData();
    requestDto.append("title", editorInfo.title);
    requestDto.append("subtitle", editorInfo.subtitle);
    requestDto.append("content", editorInfo.content);
    requestDto.append("important", editorInfo.important);
    requestDto.append("hashtagList", editorInfo.hashtagList);
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
      requestDto.append(
        "expirationDate",
        new Date(data.datetime).getTime() / 1000
      );
      const res = await voteMutation.mutateAsync(requestDto);
    }
  };

  return (
    <MarkdownEditorWrapper onSubmit={onSubmit}>
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
        value={editorInfo.content}
        theme={"dark"}
        onChange={onMarkdownEditorChange}
        width="95%"
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
  background-color: #f6f6f6;
  padding: 1rem 3.2rem;
  width: 52%;
  font-family: Pretendard !important;
  display: flex;
  gap: 1.5rem;
  flex-direction: column;
  font-size: 1.3rem;
  border-radius: 2.4rem;
  height: 70rem;
  .buttonWrapper {
    justify-self: flex-end;
    align-self: flex-end;
  }
`;

const InfoWrapper = styled.section`
  width: 90%;
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const ReactMarkdownEditor = styled(ReactCodeMirror)`
  * {
    outline: none !important;
  }
  border-radius: 2.4rem;
  overflow-x: auto;
  .cm-selectionBackground {
    background-color: #e7e7fc !important;
  }
  .ͼo {
    background-color: #f9f9ff !important;
  }
  .ͼ11 {
    color: #222222;
  }
  .ͼ13 {
    color: #222222;
  }
`;

export default MarkdownEditor;
