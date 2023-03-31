import React from "react";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { chatModalState } from "../../store/atom";
import { flexCenter } from "../../utils/style/mixins";
import Talk from "./Talk";

const Chat = () => {
  const [chatModal, setChatModal] = useRecoilState(chatModalState);
  const onToggleModal = () => {
    setChatModal(!chatModal);
  };
  return (
    <>
      {chatModal === true ? (
        <Talk />
      ) : (
        <ChatIcons onClick={onToggleModal}>
          <svg
            width="48"
            height="48"
            viewBox="0 0 48 48"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14 40H8C7.46957 40 6.96086 39.7893 6.58579 39.4142C6.21071 39.0391 6 38.5304 6 38V16"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M40 8H16C15.4696 8 14.9609 8.21071 14.5858 8.58579C14.2107 8.96086 14 9.46957 14 10V30C14 30.5304 14.2107 31.0391 14.5858 31.4142C14.9609 31.7893 15.4696 32 16 32H22V38L32 32H40C40.5304 32 41.0391 31.7893 41.4142 31.4142C41.7893 31.0391 42 30.5304 42 30V10C42 9.46957 41.7893 8.96086 41.4142 8.58579C41.0391 8.21071 40.5304 8 40 8V8Z"
              stroke="white"
              strokeWidth="3"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </ChatIcons>
      )}
    </>
  );
};

const ChatIcons = styled.section`
  cursor: pointer;
  z-index: 500;
  position: fixed;
  bottom: 5%;
  right: 4%;
  width: 8rem;
  height: 8rem;
  ${flexCenter}
  background-color: ${(props) => props.theme.color.zeroFour};
  box-shadow: 0 0.2rem 0.4rem rgba(0, 0, 0, 0.25);
  border-radius: 1.6rem;
`;

export default Chat;
