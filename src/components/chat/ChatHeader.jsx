import React from "react";
import { FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import { chatModalState } from "../../store/atom";

const ChatHeader = () => {
  const [ChatModal, setChatModal] = useRecoilState(chatModalState);

  const onClose = () => {
    setChatModal(false);
  };
  return (
    <ChatHeaderWrapper>
      <h1>채팅목록</h1>
      <IconsFlex>
        <FiPlus size={18} color={"585585"} />
        <IoMdClose size={18} color={"585585"} onClick={onClose} />
      </IconsFlex>
    </ChatHeaderWrapper>
  );
};

const ChatHeaderWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  padding: 1.5rem 2rem 1rem 2rem;
  border-bottom: 0.1rem solid ${(props) => props.theme.color.zeroTwo};

  h1 {
    font-weight: 200;
    font-size: 1.6rem;
    color: ${(props) => props.theme.color.zeroFour};
  }
`;

const IconsFlex = styled.div`
  display: flex;
  gap: 1rem;
`;

export default ChatHeader;
