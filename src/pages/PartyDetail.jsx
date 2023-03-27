import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import {
  deletePageMembers,
  getBoardDetailPage,
  getCommentPage,
  postComment,
} from "../utils/api/api";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PartyInfo from "../components/party/PartyInfo";
import { flexCenter } from "../utils/style/mixins";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import remarkGfm from "remark-gfm";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import MarkdownTitle from "../components/global/MarkdownTitle";
import { getCookie } from "../utils/infos/cookie";
import { toast } from "react-toastify";
import conver from "../assets/ic24/conversation.svg";
import profile from "../assets/ic54/profile.svg";
import { getLocalStorage } from "../utils/infos/localStorage";
import Comment from "../element/Comment";

function PartyDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [commentList, setCommentList] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const navi = useNavigate();
  const [postInfo, setPostInfo] = useState({});
  const myUserName = getLocalStorage("userInfo");
  const [comment, setComment] = useState("");

  useEffect(() => {
    const isUserCookie = getCookie("token");
    if (isUserCookie === undefined) {
      navi("/");
      toast.error("로그인 정보가 만료되었습니다.", {
        toastId: "postDetailLoginErr",
      });
    }
  }, []);

  const groupId = searchParams.get("groupId");
  const detailId = searchParams.get("detailId");
  const dtype = searchParams.get("dtype");
  const queryClient = useQueryClient();
  const groupName = searchParams.get("groupName");
  const groupInfo = searchParams.get("groupInfo");
  const groupCode = searchParams.get("groupCode");
  const res = useQuery(
    ["partyDetail"],
    () => getBoardDetailPage({ groupId, detailId, dtype }),
    {
      onSuccess: ({ data }) => {
        console.log(data.data)
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
      queryClient.invalidateQueries("comment");
      toast.success("댓글이 작성되었습니다.");
    },
  });

  const deletePartyMember = useMutation(deletePageMembers, {
    onSuccess: (data) => {
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
        <MarkdownTitle postInfo={postInfo} dtype={dtype} />
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
      <Commentcontainer>
        <CommentTopWrapper>
          <span>댓글 2</span>
          <img src={conver} alt="댓글" />
        </CommentTopWrapper>
        <CommentsWrapper />
        <CommentMapWrapper>
          {commentList?.map((comment) => (
            <Comment
              key={comment.id}
              id={comment.id}
              groupId={groupId}
              detailId={detailId}
              content={comment.content}
              nickname={comment.nickname}
              createAt={comment.createAt}
              isAdmin={isAdmin}
              owned={comment.owned}
            ></Comment>
          ))}
        </CommentMapWrapper>
        <CommentInputWrapper>
          <img src={profile} alt="프로필" />
          <form
            className="form"
            onSubmit={(e) => {
              e.preventDefault();
              onPost(comment);
            }}
          >
            <section className="center">
              <span>{myUserName}</span>
              <div className="inputLayout">
                <textarea
                  cols="49"
                  rows="2"
                  maxLength="98"
                  placeholder="댓글을 입력해주세요."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                />
                <button>등록</button>
              </div>
            </section>
          </form>
        </CommentInputWrapper>
      </Commentcontainer>
    </PageContainer>
  );
}

const Commentcontainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 128rem;
  width: 60vw;
  background-color: ${(props) => props.theme.color.zeroOne};
  padding: 3.2rem;
  margin-left: 5rem;
  border-radius: 0.8rem;
`;

const PageContainer = styled.div`
  width: 100vw;
  max-width: 128rem;
  display: flex;
  flex-direction: column;
  ${flexCenter}
  margin: 0 auto;
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

const ContentsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 60vw;
  margin-left: 6rem;
`;

const CommentsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  justify-content: center;

  img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
  }
`;

const CommentMapWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const CommentInputWrapper = styled.section`
  display: flex;
  gap: 1rem;

  .center {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .form {
    width: 100%;
    button {
      cursor: pointer;
      width: 5rem;
      height: 5rem;
      border-radius: 1.6rem;
      border: none;
      color: ${(props) => props.theme.color.zeroOne};
      background-color: ${(props) => props.theme.color.zeroThree};
      margin-left: 0.8rem;
      font-size: 1.2rem;
    }
    .inputLayout {
      display: flex;
      align-items: center;
      textarea {
        width: 80%;
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

  img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
  }
`;

const CommentTopWrapper = styled.section`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: ${(props) => props.theme.color.zeroFour};
  span {
    font-size: 1.3rem;
  }
  img {
    width: 1.8rem;
  }
`;

export default PartyDetail;
