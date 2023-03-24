import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import {deletePage,deletePageMembers,getBoardDetailPage,getDetailPage,getDetailPageForAdmin,getPartyBoard,getPartyPage,PutMemberRole,undoDeletePagemembers,
} from "../utils/api/api";
import { partyRegistModalState, partyInfoState } from "../store/atom";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import Pagination from "react-js-pagination";
import { useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { FullDateCheck,DayCheck } from "../element/DateCheck";
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

  const roleChangeMember = useMutation(PutMemberRole, {
    onSuccess: (data) =>{
      window.alert('해당 멤버의 권환이 수정되었습니다.')
      window.location.reload();
    }
  })
  const doDeleteMember = (data) => {
    const res = deletePartyMember.mutateAsync(data)
  }

  const undoDeleteMember = (data) =>{
    const res = undoDeletePartyMember.mutateAsync(data)
  }

  const ChangeRoleMember = (data) =>{
    console.log(data)
    const res = roleChangeMember.mutateAsync(data)
  }

  useEffect(() => {
  }, [])
//(
 // <Button onClick={() => doDeleteMember({ "pam": props.pam, "memberid": props.id })}>회원으로 변경</Button>
 // )
  return (
    <>
      <BoardBox>
        <BoardBoxTitleBox>
          <h1 className="name">{props.nickName}</h1>
          {props.joinedAt != null ? <span className="date">{DayCheck(props.joinedAt)} 가입</span>: <span className="date">{DayCheck(props.bannedAt)} 추방</span>}
          
        </BoardBoxTitleBox>
        <div>
        {props.groupMemberRoleEnum == "ADMIN" || props.bannedAt != null
        ?props.bannedAt != null ?(<Button onClick={() => undoDeleteMember({ "pam": props.pam, "bannedMemberId": props.id })}>재가입허용</Button>)
        : null
        
        : (
          <Button onClick={() => doDeleteMember({ "pam": props.pam, "memberid": props.id })}>추방하기</Button>
        )}
        {props.groupMemberRoleEnum == "USER" && props.bannedAt == null? (
          <Button onClick={() => ChangeRoleMember({ "pam": props.pam, "memberId": props.id })}>서포터로 변경</Button>
        ): props.groupMemberRoleEnum == "SUPPORT" ? (
           <Button onClick={() => ChangeRoleMember({ "pam": props.pam, "memberId": props.id })}>회원으로 변경</Button>
           )
        : null
        }
        </div>
      </BoardBox>
    </>
  );
}
const BoardBox = styled.div`
display: flex;
padding-right: 2rem;
flex-direction: row;
align-items: center;
  justify-content: space-between;
background-color: aliceblue;
border-radius: 2rem;
width: 80rem;
`;
const BoardBoxTitleBox = styled.div`
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  gap: 1rem;
  .name {
  font-weight: 400;
  font-size: 2.2rem;
  color: #5D5A88;
  }
  .date {
  font-weight: 400;
  font-size: 2rem;
  color: #9795B5;
  }
`;

const Admin = () => {
  const pam = useParams();
  const navi = useNavigate()
  const [userList, setUserList] = useState([]);
  const [Admin, setAdmin] = useState();
  const [Support, setSupport] = useState();
  const [Member, setMember] = useState();
  const [bannedList, setBannedList] = useState([]);
  const getDetailPage = useQuery(["admin"], () => getDetailPageForAdmin(pam.id), {
    onSuccess: (data) => {
      console.log(data.data.data);
      setUserList(data.data.data.groupMembers);
      setBannedList(data.data.data.bannedMembers)
      setPartyInfo({ groupName: data.data.data.groupName, groupId: pam.id, groupInfo: data.data.data.groupInfo })
      
      setAdmin(data.data.data.groupMembers.filter(item => item.groupMemberRoleEnum == "ADMIN"))
      setSupport(data.data.data.groupMembers.filter(item => item.groupMemberRoleEnum == "SUPPORT"))
      setMember(data.data.data.groupMembers.filter(item => item.groupMemberRoleEnum == "USER"))
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
        <RightTotalContainer>
        </RightTotalContainer>

      </PageContainer>
    
     </>;
  }
  console.log(Admin)
  return (
    <>
      <PageContainer>
        <RightTotalContainer >
          <GroupTitleBox>
            <h1 className="title">그룹 정보</h1>
          <Button onClick={() => MakeGroupHandler()}>그룹 정보 수정하기</Button>
          <Button onClick={() => doDeletePage()}>그룹 삭제하기</Button>
          </GroupTitleBox>
          <TopContentContainer>
            <GroupInfoBox>
              <GroupInfoImage src = {getDetailPage.data.data.data.groupImage}>
              </GroupInfoImage>

              <GroupInfoTextBox>
                <GroupInfoText>
                  <h1 className="infotitle">그룹 이름</h1><p className="infocontent">{getDetailPage.data.data.data.groupName}</p>
                </GroupInfoText>
                <GroupInfoText>
                  <h1 className="infotitle">그룹 설명</h1><p className="infocontent">{getDetailPage.data.data.data.groupInfo}</p>
                </GroupInfoText>
                <GroupInfoText>
                  <h1 className="infotitle">초대 코드</h1><p className="infocontent">{getDetailPage.data.data.data.groupCode}</p>
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
              groupMemberRoleEnum={Admin[0].groupMemberRoleEnum}
              joinedAt={Admin[0].joinedAt}
              nickName={Admin[0].nickname}
              id={Admin[0].id}
              pam={pam.id}
              MakeGroupHandler = {MakeGroupHandler}
              doDeletePage = {doDeletePage}/>
            <h1 className="infotitle">서포터</h1>
        {Support.map((item) => {
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
            <h1 className="infotitle">회원 목록</h1>
        {Member.map((item) => {
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
        <h1 className="infotitle">추방한 회원</h1>
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
`

const TopContentContainer = styled.div`
  width: 100%;
  height: 100%;
  border-radius: 4rem;
  border: 0.1rem solid #D4D2E3;
  padding: 5rem;
`

const BottomContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4rem;
  border: 0.1rem solid #D4D2E3;
  padding: 5rem;
  gap: 2rem;
`
const GroupInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 6rem;
`
const GroupInfoImage = styled.img`
border-radius: 2rem;
  width: 18rem;
  height: 18rem;
`

const GroupInfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 3rem;
`

const GroupInfoText = styled.div`
display: flex;
flex-direction: row;
align-items: center;
gap : 2rem
`

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
flex-direction: column;
justify-content: center;
align-items: center;
width: 100vw;
padding-bottom: 3rem;

.title {
  font-weight: 700;
  font-size: 3.2rem;
  color: #5D5A88;
}
.infotitle{
  font-weight: 700;
  font-size: 2.4rem;
  color: #5D5A88;
}
.infocontent{
  font-weight: 400;
  font-size: 2.4rem;
  color: #9795B5
}
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
