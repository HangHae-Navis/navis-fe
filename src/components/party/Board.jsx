import Tag from "../global/Tag";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { FullDateCheck } from "../../element/DateCheck";
import StarTag from "../../components/global/StarTag";

const Board = (props) => {
  const navi = useNavigate();
  const [hashtagText, setHashtagText] = useState();
  useEffect(() => {
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
            <Tag dtype={props?.dtype} />
            <StarTag important={props?.important} />
          </BigTagWrapper>
          <h1 className="title">{props.title}</h1>
          <p className="subtitle">{props.subtitle}</p>
          <BoardBottom>
            <p>{props.nickName}</p>
            <p>|</p>
            <p>{FullDateCheck(props.createdAt)}</p>
          </BoardBottom>
          <TagWrapper>
            {hashtagText?.map((item, index) => {
              return <HashTag key={index}>#{item}</HashTag>;
            })}
          </TagWrapper>
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

const TagWrapper = styled.ul`
  display: flex;
  gap: 1rem;
  align-items: center;
  height: 3.2rem;
`;

const HashTag = styled.span`
  width: fit-content;
  color: ${(props) => props.theme.color.zeroFour};
  font-size: 1.4rem;
`;

const BoardBox = styled.div`
  cursor: pointer;
  width: 30vw;
  max-width: 47rem;
  min-width: 25rem;
  height: 24.7rem;
  flex-direction: column;
  display: flex;
  justify-content: space-between;
  border-radius: 1.6rem;
  @media (max-width: 800px) {
    width: 100%;
  }
  background-color: ${(props) => props.theme.color.zeroOne};
  .title {
    width: 80%;
    font-size: 1.9rem;
  }
  &:hover {
    transform: scale(1.02);
    filter: brightness(90%);
  }
  transition: 0.2s transform, 0.2s filter;
`;

export default Board;
