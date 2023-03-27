import React from "react";
import styled from "styled-components";
import impo from "../../assets/ic20/importance.svg";
import vote from "../../assets/ic20/vote.svg";
import task from "../../assets/ic20/task.svg";

const Tag = ({ dtype }) => {
  return (
    <TagWrapper>
      {dtype === "homework" && (
        <>
          <img src={task} alt="과제" />
          <span>과제</span>
        </>
      )}
      {dtype === "notice" && (
        <>
          <img src={impo} alt="공지" />
          <span>공지</span>
        </>
      )}
      {dtype === "vote" && (
        <>
          <img src={vote} alt="투표" />
          <span>투표</span>
        </>
      )}
    </TagWrapper>
  );
};

const TagWrapper = styled.section`
  display: flex;
  width: fit-content;
  align-items: center;
  padding: 0.4rem 1rem 0.4rem 0.8rem;
  border-radius: 3.6rem;
  border: 0.1rem solid ${(props) => props.theme.color.zeroFour};
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
