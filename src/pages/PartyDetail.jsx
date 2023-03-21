import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import { deletePageMembers, getBoardDetailPage, getDetailPage, getPartyBoard, getPartyPage } from "../utils/api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import Pagination from "react-js-pagination";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import DateCheck from "../element/DateCheck";


function PartyDetail(){
    const pam = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const navi = useNavigate()
    const code = window.location.search;

    const groupId = searchParams.get('groupId')
    const DetailId = searchParams.get('detailId')
    const dtype = searchParams.get('dtype')

const groupName = searchParams.get("groupName");
const groupInfo = searchParams.get("groupInfo");
const groupCode = searchParams.get("groupCode");
const admin = searchParams.get("admin");
    const res = useQuery(['partyDetail'], ()=> getBoardDetailPage({groupId, DetailId, dtype}), 
    {onSuccess: ({data}) => {
        console.log(data.data)
    }})

    const deletePartyMember = useMutation(deletePageMembers, {
      onSuccess: (data) => {
        console.log('해당 멤버가 퇴출되었습니다.')
        window.alert('해당 멤버가 퇴출되었습니다')
        navi('/')
      }
    })

  const doDelete = (data) => {
    const res = deletePartyMember.mutateAsync(data)
  }
  if(res.isLoading){
    return (<></>)
  }
  if(res.isError){
    return (<></>)
  }

    return(
        <>
          <PageContainer>
            <LeftContainer>
              <LeftTitleBox>
                <h1>{groupName}</h1>
                <p>{groupInfo}</p>
                <p>초대 코드 : {groupCode}</p>
                <Button onClick={() => navi(`/party/${pam.id}/edit`,)}>글쓰기</Button>
                {admin === true ? (
                  <Button onClick={() => navi(`/party/${pam.id}/admin`)}>
                    어드민 페이지
                  </Button>
                ) : null}
              </LeftTitleBox>
            </LeftContainer>
            <RightTotalContainer>
                <h1>제목 : {res.data.data.data.title}</h1>
                <h1>작성자 : {res.data.data.data.nickname}</h1>
                <h1>작성일 : {DateCheck(res.data.data.data.createAt)}</h1>
                <h1>내용 : {res.data.data.data.content}</h1>
            </RightTotalContainer>
          </PageContainer>
        </>
      );
}


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