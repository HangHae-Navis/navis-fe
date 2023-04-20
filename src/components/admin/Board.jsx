import { useMutation } from "react-query";
import styled from "styled-components";
import { PutMemberRole, deletePageMembers, undoDeletePagemembers } from "../../utils/api/api";
import { DayCheck } from "../../element/DateCheck";
import Button from "../../element/Button";

function Board(props) {
    const deletePartyMember = useMutation(deletePageMembers, {
      onSuccess: (data) => {
        window.alert("해당 멤버가 퇴출되었습니다");
        window.location.reload();
      },
    });
  
    const undoDeletePartyMember = useMutation(undoDeletePagemembers, {
      onSuccess: (data) => {
        window.alert("해당 멤버는 이제 재가입할 수 있습니다.");
        window.location.reload();
      },
    });
  
    const roleChangeMember = useMutation(PutMemberRole, {
      onSuccess: (data) => {
        window.alert("해당 멤버의 권한이 수정되었습니다.");
        window.location.reload();
      },
    });
    const doDeleteMember = (data) => {
      const keepGoing = window.confirm("해당 회원을 퇴출시키겠습니까?")
      if(keepGoing == true){
      const res = deletePartyMember.mutateAsync(data);
      }
    };
  
    const undoDeleteMember = (data) => {
      const keepGoing = window.confirm("해당 회원의 재가입을 허용하시겠습니까?")
      if(keepGoing == true){
      const res = undoDeletePartyMember.mutateAsync(data);
      }
    };
  
    const ChangeRoleMember = (data) => {
      const res = roleChangeMember.mutateAsync(data);
    };
  
    return (
      <>
        <BoardBox>
          <BoardBoxTitleBox>
            <h1 className="name">{props.nickName} ( {props.username} )</h1>
            {props.joinedAt != null
            ? (<span className="date">{DayCheck(props.joinedAt)} 가입</span>)
            : (<span className="date">{DayCheck(props.bannedAt)} 추방</span>)
            }
          </BoardBoxTitleBox>
          <div>
            {props.groupMemberRoleEnum === "ADMIN" || props.bannedAt != null
              ? (props.bannedAt != null
                ? (<Button onClick={() => undoDeleteMember({ pam: props.pam, bannedMemberId: props.id })}>
                    재가입허용
                  </Button>)
                : null) 
              : (<Button onClick={() => doDeleteMember({ pam: props.pam, memberid: props.id })}>
                추방하기
              </Button>
            )}
  
            {props.groupMemberRoleEnum === "USER"
            ? (<Button onClick={() => ChangeRoleMember({ pam: props.pam, memberId: props.id })}>
                서포터로 변경
              </Button>)
            : props.groupMemberRoleEnum === "SUPPORT"
            ? (<Button onClick={() => ChangeRoleMember({ pam: props.pam, memberId: props.id })}>
                회원으로 변경
              </Button>)
            : null}
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
    width: 100%;
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
      color: #5d5a88;
    }
    .date {
      font-weight: 400;
      font-size: 2rem;
      color: #9795b5;
    }
  `;


export default Board