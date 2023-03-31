import React from "react";
import styled from "styled-components";

const Message = ({ message }) => {
  return (
    <MessageWrapper>
      {message.author === true ? (
        <OwnMessage>
          <p>{message.message}</p>
        </OwnMessage>
      ) : (
        <OtherMessage>
          <p>{message.message}</p>
        </OtherMessage>
      )}
    </MessageWrapper>
  );
};

const MessageWrapper = styled.div`
  width: 100%;
  display: flex;
`;

const OtherMessage = styled.div`
  padding: 1rem 0;
  height: auto;
  width: 100%;

  p {
    border-radius: 0.8rem;
    background-color: #eeeeee;
    padding: 0.8rem;
    width: fit-content;
    max-width: 12.7rem;
    color: #222222;
  }
`;

const OwnMessage = styled.div`
  padding: 1rem 0;
  height: auto;
  justify-self: flex-end;

  p {
    border-radius: 0.8rem;
    background: #e4e2ee;
    padding: 0.8rem;
    width: fit-content;
    max-width: 14rem;
    color: #222222;
  }
`;

export default Message;