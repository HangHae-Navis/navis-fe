import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import Button from "../element/Button";
import {deletePage, getDetailPageForAdmin,} from "../utils/api/api";
import { partyRegistModalState, partyInfoState } from "../store/atom";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "./../assets/Image Placeholder.svg";
import { useNavigate, useParams } from "react-router-dom";
import { useState } from "react";
import { useSetRecoilState } from "recoil";
import { pageMargin } from "../utils/style/mixins";
import Board from "../components/admin/Board";

const Admin = () => {
  const pam = useParams();
  const navi = useNavigate();
  const [Support, setSupport] = useState();
  const [Member, setMember] = useState();
  const [bannedList, setBannedList] = useState([]);
  const setPartyInfo = useSetRecoilState(partyInfoState);
  const setIsOpen = useSetRecoilState(partyRegistModalState);
  const getDetailPage = useQuery(
    ["adminget", { id: pam.id }],
    () => getDetailPageForAdmin({ id: pam.id }),
    {
      onSuccess: ({ data }) => {
        setBannedList(data.data.bannedMembers);
        setPartyInfo({
          groupName: data.data.groupName,
          groupId: pam.id,
          groupInfo: data.data.groupInfo,
        });
        setSupport(
          data.data.groupMembers.filter(
            (item) => item.groupMemberRoleEnum === "SUPPORT"
          )
        );
        setMember(
          data.data.groupMembers.filter(
            (item) => item.groupMemberRoleEnum === "USER"
          )
        );
      },
    }
  );

  const doDeletePage = () => {
    const keepGoing = window.confirm("정말 그룹을 삭제하시겠습니까?")
    if(keepGoing == true){
      const res = deletePageForAdmin.mutateAsync(pam.id);
    }
  };

  const deletePageForAdmin = useMutation(deletePage, {
    onSuccess: (data) => {
      window.alert("그룹이 삭제되었습니다");
      navi("/");
    },
  });

  const MakeGroupHandler = () => {
    setIsOpen(true);
  };

  if (getDetailPage.isLoading || getDetailPage.isError) {

    return <></>;
  }
  //groupMemberRoleEnum={getDetailPage?data?.data?.data?.groupMembers[0].groupMemberRoleEnum}

  return (
    <>
      <PageContainer>
        <RightTotalContainer>
          <GroupTitleBox>
            <h1 className="title">그룹 정보</h1>
            <Button onClick={() => MakeGroupHandler()}>
              그룹 정보 수정하기
            </Button>
            <Button onClick={() => doDeletePage()}>그룹 삭제하기</Button>
          </GroupTitleBox>
          <TopContentContainer>
            <GroupInfoBox>
              <GroupInfoImage
                src={
                  getDetailPage?.data.data.data.groupImage != null
                    ? getDetailPage?.data.data.data.groupImage
                    : Test
                }
              ></GroupInfoImage>

              <GroupInfoTextBox>
                <GroupInfoText>
                  <h1 className="infotitle">그룹 이름</h1>
                  <p className="infocontent">
                    {getDetailPage?.data.data.data.groupName}
                  </p>
                </GroupInfoText>
                <GroupInfoText>
                  <h1 className="infotitle">그룹 설명</h1>
                  <p className="infocontent">
                    {getDetailPage?.data.data.data.groupInfo}
                  </p>
                </GroupInfoText>
                <GroupInfoText>
                  <h1 className="infotitle">초대 코드</h1>
                  <p className="infocontent">
                    {getDetailPage?.data.data.data.groupCode}
                  </p>
                </GroupInfoText>
              </GroupInfoTextBox>
            </GroupInfoBox>
          </TopContentContainer>
          <GroupTitleBox>
            <h1 className="title">회원 정보</h1>
          </GroupTitleBox>
          <BottomContentContainer>
            <h1 className="infotitle">관리자</h1>
            <Board
              groupMemberRoleEnum={
                getDetailPage?.data?.data?.data?.groupMembers[0]
                  .groupMemberRoleEnum
              }
              joinedAt={
                getDetailPage?.data?.data?.data?.groupMembers[0].joinedAt
              }
              nickName={
                getDetailPage?.data?.data?.data?.groupMembers[0].nickname
              }
              username = {getDetailPage?.data?.data?.data?.groupMembers[0].username}
              id={getDetailPage?.data?.data?.data?.groupMembers[0].id}
              pam={pam.id}
              MakeGroupHandler={MakeGroupHandler}
              doDeletePage={doDeletePage}
            />
            <h1 className="infotitle">서포터</h1>
            {Support?.map((item) => {
              return (
                <Board
                  key={item.joinedAt}
                  groupMemberRoleEnum={item.groupMemberRoleEnum}
                  joinedAt={item.joinedAt}
                  nickName={item.nickname}
                  username = {item.username}
                  id={item.id}
                  pam={pam.id}
                  MakeGroupHandler={MakeGroupHandler}
                  doDeletePage={doDeletePage}
                />
              );
            })}
            <h1 className="infotitle">회원 목록</h1>
            {Member?.map((item) => {
              return (
                <Board
                  key={item.joinedAt}
                  groupMemberRoleEnum={item.groupMemberRoleEnum}
                  joinedAt={item.joinedAt}
                  nickName={item.nickname}
                  username = {item.username}
                  id={item.id}
                  pam={pam.id}
                  MakeGroupHandler={MakeGroupHandler}
                  doDeletePage={doDeletePage}
                />
              );
            })}
            <h1 className="infotitle">추방한 회원</h1>
            {bannedList?.map((item) => {
              return (
                <Board
                  key={item.bannedAt}
                  bannedAt={item.bannedAt}
                  nickName={item.nickname}
                  username = {item.username}
                  id={item.id}
                  pam={pam.id}
                  MakeGroupHandler={MakeGroupHandler}
                  doDeletePage={doDeletePage}
                />
              );
            })}
          </BottomContentContainer>
        </RightTotalContainer>
      </PageContainer>
    </>
  );
};

export default Admin;

const GroupTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`;

const TopContentContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4rem;
  border: 0.1rem solid #d4d2e3;
  padding: 5rem;
`;

const BottomContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4rem;
  border: 0.1rem solid #d4d2e3;
  padding: 5rem;
  gap: 2rem;
`;
const GroupInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6rem;
`;
const GroupInfoImage = styled.img`
  border-radius: 2rem;
  width: 18rem;
  height: 18rem;
`;

const RightTotalContainer = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 60vw;
  > * {
    margin-bottom: 2rem;
  }
`;

const GroupInfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;
`;

const RightContainer = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: flex-start;
  width: 60vw;
  gap: 2rem;
  color: black;
  font-size: 1.45rem;
`;
const GroupInfoText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding-bottom: 3rem;
  ${pageMargin}

  .title {
    font-weight: 700;
    font-size: 3.2rem;
    color: #5d5a88;
  }
  .infotitle {
    font-weight: 700;
    font-size: 2.4rem;
    color: #5d5a88;
  }
  .infocontent {
    font-weight: 400;
    font-size: 2.4rem;
    color: #9795b5;
  }
`;
