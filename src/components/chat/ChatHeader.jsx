import React from "react";
import { FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import { useRecoilValue, useSetRecoilState } from "recoil";
import styled from "styled-components";
import { chatInfoState, chatModalState } from "../../store/atom";

const ChatHeader = ({ setchatAddVisible, chatAddVisible }) => {
  const chatDetailInfo = useRecoilValue(chatInfoState);
  const setChatModal = useSetRecoilState(chatModalState);
  const onClose = () => {
    setChatModal(false);
  };
  console.log(chatDetailInfo);
  return (
    <ChatHeaderWrapper>
      <h1>채팅목록</h1>
      <IconsFlex>
        <FiPlus
          size={18}
          color={"585585"}
          onClick={() => setchatAddVisible(!chatAddVisible)}
        />
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

  svg {
    cursor: pointer;
  }
`;

const IconsFlex = styled.div`
  display: flex;
  gap: 1rem;
`;

export default ChatHeader;
