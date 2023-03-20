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
import { useEffect, useRef, useState } from "react";
import DateCheck from "../element/DateCheck";

function Board(props) {
  const navi = useNavigate();
  const [dtypeText, setDtypeText] = useState("")
  const [hashtagText, setHashtagText] = useState()
  console.log(props.hashtagList)

  useEffect(() => {
    switch (props.dtype) {
      case "vote":
        setDtypeText("투표")
        break;
      case "board":
        setDtypeText("게시글")
        break;
      case "homework":
        setDtypeText("과제")
        break;
      case "notice":
        setDtypeText("공지")
        break;
      default:
        break;
    }
    if(props.hashtagList[0] !== ''){
      setHashtagText(props.hashtagList)
    }
  }, [])

  return (
    <>
      <BoardBox
        onClick={() =>
          navi(`/party/detail?groupId=${props.groupId}&detailId=${props.id}&dtype="${props.dtype}"`)
        }
      >
        <BoardBoxTitleBox>
          <h1>제목 : {props.title}</h1>
          <p>부제 : {props.subtitle}</p>
          <p>작성일 : {DateCheck(props.createdAt)}</p>
          {props.deadline !== null && (<p>작성일 : {DateCheck(props.deadline)}</p>)}
          <p>작성자 : {props.nickName}</p>
          <p>분류 : {dtypeText}</p>
          <p>중요도 : {props.important}</p>
          <div>
            {hashtagText?.map((item) => {
              return (
                <HashTagBox key={item}># {item}</HashTagBox>
              )
            })
            }
          </div>
        </BoardBoxTitleBox>
      </BoardBox>
    </>
  );
}

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
    font-size: 1.4rem;
  }
`;


function RadioButtons({ options, categoryValue, partyRes, selected, setSelected }) {

  useEffect(() => {
    switch (selected) {
      case 0:
        categoryValue("all")
        partyRes.refetch()
        break;
      case 1:
        //categoryValue("notice")
        break;
      case 2:
        categoryValue("vote")
        partyRes.refetch()
        break;
      case 3:
        categoryValue("homework")
        partyRes.refetch()
        break;
      case 4:
        categoryValue("board")
        partyRes.refetch()
        break;
      default:
        break
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
margin-right: 1rem;
  width: 6rem;
  height: 4rem;
  border: none;
  border-radius: 1rem;
  font-size: 2rem;
  background-color: ${({ selected }) => (selected ? "#ccc" : "transparent")};
  opacity: ${({ selected }) => (selected ? 1 : 0.5)};
`;
const RadioBox = styled.div`
`

const Carousel = (props) =>{
  const currentTime = new Date()
  const targetTime = new Date(props.deadline)
  const timeDiffInMs = targetTime - currentTime;
  const hoursDiff = Math.floor(timeDiffInMs / (1000 * 60 * 60));
  console.log(hoursDiff)

  const navi = useNavigate() 
return (<CarouselItem onClick={() => navi(`/party/detail?groupId=${props.groupId}&detailId=${props.id}&dtype=homework`)}>
<BoardBoxTitleBox>
  {hoursDiff >= 0 ? <p>마감까지 {hoursDiff}시간 남음</p> : <p>마감시간 {-hoursDiff}시간 지남</p>}
  
  <h1>{props.title}</h1>
  <p>작성자 : {props.nickName}</p>
  <p>마감일 : {DateCheck(props.deadline)}</p>
</BoardBoxTitleBox>
</CarouselItem>)
}

const CarouselItem = styled.div`
flex-shrink: 0;
width: 25rem;
height: 15rem;
  background-color: aliceblue;
border-radius: 1rem;
padding-right: 1rem;
overflow: hidden;
`;


const Party = () => {
  const navi = useNavigate();
  const pam = useParams();
  const [selected, setSelected] = useState(0);
  const [categoryValue, setCategoryValue] = useState("all");
  const options = ['전체', '공지', '투표', '과제', '게시글'];

  
  const [carouselList, setCarouselList] = useState([]);

  const [groupList, setGroupList] = useState([]);
  const [totalNum, setTotalNum] = useState(0);
  const [pageNum, setPageNum] = useState(1);
  const partyRes = useQuery(
    ["party", { id: pam.id, page: pageNum, size: 99, category: categoryValue }],
    () =>
      getDetailPage({ id: pam.id, page: pageNum, size: 99, category: categoryValue }),
    {
      onSuccess: ({ data }) => {
        setGroupList(data.data.basicBoards.content);
        setCarouselList(data.data.deadlines)
        console.log(data.data)
      },
    }
  );


  
  const MakeBoards = () => {
    return <></>;
  };

  const deletePartyMember = useMutation(deletePageMembers, {
    onSuccess: (data) => {
      console.log('해당 멤버가 퇴출되었습니다.')
      window.alert('해당 멤버가 퇴출되었습니다')
      navi('/')
    }
  })

  const doDelete = (data) => {
    const res = deletePartyMember.mutateAsync(data)
  }


  if (partyRes.isLoading || partyRes.isError) {return (
    <>
    </>
  );
  }
  return (
    <>
      <PageContainer>
        <LeftContainer>
          <LeftTitleBox>
            <h1>{partyRes.data.data.data.groupName}</h1>
            <p>{partyRes.data.data.data.groupInfo}</p>
            <p>초대 코드 : {partyRes.data.data.data.groupCode}</p>
            <Button onClick={() => navi(`/party/${pam.id}/edit`,)}>글쓰기</Button>
            {partyRes.data.data.data.admin === true ? (
              <Button onClick={() => navi(`/party/${pam.id}/admin`)}>
                어드민 페이지
              </Button>
            ) : (
              <Button onClick={() => doDelete(pam.id)}>그룹 탈퇴하기</Button>
            )}
          </LeftTitleBox>
        </LeftContainer>
        <RightTotalContainer>
    <CarouselContainer>
      {carouselList?.map((item) => {
        return(<Carousel 
        key = {item.id}
        groupId={pam.id}
        id = {item.id}
        deadline={item.deadline}
        nickName={item.nickname}
        title={item.title}
        />)
      })

      }
    </CarouselContainer>
          <RadioBox>
            <RadioButtons
            options={options} categoryValue={setCategoryValue}
            partyRes={partyRes} selected={selected} setSelected={setSelected}/>
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
                  deadline = {null}
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
height: 20rem;
overflow-x: scroll;
gap: 1rem;
display: flex;
flex-direction: row;
background-color: violet;
align-items: center;
`;

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

const RightTotalContainer = styled.div`
flex-direction: column;
justify-content: center;
align-items: center;
`

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
