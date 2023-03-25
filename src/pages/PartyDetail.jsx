import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import { deleteCommentPage, deletePageMembers, getBoardDetailPage, getCommentPage, getDetailPage, getPartyBoard, getPartyPage, postComment, putCommentPage } from "../utils/api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import Pagination from "react-js-pagination";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FullDateCheck }from "../element/DateCheck";
import Input from "../element/Input";
import { useForm } from "react-hook-form";
import PartyInfo from "../components/party/PartyInfo";
import { partyInfoState } from "../store/atom";
import { useSetRecoilState } from "recoil";

function Comment(props){
  const navi = useNavigate()
  const [isPut, setIsPut] = useState(false)
  const { register, formState: errors, handleSubmit } = useForm();
  const deleteComment = useMutation(deleteCommentPage , {onSuccess: (data) => {
    window.alert('댓글이 삭제되었습니다')
    window.location.reload()
  }})

  const putComment = useMutation(putCommentPage, {onSuccess: (data) => {
    window.alert('댓글이 수정되었습니다')
    window.location.reload()
  }})

  
  const onPut = async (data) =>{
    const payload = {
      groupId: props.groupId,
      detailId: props.detailId,
      commentId: props.id,
      "value" : data
    }
    const res = await putComment.mutateAsync(payload)
    console.log(data)
  }
  
  const doDeletComment = () => {
    const res = deleteComment.mutateAsync({groupId: props.groupId, detailId: props.detailId, commentId: props.id})
  }
  const doPutComment = () =>{
    //const res = putComment.mutateAsync({groupId: props.groupId, detailId: props.detailId, commentId: props.id, value : })
  }

return(
<CommentBox>
<p>닉네임 : {props.nickname} </p>
<p>작성일자 : {FullDateCheck(props.createAt)}</p>
<p>내용 : {props.content}</p>

{props.isAdmin == true ? <Button onClick={() => setIsPut(!isPut)}>수정하기</Button> : null}
{props.isAdmin == true || props.owned == true ? <Button onClick={doDeletComment}>삭제하기</Button> : null}
{isPut == false ? null
: <CommentBox>
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
  </CommentBox>}
</CommentBox>)
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

`


function PartyDetail() {
  const pam = useParams()
  const [searchParams, setSearchParams] = useSearchParams();
  const [commentList, setCommentList] = useState()
  const [isAdmin, setIsAdmin] = useState()
  const navi = useNavigate()
  const code = window.location.search;
  const { register, formState: errors, handleSubmit } = useForm();

  const groupId = searchParams.get('groupId')
  const detailId = searchParams.get('detailId')
  const dtype = searchParams.get('dtype')

  const groupName = searchParams.get("groupName");
  const groupInfo = searchParams.get("groupInfo");
  const groupCode = searchParams.get("groupCode");
  const res = useQuery(['partyDetail'], () => getBoardDetailPage({ groupId, detailId, dtype }),
    {
      onSuccess: ({ data }) => {
        console.log(data.data)
        if(data.data.role == "ADMIN"){
          setIsAdmin(true)
        }
      }
    })
  const getComment = useQuery(
      ["comment", {groupId, boardId : detailId, page : 1, size : 999}], ()=>
      getCommentPage({groupId, boardId : detailId, page : 1, size : 999}),{
        onSuccess: ({data}) =>{
          console.log(data.data.content)
          setCommentList(data.data.content)
        }
      }
  )
  const post = useMutation(postComment, {
    onSuccess: ({data}) => {
      console.log("와우 성공!")
    }
  })

  const deletePartyMember = useMutation(deletePageMembers, {
    onSuccess: (data) => {
      console.log('해당 멤버가 퇴출되었습니다.')
      window.alert('해당 멤버가 퇴출되었습니다')
      navi('/')
    }
  })

  const onPost = async (data) =>{
    const payload = {
      groupId,
      detailId,
      "comment" : data
    }
    const res = await post.mutateAsync(payload)
    console.log(data)
  }

  const doDelete = (data) => {
    const res = deletePartyMember.mutateAsync(data)
  }
  if (res.isLoading && getComment.isLoading) {
    return (<></>)
  }
  if (res.isError && getComment.isError) {
    return (<></>)
  }

  return (
    <>
      <PageContainer>
        <LeftContainer>
          <PartyInfo
          groupName = {groupName}
          groupInfo = {groupInfo}
          groupCode = {groupCode}
          groupId = {groupId}
          isAdmin = {isAdmin}
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
                {commentList?.map((item) =>{
                  return(<Comment key = {item.id} id = {item.id} groupId = {groupId} detailId = {detailId} content = {item.content} nickname  = {item.nickname} createAt = {item.createAt} isAdmin = {isAdmin} owned = {item.owned}></Comment>)

                })}

              </Commentcontainer>
        </RightTotalContainer>
        <>
        </>
      </PageContainer>
    </>
  );
}


const Commentcontainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1rem;
`
const CarouselContainer = styled.div`
width: 60vw;
height: 20rem;
overflow-x: scroll;
gap: 1rem;
display: flex;
flex-direction: row;
background-color: violet;
align-items: center;
`;

const TextWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 80vw;
  margin: 0 auto;
  gap: 1rem;
  background-color: wheat;
  padding-left: 3rem;
  padding-right: 3rem;
`;

const LeftContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  gap: 1rem;
  background-color: blanchedalmond;
  color: black;
  font-size: 1.45rem;
`;

const RightTotalContainer = styled.div`
flex-direction: column;
display: flex;
justify-content: center;
align-items: center;
`

const RightContainer = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  width: 60vw;
  gap: 1rem;
  background-color: violet;
  color: black;
  font-size: 1.45rem;
`;
const LeftTitleBox = styled.div`
  padding: 3rem;
  flex-direction: column;
  justify-content: flex-start;
  width: 30rem;
  height: 20rem;
  background-color: gainsboro;
  font-size: 2.45rem;
  h1 {
    font-size: 2.3rem;
    font-weight: 600;
  }
  p {
    font-size: 1.6rem;
  }
`;

const LeftRadioBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RadioButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: 0.1rem solid black;
  color: white;
`;

export default PartyDetail