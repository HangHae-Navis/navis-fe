import React from "react";
import styled from "styled-components";
import Star from "../../assets/ic20/star.svg";
import impo from "../../assets/ic20/importance.svg";
import vote from "../../assets/ic20/vote.svg";
import task from "../../assets/ic20/task.svg";

const MarkdownTitle = ({ postInfo, dtype }) => {
  const date = new Date(postInfo.createAt);
  const arr = new Array(postInfo?.important).fill(0);
  return (
    <TitleRenderContent>
      <TitleTopWrapper>
        {dtype === "homework" && (
          <Tag>
            <img src={task} alt="과제" />
            <span>과제</span>
          </Tag>
        )}
        {dtype === "notice" && (
          <Tag>
            <img src={impo} alt="공지사항" />
            <span>공지</span>
          </Tag>
        )}
        {dtype === "vote" && (
          <Tag>
            <img src={vote} alt="투표" />
            <span>투표</span>
          </Tag>
        )}
        {postInfo?.important !== 0 && (
          <Tag>
            {arr.map((_, i) => (
              <img src={Star} key={i} alt="star" />
            ))}
            <span>중요도</span>
          </Tag>
        )}
      </TitleTopWrapper>
      <TitleMidWrapper>
        <h1>{postInfo?.title}</h1>
        <HashTagWrapper>
          {postInfo?.hashtagList?.map((tag, i) => (
            <li key={i}>#{tag}</li>
          ))}
        </HashTagWrapper>
      </TitleMidWrapper>
      <TitleBottomWrapper>
        <p>{postInfo?.subtitle}</p>
        <span>
          {postInfo?.nickname} | {`${date.toLocaleDateString()}`}
        </span>
      </TitleBottomWrapper>
    </TitleRenderContent>
  );
};

const Tag = styled.section`
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

const TitleTopWrapper = styled.section`
  display: flex;
  gap: 0.8rem;
`;

const TitleBottomWrapper = styled.section`
  display: flex;
  gap: 1rem;
  align-items: center;

  p {
    color: #878787;
    font-size: 1.3rem;
  }
  span {
    font-size: 1.2rem;
    color: ${(props) => props.theme.color.grey40};
  }
`;

const TitleMidWrapper = styled.section`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

const HashTagWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  li {
    font-size: 1.1rem;
    color: ${(props) => props.theme.color.zeroThree};
  }
`;

const TitleRenderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2.3rem;
  h1 {
    max-width: 80%;
    width: fit-content;
    font-size: 2.1rem;
    line-height: 1.45;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
`;

export default MarkdownTitle;
