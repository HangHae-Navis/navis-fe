import { useMutation, useQuery, useQueryClient } from "react-query";
import styled from "styled-components";
import {
  deleteHomeWorkData,
  deletePageMembers,
  DeleteVoteDetail,
  getBoardDetailPage,
  getCommentPage,
  postComment,
  postHomeWorkData,
  postHomeworkDetail,
  PostVoteDetail,
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
import Button from "../element/Button";
import Input from "./../element/Input";
import { FullDateCheck,DayCheck,ShortCheck } from "../element/DateCheck";
import { useForm } from "react-hook-form";
import { async } from "q";
import ShowSubmitFile from "../components/modal/ShowSubmitFile";



const SlideChart = (props) => {
  const value = props.voteMax == 0 ? 0: props.count / props.voteMax 
  console.log(value)
  return <ChartContainer>
    <Bar width= {value * 100}>
      <BarText>
  <p className="votename">{props.option}</p>
  <p className="votename">{props.count}</p>
      </BarText>
    </Bar>
    </ChartContainer>;
};

const ChartContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  text-align: center;
  height: 3rem;
  width: 30rem;
  max-width: 100%;
  border: 0.1rem solid #D4D2E3;
  border-radius: 1.7rem;
  
  .votename {
  font-weight: 400;
  font-size: 1.6rem;
  color: black;
  white-space: nowrap;
  }
`;

const BarText = styled.div`
position: absolute;
width: 28rem;
max-width: 100%;
display: flex;
align-items: center;
justify-content: space-between;
text-align: center;
`

const Bar = styled.div`
display: flex;
align-items: center;
justify-content: flex-start;
text-align: center;
border-radius: 1.7rem;
padding-left: 1rem;
  width: ${(props) => props.width}%;
  height: 100%;
  background-color: #D4D2E3;
  ${props => props.width == '0' && `
    background-color: rgba(212, 210, 227, 0);
  `}
`;

const InputComp = (props) =>{
  console.log(props)
  return (<InputContainer><input
    type="file"
    onChange={(e) => console.log(e.target.files[0])}>
  </input>
  <section>X</section>
  </InputContainer>)
}

const InputContainer =styled.div`
  
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`


function PartyDetail() {
  const [searchParams, setSearchParams] = useSearchParams();
  const [commentList, setCommentList] = useState();
  const [isAdmin, setIsAdmin] = useState();
  const navi = useNavigate();
  const [postInfo, setPostInfo] = useState({});
  const myUserName = getLocalStorage("userInfo");
  const [comment, setComment] = useState("");
  const [expirationTime, setexpirationTime] = useState("");
  const [expirationTimeOrigin, setexpirationTimeOrigin] = useState("");
  const [voteMax, setVoteMax] = useState("");
  const [whereToVoted, setWhereToVoted] = useState();
  const [voteContent, setVoteContent] = useState([])
  const [homeWorkInputLink, setHomeWorkInputLink] = useState([])
  const [homeWorkInputFile, setHomeWorkInputFile] = useState([])
  const [homeWorkSubmmiter, setHomeWorkSubmmiter] = useState([])
  const [homeWorkUnSubmmiter, setHomeWorkUnSubmmiter] = useState([])
  const [homeWorkInputFileList, setHomeWorkInputFileList] = useState([])
  const [homeWorkPostedFileList, setHomeWorkPostedFileList] = useState([])
  const [voteSelectedOption, setVoteSelectedOption] = useState();
  const [showModal, setShowModal] = useState(false);
  const [courrentModalContent, setCourrentModalContent] = useState();
  const { register, formState: errors, handleSubmit } = useForm();
  useEffect(() => {
    const isUserCookie = getCookie("token");
    if (isUserCookie === undefined) {
      navi("/");
      toast.error("로그인 정보가 만료되었습니다.", {
        toastId: "postDetailLoginErr",
      });
    }
  }, []);

  const now = new Date().getTime()
  
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
        console.log(data.data);
        if(data.data.expirationTime != null){
          console.log(FullDateCheck(data.data.expirationTime))
          setexpirationTime(FullDateCheck(data.data.expirationTime))
          setexpirationTimeOrigin(new Date(data.data.expirationTime).getTime())
        }
        setPostInfo(data.data);
        if (data.data.role === "ADMIN") {
          setIsAdmin(true);
        }
        switch (dtype) {
          case "vote":
            let maxVal = 0;
            setVoteContent(data.data.optionList);
            setWhereToVoted(data.data.myPick)
            for(let i = 0 ; i < data.data.optionList.length; i++){
              maxVal += data.data.optionList[i].count
            };
            setVoteMax(maxVal)
            console.log(voteContent);
            break;
          case "homework":
            if(data.data.submitResponseDto != null){
              console.log(data.data.submitResponseDto)
              setHomeWorkPostedFileList(data.data.submitResponseDto.fileList)
            }
            if(data.data.role == 'ADMIN' || data.data.role == 'SUPPORT'){
              setHomeWorkSubmmiter(data.data.submitMember)
              setHomeWorkUnSubmmiter(data.data.notSubmitMember)
            }
            // do something
            break;
          default:
            break;
        }
      }
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

  const postvote = useMutation(PostVoteDetail, {
    onSuccess: ({data}) =>{
      console.log('투표 성공')
      toast.success("투표 성공.");
      res.refetch()
    } 
  })

  const posthomework = useMutation(postHomeWorkData,{
    onSuccess: ({data}) =>{
      console.log("제출 성공")
      toast.success("제출 성공.");
      res.refetch()
    }
  })

  const deleteHomework = useMutation(deleteHomeWorkData, {
    onSuccess: ({data}) =>{
      toast.success("제출을 취소했습니다.")
      res.refetch()
    }
  })

  const deleteVote = useMutation(DeleteVoteDetail, {
    onSuccess: ({data}) =>{
      res.refetch()
      toast.success("투표를 취소했습니다.")
    }
  })
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

  const OnVotePost = async () =>{
    if(voteSelectedOption != null){
      const payload = {
        groupId,
        voteId : detailId,
        voteOption : voteSelectedOption
      }
      console.log(voteSelectedOption)
      setWhereToVoted(voteSelectedOption)
      setVoteMax(voteMax+1)
      const res = postvote.mutateAsync(payload)
    }
    else toast.success("선택지를 골라야 합니다.");
  }

  const doDeleteHomework = (data) =>{
    const res = deleteHomework.mutateAsync(data)
  }

  const doDeleteVote = (data) =>{
    console.log(voteContent.find(function(data){return data.optionId == whereToVoted}).optionId)
    console.log(data)
    setWhereToVoted(-1)
    setVoteMax(voteMax-1)
    const res = deleteVote.mutateAsync(data)
  }
    
  const addInput = (data) =>{
    if(data == "link"){
      if(homeWorkInputLink.length < 5){
        const lastVal = homeWorkInputLink.length > 0 ?homeWorkInputLink[homeWorkInputLink.length - 1].id : 0
        setHomeWorkInputLink(homeWorkInputLink => [...homeWorkInputLink, {id : (lastVal + 1), type : data}])
      }
      else toast.success("최대 업로드 가능 갯수는 5개 입니다")
      console.log(homeWorkInputLink)
    }
  else if(data == "file"){
    if(homeWorkInputFile.length < 5){
      const lastVal = homeWorkInputFile.length > 0 ?homeWorkInputFile[homeWorkInputFile.length - 1].id : 0
      setHomeWorkInputFile(homeWorkInputFile => [...homeWorkInputFile, {id : (lastVal + 1), type : data}])
    }
    else toast.success("최대 업로드 가능 갯수는 5개 입니다")
    console.log(homeWorkInputFile)
  }
}

  const FileHandler = (event) =>{
    
    const file = event.target.files[0];
    setHomeWorkInputFileList(homeWorkInputFileList => [...homeWorkInputFileList, file])
    console.log(file)
    console.log(homeWorkInputFileList)
    /*
    let a = null;
    console.log(file)
    const reader = new FileReader();
    if(file != null){
      a= reader.readAsDataURL(file)
    }
    reader.onloadend = () =>{
      setHomeWorkInputFileList(homeWorkInputFileList => [...homeWorkInputFileList, reader.result])
    }
    console.log(homeWorkInputFileList.length)
    console.log(reader.result)*/
  }


  const deleteInput = (data) =>{
    console.log(data)
    console.log(homeWorkInputFile)
    setHomeWorkInputFile(homeWorkInputFile.filter(item => item.id != data))
    console.log(homeWorkInputFile)
  
      console.log(data)
  }
  
  const postHomeWork = async (data) =>{
    const postData = new FormData();
    const CurrentFile = []
    const CurrentFileList = []
    for(let i =0; i < homeWorkInputFile.length; i++){
      CurrentFile.push(homeWorkInputFile[i].id - 1)
    }
    for(let i = 0; i<CurrentFile.length; i++){
      if(homeWorkInputFileList[CurrentFile[i]] != null){
        CurrentFileList.push(homeWorkInputFileList[CurrentFile[i]])
      }
    }
    /*
    for(let i = 0; i < CurrentFileList.length; i++){
      console.log(CurrentFileList[i])
      postData.append(`${i}`, CurrentFileList[i])
    }*/
    for(let i = 0; i < CurrentFileList.length; i++){
      console.log(CurrentFileList[i])
      postData.append('multipartFiles',CurrentFileList[i])
    }
    /*    formData.append("file", data.file);
    formData.append(
      "key",
      new Blob([JSON.stringify(data.info)], { type: "application/json" })
    );
     */

    //console.log(CurrentFile)
    //console.log(homeWorkInputFileList)
    //console.log(CurrentFileList)
    //console.log(data)
    for (let [key, value] of postData.entries()) {
      console.log(key, value);
    }

    const payload = {
      groupId,
      detailId,
      data : postData
    }
    const res = posthomework.mutateAsync(payload)
  }

  const doDelete = (data) => {
    const res = deletePartyMember.mutateAsync(data);
  };


  const CheckUpModal = (props) =>{
    setCourrentModalContent(props)
    setShowModal(!showModal)
    console.log(showModal)
  }

  if (res.isLoading && getComment.isLoading) {
    return <></>;
  }
  if (res.isError && getComment.isError) {
    return <></>;
  }
  return (
    <>
    {showModal == true ? <ShowSubmitFile setShowModal = {setShowModal} courrentModalContent = {courrentModalContent} ></ShowSubmitFile> : null}
    <PageContainer>
      <PartyInfo
        groupName={groupName}
        groupInfo={groupInfo}
        groupCode={groupCode}vote
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
        {/*투표 여부를 판단, 투표지가 있을 경우 투표 관련 컴포넌트 랜더링*/}
        {whereToVoted != null ? 
          whereToVoted == -1 && now < expirationTimeOrigin
          ?
          <VoteContentContainer>
            <h1 className="smallname">마감시간 : {expirationTime}</h1>
            {voteContent?.map((item) => (
          <label key={item.optionId}>
          <VoteContainer>
          <input
            type="radio"
            value={item.optionId}
            checked={voteSelectedOption == item.optionId}
            onChange={(event) => setVoteSelectedOption(event.target.value)}
          />
          <h1 className="name">{item.option}</h1>
        </VoteContainer>
          </label>
      )
            )}
            <VoteButtonBox>
            <Button onClick={OnVotePost}>투표하기</Button>
            <Button transparent = {true} onClick={()=> setWhereToVoted(-2)} >결과보기</Button>
            </VoteButtonBox>
          </VoteContentContainer>
          :
          <VoteContentContainer>
            <h1 className="smallname">마감시간 : {expirationTime}</h1>
            {voteContent?.map((item) => (
              <SlideChart key={item.optionId} option = {item.option} voteMax = {voteMax} count = {item.count}></SlideChart>
      )
            )}
            <VoteButtonBox>
              {whereToVoted == -2 
              ?<Button transparent = {true} onClick={() => setWhereToVoted(-1)} >투표하기</Button>
              :
              now < expirationTimeOrigin
              ? <Button transparent = {true} onClick={() => doDeleteVote({groupId, voteId : res?.data?.data?.data?.id})} >다시하기</Button>
              : null
             
              }
            
            <h1 className="smallname"> {voteMax}명 투표함</h1>
            </VoteButtonBox>
          </VoteContentContainer>
        
        :null}
        
        {/*과제 여부를 판단, 제출한 과제가 없을 경우 과제 관련 컴포넌트 랜더링*/}
        {dtype == 'homework'
        ?res?.data?.data?.data?.role == "USER" && res?.data?.data?.data?.submitResponseDto == null
        ?<form onSubmit={(e) => {e.preventDefault(); handleSubmit(postHomeWork);}}>
        <HomeWorkSubmitContainer>
        <HomeWorkSubmitButtonBox>
        <Button onClick={()=> addInput("file")}>파일 추가하기</Button>
        {/*<Button onClick={()=> addInput("link")}>링크 추가하기</Button>*/}
        <Button onClick={handleSubmit(postHomeWork)} transparent={true}>과제 제출하기</Button>
        </HomeWorkSubmitButtonBox>
        <HomeWorkSubmitButtonBox>
            
        <HomeworkContentContainer>
              <h1 className="name">제출할 파일</h1>
              {homeWorkInputFile.map((item) => (<InputContainer key = {item.id}><input
    type="file"
    onChange={FileHandler}
    >
  </input>
  <section onClick={()=> deleteInput(item.id)}>X</section>
  </InputContainer>))}
        </HomeworkContentContainer>
        {/*<HomeworkContentContainer>
              <h1 className="name">제출할 링크</h1>
              {homeWorkInputLink.map((item) => (<InputComp key = {item.id} type = {item.type}></InputComp>))}
        </HomeworkContentContainer>*/}
        </HomeWorkSubmitButtonBox>
        </HomeWorkSubmitContainer>
        </form>
        : res?.data?.data?.data?.role == "USER" && res?.data?.data?.data?.submitResponseDto != null
        ? <>
        {/*과제 여부를 판단, 제출한 과제가 있을 경우 과제 관련 컴포넌트 랜더링*/}
        <HomeWorkSubmitContainer>
        <HomeWorkSubmitButtonBox>
        <Button transparent={true} onClick={()=> doDeleteHomework({groupId, detailId})}>제출 취소하기</Button>
        </HomeWorkSubmitButtonBox>
        <HomeworkContentContainer>
          <PostedHomeWorkFileBox>
            <h1 className="name">제출한 파일</h1>
            <h1 className="smallname">{FullDateCheck(res?.data?.data?.data?.submitResponseDto.createdAt)} {res?.data?.data?.data?.submitResponseDto.late == true ? '제출(지각)' : '제출'} </h1>
            
          </PostedHomeWorkFileBox>
        {homeWorkPostedFileList?.map((item) => (<a key = {item} href={`${item.fileUrl}?download=true`} className="filename"> {item.fileName}</a>))}
        </HomeworkContentContainer>
        </HomeWorkSubmitContainer>
        </>
        :<>
        <PostedHomeWorkFileBox>
        <HomeworkContentContainer width = '80rem'>
              <h1 className="name">제출완료</h1>
              {homeWorkSubmmiter.map((item) => (<SubmitterContainer key = {item.id}>

              <h1 className="smallname">{item.nickname}</h1>
              <SubmitterBox>
              <h1 className="smallname">{ShortCheck(item.createdAt)} 제출</h1>
              <SubmiterButton onClick={()=>CheckUpModal(item)} className="buttontext">제출 과제</SubmiterButton>
                </SubmitterBox>
              </SubmitterContainer>))}
          
        </HomeworkContentContainer>
        <HomeworkContentContainer  borderColor = "#CF5C4C" >
              <h1 className="name">미제출자</h1>
              {homeWorkUnSubmmiter.map((item) => (<SubmitterContainer key = {item.id}>
              <h1 className="smallname">{item.nickname}</h1>
              </SubmitterContainer>))}
          
        </HomeworkContentContainer>
        </PostedHomeWorkFileBox>
        </>
          
        
        :null}
      </ContentsWrapper>
      <Commentcontainer>
        <CommentTopWrapper>
          <span>{getComment?.data?.data?.data?.content.length}</span>
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
    </>
  );
          }

const SubmiterButton = styled.button`
  width: 8rem;
  height: 3rem;
  background-color: transparent;
  border-radius: 2.4rem;
  border: 0.1rem solid #5D5A88;
`

const SubmitterBox = styled.div`
gap: 1rem;
  display: flex;
flex-direction : row;
align-items: center;
justify-content: flex-end;
`

const SubmitterContainer = styled.div`
width: 100%;
  display: flex;
flex-direction : row;
align-items: center;
justify-content: space-between;
`

const PostedHomeWorkFileBox = styled.div`
display:flex;
flex-direction : row;
align-items: center;
gap: 2rem;
text-align: center;
`
const HomeworkContentContainer = styled.div`
width: ${({ width }) => width || '50rem'};
max-width: 100%;
height: 100%;
align-items: flex-start;
display: flex;
flex-direction: column;
border-radius: 4rem;
border: 0.2rem solid ${({ borderColor }) => borderColor || '#D4D2E3'};;
text-overflow: ellipsis;
overflow: hidden;
white-space: normal;
padding: 5rem;
gap: 2rem;
  .buttontext{
  font-weight: 400;
  font-size: 1.4rem;
  color: #5D5A88;
  }
  .filename {
  font-weight: 400;
  font-size: 1.6rem;
  color: #9795B5;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .name {
  font-weight: 400;
  font-size: 2.2rem;
  color: #5D5A88;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .smallname {
  font-weight: 400;
  font-size: 1.8rem;
  color: #9795B5;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .date {
  font-weight: 400;
  font-size: 2rem;
  color: #9795B5;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`
const HomeWorkSubmitContainer = styled.div`
display: flex;
flex-direction: column;
align-items: flex-start;
gap: 1.5rem;
`

const HomeWorkSubmitButtonBox = styled.div`
display: flex;
max-width: 100%;
flex-direction: row;
align-items: flex-start;
gap: 1.5rem;
`

const VoteButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
`
const VoteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  text-align: center;
`

const VoteContentContainer = styled.div`
width: fit-content;
max-width: 50%;
height: 100%;
display: flex;
flex-direction: column;
border-radius: 4rem;
border: 0.1rem solid #D4D2E3;
padding: 5rem;
gap: 2rem;
  .name {
  font-weight: 400;
  font-size: 2.2rem;
  color: #5D5A88;
  }
  .smallname {
  font-weight: 400;
  font-size: 1.8rem;
  color: #9795B5;
  }
  .date {
  font-weight: 400;
  font-size: 2rem;
  color: #9795B5;
  }
`

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
  margin-bottom: 2rem;
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
