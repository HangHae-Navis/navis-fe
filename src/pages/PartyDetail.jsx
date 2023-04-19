import { useMutation, useQuery, useQueryClient } from "react-query";
import {deleteHomeWorkData,deletePageMembers,DeleteVoteDetail,getBoardDetailPage,getCommentPage,postComment,postHomeWorkData,PostVoteDetail,putHomeWorkData,
} from "../utils/api/api";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";
import "react-loading-skeleton/dist/skeleton.css";
import EditReady from "../components/edit/EditReady";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PartyInfo from "../components/party/PartyInfo";
import SlideChart from "../components/party/SlideChart";
import SyntaxHighlighter from "react-syntax-highlighter/dist/esm/default-highlight";
import remarkGfm from "remark-gfm";
import { a11yDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import MarkdownTitle from "../components/global/MarkdownTitle";
import { getCookie } from "../utils/infos/cookie";
import { toast } from "react-toastify";
import Button from "../element/Button";
import { FullDateCheck, ShortCheck } from "../element/DateCheck";
import { useForm } from "react-hook-form";
import ShowSubmitFile from "../components/modal/ShowSubmitFile";
import FloatingMenu from "../components/party/FloatingMenu";
import Survey from "../components/party/Survey";
import { useRecoilState } from "recoil";
import { editReadyState } from "../store/atom";
import { useRef } from "react";
import styled from "styled-components";
import { CommentBox } from "../components/partydetail/CommentBox";
import { HomeworkBox } from "../components/partydetail/Homework";

function PartyDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navi = useNavigate();
  const [isOpen, setIsOpen] = useRecoilState(editReadyState);
  const { register, formState: errors, handleSubmit } = useForm();
  const [commentList, setCommentList] = useState();
  const isAdmin = useRef();
  const submitAgain = useRef(false)
  const [postInfo, setPostInfo] = useState({});
  const [voteMax, setVoteMax] = useState("");
  const [database, setDatabase] = useState();
  const queryClient = useQueryClient();
  const [homeWorkInputFile, setHomeWorkInputFile] = useState([]);
  const homeWorkInputFileList = useRef([])
  const [voteSelectedOption, setVoteSelectedOption] = useState();
  const [showModal, setShowModal] = useState(false);
  const [courrentModalContent, setCourrentModalContent] = useState();

  useEffect(() => {
    const isUserCookie = getCookie("token");
    if (isUserCookie === undefined) {
      navi("/");
      toast.error("로그인 정보가 만료되었습니다.", {toastId: "postDetailLoginErr",});
    }
  }, []);
  const now = new Date().getTime();
  const pam = useParams();
  const groupId = searchParams.get("groupId");
  const detailId = searchParams.get("detailId");
  const dtype = searchParams.get("dtype");
  const groupName = searchParams.get("groupName");
  const groupInfo = searchParams.get("groupInfo");
  const groupCode = searchParams.get("groupCode");
  const res = useQuery(
    ["partyDetail", { id: pam.id }],
    () => getBoardDetailPage({ groupId, detailId, dtype }),
    {
      onSuccess: ({ data }) => {
        setPostInfo(data.data);
        if (data.data.role === "ADMIN") {
          isAdmin.current = true
        }
        switch (dtype) {
          case "vote":
            let maxVal = 0;
            setDatabase(data.data.myPick);
            for (let i = 0; i < data.data.optionList.length; i++) {
              maxVal += data.data.optionList[i].count;
            }
            setVoteMax(maxVal);
            break;
          case "homework":
            break;
          case "survey":
            setDatabase(data.data);
            break;

          default:
            break;
        }
      },
    }
  );

  useEffect(() => {
    queryClient.invalidateQueries();
  }, [detailId]);
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

  const putSubjects = useMutation(putHomeWorkData, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries("comment");
      toast.success("과제물이 수정되었습니다.");
      submitAgain.current = false 
      queryClient.invalidateQueries();
    },
  });
  const postvote = useMutation(PostVoteDetail, {
    onSuccess: ({ data }) => {
      toast.success("투표 성공.");
      queryClient.invalidateQueries();
    },
  });

  const posthomework = useMutation(postHomeWorkData, {
    onSuccess: ({ data }) => {
      toast.success("제출 성공.");
      submitAgain.current = false
      queryClient.invalidateQueries();
    },
    onError: (error) => {
      toast.error("오류 발생.");
    },
  });

  const deleteHomework = useMutation(deleteHomeWorkData, {
    onSuccess: ({ data }) => {
      toast.success("제출을 취소했습니다.");
      queryClient.invalidateQueries();
      homeWorkInputFileList.current = ([])
    },
  });

  const deleteVote = useMutation(DeleteVoteDetail, {
    onSuccess: ({ data }) => {
      queryClient.invalidateQueries();
      toast.success("투표를 취소했습니다.");
    },
  });
  const deletePartyMember = useMutation(deletePageMembers, {
    onSuccess: (data) => {
      window.alert("해당 멤버가 퇴출되었습니다");
      navi("/");
    },
  });

  const onPost = async (data) => {
    const payload = {groupId, detailId, comment: data,};
    const res = await post.mutateAsync(payload);
  };

  const OnVotePost = async () => {
    if (voteSelectedOption != null) {
      const payload = {
        groupId,
        voteId: detailId,
        voteOption: voteSelectedOption,
      };
      setDatabase(voteSelectedOption);
      setVoteMax(voteMax + 1);
      const res = postvote.mutateAsync(payload);
    } else toast.success("선택지를 골라야 합니다.");
  };

  const doDeleteHomework = (data) => {
    console.log(data)
    const res = deleteHomework.mutateAsync(data);
  };

  const doDeleteVote = (data) => {
    setDatabase(-1);
    setVoteMax(voteMax - 1);
    const res = deleteVote.mutateAsync(data);
  };

  const addInput = (data) => {
    if (homeWorkInputFile.length < 5) {
        const lastVal = homeWorkInputFile.length > 0 ? homeWorkInputFile[homeWorkInputFile.length - 1].id : 0;
        setHomeWorkInputFile((homeWorkInputFile) => [...homeWorkInputFile, { id: lastVal + 1, type: data },]);
      }
    else toast.success("최대 업로드 가능 갯수는 5개 입니다");
  };


  const deleteInput = (data) => {
    setHomeWorkInputFile(homeWorkInputFile.filter((item) => item.id != data));
  };

  const postOrPutHomeWork = async (data) => {
    console.log(data)
    const postData = new FormData();
    const CurrentFile = [];
    const CurrentFileList = [];
    for (let i = 0; i < homeWorkInputFile.length; i++) {
      CurrentFile.push(homeWorkInputFile[i].id - 1);
    }
    for (let i = 0; i < CurrentFile.length; i++) {
      if (homeWorkInputFileList.current[CurrentFile[i]] != null) {
        CurrentFileList.push(homeWorkInputFileList.current[CurrentFile[i]]);
      }
    }
    for (let i = 0; i < CurrentFileList.length; i++) {
      postData.append("multipartFiles", CurrentFileList[i]);
    }

    const payload = {
      groupId,
      detailId,
      data: postData,
    };
    if (postData.length != 0) {
      if (submitAgain.current === false) {
        const res = posthomework.mutateAsync(payload);
      } else {
        const res = putSubjects.mutateAsync(payload);
      }
    } else {
      toast.success("파일이 있어야 합니다.");
    }
  };

  const doDelete = (data) => {
    const res = deletePartyMember.mutateAsync(data);
  };

  const CheckUpModal = (props) => {
    setCourrentModalContent(props);
    setShowModal(!showModal);
  };

  if (
    res.isLoading ||
    res.isError ||
    getComment.isLoading ||
    getComment.isError
  ) {
    return <>
    <DetailPageContainer>
      
    </DetailPageContainer>
    </>;
  }
  return (
    <>
      {showModal == true ? (
        <ShowSubmitFile
          setShowModal={setShowModal}
          courrentModalContent={courrentModalContent}
          res={res}
        />
      ) : null}
      
      <PartyInfo
          groupName={groupName}
          groupInfo={groupInfo}
          groupCode={groupCode}
          vote
          groupId={groupId}
          isAdmin={isAdmin}
        />
        <FloatingMenu
          props={res?.data?.data?.data?.recentlyViewed}
          groupId={groupId}
          groupName={groupName}
          groupInfo={groupInfo}
          groupCode={groupCode}
        />
      <DetailPageContainer>
        <DetailContentsWrapper>
          <MarkdownTitle
          postInfo={postInfo}
          dtype={dtype}
          role={res?.data?.data?.data?.role}
          author = {res?.data?.data?.data?.author}
          authorRole = {res?.data?.data?.data?.authorRole}
          groupId={groupId}
          detailId={detailId}
          />
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
          {/*투표 여부를 판단, 투표지가 있을 경우 투표 관련 컴포넌트 랜더링*/}
          {dtype == "vote" ? (
            database == -1 && now < new Date(res?.data.data.data.expirationTime).getTime() ? (
              <DetailVoteContentContainer>
                <h1 className="smallname">마감시간 : {FullDateCheck(res?.data.data.data.expirationTime)}</h1>
                {res?.data.data.data.optionList?.map((item) => (
                  <label key={item.optionId}>
                    <DetailVoteContainer>
                      <input
                        type="radio"
                        value={item.optionId}
                        checked={voteSelectedOption == item.optionId}
                        onChange={(event) =>
                          setVoteSelectedOption(event.target.value)
                        }
                      />
                      <h1 className="name">{item.option}</h1>
                    </DetailVoteContainer>
                  </label>
                ))}
                <DetailVoteButtonBox>
                  <Button onClick={OnVotePost}>투표하기</Button>
                  <Button
                    transparent={true}
                    onClick={() => setDatabase(-2)}
                    color="rgb(88, 85, 133)"
                  >
                    결과보기
                  </Button>
                </DetailVoteButtonBox>
              </DetailVoteContentContainer>
            ) : (
              <DetailVoteContentContainer>
                <h1 className="smallname">마감시간 : {FullDateCheck(res?.data.data.data.expirationTime)}</h1>
                {res?.data.data.data.optionList?.map((item) => (
                  <SlideChart
                    key={item.optionId}
                    option={item.option}
                    voteMax={voteMax}
                    count={item.count}
                  />
                ))}
                <DetailVoteButtonBox>
                  {database == -2 ? (
                    <Button
                      transparent={true}
                      onClick={() => setDatabase(-1)}
                      color="rgb(88, 85, 133)"
                    >
                      투표하기
                    </Button>
                  ) : now < new Date(res?.data.data.data.expirationTime).getTime() ? (
                    <Button
                      transparent={true}
                      onClick={() =>
                        doDeleteVote({
                          groupId,
                          voteId: res?.data?.data?.data?.id,
                        })
                      }
                      color="rgb(88, 85, 133)"
                    >
                      다시하기
                    </Button>
                  ) : null}

                  <h1 className="smallname"> {voteMax}명 투표함</h1>
                </DetailVoteButtonBox>
              </DetailVoteContentContainer>
            )
          ) : null}
          {/*과제 여부를 판단, 제출한 과제가 없을 경우 과제 관련 컴포넌트 랜더링*/}
          {dtype == "homework"
              ?(<HomeworkBox
                res = {res}
                submitAgain = {submitAgain}
                postOrPutHomeWork = {postOrPutHomeWork}
                addInput = {addInput}
                deleteInput = {deleteInput}
                doDeleteHomework = {doDeleteHomework}
                groupId = {groupId}
                detailId = {detailId}
                CheckUpModal = {CheckUpModal}
                homeWorkInputFile = {homeWorkInputFile}
                setHomeWorkInputFile = {setHomeWorkInputFile}
                homeWorkInputFileList = {homeWorkInputFileList}/>)
              : null}
          {/*설문 여부를 판단, 어드민(서포터)일 경우 별도 랜더링*/}
          {dtype == "survey"
            ? (<Survey
              role={res?.data.data.data.role}
              submit={res?.data.data.data.submit}
              res={res}
              groupId={groupId}
              detailId={detailId}
              list={res?.data.data.data.questionResponseDto}/>)
            : null}
        </DetailContentsWrapper>

        <CommentBox getComment = {getComment} detailId = {detailId} groupId = {groupId} isAdmin = {isAdmin} commentList = {commentList} onPost = {onPost}/>
      </DetailPageContainer>
        {isOpen === true && <EditReady role = {res?.data?.data?.data?.role}/>}
    </>
  );
}
export default PartyDetail;



 const DetailVoteButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
`;
 const DetailVoteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  text-align: center;
`;

 const DetailVoteContentContainer = styled.div`
  width: fit-content;
  max-width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4rem;
  border: 0.1rem solid #d4d2e3;
  padding: 5rem;
  gap: 2rem;
  .name {
    font-weight: 400;
    font-size: 2.2rem;
    color: #5d5a88;
  }
  .smallname {
    font-weight: 400;
    font-size: 1.8rem;
    color: #9795b5;
  }
  .date {
    font-weight: 400;
    font-size: 2rem;
    color: #9795b5;
  }
`;


 const DetailPageContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  max-width: 128rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  margin-top: 14rem;
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

 const DetailContentsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 60vw;
  margin-left: 6rem;
  margin-bottom: 2rem;
  gap: 1rem;
`;