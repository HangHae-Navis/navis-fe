import { useMutation, } from "react-query";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../element/Button";
import { deletePage } from "../../utils/api/api";
import { DayCheck } from "../../element/DateCheck";
import styled from "styled-components";

export const GroupList = (props) => {
    const navi = useNavigate();
    const deleteGroup = useMutation(deletePage, {
      onSuccess: ({ data }) => {
        toast.success("그룹을 삭제했습니다.");
        props.res.refetch();
      },
    });
  
    const doDeletePage = (data) => {
      const res = deleteGroup.mutateAsync(data);
    };
  
    return (
      <>
        <ProfileGroupListBox>
          <ProfileGroupListTitleBox>
            <h1 className="name">{props.item.groupName} </h1>
            <ProfileGroupListTitleBoxRight>
            <span className="date">{DayCheck(props.item.createdAt)} 생성</span>
            <span className="date">|</span>
            <span className="date">그룹 코드 : {props.item.groupCode}</span>
            <span className="date">|</span>
            <span className="date">멤버 수 : {props.item.groupMemberCount}</span>
            </ProfileGroupListTitleBoxRight>
          </ProfileGroupListTitleBox>
          <ProfileGroupButtonBox>
            <Button width={"110px"} onClick={() => navi(`/party/${props.item.groupId}`)}>
              관리하기
            </Button>
            <Button width={"110px"}
              transparent={true}
              color="rgb(88, 85, 133)"
              onClick={() => doDeletePage(props.item.groupId)}
            >
              삭제하기
            </Button>
          </ProfileGroupButtonBox>
        </ProfileGroupListBox>
      </>
    );
  };
  
  const ProfileGroupListTitleBox = styled.div`
 width: 100%;
 padding: 2rem;
 display: flex;
 flex-direction: row;
 justify-content: space-between;
 align-items: center;
 gap: 0.5rem;
 .name {
   width: 35%;
   font-weight: 400;
   font-size: 2.2rem;
   color: #5d5a88;
 }
 .date {
   text-align: left;
   font-weight: 400;
   font-size: 1.8rem;
   white-space: nowrap;
   overflow: hidden;
   text-overflow: ellipsis;
   color: #9795b5;
 }
 `;
 
  const ProfileGroupButtonBox = styled.div`
 display: flex;
 flex-direction: row;
 align-items: center;
 gap: 0.5rem;
 `;
 
  const ProfileGroupListBox = styled.div`
 display: flex;
 padding-right: 2rem;
 flex-direction: row;
 align-items: center;
 justify-content: space-between;
 border-radius: 2rem;
 width: 100%;
 @media (max-width: 1230px) {
   flex-direction: column;
 align-items: flex-start;
 }
 `;
 
  const ProfileGroupListTitleBoxRight = styled.div`
 width: 100%;
 display: flex;
 flex-direction: row;
 justify-content: flex-end;
 align-items: center;
 gap: 0.5rem;
 `