import React, { useCallback } from "react";
import styled from "styled-components";
import { flexCenter } from "../../utils/style/mixins";

const ChattingForm = ({ onMessageSend, setMessage, message }) => {
  const onChange = useCallback((e) => {
    setMessage(e.target.value);
  }, []);
  return (
    <FormWrapper onSubmit={onMessageSend}>
      <textarea
        type="text"
        onChange={onChange}
        value={message}
        placeholder="내용을 입력해 주세요."
      />
      <SubmitWrapper>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="18"
          height="20"
          viewBox="0 0 24 24"
          fill="none"
        >
          <path
            d="M23 1L15.3 23L10.9 13.1L1 8.7L23 1Z"
            stroke="#585585"
            stroke-width="2"
            stroke-linecap="round"
            stroke-linejoin="round"
          />
        </svg>
      </SubmitWrapper>
    </FormWrapper>
  );
};

const FormWrapper = styled.form`
  width: 100%;
  position: fixed;
  bottom: 0%;
  height: 4rem;
  background: transparent;
  display: flex;
  align-items: center;
  textarea {
    width: 84%;
    resize: none;
    background: transparent;
    border: none;
    padding: 0 0.8rem;
    font-size: 1.1rem;
    overflow-y: auto;
    color: #222222;
    &:focus {
      outline: none;
    }
    &::placeholder {
      color: #c0c0c0;
    }
  }
`;

const SubmitWrapper = styled.button`
  padding-top: 0.6rem;
  border: none;
  background-color: transparent;
  cursor: pointer;
  height: 100%;
  justify-content: flex-start;
  align-items: flex-start;
  width: 10%;
  display: flex;
`;

export default ChattingForm;
