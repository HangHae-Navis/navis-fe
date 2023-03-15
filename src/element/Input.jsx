import React, { useState } from "react";
import styled from "styled-components";

const Input = ({ register, placeholder, type, name, error, label }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  return (
    <>
      {type !== "password" ? (
        <InputWrapper>
          <Label>{label}</Label>
          <InputCustom
            placeholder={placeholder}
            type={type}
            {...register(name, {
              required: "값을 입력해주세요.",
            })}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputWrapper>
      ) : (
        <InputWrapper>
          <Label>{label}</Label>
          <InputCustom
            placeholder={placeholder}
            type={type}
            {...register(name, {
              required: "값을 입력해주세요.",
            })}
          />
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputWrapper>
      )}
    </>
  );
};

const InputWrapper = styled.section`
  width: 80%;
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
`;

const Label = styled.section`
  align-self: flex-start;
  font-size: 1.8rem;
`;

const InputCustom = styled.input`
  height: 4rem;
  padding: 0 0.8rem;
  font-size: 1.4rem;
  letter-spacing: 0.05rem;
  border-radius: 0.6rem;
  border: 0.05rem solid black;
  font-weight: 500;
  &:focus {
    outline: none;
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.3rem;
  color: red;
  align-self: flex-end;
`;

Input.defaultProps = {
  type: "text",
  placeholder: "값을 입력하세요.",
  register: () => {},
};

export default Input;
