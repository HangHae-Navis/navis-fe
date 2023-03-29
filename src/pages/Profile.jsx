import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import {deletePage,deletePageMembers,getBoardDetailPage,getDetailPage,getDetailPageForAdmin,getPartyBoard,getPartyPage,GetProfile,PutMemberRole,PutProfile,undoDeletePagemembers,
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
import Input from "../element/Input";
import { useForm } from "react-hook-form";

const GroupList = (props) => {
  const navi = useNavigate()
  return(<>
  <GroupListBox>
    <GroupListTitleBox>
      <h1 className="name">{props.item.groupName} </h1>
      <span className="date">{DayCheck(props.item.createdAt)} 생성</span>
      <span className="date">| 그룹 코드 : {props.item.groupCode}</span>
      <span className="date">| 멤버 수 : {props.item.groupMemberCount}</span>
    </GroupListTitleBox>
    <GroupButtonBox>
      <Button onClick={()=> navi(`/party/${props.item.groupId}`)}>관리하기</Button>
      <Button transparent = {true}>삭제하기</Button>
    </GroupButtonBox>
  </GroupListBox>
  </>)
}
const GroupButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1rem;
`

const GroupListBox = styled.div`
display: flex;
padding-right: 2rem;
flex-direction: row;
align-items: center;
  justify-content: space-between;
background-color: aliceblue;
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
  gap: 1rem;
  .name {
  font-weight: 400;
  font-size: 2.2rem;
  color: #5D5A88;
  }
  .date {
  font-weight: 400;
  font-size: 1.8rem;
  color: #9795B5;
  }
`;

const Profile = () => {
  const [isPut, setIsPut] = useState(false)
  const [userName, setUserName] = useState()
  const [userNick, setUserNick] = useState()
  const [userImg, setUserImg] = useState()
  const [postImages, setPostImages] = useState(null);
  const [userDate, setUserDate] = useState()
  const [userGroup, setUserGroup] = useState()
  const { register, formState: errors, handleSubmit } = useForm();
  const putProfile = useMutation(PutProfile, {
    onSuccess : ({data}) =>{
      console.log('변경에 성공했습니다')
      window.alert('변경에 성공했습니다')
      window.location.reload()
    } 
  })

  const ImageHandler = (event) => {
    console.log("핸들러 발동");
    const file = event.target.files[0];
    console.log(file);
    const reader = new FileReader();
    reader.onloadend = () => {
      setUserImg(reader.result);
    };
    setPostImages(file);
    if (file != null) {
      console.log("에베베베베");
      reader.readAsDataURL(file);
    } else {
      setUserImg(Test);
      setPostImages(null);
      console.log(postImages);
    }
  };
  const getInfo = useQuery(["userInfo"], ()=>
    GetProfile(),{
      onSuccess: (data) =>{
        console.log(data.data.data)
        setUserName(data.data.data.username)
        setUserNick(data.data.data.nickname)
        setUserDate(FullDateCheck(data.data.data.createdAt))
        setUserGroup(data.data.data.groupInfo)
        setUserImg(data.data.data.profileImage)
      }
    }
  )

  const PostProfile = async (data) =>{
    const postRequest = new FormData();
    console.log(userImg)
    if(postImages != null){
      postRequest.append("profileImage", postImages);
    }
    if(data.nick != null){
      postRequest.append("nickname", data.nick);
    }
    if (data.password != null) {
      postRequest.append("password", data.password);
    }
    for (const [key, value] of postRequest.entries()) {
      console.log(key, value);
    }
    const res = putProfile.mutateAsync(postRequest)
    console.log(data)
  }





  if(getInfo.isLoading || getInfo.isError){
    return(<></>)
  }
  return (
    <>
      <PageContainer>
        <RightTotalContainer >
          <GroupTitleBox>
            <h1 className="title">내 정보</h1>
            {!isPut
            ? <Button onClick={()=>setIsPut(!isPut)}>개인정보 수정하기</Button>
            : <><Button onClick={handleSubmit(PostProfile)}>수정완료</Button>
            <Button onClick={()=>setIsPut(!isPut)}>수정취소</Button></>}
          
          </GroupTitleBox>
          <TopContentContainer>
            
            <GroupInfoBox>
              {/*프로필 이미지 노출할 부위, 없으면 기본 이미지로*/}
                {!isPut
                ?
                <>
                <ImageTextBox>
                <GroupInfoImage src = {getInfo.data.data.data.profileImage != null ? getInfo.data.data.data.profileImage :Test}>
                </GroupInfoImage>
                </ImageTextBox>
                <GroupInfoTextBox>
                <GroupInfoText>
                  <h1 className="infotitle">계정명</h1><p className="infocontent">{userName}</p>
                </GroupInfoText>
                <GroupInfoText>
                  <h1 className="infotitle">닉네임</h1><p className="infocontent">{userNick}</p>
                </GroupInfoText>
                <GroupInfoText>
                  <h1 className="infotitle">가입일자</h1><p className="infocontent">{userDate}</p>
                </GroupInfoText>
                </GroupInfoTextBox>
                </>
              :
              <>
              <ImageTextBox>
              <label htmlFor="file-upload">
              <GroupInfoImage src = {userImg != null ? userImg :Test}>


              </GroupInfoImage>
              </label>
                <h1 className="inputcontent">이미지를 클릭하여 < br/>프로필 이미지를 바꾸세요</h1>
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
                <h1 className="infotitle">계정명</h1><p className="infocontent">{userName}</p>
              </GroupInfoText>
              <GroupInfoText>
                <h1 className="infotitle">닉네임</h1>
                <Input
                  placeholder="변경할 닉네임을 입력하세요."
                  register={register}
                  name="nick"
                  type="text"
                  isput = {isPut}
                  defaultValue= {userNick}
                  width = {'55rem'}
                />
              </GroupInfoText>
              <GroupInfoText>
                <h1 className="infotitle">비밀번호</h1>
                <Input
                  placeholder="변경할 비밀번호를 입력하세요."
                  register={register}
                  name="password"
                  type="text"
                  isput = {isPut}
                  width = {'55rem'}
                />
              </GroupInfoText>
              </form>
              </GroupInfoTextBox>
              </>
              }
            </GroupInfoBox>
          </TopContentContainer>
          <GroupTitleBox>
            <h1 className="title">보유 중인 그룹</h1>
          </GroupTitleBox>
          <BottomContentContainer>
              {userGroup?.map((item) => {
                return(
                  <GroupList key = {item.groupId} item = {item}/>
                )
              })}

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
`

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
  gap: 15rem;
`
const GroupInfoImage = styled.img`
border-radius: 2rem;
  width: 18rem;
  height: 18rem;
`


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
`


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
gap : 2rem
`;

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
.inputcontent{
  font-weight: 400;
  font-size: 2rem;
  color: #9795B5
}
`;