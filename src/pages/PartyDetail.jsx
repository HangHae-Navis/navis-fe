import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import {deleteHomeWorkData,deletePageMembers,DeleteVoteDetail,getBoardDetailPage,getCommentPage,postComment,postFeedback,postHomeWorkData,postHomeworkDetail,PostVoteDetail,putHomeWorkData,
} from "../utils/api/api";
import "react-loading-skeleton/dist/skeleton.css";
import EditReady from "../components/edit/EditReady";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import PartyInfo from "../components/party/PartyInfo";
import SlideChart from "../components/party/SlideChart";
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
import Button from "../element/Button";
import { FullDateCheck, ShortCheck } from "../element/DateCheck";
import { useForm } from "react-hook-form";
import ShowSubmitFile from "../components/modal/ShowSubmitFile";
import FloatingMenu from "../components/party/FloatingMenu";
import Survey from "../components/party/Survey";
import { useRecoilState } from "recoil";
import { editReadyState } from "../store/atom";
import { useRef } from "react";
import { ReactMarkdownWrapper, DetailCommentInputWrapper, DetailCommentMapWrapper, DetailCommentTopWrapper, DetailCommentcontainer, DetailCommentsWrapper, DetailContentsWrapper, DetailHomeWorkSubmitButtonBox, DetailHomeWorkSubmitContainer, DetailHomeworkContentContainer, DetailInputContainer, DetailPageContainer, DetailPostedHomeWorkFileBox, DetailSubmitterBox, DetailSubmitterContainer, DetailVoteButtonBox, DetailVoteContainer, DetailVoteContentContainer } from "../utils/style/pageLayout";
import { StyledInput, SubmiterButton } from "../utils/style/componentLayout";

function PartyDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const navi = useNavigate();
  const myUserName = JSON.parse(getLocalStorage("userInfo")).nickname;
  const [isOpen, setIsOpen] = useRecoilState(editReadyState);
  const { register, formState: errors, handleSubmit } = useForm();
  const [commentList, setCommentList] = useState();
  const isAdmin = useRef();
  const submitAgain = useRef(false)
  const [comment, setComment] = useState("");
  const [postInfo, setPostInfo] = useState({});
  const [voteMax, setVoteMax] = useState("");
  const [database, setDatabase] = useState();
  const queryClient = useQueryClient();
  const [homeWorkInputFile, setHomeWorkInputFile] = useState([]);
  //이거 유스레프로
  const [homeWorkInputFileList, setHomeWorkInputFileList] = useState([]);
  const [voteSelectedOption, setVoteSelectedOption] = useState();
  const [submitSurvey, setSubmitSurvey] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [courrentModalContent, setCourrentModalContent] = useState();

  const token = getCookie("token");
  const storedData = JSON.parse(localStorage.getItem("userInfo"));
  const profileImage =
    token != null
      ? storedData.profileImage == null ? profile : storedData.profileImage
      : profile;

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
          isAdmin.current(true)
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
            setSubmitSurvey(data.data.submit);
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
      submitAgain.current(false)
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
      submitAgain.current(false)
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
    setComment("");
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

  const FileHandler = (event) => {
    const file = event.target.files[0];
    setHomeWorkInputFileList((homeWorkInputFileList) => [
      ...homeWorkInputFileList,
      file,
    ]);
  };

  const deleteInput = (data) => {
    setHomeWorkInputFile(homeWorkInputFile.filter((item) => item.id != data));
  };

  const postOrPutHomeWork = async (data) => {
    const postData = new FormData();
    const CurrentFile = [];
    const CurrentFileList = [];
    for (let i = 0; i < homeWorkInputFile.length; i++) {
      CurrentFile.push(homeWorkInputFile[i].id - 1);
    }
    for (let i = 0; i < CurrentFile.length; i++) {
      if (homeWorkInputFileList[CurrentFile[i]] != null) {
        CurrentFileList.push(homeWorkInputFileList[CurrentFile[i]]);
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
      if (submitAgain === false) {
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
          {dtype == "homework" ? (
            (res?.data?.data?.data?.role == "USER" && res?.data?.data?.data?.submitResponseDto == null) || submitAgain === true
              ? (<form onSubmit={(e) => {e.preventDefault(); handleSubmit(postOrPutHomeWork);}}>
                <DetailHomeWorkSubmitContainer>
                  <DetailHomeWorkSubmitButtonBox>
                    <Button onClick={() => addInput("file")}>파일 추가하기</Button>
                    <Button onClick={handleSubmit(postOrPutHomeWork)} transparent={true} color="rgb(88, 85, 133)">과제 제출하기</Button>
                  </DetailHomeWorkSubmitButtonBox>
                  <DetailHomeWorkSubmitButtonBox>
                    <DetailHomeworkContentContainer>
                      <h1 className="name">제출할 파일</h1>
                      {homeWorkInputFile.map((item) => (
                        <DetailInputContainer key={item.id}>
                          <StyledInput type="file" onChange={FileHandler} />
                          <section style={{ cursor: 'pointer' }} className="name" onClick={() => deleteInput(item.id)}>X</section>
                        </DetailInputContainer>
                      ))}
                    </DetailHomeworkContentContainer>
                  </DetailHomeWorkSubmitButtonBox>
                </DetailHomeWorkSubmitContainer>
              </form>)
              : res?.data?.data?.data?.role == "USER" && res?.data?.data?.data?.submitResponseDto != null
              ? (<>{/*과제 여부를 판단, 제출한 과제가 있을 경우 과제 관련 컴포넌트 랜더링*/}
                <DetailHomeWorkSubmitContainer>
                  <DetailHomeWorkSubmitButtonBox>
                    {res?.data?.data?.data?.submitResponseDto.submitCheck == false
                      ? (res?.data?.data?.data?.submitResponseDto.feedbackList
                        ?.length == 0 ? (
                        <Button transparent={true} color="rgb(88, 85, 133)" onClick={() => doDeleteHomework({ groupId, detailId })}>제출 취소하기</Button>)
                        : (<Button transparent={true} onClick={() => submitAgain.current(true)} color="rgb(88, 85, 133)">다시 제출하기</Button>))
                      : null}
                  </DetailHomeWorkSubmitButtonBox>
                  <DetailHomeWorkSubmitButtonBox>
                    <DetailHomeworkContentContainer>
                      <DetailPostedHomeWorkFileBox>
                        <h1 className="name">제출한 파일</h1>
                        <h1 className="smallname">
                          {FullDateCheck(res?.data?.data?.data?.submitResponseDto.createdAt)}{" "}{res?.data?.data?.data?.submitResponseDto.late == true ? "제출(지각)" : "제출"}{" "}
                        </h1>
                      </DetailPostedHomeWorkFileBox>
                      {res?.data.data.data.submitResponseDto.fileList.map((item) => (
                        <a key={item} href={`${item.fileUrl}?download=true`} className="filename"> {" "} {item.fileName}</a>
                      ))}
                    </DetailHomeworkContentContainer>
                    {<DetailHomeworkContentContainer>
                        {res?.data?.data?.data?.submitResponseDto.feedbackList
                            ?.length != 0 ? (res?.data?.data?.data?.submitResponseDto.submitCheck == true
                                ? (<><h1 className="name">확정됨</h1>
                                  {res?.data?.data?.data?.submitResponseDto.feedbackList.map(
                                    (item, index) => (<h1 key={item} className="name">{index + 1}번째 피드백 : {item}</h1>)
                                  )}</>)
                                : (<><h1 className="name">반려됨</h1>
                                  {res?.data?.data?.data?.submitResponseDto.feedbackList.map(
                                    (item, index) => (
                                      <h1 key={item} className="name">{index + 1}번째 사유 : {item}</h1>)
                                  )}</>))
                            : (<h1 className="name">피드백 대기 중</h1>)}
                      </DetailHomeworkContentContainer>}
                  </DetailHomeWorkSubmitButtonBox>
                </DetailHomeWorkSubmitContainer>
              </>)
              : (<><DetailPostedHomeWorkFileBox>
                  <DetailHomeworkContentContainer width="80vw">
                    <h1 className="name">제출완료</h1>
                    {res?.data.data.data.submitMember.map((item) => (
                      <DetailSubmitterContainer key={item.id}>
                        <h1 className="smallname">{item.nickname}</h1>
                        <DetailSubmitterBox>
                          <h1 className="smallname">{ShortCheck(item.createdAt)} 제출</h1>
                          <SubmiterButton onClick={() => CheckUpModal(item)} className="buttontext">제출 과제</SubmiterButton>
                        </DetailSubmitterBox>
                      </DetailSubmitterContainer>))}
                  </DetailHomeworkContentContainer>
                  <DetailHomeworkContentContainer borderColor="#CF5C4C">
                    <h1 className="name">미제출자</h1>
                    {res?.data.data.data.notSubmitMember.map((item) => (
                      <DetailSubmitterContainer key={item.id}>
                        <h1 className="smallname">{item.nickname}</h1>
                      </DetailSubmitterContainer>))}
                  </DetailHomeworkContentContainer>
                </DetailPostedHomeWorkFileBox></>))
              : null}
          {/*설문 여부를 판단, 어드민(서포터)일 경우 별도 랜더링*/}
          {dtype == "survey"
            ? (<Survey role={res?.data?.data?.data?.role} submit={submitSurvey} res={res} res0={database} groupId={groupId} detailId={detailId} list={res?.data.data.data.questionResponseDto} />)
            : null}
        </DetailContentsWrapper>
        <DetailCommentcontainer>
          <DetailCommentTopWrapper>
            <span>댓글 {getComment?.data?.data?.data?.content.length}</span>
            <img src={conver} alt="댓글" />
          </DetailCommentTopWrapper>
          <DetailCommentsWrapper />
          <DetailCommentMapWrapper>
            {commentList?.map((comment) => (
              <Comment key={comment.id}
                id={comment.id}
                profileImage={comment.profileImage}
                groupId={groupId}
                detailId={detailId}
                content={comment.content}
                nickname={comment.nickname}
                createAt={comment.createAt}
                isAdmin={isAdmin}
                owned={comment.owned}/>))}
          </DetailCommentMapWrapper>
          <DetailCommentInputWrapper>
            <img src={profileImage} alt="프로필" />
            <form className="form" onSubmit={(e) => {e.preventDefault(); onPost(comment);}}>
              <section className="center">
                <span>{myUserName}</span>
                <div className="inputLayout">
                  <textarea cols="49" rows="2" maxLength="98" placeholder="댓글을 입력해주세요." value={comment} onChange={(e) => setComment(e.target.value)}/>
                  <button>등록</button>
                </div>
              </section>
            </form>
          </DetailCommentInputWrapper>
        </DetailCommentcontainer>
      </DetailPageContainer>
        {isOpen === true && <EditReady role = {res?.data?.data?.data?.role}/>}
    </>
  );
}
export default PartyDetail;