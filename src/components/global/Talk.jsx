import React from "react";
import Chatting from "../chat/Chatting";
import styled from "styled-components";
import { motion } from "framer-motion";
import { modalVariants } from "../../utils/variants/variants";
import ChatHeader from "../chat/ChatHeader";

const Talk = () => {
  return (
    <ChatMenu
      variants={modalVariants}
      initial="start"
      animate="animate"
      exit="exit"
    >
      <ChatHeader />
    </ChatMenu>
  );
};

const ChatMenu = styled(motion.div)`
  position: relative;
  z-index: 500;
  position: fixed;
  right: 5rem;
  bottom: 3rem;
  max-width: 32rem;
  max-height: 45rem;
  width: 26vw;
  height: 32vw;
  border-radius: 1.6rem;
  box-shadow: 0.4rem 0.4rem 1.6rem rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1.2rem);
  background: rgba(246, 246, 246, 0.7);
`;

export default Talk;
