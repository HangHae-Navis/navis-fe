import React, { useState } from "react";
import Chatting from "../chat/Chatting";
import styled from "styled-components";
import { motion } from "framer-motion";
import { modalVariants } from "../../utils/variants/variants";
import ChatHeader from "../chat/ChatHeader";
import { useQuery } from "react-query";
import { getChat } from "../../utils/api/api";
import ChatFormAdd from "../chat/ChatFormAdd";
import ChatList from "../chat/ChatList";

const Talk = () => {
  const [chats, setChats] = useState([]);
  const [chatAddVisible, setchatAddVisible] = useState(false);
  const getChatList = useQuery("chats", getChat, {
    onSuccess: ({ data }) => {
      console.log(data);
    },
  });
  return (
    <ChatMenu
      variants={modalVariants}
      initial="start"
      animate="animate"
      exit="exit"
    >
      <ChatHeader
        setchatAddVisible={setchatAddVisible}
        chatAddVisible={chatAddVisible}
      />
      {chatAddVisible === true && <ChatFormAdd />}
      <ChatListWrapper>
        <ChatList />
        <ChatList />
        <ChatList />
        <ChatList />
      </ChatListWrapper>
    </ChatMenu>
  );
};

const ChatMenu = styled(motion.div)`
  z-index: 500;
  position: fixed;
  right: 3rem;
  bottom: 3rem;
  max-width: 36rem;
  max-height: 48rem;
  width: 26vw;
  height: 32vw;
  min-width: 28rem;
  min-height: 35rem;
  border-radius: 1.6rem;
  box-shadow: 0.4rem 0.4rem 1.6rem rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(1.2rem);
  background: rgba(246, 246, 246, 0.7);
`;

const ChatListWrapper = styled.ul`
  display: flex;
  flex-direction: column;
  justify-items: center;
`;

export default Talk;
