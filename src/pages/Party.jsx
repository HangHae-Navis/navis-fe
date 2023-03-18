import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import { deletePageMembers, getDetailPage, getPartyBoard, getPartyPage } from "../utils/api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import Pagination from "react-js-pagination";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";

function Board(props) {
  const navi = useNavigate();

  return (
    <>
      <BoardBox
        onClick={() =>
          navi(`/party/detail?groupId=${props.groupId}&detailId=${props.id}`)
        }
      >
        <BoardBoxTitleBox>
          <h1>{props.title}</h1>
          <p>{props.subtitle}</p>
          <p>{props.nickName}</p>
        </BoardBoxTitleBox>
      </BoardBox>
    </>
  );
}

const BoardBox = styled.div`
  width: 41rem;
  height: 25rem;
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

const Party = () => {
  const navi = useNavigate();
  const pam = useParams();
  const [radioValue, setRadioValue] = useState("");
  const [groupList, setGroupList] = useState([]);
  const [totalNum, setTotalNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const partyRes = useQuery(
    ["party", { id: pam.id, page: pageNum, size: 99, category: "all" }],
    () =>
      getDetailPage({ id: pam.id, page: pageNum, size: 99, category: "all" }),
    {
      onSuccess: ({ data }) => {
        console.log(data.data.basicBoards.content);
        setGroupList(data.data.basicBoards.content);
      },
    }
  );

  
  const deletePartyMember = useMutation(deletePageMembers , {onSuccess: (data) => {
    console.log('해당 멤버가 퇴출되었습니다.')
    //window.alert('해당 멤버가 퇴출되었습니다')
    navi('/')
  }})

  const doDelete = (data) =>{
    const res = deletePartyMember.mutateAsync(data)
  }

  //const boardRes = useQuery(['board'], () => getPartyBoard(pam.id),{onSuccess: ({ data }) => {setGroupList(data.data);},});

  useEffect(() => {
    console.log(radioValue);
  }, [radioValue]);

  if (partyRes.isLoading) {
    return (
      <div>로딩중.........로딩중.........딩중.........로딩중.........</div>
    );
  }
  if (partyRes.isError) {
    return <div>에러!!!!!!!!에러!!!!!!!!에러!!!!!!!!</div>;
  }

  const MakeBoards = () => {
    return <></>;
  };
  console.log(partyRes.data.data.data);
  console.log(groupList);

  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };

  return (
    <>
      <PageContainer>
        <LeftContainer>
          <LeftTitleBox>
            <h1>{partyRes.data.data.data.groupName}</h1>
            <p>{partyRes.data.data.data.groupInfo}</p>
            <p>초대 코드 : {partyRes.data.data.data.groupCode}</p>
            <Button>글쓰기</Button>
            {partyRes.data.data.data.admin === true ? (
              <Button onClick={() => navi(`/party/${pam.id}/admin`)}>
                어드민 페이지
              </Button>
            ) : (
              <Button onClick={()=> doDelete(pam.id)}>그룹 탈퇴하기</Button>
            )}
          </LeftTitleBox>
          <LeftRadioBox>
            <label>
              <input
                type="radio"
                name="radio-group"
                value="0"
                checked={radioValue === "0"}
                onChange={handleRadioChange}
              />
              전체
            </label>
            <label>
              <input
                type="radio"
                name="radio-group"
                value="1"
                checked={radioValue === "1"}
                onChange={handleRadioChange}
              />
              공지
            </label>
            <label>
              <input
                type="radio"
                name="radio-group"
                value="2"
                checked={radioValue === "2"}
                onChange={handleRadioChange}
              />
              투표
            </label>
            <label>
              <input
                type="radio"
                name="radio-group"
                value="3"
                checked={radioValue === "3"}
                onChange={handleRadioChange}
              />
              과제
            </label>
            <label>
              <input
                type="radio"
                name="radio-group"
                value="4"
                checked={radioValue === "4"}
                onChange={handleRadioChange}
              />
              게시글
            </label>
          </LeftRadioBox>
        </LeftContainer>
        <RightContainer>
          {groupList?.map((item) => {
            return (
              <Board
                key={item.id}
                groupId={pam.id}
                createAt={item.createAt}
                content={item.content}
                nickName={item.nickname}
                subtitle={item.subtitle}
                title={item.title}
                id={item.id}
              />
            );
          })}
        </RightContainer>
      </PageContainer>
    </>
  );
};

const TextWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

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

const LeftContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  gap: 1rem;
  background-color: blanchedalmond;
  color: black;
  font-size: 1.45rem;
`;
const RightContainer = styled.div`
  padding-top: 2rem;
  padding-bottom: 2rem;
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  align-items: center;
  justify-items: center;
  width: 60vw;
  gap: 1rem;
  background-color: violet;
  color: black;
  font-size: 1.45rem;
`;
const LeftTitleBox = styled.div`
  padding: 3rem;
  flex-direction: column;
  justify-content: flex-start;
  width: 30rem;
  height: 20rem;
  background-color: gainsboro;
  font-size: 2.45rem;
  h1 {
    font-size: 2.3rem;
    font-weight: 600;
  }
  p {
    font-size: 1.6rem;
  }
`;

const LeftRadioBox = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const RadioButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: 0.1rem solid black;
  color: white;
`;

export default Party;
