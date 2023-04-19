import { useMutation, useQuery } from "react-query";
import Button from "../element/Button";
import {GetProfile, PutProfile } from "../utils/api/api";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "./../assets/Image Placeholder.svg";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { FullDateCheck, } from "../element/DateCheck";
import { useForm } from "react-hook-form";
import { toast } from "react-toastify";
import Input from "../element/Input";
import {nicknameRules, passwordRules,} from "../constants/validate";
import { getCookie } from "../utils/infos/cookie";
import { ProfileBottomContentContainer, ProfileGroupInfoBox, ProfileGroupInfoText, ProfileGroupInfoTextBox, ProfileGroupTitleBox, ProfileImageTextBox, ProfilePageContainer, ProfileRightTotalContainer, ProfileTopContentContainer } from "../utils/style/pageLayout";
import { ProfileGroupInfoImage } from "../utils/style/componentLayout";
import { useRef } from "react";
import { GroupList } from "../components/profile/GroupBox";

const Profile = () => {
  const postImages = useRef(null)
  const [isPut, setIsPut] = useState(false);
  const [userImg, setUserImg] = useState();
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
    postImages.current = file;
    if (file != null) {
      reader.readAsDataURL(file);
    } else {
      setUserImg(Test);
      postImages.current = null;
    }
  };
  const getInfo = useQuery(["userInfo"], () => GetProfile(), {
    onSuccess: (data) => {
      setUserGroup(data.data.data.groupInfo);
      setUserImg(data.data.data.profileImage);
    },
  });

  const PostProfile = async () => {
    const postRequest = new FormData();
    console.log(watch().password);
    if (postImages.current != null) {
      postRequest.append("profileImage", postImages.current);
    }
    if (watch().nick !== getInfo?.data.data.data.nickname) {
      postRequest.append("nickname", watch().nick);
    } else {
      postRequest.append("nickname", getInfo?.data.data.data.nickname);
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
                    <ProfileGroupInfoImage
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
                      <p className="infocontent">{getInfo?.data.data.data.username}</p>
                    </ProfileGroupInfoTextBox>
                    <ProfileGroupInfoText>
                      <h1 className="infotitle">닉네임</h1>
                      <p className="infocontent">{getInfo?.data.data.data.nickname}</p>
                    </ProfileGroupInfoText>
                    <ProfileGroupInfoText>
                      <h1 className="infotitle">가입일자</h1>
                      <p className="infocontent">{FullDateCheck(getInfo?.data.data.data.createdAt)}</p>
                    </ProfileGroupInfoText>
                  </ProfileGroupInfoTextBox>
                </>
              ) : (
                <>
                  <ProfileImageTextBox>
                    <label htmlFor="file-upload">
                      <ProfileGroupInfoImage src={userImg != null ? userImg : Test} />
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
                        <p className="infocontent">{getInfo?.data.data.data.username}</p>
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
                          defaultValue={getInfo?.data.data.data.nickname}
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

