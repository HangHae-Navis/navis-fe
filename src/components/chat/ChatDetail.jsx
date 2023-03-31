import { Stomp } from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from "react";
import { useRecoilValue, useResetRecoilState } from "recoil";
import SockJS from "sockjs-client";
import styled from "styled-components";
import { chatInfoState } from "../../store/atom";
import { getCookie } from "../../utils/infos/cookie";
import Chatting from "./Chatting";

const ChatDetail = () => {
  const chatDetailInfo = useRecoilValue(chatInfoState);
  const chatDetailInfoReset = useResetRecoilState(chatInfoState);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const ws = useRef(null);

  const connect = () => {
    const token = getCookie("token")?.substr(7);
    ws.current = Stomp.over(() => {
      const sock = new SockJS(process.env.REACT_APP_WS_KEY);
      return sock;
    });
    ws.current.connect(
      {
        Authorization: token,
      },
      () => {
        ws.current.subscribe(`/chats/room/${chatDetailInfo.id}`, (frame) => {
          console.log(JSON.parse(frame.body));
        });
      }
    );
  };

  console.log(messages);

  const disconnect = () => {
    ws.current.disconnect();
  };

  console.log(chatDetailInfo);

  const onMessageSend = (e) => {
    e.preventDefault();
    const token = getCookie("token")?.substr(7);
    ws.current.send(
      "/app/message",
      {
        Authorization: token,
      },
      JSON.stringify({
        type: "TALK",
        to: chatDetailInfo.to,
        message: message,
      })
    );
    setMessage("");
  };

  useEffect(() => {
    connect();
    return () => {
      if (ws.current !== null) {
        disconnect();
        chatDetailInfoReset();
      }
    };
  }, []);
  return (
    <ChatDetailWrapper>
      <Chatting />
    </ChatDetailWrapper>
  );
};

const ChatDetailWrapper = styled.section`
  display: flex;
  width: 100%;
  flex-direction: column;
  gap: 2rem;
  padding: 0 0.8rem;
  overflow-y: scroll;
`;

export default ChatDetail;
