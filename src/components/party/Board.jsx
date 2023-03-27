import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { FullDateCheck } from "../../element/DateCheck";
import { flexCenter } from "../../utils/style/mixins";

const Board = (props) => {
  const navi = useNavigate();
  const [dtypeText, setDtypeText] = useState("");
  const [hashtagText, setHashtagText] = useState();
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
          navi(
            `/party/detail?groupId=${props.groupId}&detailId=${props.id}&dtype=${props.dtype}&groupName=${props.groupName}&groupInfo=${props.groupInfo}&groupCode=${props.groupCode}`
          )
        }
      >
        <BoardBoxTitleBox>
          <BigTagWrapper>
            <BigTag>{dtypeText}</BigTag>
            {props.important !== 0 && <BigTag>중요도 {props.important}</BigTag>}
          </BigTagWrapper>
          <h1 className="title">{props.title}</h1>
          <p className="subtitle">{props.subtitle}</p>
          <TagWrapper>
            {hashtagText?.map((item, index) => {
              return <HashTagBox key={index}># {item}</HashTagBox>;
            })}
          </TagWrapper>
          <BoardBottom>
            <p>{props.nickName}</p>
            <p>|</p>
            <p>{FullDateCheck(props.createdAt)}</p>
          </BoardBottom>
        </BoardBoxTitleBox>
      </BoardBox>
    </>
  );
};

const BoardBoxTitleBox = styled.div`
  padding: 2rem;
  height: 100%;
  flex-direction: column;
  justify-content: space-around;
  width: 100%;
  font-size: 2.45rem;
  display: flex;
  gap: 0.8rem;
  .title {
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    font-size: 1.8rem;
    font-weight: 600;
  }
  .subtitle {
    font-size: 1.3rem;
    color: ${(props) => props.theme.color.grey80};
  }
  span {
    background: rgba(220, 53, 69, 0.2);
    border-radius: 0.8rem;
    font-size: 1.2rem;
    width: fit-content;
    padding: 0.8rem;
  }
`;

const BoardBottom = styled.section`
  display: flex;
  gap: 0.3rem;
  align-items: center;
  p {
    font-size: 1.2rem;
    color: ${(props) => props.theme.color.grey40};
  }
`;

const BigTagWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 1rem;
`;

const BigTag = styled.li`
  width: fit-content;
  height: 2.4rem;
  border-radius: 0.6rem;
  padding: 0.4rem 0.8rem;
  background-color: ${(props) => props.theme.color.zeroOne};
  ${flexCenter}
  font-size: 1.2rem;
`;

const TagWrapper = styled.ul`
  display: flex;
  gap: 0.4rem;
  align-items: center;
  height: 3.2rem;
`;

const HashTagBox = styled.div`
  width: fit-content;
  height: 2.4rem;
  border-radius: 999px;
  padding: 0.4rem 0.8rem;
  border: 0.1rem solid ${(props) => props.theme.color.grey40};
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

export default Board;
