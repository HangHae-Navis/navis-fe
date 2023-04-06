import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import profile from "../../assets/ic54/profile.svg";
import { chatInfoState } from "../../store/atom";
import Alarm from "../alarm/Alarm";

const ChatList = ({ data, setChatDetailVisible }) => {
  const setChatInfo = useSetRecoilState(chatInfoState);
  const onChatDetail = () => {
    setChatDetailVisible(true);
    setChatInfo({
      nickname: data.nickname,
      toUser: data.toUser,
      id: data.id,
      to: data.username,
    });
  };
  return (
    <ChatListLayout onClick={onChatDetail}>
      <img src={profile} alt="profile" />
      <ChatInfo>
        <span>{data.nickname}</span>
        <p>{data.lastMessage}</p>
      </ChatInfo>
      <Alarm />
    </ChatListLayout>
  );
};

const ChatListLayout = styled.li`
  width: 100%;
  background: rgba(246, 246, 246, 0.7);
  transition: 0.2s filter;
  cursor: pointer;
  padding: 0 2rem;
  height: 5rem;
  display: flex;
  align-items: center;
  overflow-y: auto;

  img {
    width: 3rem;
  }

  &:hover {
    filter: brightness(85%);
  }
`;

const ChatInfo = styled.div`
  display: flex;
  flex-direction: column;
  padding-left: 0.8rem;

  span {
    font-size: 1.1rem;
    font-weight: 300;
  }

  p {
    width: 17rem;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
  }
`;

export default ChatList;
