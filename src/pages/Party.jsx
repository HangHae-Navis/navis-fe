import { useMutation, useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import {
  deletePageMembers,
  getDetailPage,
  getPartyBoard,
  getPartyPage,
} from "../utils/api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import Pagination from "react-js-pagination";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import DateCheck, { FullDateCheck, HourCheck } from "../element/DateCheck";
import PartyInfo from "../components/party/PartyInfo";
import { getCookie } from "../utils/infos/cookie";
import { toast } from "react-toastify";

function Board(props) {
  const navi = useNavigate();
  const [dtypeText, setDtypeText] = useState("");
  const [hashtagText, setHashtagText] = useState();
  //console.log(props.hashtagList)
  useEffect(() => {
    switch (props.dtype) {
      case "vote":
        setDtypeText("투표");
        break;
      case "board":
        setDtypeText("게시글");
        break;
      case "homework":
        setDtypeText("과제");
        break;
      case "notice":
        setDtypeText("공지");
        break;
      default:
        break;
    }
    if (props.hashtagList[0] !== "") {
      setHashtagText(props.hashtagList);
    }
  }, []);

  return (
    <>
      <BoardBox
        onClick={() =>
          navi(`/party/detail?groupId=${props.groupId}&detailId=${props.id}&dtype=${props.dtype}&groupName=${props.groupName}&groupInfo=${props.groupInfo}&groupCode=${props.groupCode}&admin=${props.isAdmin}
          `)
        }
      >
        <BoardBoxTitleBox>
          <h1>제목 : {props.title}</h1>
          <p>부제 : {props.subtitle}</p>
          <p>작성일 : {FullDateCheck(props.createdAt)}</p>
          {props.expirationDate !== null && (
            <p>마감일 : {FullDateCheck(props.expirationDate)}</p>
          )}
          <p>작성자 : {props.nickName}</p>
          <p>분류 : {dtypeText}</p>
          <p>중요도 : {props.important}</p>
          <div>
            {hashtagText?.map((item) => {
              return <HashTagBox key={item}># {item}</HashTagBox>;
            })}
          </div>
        </BoardBoxTitleBox>
      </BoardBox>
    </>
  );
}

const TagWrapper = styled.ul`
  display: flex;
  gap: 1rem;
  align-items: center;
  padding: 0.4rem 0.8rem;
  height: 3.2rem;
  .tag {
    border-radius: 0.8rem;
    width: fit-content;
  }
`;

const HashTagBox = styled.div`
  display: inline-block;
  border: 0.1rem solid #ccc;
  border-radius: 0.5rem;
  padding: 0.5rem;
  margin-right: 1rem;
  font-size: 1.5rem;
  opacity: 0.8;
  width: fit-content;
`;

const BoardBox = styled.div`
  width: 30vw;
  max-width: 47rem;
  min-width: 25rem;
  height: 24.7rem;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  border: 0.1rem solid #dde1e6;
  border-radius: 1.6rem;
  background-color: #ffffff;

  .title {
    width: 80%;
    font-size: 1.9rem;
  }
`;

function RadioButtons({
  options,
  categoryValue,
  partyRes,
  selected,
  setSelected,
}) {
  useEffect(() => {
    switch (selected) {
      case 0:
        categoryValue("all");
        partyRes.refetch();
        break;
      case 1:
        categoryValue("notice");
        partyRes.refetch();
        break;
      case 2:
        categoryValue("vote");
        partyRes.refetch();
        break;
      case 3:
        categoryValue("homework");
        partyRes.refetch();
        break;
      case 4:
        categoryValue("board");
        partyRes.refetch();
        break;
      default:
        break;
    }
  }, [selected]);

  return (
    <RadioBox>
      {options.map((option, index) => (
        <RadioButtonStyled
          key={index}
          style={{ opacity: selected === index ? 1 : 0.5 }}
          onClick={() => setSelected(index)}
        >
          {option}
        </RadioButtonStyled>
      ))}
    </RadioBox>
  );
}

const RadioButtonStyled = styled.button`
  width: 5rem;
  height: 4rem;
  border: none;
  border-radius: 1rem;
  font-size: 1.6rem;
  background-color: ${({ selected }) => (selected ? "#ccc" : "transparent")};
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
`;
const RadioBox = styled.div``;

const Carousel = (props) => {
  const currentTime = new Date();
  const targetTime = new Date(props.expirationDate);
  const timeDiffInMs = targetTime - currentTime;
  const hoursDiff = Math.floor(timeDiffInMs / (1000 * 60 * 60));

  const navi = useNavigate();
  return (
    <CarouselItem
      onClick={() =>
        navi(
          `/party/detail?groupId=${props.groupId}&detailId=${props.id}&dtype=homework`
        )
      }
    >
      <BoardBoxTitleBox>
        <TopInfoWrapper>
          {hoursDiff >= 0 ? (
            <span className="plus">마감 {hoursDiff}시간 전</span>
          ) : (
            <span className="minus">마감 {-hoursDiff}시간 지남</span>
          )}
          <h1>{props.title}</h1>
        </TopInfoWrapper>
        <BottomInfoWrapper>
          <p>
            {props.nickName} | {FullDateCheck(props.expirationDate)}
          </p>
        </BottomInfoWrapper>
      </BoardBoxTitleBox>
    </CarouselItem>
  );
};

const TopInfoWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

const BottomInfoWrapper = styled.section`
  p {
    color: ${(props) => props.theme.color.grey40};
    font-size: 1.1rem;
  }
`;

const CarouselItem = styled.div`
  width: 25rem;
  height: 15rem;
  border-radius: 1rem;
  background-color: #ffffff;
`;

const BoardBoxTitleBox = styled.div`
  padding: 1rem;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  width: 30rem;
  font-size: 2.45rem;
  display: flex;
  gap: 0.8rem;
  h1 {
    width: 23rem;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.8rem;
    font-weight: 600;
  }
  span {
    background: rgba(220, 53, 69, 0.2);
    border-radius: 0.8rem;
    font-size: 1.2rem;
    width: fit-content;
    padding: 0.8rem;
  }
`;

const Party = () => {
  const navi = useNavigate();
  const pam = useParams();
  const [selected, setSelected] = useState(0);
  const [categoryValue, setCategoryValue] = useState("all");
  const options = ["전체", "공지", "투표", "과제", "게시글"];

  const [carouselList, setCarouselList] = useState([]);

  const [groupList, setGroupList] = useState([]);
  const [totalNum, setTotalNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const partyRes = useQuery(
    ["party", { id: pam.id, page: pageNum, size: 99, category: categoryValue }],
    () =>
      getDetailPage({
        id: pam.id,
        page: pageNum,
        size: 99,
        category: categoryValue,
      }),
    {
      onSuccess: ({ data }) => {
        setGroupList(data.data.basicBoards.content);
        setCarouselList(data.data.deadlines);
      },
    }
  );

  useEffect(() => {
    const isUserCookie = getCookie("token");
    if (isUserCookie === undefined) {
      navi("/");
      toast.error("로그인 정보가 만료되었습니다.");
    }
  }, []);

  const deletePartyMember = useMutation(deletePageMembers, {
    onSuccess: (data) => {
      console.log("해당 멤버가 퇴출되었습니다.");
      window.alert("해당 멤버가 퇴출되었습니다");
      navi("/");
    },
  });

  const doDelete = (data) => {
    const res = deletePartyMember.mutateAsync(data);
  };

  if (partyRes.isLoading || partyRes.isError) {
    return <></>;
  }
  return (
    <>
      <PageContainer>
        <LeftContainer>
          <PartyInfo props={partyRes.data.data.data} />
        </LeftContainer>
        <RightTotalContainer>
          <CarouselContainer>
            <h1 className="title">오늘 마감</h1>
            {carouselList?.map((item) => {
              return (
                <Carousel
                  key={item.id}
                  groupId={pam.id}
                  id={item.id}
                  expirationDate={item.expirationDate}
                  nickName={item.nickname}
                  title={item.title}
                />
              );
            })}
          </CarouselContainer>
          <RadioBox>
            <RadioButtons
              options={options}
              categoryValue={setCategoryValue}
              partyRes={partyRes}
              selected={selected}
              setSelected={setSelected}
            />
          </RadioBox>
          <RightContainer>
            {groupList?.map((item) => {
              return (
                <Board
                  key={item.id}
                  groupId={pam.id}
                  createdAt={item.createdAt}
                  content={item.content}
                  nickName={item.nickname}
                  subtitle={item.subtitle}
                  title={item.title}
                  id={item.id}
                  dtype={item.dtype}
                  important={item.important}
                  hashtagList={item.hashtagList}
                  expirationDate={item.expirationDate}
                  groupName={partyRes.data.data.data.groupName}
                  groupInfo={partyRes.data.data.data.groupInfo}
                  groupCode={partyRes.data.data.data.groupCode}
                  isAdmin={partyRes.data.data.data.admin}
                />
              );
            })}
          </RightContainer>
        </RightTotalContainer>
      </PageContainer>
    </>
  );
};
const CarouselContainer = styled.div`
  width: 60vw;
  height: 30.2rem;
  overflow-x: auto;
  margin-bottom: 5.6rem;
  gap: 3rem;
  padding: 3.2rem;
  display: flex;
  background-color: ${(props) => props.theme.color.zeroThree};
  border-radius: 3.2rem;
  flex-direction: column;

  .title {
    font-weight: 500;
    font-size: 2.2rem;
    color: #ffffff;
  }
`;

const PageContainer = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: flex-start;
  width: 80vw;
  margin: 0 auto;
  gap: 1rem;
  padding: 2rem 0 3rem 0;
`;

const LeftContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 30rem;
  gap: 1rem;
  font-size: 1.45rem;
`;

const RightTotalContainer = styled.div`
  flex-direction: column;
  justify-content: center;
  align-items: center;
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
  color: black;
  font-size: 1.45rem;
`;

export default Party;
