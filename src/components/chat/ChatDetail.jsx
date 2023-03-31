import { Stomp } from "@stomp/stompjs";
import React, { useEffect, useRef, useState } from "react";
import { useMutation } from "react-query";
import { useRecoilValue, useResetRecoilState } from "recoil";
import SockJS from "sockjs-client";
import styled from "styled-components";
import { chatInfoState } from "../../store/atom";
import { postChatPrevious } from "../../utils/api/api";
import { getCookie } from "../../utils/infos/cookie";
import Chatting from "./Chatting";
import ChattingForm from "./ChattingForm";

const ChatDetail = () => {
  const chatDetailInfo = useRecoilValue(chatInfoState);
  const chatDetailInfoReset = useResetRecoilState(chatInfoState);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState(null);
  const previousMessages = useMutation((dto) => postChatPrevious(dto), {
    onSuccess: ({ data }) => {
      setMessages(data.data.content);
    },
  });
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
          const newMessage = JSON.parse(frame.body);
          setMessages((prevMessages) => {
            if (!prevMessages) {
              return [newMessage];
            } else {
              return [...prevMessages, newMessage]; // 이전 메시지와 새로운 메시지를 합쳐서 반환
            }
          });
        });
      }
    );
  };

  const disconnect = () => {
    ws.current.disconnect();
  };

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

  const test = async () => {
    const dto = {
      roomId: chatDetailInfo.id,
      to: chatDetailInfo.to,
      page: 1,
      size: 49,
    };
    const res = await previousMessages.mutateAsync(dto);
  };

  useEffect(() => {
    connect();
    test();
    return () => {
      if (ws.current !== null) {
        disconnect();
        chatDetailInfoReset();
      }
    };
  }, []);
  return (
    <ChatDetailWrapper>
      <Chatting messages={messages} />
      <ChattingForm
        onMessageSend={onMessageSend}
        setMessage={setMessage}
        message={message}
      />
    </ChatDetailWrapper>
  );
};

const ChatDetailWrapper = styled.section`
  display: flex;
  width: 100%;
  height: 85%;
  flex-direction: column;
  position: relative;
  gap: 1rem;
  padding: 0 0.8rem;
`;

export default ChatDetail;
