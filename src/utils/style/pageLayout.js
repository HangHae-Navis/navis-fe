import styled from "styled-components";
import { ReactMarkdown } from "react-markdown/lib/react-markdown";


export const ProfileImageTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  justify-content: flex-start;
`;

export const ProfileGroupTitleBox = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  gap: 2rem;
`;

export const ProfileTopContentContainer = styled.div`
  width: 60vw;
  height: 100%;
  border-radius: 4rem;
  border: 0.1rem solid #d4d2e3;
  padding: 5rem;
`;

export const ProfileBottomContentContainer = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  text-align: center;
  flex-direction: column;
  border-radius: 4rem;
  border: 0.1rem solid #d4d2e3;
  padding: 5rem;
  gap: 2rem;
  h1 {
    overflow: hidden;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 1;
    -webkit-box-orient: vertical;
    font-size: 3rem;
    font-weight: 600;
    color: rgb(88, 85, 133, 0.5);
  }
`;
export const ProfileGroupInfoBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 11rem;
  @media (max-width: 960px) {
    gap: 4rem;
  }
`;

export const ProfileRightTotalContainer = styled.div`
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  width: 60vw;
  > * {
    margin-bottom: 2rem;
  }
`;

export const ProfileGroupInfoTextBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 20vw;
  gap: 3rem;
`;

export const ProfileGroupInfoText = styled.div`
  display: flex;
  width: 30vw;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
`;

export const ProfilePageContainer = styled.div`
  margin-top: 14rem;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100vw;
  padding-bottom: 3rem;

  .title {
    font-weight: 700;
    font-size: 3.2rem;
    color: #5d5a88;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  .infotitle {
    font-weight: 700;
    font-size: 2.4rem;
    color: #5d5a88;
  }
  .infocontent {
    font-weight: 400;
    font-size: 2.4rem;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
    color: #9795b5;
  }
  .inputcontent {
    font-weight: 400;
    font-size: 2rem;
    color: #9795b5;
  }
`;

export const DetailInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  gap:1rem;
`;

export const DetailSubmitterBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: flex-end;
  gap: 1rem;
`;

export const DetailSubmitterContainer = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export const DetailPostedHomeWorkFileBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  text-align: center;
  gap: 2rem;
`;
export const DetailHomeworkContentContainer = styled.div`
  width: ${({ width }) => width || "50vw"};
  max-width: 100%;
  height: 100%;
  align-items: flex-start;
  display: flex;
  flex-direction: column;
  border-radius: 4rem;
  border: 0.2rem solid ${({ borderColor }) => borderColor || "#D4D2E3"};
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: normal;
  padding: 5rem;
  gap: 2rem;
  .buttontext {
    font-weight: 400;
    font-size: 1.4rem;
    color: #5d5a88;
  }
  .filename {
    font-weight: 400;
    font-size: 1.6rem;
    color: #9795b5;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
  .name {
    font-weight: 400;
    font-size: 2.2rem;
    color: #5d5a88;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .smallname {
    font-weight: 400;
    font-size: 1.8rem;
    color: #9795b5;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .date {
    font-weight: 400;
    font-size: 2rem;
    color: #9795b5;
    text-overflow: ellipsis;
    overflow: hidden;
    white-space: nowrap;
  }
`;
export const DetailHomeWorkSubmitContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 1.5rem;
`;

export const DetailHomeWorkSubmitButtonBox = styled.div`
  display: flex;
  max-width: 100%;
  flex-direction: row;
  align-items: flex-start;
  gap: 1.5rem;
`;

export const DetailVoteButtonBox = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 1.5rem;
`;
export const DetailVoteContainer = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: 2rem;
  text-align: center;
`;

export const DetailVoteContentContainer = styled.div`
  width: fit-content;
  max-width: 50%;
  height: 100%;
  display: flex;
  flex-direction: column;
  border-radius: 4rem;
  border: 0.1rem solid #d4d2e3;
  padding: 5rem;
  gap: 2rem;
  .name {
    font-weight: 400;
    font-size: 2.2rem;
    color: #5d5a88;
  }
  .smallname {
    font-weight: 400;
    font-size: 1.8rem;
    color: #9795b5;
  }
  .date {
    font-weight: 400;
    font-size: 2rem;
    color: #9795b5;
  }
`;

export const DetailCommentcontainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  max-width: 128rem;
  width: 60vw;
  background-color: ${(props) => props.theme.color.zeroOne};
  padding: 3.2rem;
  margin-left: 5rem;
  border-radius: 0.8rem;
`;

export const DetailPageContainer = styled.div`
  width: 100vw;
  min-height: 100vh;
  max-width: 128rem;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  margin: 0 auto;
  margin-top: 14rem;
`;

export const ReactMarkdownWrapper = styled(ReactMarkdown)`
  * {
    font-size: 1.4rem;
    font-family: "Roboto Mono", monospace;
  }
  padding: 2.5rem 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  p {
    word-wrap: break-word;
  }
  h1 {
    padding: 2rem 0;
    font-size: 2.1rem;
    line-height: 1.45;
    &::after {
      content: "";
      display: block;
      position: relative;
      top: 0.33em;
      border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
    }
  }

  h2 {
    padding: 2rem 0;
    font-size: 1.9rem;
    line-height: 1.45;
    &::after {
      content: "";
      display: block;
      position: relative;
      top: 0.33em;
      border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
    }
  }
  h3 {
    padding: 2rem 0;
    font-size: 1.7rem;
    line-height: 1.45;
    &::after {
      content: "";
      display: block;
      position: relative;
      top: 0.33em;
      border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
    }
  }

  h4 {
    font-size: 1.5rem;
    line-height: 1.45;
  }

  img {
    width: 100%;
    object-fit: cover;
    object-position: center;
  }

  blockquote {
    width: 100%;
    padding-left: 1.25rem;
    border-left: 5px solid rgba(0, 0, 0, 0.1);
    p {
      line-height: 1.4;
    }
  }

  ul {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
    li {
      display: flex;
      align-items: center;
      gap: 0.8rem;
      line-height: 1.2;
    }
  }
`;

export const DetailContentsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  width: 60vw;
  margin-left: 6rem;
  margin-bottom: 2rem;
  gap: 1rem;
`;

export const DetailCommentsWrapper = styled.section`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;
  justify-content: center;

  img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
  }
`;

export const DetailCommentMapWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
`;

export const DetailCommentInputWrapper = styled.section`
  display: flex;
  gap: 1rem;

  .center {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .form {
    width: 100%;
    button {
      cursor: pointer;
      width: 5rem;
      height: 5rem;
      border-radius: 1.6rem;
      border: none;
      color: ${(props) => props.theme.color.zeroOne};
      background-color: ${(props) => props.theme.color.zeroThree};
      margin-left: 0.8rem;
      font-size: 1.2rem;
    }
    .inputLayout {
      display: flex;
      align-items: center;
      textarea {
        width: 80%;
        border-radius: 0.4rem;
        border: none;
        font-size: 1.1rem;
        padding: 0.8rem;
        resize: none;
        &:focus {
          outline: none;
        }
      }
    }
  }

  img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
  }
`;

export const DetailCommentTopWrapper = styled.section`
  display: flex;
  gap: 0.5rem;
  align-items: center;
  color: ${(props) => props.theme.color.zeroFour};
  span {
    font-size: 1.3rem;
  }
  img {
    width: 1.8rem;
  }
`;

