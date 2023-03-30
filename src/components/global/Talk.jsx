import React from "react";
import Chatting from "../chat/Chatting";
import { FiPlus } from "react-icons/fi";
import { IoMdClose } from "react-icons/io";
import styled from "styled-components";
import { motion } from "framer-motion";
import { useRecoilState } from "recoil";
import { chatModalState } from "../../store/atom";
import { modalVariants } from "../../utils/variants/variants";

const Talk = () => {
  const [chatModal, setChatmodal] = useRecoilState(chatModalState);
  const onClose = () => {
    setChatmodal(false);
  };
  return (
    <ChatMenu
      variants={modalVariants}
      initial="start"
      animate="animate"
      exit="exit"
    >
      <ChatHeader>
        <h1>채팅목록</h1>
        <IconsFlex>
          <FiPlus size={18} color={"585585"} />
          <IoMdClose size={18} color={"585585"} onClick={onClose} />
        </IconsFlex>
      </ChatHeader>
    </ChatMenu>
  );
};

const ChatMenu = styled(motion.div)`
  position: relative;
  z-index: 500;
  position: fixed;
  background-color: yellow;
  right: 5rem;
  bottom: 3rem;
  max-width: 32rem;
  max-height: 45rem;
  width: 26vw;
  height: 32vw;
  border-radius: 1.6rem;
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1.2rem);
  background: rgba(246, 246, 246, 0.7);
`;

const ChatHeader = styled.div`
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

export default Talk;
