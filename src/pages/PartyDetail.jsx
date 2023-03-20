import { useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import { getBoardDetailPage, getDetailPage, getPartyBoard, getPartyPage } from "../utils/api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import Pagination from "react-js-pagination";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";


function PartyDetail(){
    const Pam = useParams()
    const [searchParams, setSearchParams] = useSearchParams();
    const navi = useNavigate()

    const groupId = searchParams.get('groupId')
    const DetailId = searchParams.get('detailId')
    const dtype = searchParams.get('dtype')
    console.log(groupId)
    console.log(DetailId)
    console.log(dtype)
    const res = useQuery(['partyDetail'], ()=> getBoardDetailPage({groupId, DetailId, dtype}))
    
    console.log(res)
    return(
        <>
          <PageContainer>
            <LeftContainer>
              <LeftTitleBox>
                {/*
                <h1>{partyRes.data.data.data.groupName}</h1>
                <p>{partyRes.data.data.data.groupInfo}</p>
                <p>초대 코드 : {partyRes.data.data.data.groupCode}</p>
                <Button onClick={() => navi(`/party/${pam.id}/edit`,)}>글쓰기</Button>
                {partyRes.data.data.data.admin === true ? (
                  <Button onClick={() => navi(`/party/${pam.id}/admin`)}>
                    어드민 페이지
                  </Button>
                ) : (
                  <Button onClick={() => doDelete(pam.id)}>그룹 탈퇴하기</Button>
                )}*/}
              </LeftTitleBox>
            </LeftContainer>
            <RightTotalContainer>
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