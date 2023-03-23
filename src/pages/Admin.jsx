import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import {
  deletePage,
  deletePageMembers,
  getBoardDetailPage,
  getDetailPage,
  getDetailPageForAdmin,
  getPartyBoard,
  getPartyPage,
  undoDeletePagemembers,
} from "../utils/api/api";
import { partyRegistModalState, partyInfoState } from "../store/atom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import Pagination from "react-js-pagination";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FullDateCheck } from "../element/DateCheck";
import { useSetRecoilState } from "recoil";
import PartyInfo from "../components/party/PartyInfo";

function Board(props) {
  const deletePartyMember = useMutation(deletePageMembers, {
    onSuccess: (data) => {
      window.alert('해당 멤버가 퇴출되었습니다')
      window.location.reload();
    }
  })

  const undoDeletePartyMember = useMutation(undoDeletePagemembers, {
    onSuccess: (data) => {
      window.alert('해당 멤버는 이제 재가입할 수 있습니다.')
      window.location.reload();
    }
  })
  const doDeleteMember = (data) => {
    const res = deletePartyMember.mutateAsync(data)
  }

  const undoDeleteMember = (data) =>{
    const res = undoDeletePartyMember.mutateAsync(data)
  }
  return (
    <>
      <BoardBox>
        <BoardBoxTitleBox>
          <h1>{props.nickName}</h1>
          {props.groupMemberRoleEnum != null ? <p>{props.groupMemberRoleEnum}</p>: null}
          {props.joinedAt != null ? <p>가입일자 : {FullDateCheck(props.joinedAt)}</p>: <p>퇴출일자 : {FullDateCheck(props.bannedAt)}</p>}
          
        </BoardBoxTitleBox>
        {props.groupMemberRoleEnum == "ADMIN" || props.bannedAt != null
        ?props.bannedAt != null ?(<Button onClick={() => undoDeleteMember({ "pam": props.pam, "bannedMemberId": props.id })}>재가입허용</Button>)
        : null
        
        : (
          <Button onClick={() => doDeleteMember({ "pam": props.pam, "memberid": props.id })}>탈퇴시키기</Button>
        )}
      </BoardBox>
    </>
  );
}
const BoardBox = styled.div`
  width: 41rem;
  height: 15rem;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  background-color: aliceblue;
  border-radius: 2rem;
`;
const BoardBoxTitleBox = styled.div`
  padding: 1rem;
  flex-direction: column;
  justify-content: flex-start;
  width: 30rem;
  height: 10rem;
  padding-top: 1rem;
  padding-left: 1rem;
  font-size: 2.45rem;
  h1 {
    font-size: 2.3rem;
    font-weight: 600;
  }
  p {
    font-size: 1.3rem;
  }
`;

const Admin = () => {
  const pam = useParams();
  const navi = useNavigate()
  const [userList, setUserList] = useState([]);
  const [bannedList, setBannedList] = useState([]);
  const getDetailPage = useQuery(["admin"], () => getDetailPageForAdmin(pam.id), {
    onSuccess: (data) => {
      console.log(data.data.data);
      setUserList(data.data.data.groupMembers);
      setBannedList(data.data.data.bannedMembers)
      setPartyInfo({ groupName: data.data.data.groupName, groupId: pam.id, groupInfo: data.data.data.groupInfo })
    },
  });

  const doDeletePage = () => {
    const res = deletePageForAdmin.mutateAsync(pam.id)
  }

  const deletePageForAdmin = useMutation(deletePage, {
    onSuccess: (data) => {
      window.alert('그룹이 삭제되었습니다')
      navi('/')
    }
  })

  const setPartyInfo = useSetRecoilState(partyInfoState);

  const setIsOpen = useSetRecoilState(partyRegistModalState);

  const MakeGroupHandler = () => {
    console.log()
    setIsOpen(true);
  };
  
  if (getDetailPage.isLoading || getDetailPage.isError) {
    return <>
      <PageContainer>
        <LeftContainer>
          <PartyInfo
          />
        </LeftContainer>
        <RightTotalContainer>
        </RightTotalContainer>

      </PageContainer>
    
     </>;
  }
  return (
    <>
      <PageContainer>
        <RightTotalContainer >
          <Button onClick={() => MakeGroupHandler()}>그룹 정보 수정하기</Button>
          <Button onClick={() => doDeletePage()}>그룹 삭제하기</Button>
            <h1 className="title">참여자 목록</h1>
          <RightContainer>
        {userList.map((item) => {
          return (
            <Board
              key={item.joinedAt}
              groupMemberRoleEnum={item.groupMemberRoleEnum}
              joinedAt={item.joinedAt}
              nickName={item.nickname}
              id={item.id}
              pam={pam.id}
              MakeGroupHandler = {MakeGroupHandler}
              doDeletePage = {doDeletePage}
            />
          );
        })}
          </RightContainer>
            <h1 className="title">추방자 목록</h1>
        {bannedList.map((item) => {
          return (
            <Board
            key={item.bannedAt}
            bannedAt={item.bannedAt}
            nickName={item.nickname}
            id={item.id}
            pam={pam.id}
            MakeGroupHandler = {MakeGroupHandler}
            doDeletePage = {doDeletePage}
            />
          );
        })}
        </RightTotalContainer>
      </PageContainer>
    </>
  );
};

export default Admin;

const LeftContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  gap: 1rem;
  font-size: 1.45rem;
`;
const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: flex-start;
  width: 80vw;
  margin: 0 auto;
  gap: 1rem;
  padding: 2rem 0 3rem 0;
`;

const RightTotalContainer = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  .title {
    font-weight: 500;
    font-size: 2.2rem;
  }
`;

const RightContainer = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: flex-start;
  width: 60vw;
  gap: 1rem;
  color: black;
  font-size: 1.45rem;
`;
