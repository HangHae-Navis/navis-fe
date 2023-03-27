import React, { useState, useEffect } from "react";
import SockJS from "sockjs-client";
import Stomp from "stompjs";

const Chat = () => {
  const [stompClient, setStompClient] = useState(null);
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    const socket = new SockJS("http://sparta-kdh.kro.kr/ws/chat");
    const stompClient = Stomp.over(socket);
    setStompClient(stompClient);

    return () => {
      stompClient.disconnect();
    };
  }, []);

  const handleConnect = () => {
    stompClient.connect({}, (frame) => {
      console.log("Connected: " + frame);
      stompClient.subscribe("/user/queue/chat", (message) => {
        setMessages((messages) => [...messages, JSON.parse(message.body)]);
      });
    });
  };

  const handleSend = () => {
    stompClient.send("/app/chat", {}, JSON.stringify({ content: message }));
    setMessage("");
  };

  return (
    <div>
      <h1>1:1 Chat</h1>
      {!stompClient && <button onClick={handleConnect}>Connect</button>}
      {stompClient && (
        <>
          <div>
            {messages.map((message, index) => (
              <div key={index}>
                <p>
                  {message.username}: {message.content}
                </p>
              </div>
            ))}
          </div>
          <div>
            <input
              type="text"
              value={message}
              onChange={(e) => setMessage(e.target.value)}
            />
            <button onClick={handleSend}>Send</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Chat;
