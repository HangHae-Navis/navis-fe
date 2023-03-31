import React from "react";
import CopyToClipboard from "react-copy-to-clipboard";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import styled from "styled-components";
import copy from "../../assets/ic14/copy.svg";
import write from "../../assets/ic24/write.svg";
import remove from "../../assets/ic24/delete.svg";

const PartyInfo = (props) => {
  const navi = useNavigate();
  const onWithdrawal = () => {
    toast.error("그룹을 탈퇴했습니다.", {
      toastId: "withdrawal",
    });
  };
  console.log(props)
  return (
    <PartyInfoWrapper>
      <CopyToClipboard
        text={props?.groupCode}
        onCopy={() => toast.success("코드가 복사되었습니다.")}
      >
        <span className="code">
          초대코드
          <img src={copy} alt="copy" />
        </span>
      </CopyToClipboard>
      <h1>{props?.groupName}</h1>
      <p>{props?.groupInfo}</p>
      <ButtonWrapper>
        <div
          className="button"
          onClick={() => navi(`/party/${props.groupId}/edit`)}
        >
          <img src={write} alt="글쓰기" />
          <span>글쓰기</span>
        </div>

        {props.isAdmin === true ? (
          <>
            <button className="button" disabled={true}>
              <img src={remove} alt="탈퇴" />
              <span>탈퇴하기</span>
            </button>
            <div
              className="button admin"
              onClick={() => navi(`/party/${props.groupId}/admin`)}
            >
              <svg
                width="16"
                height="20"
                viewBox="0 0 16 20"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M12 7V5C12 3.93913 11.5786 2.92172 10.8284 2.17157C10.0783 1.42143 9.06087 1 8 1C6.93913 1 5.92172 1.42143 5.17157 2.17157C4.42143 2.92172 4 3.93913 4 5V7M14 19H2C1.73478 19 1.48043 18.8946 1.29289 18.7071C1.10536 18.5196 1 18.2652 1 18V8C1 7.73478 1.10536 7.48043 1.29289 7.29289C1.48043 7.10536 1.73478 7 2 7H14C14.2652 7 14.5196 7.10536 14.7071 7.29289C14.8946 7.48043 15 7.73478 15 8V18C15 18.2652 14.8946 18.5196 14.7071 18.7071C14.5196 18.8946 14.2652 19 14 19Z"
                  stroke="white"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
              <span>Admin</span>
            </div>
          </>
        ) : (
          <button className="button" onClick={onWithdrawal}>
            <img src={remove} alt="탈퇴" />
            <span>탈퇴하기</span>
          </button>
        )}
      </ButtonWrapper>
    </PartyInfoWrapper>
  );
};

const PartyInfoWrapper = styled.section`
  width: 20vw;
  max-width: 22.5rem;
  display: flex;
  flex-direction: column;
  gap: 0.3rem;
  position: fixed;
  top: 17rem;
  left: 6vw;

  .code {
    cursor: pointer;
    display: flex;
    gap: 0.8rem;
    align-items: center;
    color: ${(props) => props.theme.color.zeroThree};
    font-size: 1.35rem;
  }

  h1 {
    font-size: 2rem;
    margin-bottom: 2rem;
    color: ${(props) => props.theme.color.grey100};
  }

  p {
    color: ${(props) => props.theme.color.grey80};
    font-size: 1.35rem;
    overflow: hidden;
    white-space: normal;
    text-overflow: ellipsis;
    display: -webkit-box;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    word-break: keep-all;
  }

  .button {
    cursor: pointer;
    padding: 0.8rem 1.8rem;
    display: flex;
    gap: 0.6rem;
    height: 4.3rem;
    align-items: center;
    width: fit-content;
    background: #ffffff;
    border: 0.1rem solid ${(props) => props.theme.color.zeroFour};
    border-radius: 0.8rem;
    span {
      font-size: 1.6rem;
      font-weight: 500;
      color: ${(props) => props.theme.color.zeroFour};
    }
    &:disabled {
      span {
        color: ${(props) => props.theme.color.zeroThree};
      }
      img {
        filter: brightness(170%);
      }
      border: 0.1rem solid ${(props) => props.theme.color.zeroThree};
    }
  }

  .admin {
    width: 11.4rem;
    display: flex;
    justify-content: center;
    border: none;
    background: ${(props) => props.theme.color.zeroThree};
    span {
      color: #ffffff;
    }
  }
`;

const ButtonWrapper = styled.section`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default PartyInfo;
