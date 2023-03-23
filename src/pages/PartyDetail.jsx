import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import Button from "../element/Button";
import {
  deleteCommentPage,
  deletePageMembers,
  getBoardDetailPage,
  getCommentPage,
  postComment,
  putCommentPage,
} from "../utils/api/api";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useState } from "react";
import { FullDateCheck } from "../element/DateCheck";
import Input from "../element/Input";
import { useForm } from "react-hook-form";
import PartyInfo from "../components/party/PartyInfo";
import { flexCenter } from "../utils/style/mixins";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import remarkGfm from "remark-gfm";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";

function Comment(props) {
  const navi = useNavigate();
  const [isPut, setIsPut] = useState(false);
  const { register, formState: errors, handleSubmit } = useForm();
  const deleteComment = useMutation(deleteCommentPage, {
    onSuccess: (data) => {
      window.alert("댓글이 삭제되었습니다");
      window.location.reload();
    },
  });

  const putComment = useMutation(putCommentPage, {
    onSuccess: (data) => {
      window.alert("댓글이 수정되었습니다");
      window.location.reload();
    },
  });

  const onPut = async (data) => {
    const payload = {
      groupId: props.groupId,
      detailId: props.detailId,
      commentId: props.id,
      value: data,
    };
    const res = await putComment.mutateAsync(payload);
    console.log(data);
  };

  const doDeletComment = () => {
    const res = deleteComment.mutateAsync({
      groupId: props.groupId,
      detailId: props.detailId,
      commentId: props.id,
    });
  };
  const doPutComment = () => {
    //const res = putComment.mutateAsync({groupId: props.groupId, detailId: props.detailId, commentId: props.id, value : })
  };

  return (
    <CommentBox>
      <p>닉네임 : {props.nickname} </p>
      <p>작성일자 : {FullDateCheck(props.createAt)}</p>
      <p>내용 : {props.content}</p>

      {props.isAdmin === true ? (
        <Button onClick={() => setIsPut(!isPut)}>수정하기</Button>
      ) : null}
      {props.isAdmin === true || props.owned == true ? (
        <Button onClick={doDeletComment}>삭제하기</Button>
      ) : null}
      {isPut === false ? null : (
        <CommentBox>
          <form onSubmit={handleSubmit(onPut)}>
            <Input
              placeholder="댓글을 수정하시오."
              register={register}
              name="content"
              type="text"
              label="댓글수정"
            />
            <Button>수정 완료</Button>
          </form>
        </CommentBox>
      )}
    </CommentBox>
  );
}

const CommentBox = styled.div`
  width: 70rem;
  border: 0.3rem solid white;
  border-radius: 1.5rem;

  padding: 1rem;
  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;

    span {
      cursor: pointer;
      text-decoration: underline;
      font-size: 1.1rem;
    }
  }
`;

function PartyDetail() {
  const pam = useParams();
  const [searchParams, setSearchParams] = useSearchParams();
  const [commentList, setCommentList] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const navi = useNavigate();
  const [postInfo, setPostInfo] = useState({});

  const groupId = searchParams.get("groupId");
  const detailId = searchParams.get("detailId");
  const dtype = searchParams.get("dtype");

  const groupName = searchParams.get("groupName");
  const groupInfo = searchParams.get("groupInfo");
  const groupCode = searchParams.get("groupCode");
  const res = useQuery(
    ["partyDetail"],
    () => getBoardDetailPage({ groupId, detailId, dtype }),
    {
      onSuccess: ({ data }) => {
        setPostInfo(data.data);
        if (data.data.role === "ADMIN") {
          setIsAdmin(true);
        }
      },
    }
  );
  const getComment = useQuery(
    ["comment", { groupId, boardId: detailId, page: 1, size: 999 }],
    () => getCommentPage({ groupId, boardId: detailId, page: 1, size: 999 }),
    {
      onSuccess: ({ data }) => {
        setCommentList(data.data.content);
      },
    }
  );
  const post = useMutation(postComment, {
    onSuccess: ({ data }) => {
      console.log("와우 성공!");
    },
  });
  console.log(postInfo);

  const deletePartyMember = useMutation(deletePageMembers, {
    onSuccess: (data) => {
      console.log("해당 멤버가 퇴출되었습니다.");
      window.alert("해당 멤버가 퇴출되었습니다");
      navi("/");
    },
  });

  const onPost = async (data) => {
    const payload = {
      groupId,
      detailId,
      comment: data,
    };
    const res = await post.mutateAsync(payload);
    console.log(data);
  };

  const doDelete = (data) => {
    const res = deletePartyMember.mutateAsync(data);
  };
  if (res.isLoading && getComment.isLoading) {
    return <></>;
  }
  if (res.isError && getComment.isError) {
    return <></>;
  }

  return (
    <PageContainer>
      <PartyInfo
        groupName={groupName}
        groupInfo={groupInfo}
        groupCode={groupCode}
        groupId={groupId}
        isAdmin={isAdmin}
      />
      <ContentsWrapper>
        <TitleRenderContent>
          <h1>{postInfo.title}</h1>
          <span>{postInfo.userName}</span>
          <span>|</span>
          <span>{postInfo.createAt}</span>
        </TitleRenderContent>
        <ReactMarkdownWrapper
          children={postInfo.content}
          remarkPlugins={[remarkGfm]}
          style={a11yDark}
          components={{
            code({ inline, className, children, ...props }) {
              const match = /language-(\w+)/.exec(className || "");
              return !inline && match ? (
                <SyntaxHighlighter
                  children={String(children).replace(/\n$/, "")}
                  language={match[1]}
                  PreTag="div"
                  style={a11yDark}
                  {...props}
                />
              ) : (
                <code className={className} {...props}>
                  {children}
                </code>
              );
            },
          }}
        />
      </ContentsWrapper>
    </PageContainer>
  );

  {
    /* <LeftContainer>
          <PartyInfo
            groupName={groupName}
            groupInfo={groupInfo}
            groupCode={groupCode}
            groupId={groupId}
            isAdmin={isAdmin}
          />
        </LeftContainer>
        <RightTotalContainer>
          <h1>제목 : {res.data.data.data.title}</h1>
          <h1>작성자 : {res.data.data.data.nickname}</h1>
          <h1>작성일 : {FullDateCheck(res.data.data.data.createAt)}</h1>
          <h1>내용 : {res.data.data.data.content}</h1>
          <form onSubmit={handleSubmit(onPost)}>
            <Input
              placeholder="댓글을 입력하시오."
              register={register}
              name="comment"
              type="text"
              label="댓글작성"
            />
            <Button>댓글 올리기</Button>
          </form>
          <Commentcontainer>
            {commentList?.map((item) => {
              return (
                <Comment
                  key={item.id}
                  id={item.id}
                  groupId={groupId}
                  detailId={detailId}
                  content={item.content}
                  nickname={item.nickname}
                  createAt={item.createAt}
                  isAdmin={isAdmin}
                  owned={item.owned}
                ></Comment>
              );
            })}
          </Commentcontainer>
        </RightTotalContainer> */
  }
}

const Commentcontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`;

const PageContainer = styled.div`
  width: 100vw;
  max-width: 128rem;
  display: flex;
  ${flexCenter}
`;

const ReactMarkdownWrapper = styled(ReactMarkdown)`
  * {
    font-size: 1.4rem;
    font-family: "Roboto Mono", monospace;
  }
  padding: 2.5rem 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  p {
    word-wrap: break-word;
  }
  h1 {
    padding: 2rem 0;
    font-size: 2.1rem;
    line-height: 1.45;
    &::after {
      content: "";
      display: block;
      position: relative;
      top: 0.33em;
      border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
    }
  }

  h2 {
    padding: 2rem 0;
    font-size: 1.9rem;
    line-height: 1.45;
    &::after {
      content: "";
      display: block;
      position: relative;
      top: 0.33em;
      border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
    }
  }
  h3 {
    padding: 2rem 0;
    font-size: 1.7rem;
    line-height: 1.45;
    &::after {
      content: "";
      display: block;
      position: relative;
      top: 0.33em;
      border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
    }
  }

  h4 {
    font-size: 1.5rem;
    line-height: 1.45;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  blockquote {
    width: 100%;
    padding-left: 1.25rem;
    border-left: 5px solid rgba(0, 0, 0, 0.1);
    p {
      line-height: 1.4;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    li {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      line-height: 1.2;
    }
  }
`;

const TitleRenderContent = styled.section`
  display: flex;
  flex-direction: column;
  h1 {
    width: 20rem;
    font-size: 2.1rem;
    line-height: 1.45;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  span {
    align-self: flex-cent;
    font-size: 1.4rem;
    color: ${(props) => props.theme.color.grey40};
  }
  border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
`;

const ContentsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 50vw;
`;

export default PartyDetail;
