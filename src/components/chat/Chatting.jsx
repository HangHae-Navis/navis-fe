import React from "react";
import { useEffect } from "react";
import { useRef } from "react";
import { useState } from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { getCookie } from "../../utils/infos/cookie";

const Chatting = () => {
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
        ws.current.subscribe(`/chats/room/1`, (frame) => {
          console.log(JSON.parse(frame.body));
        });
        ws.current.send(
          "/app/message",
          {
            Authorization: token,
          },
          JSON.stringify({
            type: "ENTER",
            newMessageCount: 0,
            page: 0,
            size: 50,
            to: "1",
          })
        );
      }
    );
  };

  console.log(messages);

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
        to: "1",
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
      }
    };
  }, []);

  return (
    <form>
      <input
        type="text"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button onClick={onMessageSend}>제출</button>
    </form>
  );
};

export default Chatting;
