import { useMutation, useQuery } from "react-query";
import "react-loading-skeleton/dist/skeleton.css";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Button from "../../element/Button";
import { deletePage } from "../../utils/api/api";
import { DayCheck } from "../../element/DateCheck";
import { ProfileGroupButtonBox, ProfileGroupListBox, ProfileGroupListTitleBox, ProfileGroupListTitleBoxRight } from "../../utils/style/componentLayout";

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