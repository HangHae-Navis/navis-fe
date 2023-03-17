import React, { useState } from "react";
import styled from "styled-components";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Input = ({ register, placeholder, type, name, error, label }) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const onVisible = (e) => {
    e.stopPropagation();
    setPasswordVisible(!passwordVisible);
  };
  return (
    <>
      {type !== "password" ? (
        <InputLayout>
          <Label>{label}</Label>
          <InputWrapper>
            <InputCustom
              placeholder={placeholder}
              type={type}
              {...register(name, {
                required: "값을 입력해주세요.",
              })}
            />
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputWrapper>
        </InputLayout>
      ) : (
        <InputLayout>
          <Label>{label}</Label>
          <InputWrapper>
            <InputCustom
              placeholder={placeholder}
              type={passwordVisible ? "text" : type}
              {...register(name, {
                required: "값을 입력해주세요.",
              })}
            />
            <IconsWrapper onClick={onVisible}>
              {passwordVisible === true ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </IconsWrapper>
            {error && <ErrorMessage>{error}</ErrorMessage>}
          </InputWrapper>
        </InputLayout>
      )}
    </>
  );
};

const InputLayout = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
  gap: 0.6rem;
  width: 80%;
`;

const Label = styled.section`
  align-self: flex-start;
  font-size: 1.6rem;
  color: ${(props) => props.theme.color.zeroFour};
`;

const InputCustom = styled.input`
  position: relative;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 5rem;
  height: 4.2rem;
  width: 100%;
  padding-left: 1.8rem;
  font-size: 1.25rem;
  border: 0.05rem solid ${(props) => props.theme.color.zeroThree};
  color: ${(props) => props.theme.color.zeroFour};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.color.zeroTwo};
  }
`;

const ErrorMessage = styled.p`
  font-size: 1.3rem;
  color: red;
  align-self: flex-end;
`;

const InputWrapper = styled.section`
  position: relative;
  width: 27rem;
  display: flex;
  align-items: center;
`;

const IconsWrapper = styled.div`
  position: absolute;
  right: 1.5rem;
`;

Input.defaultProps = {
  type: "text",
  placeholder: "값을 입력하세요.",
  register: () => {},
};

export default Input;
