import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import Button from "../element/Button";
import { deletePage, GetProfile, PutProfile } from "../utils/api/api";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "./../assets/Image Placeholder.svg";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { FullDateCheck, DayCheck } from "../element/DateCheck";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import { InputStyle } from "../utils/style/mixins";

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
          <span className="date">{DayCheck(props.item.createdAt)} 생성</span>
          <span className="date">| 그룹 코드 : {props.item.groupCode}</span>
          <span className="date">
            | 멤버 수 : {props.item.groupMemberCount}
          </span>
        </GroupListTitleBox>
        <GroupButtonBox>
          <Button onClick={() => navi(`/party/${props.item.groupId}`)}>
            관리하기
          </Button>
          <Button
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
  gap: 1rem;
`;

const GroupListBox = styled.div`
  display: flex;
  padding-right: 2rem;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  border-radius: 2rem;
  width: 100%;
`;
const GroupListTitleBox = styled.div`
  width: 75%;
  padding: 2rem;
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 0.5rem;
  .name {
    width: 35%;
    font-weight: 400;
    font-size: 2.2rem;
    color: #5d5a88;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .date {
    font-weight: 400;
    font-size: 1.8rem;
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
  const { register, formState: errors, handleSubmit } = useForm();
  const putProfile = useMutation(PutProfile, {
    onSuccess: ({ data }) => {
      toast.success("변경에 성공했습니다!");
      window.location.reload();
    },
  });

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

  const PostProfile = async (data) => {
    console.log(data);
    const postRequest = new FormData();
    if (postImages != null) {
      postRequest.append("profileImage", postImages);
    }
    if (data.nick !== userNick) {
      postRequest.append("nickname", data.nick);
    } else {
      postRequest.append("nickname", userNick);
    }
    if (data.password != null) {
      postRequest.append("password", data.password);
    }
    const res = putProfile.mutateAsync(postRequest);
  };

  if (getInfo.isLoading || getInfo.isError) {
    return <></>;
  }
  return (
    <>
      <PageContainer>
        <RightTotalContainer>
          <GroupTitleBox>
            <h1 className="title">내 정보</h1>
            {!isPut ? (
              <Button onClick={() => setIsPut(!isPut)}>
                개인정보 수정하기
              </Button>
            ) : (
              <>
                <Button type="submit">수정완료</Button>
                <Button onClick={() => setIsPut(!isPut)}>수정취소</Button>
              </>
            )}
          </GroupTitleBox>
          <TopContentContainer>
            <GroupInfoBox>
              {/*프로필 이미지 노출할 부위, 없으면 기본 이미지로*/}
              {!isPut ? (
                <>
                  <ImageTextBox>
                    <GroupInfoImage
                      src={
                        getInfo.data.data.data.profileImage != null
                          ? getInfo.data.data.data.profileImage
                          : Test
                      }
                    ></GroupInfoImage>
                  </ImageTextBox>
                  <GroupInfoTextBox>
                    <GroupInfoText>
                      <h1 className="infotitle">계정명</h1>
                      <p className="infocontent">{userName}</p>
                    </GroupInfoText>
                    <GroupInfoText>
                      <h1 className="infotitle">닉네임</h1>
                      <p className="infocontent">{userNick}</p>
                    </GroupInfoText>
                    <GroupInfoText>
                      <h1 className="infotitle">가입일자</h1>
                      <p className="infocontent">{userDate}</p>
                    </GroupInfoText>
                  </GroupInfoTextBox>
                </>
              ) : (
                <>
                  <ImageTextBox>
                    <label htmlFor="file-upload">
                      <GroupInfoImage src={userImg != null ? userImg : Test} />
                    </label>
                    <h1 className="inputcontent">
                      이미지를 클릭하여 <br />
                      프로필 이미지를 바꾸세요
                    </h1>
                  </ImageTextBox>
                  <GroupInfoTextBox>
                    <form onSubmit={handleSubmit(PostProfile)}>
                      <input
                        id="file-upload"
                        type="file"
                        accept="image/jpeg, image/png"
                        style={{ display: "none" }}
                        onChange={ImageHandler}
                      ></input>
                      <GroupInfoText>
                        <h1 className="infotitle">계정명</h1>
                        <p className="infocontent">{userName}</p>
                      </GroupInfoText>
                      <GroupInfoText>
                        <h1 className="infotitle">
                          닉네임&nbsp;&nbsp;&nbsp;&nbsp;
                        </h1>
                        <input
                          placeholder="변경할 닉네임을 입력하세요."
                          type="text"
                        />
                      </GroupInfoText>
                      <GroupInfoText>
                        <h1 className="infotitle">비밀번호</h1>
                        <input
                          placeholder="변경할 비밀번호를 입력하세요."
                          type="text"
                        />
                      </GroupInfoText>
                    </form>
                  </GroupInfoTextBox>
                </>
              )}
            </GroupInfoBox>
          </TopContentContainer>
          <GroupTitleBox>
            <h1 className="title">보유 중인 그룹</h1>
          </GroupTitleBox>
          <BottomContentContainer>
            {userGroup?.length !== 0 ? (
              userGroup?.map((item) => {
                return (
                  <GroupList key={item.groupId} item={item} res={getInfo} />
                );
              })
            ) : (
              <h1>보유 중인 그룹이 없습니다</h1>
            )}
          </BottomContentContainer>
        </RightTotalContainer>
      </PageContainer>
    </>
  );
};

export default Profile;

const ImageTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

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
  text-align: center;
  flex-direction: column;
  border-radius: 4rem;
  border: 0.1rem solid #d4d2e3;
  padding: 5rem;
  gap: 2rem;
  h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 3rem;
    font-weight: 600;
    color: rgb(88, 85, 133, 0.5);
  }
`;
const GroupInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 11rem;
  @media (max-width: 960px) {
    gap: 4rem;
  }
`;
const GroupInfoImage = styled.img`
  border-radius: 2rem;
  width: 18rem;
  height: 18rem;
  object-fit: cover;
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

  input {
    ${InputStyle}
  }
`;

const GroupInfoText = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

const PageContainer = styled.div`
  margin-top: 14rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding-bottom: 3rem;

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
  .inputcontent {
    font-weight: 400;
    font-size: 2rem;
    color: #9795b5;
  }
`;