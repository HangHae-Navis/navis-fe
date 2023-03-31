import styled from "styled-components";
import Message from "./Message";

const Chatting = ({ messages }) => {
  return (
    <MessageWrapper>
      {messages?.map((message, i) => (
        <Message key={i} message={message} />
      ))}
    </MessageWrapper>
  );
};

const MessageWrapper = styled.section`
  display: flex;
  height: 80%;
  max-width: 100%;
  gap: 2rem;
  overflow-y: auto;
  flex-direction: column;
`;

export default Chatting;
