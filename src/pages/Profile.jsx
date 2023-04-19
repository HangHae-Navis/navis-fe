import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import Button from "../element/Button";
import { deletePage, GetProfile, PutProfile } from "../utils/api/api";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "./../assets/Image Placeholder.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FullDateCheck, DayCheck } from "../element/DateCheck";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../element/Input";
import {
  nicknameRules,
  passwordRules,
  userNameRules,
} from "../constants/validate";
import { getCookie } from "../utils/infos/cookie";
import { ProfileBottomContentContainer, ProfileGroupInfoBox, ProfileGroupInfoText, ProfileGroupInfoTextBox, ProfileGroupTitleBox, ProfileImageTextBox, ProfilePageContainer, ProfileRightTotalContainer, ProfileTopContentContainer } from "../utils/style/pageLayout";

const GroupList = (props) => {
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
      <GroupListBox>
        <GroupListTitleBox>
          <h1 className="name">{props.item.groupName} </h1>
          <GroupListTitleBoxRight>
          <span className="date">{DayCheck(props.item.createdAt)} 생성</span>
          <span className="date">|</span>
          <span className="date">그룹 코드 : {props.item.groupCode}</span>
          <span className="date">|</span>
          <span className="date">멤버 수 : {props.item.groupMemberCount}</span>
          </GroupListTitleBoxRight>
        </GroupListTitleBox>
        <GroupButtonBox>
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
        </GroupButtonBox>
      </GroupListBox>
    </>
  );
};
const GroupButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 0.5rem;
`;

const GroupListBox = styled.div`
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

const GroupListTitleBoxRight = styled.div`
width: 100%;
display: flex;
flex-direction: row;
justify-content: flex-end;
align-items: center;
gap: 0.5rem;
`
const GroupListTitleBox = styled.div`
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

const Profile = () => {
  const [isPut, setIsPut] = useState(false);
  const [userName, setUserName] = useState();
  const [userNick, setUserNick] = useState();
  const [userImg, setUserImg] = useState();
  const [postImages, setPostImages] = useState(null);
  const [userDate, setUserDate] = useState();
  const [userGroup, setUserGroup] = useState();
  const {
    register,
    formState: { errors },
    watch,
  } = useForm();
  const putProfile = useMutation(PutProfile, {
    onSuccess: ({ data }) => {
      toast.success("변경에 성공했습니다!");
      window.location.reload();
    },
  });

  const navigate = useNavigate();

  useEffect(() => {
    const isUserCookie = getCookie("token");
    if (isUserCookie === undefined) {
      navigate("/");
      toast.error("로그인이 다시 필요합니다.", {
        toastId: "rollback",
      });
    }
  }, []);

  const ImageHandler = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserImg(reader.result);
    };
    setPostImages(file);
    if (file != null) {
      reader.readAsDataURL(file);
    } else {
      setUserImg(Test);
      setPostImages(null);
    }
  };
  const getInfo = useQuery(["userInfo"], () => GetProfile(), {
    onSuccess: (data) => {
      setUserName(data.data.data.username);
      setUserNick(data.data.data.nickname);
      setUserDate(FullDateCheck(data.data.data.createdAt));
      setUserGroup(data.data.data.groupInfo);
      setUserImg(data.data.data.profileImage);
    },
  });

  const PostProfile = async () => {
    const postRequest = new FormData();
    console.log(watch().password);
    if (postImages != null) {
      postRequest.append("profileImage", postImages);
    }
    if (watch().nick !== userNick) {
      postRequest.append("nickname", watch().nick);
    } else {
      postRequest.append("nickname", userNick);
    }
    if (watch().password !== null) {
      postRequest.append("password", watch().password);
    }
    const res = putProfile.mutateAsync(postRequest);
  };

  if (getInfo.isLoading || getInfo.isError) {
    return <></>;
  }
  return (
    <>
      <ProfilePageContainer>
        <ProfileRightTotalContainer>
          <ProfileGroupTitleBox>
            <h1 className="title">내 정보</h1>
            {!isPut ? (
              <Button onClick={() => setIsPut(!isPut)}>
                개인정보 수정하기
              </Button>
            ) : (
              <>
                <Button onClick={() => PostProfile()}>수정완료</Button>
                <Button onClick={() => setIsPut(!isPut)}>수정취소</Button>
              </>
            )}
          </ProfileGroupTitleBox>
          <ProfileTopContentContainer>
            <ProfileGroupInfoBox>
              {/*프로필 이미지 노출할 부위, 없으면 기본 이미지로*/}
              {!isPut ? (
                <>
                  <ProfileImageTextBox>
                    <GroupInfoImage
                      src={
                        getInfo.data.data.data.profileImage != null
                          ? getInfo.data.data.data.profileImage
                          : Test
                      }
                    />
                  </ProfileImageTextBox>
                  <ProfileGroupInfoTextBox>
                    <ProfileGroupInfoTextBox>
                      <h1 className="infotitle">계정명</h1>
                      <p className="infocontent">{userName}</p>
                    </ProfileGroupInfoTextBox>
                    <ProfileGroupInfoText>
                      <h1 className="infotitle">닉네임</h1>
                      <p className="infocontent">{userNick}</p>
                    </ProfileGroupInfoText>
                    <ProfileGroupInfoText>
                      <h1 className="infotitle">가입일자</h1>
                      <p className="infocontent">{userDate}</p>
                    </ProfileGroupInfoText>
                  </ProfileGroupInfoTextBox>
                </>
              ) : (
                <>
                  <ProfileImageTextBox>
                    <label htmlFor="file-upload">
                      <GroupInfoImage src={userImg != null ? userImg : Test} />
                    </label>
                    <h1 className="inputcontent">
                      이미지를 클릭하여 <br />
                      프로필 이미지를 바꾸세요
                    </h1>
                  </ProfileImageTextBox>
                    <form onSubmit={PostProfile}>
                  <ProfileGroupInfoTextBox>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/jpeg, image/png"
                        style={{ display: "none" }}
                        onChange={ImageHandler}
                      ></input>
                      <ProfileGroupInfoText>
                        <h1 className="infotitle">계정명</h1>
                        <p className="infocontent">{userName}</p>
                      </ProfileGroupInfoText>
                      <ProfileGroupInfoText>
                        <h1 className="infotitle">
                          닉네임&nbsp;&nbsp;&nbsp;&nbsp;
                        </h1>
                        <Input
                          placeholder="변경할 닉네임을 입력하세요."
                          register={register}
                          name="nick"
                          type="text"
                          isput={isPut}
                          defaultValue={userNick}
                          width={"18vw"}
                          rule={nicknameRules}
                        />
                      </ProfileGroupInfoText>
                      <ProfileGroupInfoText>
                        <h1 className="infotitle">비밀번호</h1>
                        <Input
                          placeholder="변경할 비밀번호를 입력하세요."
                          register={register}
                          name="password"
                          type="text"
                          isput={isPut}
                          width={"18vw"}
                          rule={passwordRules}
                        />
                      </ProfileGroupInfoText>
                  </ProfileGroupInfoTextBox>
                    </form>
                </>
              )}
            </ProfileGroupInfoBox>
          </ProfileTopContentContainer>
          <ProfileGroupTitleBox>
            <h1 className="title">보유 중인 그룹</h1>
          </ProfileGroupTitleBox>
          <ProfileBottomContentContainer>
            {userGroup?.length !== 0 ? (
              userGroup?.map((item) => {
                return (
                  <GroupList key={item.groupId} item={item} res={getInfo} />
                );
              })
            ) : (
              <h1>보유 중인 그룹이 없습니다</h1>
            )}
          </ProfileBottomContentContainer>
        </ProfileRightTotalContainer>
      </ProfilePageContainer>
    </>
  );
};

export default Profile;

