import React from "react";
import styled from "styled-components";
import Star from "../../assets/ic20/star.svg";

const MarkdownTitle = (props) => {
  const date = new Date(props.createAt);
  const arr = new Array(props?.important).fill(0);
  console.log(props);
  return (
    <TitleRenderContent>
      <TitleTopWrapper>
        <Tag></Tag>
        {props?.important !== 0 && (
          <Tag>
            {arr.map((_) => (
              <img src={Star} alt="star" />
            ))}
            <span>중요도</span>
          </Tag>
        )}
      </TitleTopWrapper>
      <TitleMidWrapper>
        <h1>{props?.title}</h1>
        <HashTagWrapper>
          {props?.hashtagList?.map((tag, i) => (
            <li key={i}>#{tag}</li>
          ))}
        </HashTagWrapper>
      </TitleMidWrapper>
      <TitleBottomWrapper>
        <p>{props?.subtitle}</p>
        <span>
          {props?.nickname} | {`${date.toLocaleDateString()}`}
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
    width: 1rem;
  }
  span {
    padding-left: 0.5rem;
    color: ${(props) => props.theme.color.zeroFour};
    font-size: 1.1rem;
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
