import React from "react";
import styled from "styled-components";
import profile from "../../assets/ic54/profile.svg";

const ChatList = () => {
  return (
    <ChatListLayout>
      <img src={profile} alt="profile" />
      <ChatInfo>
        <span>함보라</span>
        <p>
          안녕하세요. 요청하신 사항 확인
          되셨나요?dㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇㅇ
        </p>
      </ChatInfo>
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
