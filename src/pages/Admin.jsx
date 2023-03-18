import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import {
  deletePageMembers,
  getBoardDetailPage,
  getDetailPage,
  getDetailPageForAdmin,
  getPartyBoard,
  getPartyPage,
} from "../utils/api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import Pagination from "react-js-pagination";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Board(props) {
  const deletePartyMember = useMutation(deletePageMembers , {onSuccess: (data) => {
    window.alert('해당 멤버가 퇴출되었습니다')
    window.location.reload();
  }})

  const doDelete = (data) =>{
    const res = deletePartyMember.mutateAsync(data)
  }

  return (
    <>
      <BoardBox>
        <BoardBoxTitleBox>
          <h1>{props.nickName}</h1>
          <p>{props.groupMemberRoleEnum}</p>
          <p>{props.joinedAt}</p>
        </BoardBoxTitleBox>
        {props.groupMemberRoleEnum === "ADMIN" ? null : (
          <Button onClick={()=> doDelete({"pam" : props.pam, "memberid" : props.id})}>탈퇴시키기</Button>
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
    font-size: 1.6rem;
  }
`;

const Admin = () => {
  const pam = useParams();
  const [userList, setUserList] = useState([]);
  const res = useQuery(["admin"], () => getDetailPageForAdmin(pam.id), {
    onSuccess: (data) => {
      console.log(data.data.data.groupMembers);
      setUserList(data.data.data.groupMembers);
    },
  });

  return (
    <>
      <Button>그룹 삭제하기</Button>
      <PageContainer>
        {userList.map((item) => {
          return (
            <Board
              key={item.joinedAt}
              groupMemberRoleEnum={item.groupMemberRoleEnum}
              joinedAt={item.joinedAt}
              nickName={item.nickname}
              id = {item.id}
              pam = {pam.id}
            />
          );
        })}
      </PageContainer>
    </>
  );
};

export default Admin;

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
