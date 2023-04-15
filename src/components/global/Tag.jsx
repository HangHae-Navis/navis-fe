import React from "react";
import styled from "styled-components";
import impo from "../../assets/ic20/importance.svg";
import vote from "../../assets/ic20/vote.svg";
import task from "../../assets/ic20/task.svg";
import board from "../../assets/ic24/screen.svg";
import survey from "../../assets/ic24/write.svg";

const Tag = ({ dtype }) => {
  return (
    <>
      {dtype === "homework" && (
        <TagWrapper>
          <img src={task} alt="과제" />
          <span>과제</span>
        </TagWrapper>
      )}
      {dtype === "notice" && (
        <TagWrapper>
          <img src={impo} alt="공지" />
          <span>공지</span>
        </TagWrapper>
      )}
      {dtype === "survey" && (
        <TagWrapper>
          <img src={survey} alt="설문" />
          <span>설문</span>
        </TagWrapper>
      )}
      {dtype === "board" && (
        <TagWrapper>
          <img src={board} alt="게시글" />
          <span>게시글</span>
        </TagWrapper>
      )}
      {dtype === "vote" && (
        <Tag>
          <img src={vote} alt="투표" />
          <span>투표</span>
        </Tag>
      )}
    </>
  );
};

const TagWrapper = styled.section`
  display: flex;
  width: fit-content;
  align-items: center;
  padding: 0.4rem 1rem 0.4rem 0.8rem;
  border-radius: 3.6rem;
  border: 0.1rem solid ${(props) => props.theme.color.zeroFour};
  background-color: #ffffff;
  img {
    width: 1.45rem;
  }
  span {
    padding-left: 0.5rem;
    color: ${(props) => props.theme.color.zeroFour};
    font-size: 1.15rem;
  }
`;

export default Tag;
