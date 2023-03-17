import { useQuery } from "react-query";
import styled from "styled-components";
import PartyRegist from "../components/modal/PartyRegist";
import Button from "../element/Button";
import { getPartyPage } from "../utils/api/api";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Test from "../assets/d65d5952-d801-4225-ab16-8720733b499a.png";
import Pagination from "react-js-pagination";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const Party = () => {
  const [radioValue, setRadioValue] = useState("")

  useEffect(() => {
    console.log(radioValue)
  }, [radioValue])


  const handleRadioChange = (event) => {
    setRadioValue(event.target.value);
  };
  return (<>
    <PageContainer>
      <ReftContainer>
        <ReftTitleBox>
          <h1>제목이 여기 들어가겠지?</h1>
          <p>부제는 여기다 꽂힐 테고?</p>
          <Button>글쓰기</Button>
        </ReftTitleBox>
        <ReftRadioBox>
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
        </ReftRadioBox>
      </ReftContainer>
      <Button>asdas</Button>
    </PageContainer>
  </>);
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
  align-items: center;
  width: 80vw;
  margin: 0 auto;
  gap: 1rem;
  background-color: wheat;
`;

const ReftContainer = styled.div`
flex-direction: column;
justify-content: center;
align-items: center;
width: 30rem;
  gap: 1rem;
  background-color: blanchedalmond;
  color: black;
  font-size: 1.45rem;
`
const ReftTitleBox = styled.div`
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
`

const ReftRadioBox = styled.div`
display: flex;
flex-direction: column;
justify-content: center;
align-items: center;
`

const RadioButton = styled.button`
  width: 2rem;
  height: 2rem;
  border: 0.1rem solid black;
  color: white;
`

export default Party;
