import React, { useState } from "react";
import styled from "styled-components";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";
import { InputStyle } from "../utils/style/mixins";

const Input = ({
  register,
  placeholder,
  type,
  name,
  error,
  label,
  defaultValue,
  width,
  height,
}) => {
  const [passwordVisible, setPasswordVisible] = useState(false);
  const onVisible = (e) => {
    e.stopPropagation();
    setPasswordVisible(!passwordVisible);
  };

  const userNameRules = {
    required: "값을 입력해주세요.",
    pattern: {
      value: /^[a-zA-Z0-9+-_.]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
      message: "이메일 형식으로 입력해주세요",
    },
  };
  const passwordRules = {
    required: "값을 입력해주세요.",
    pattern: {
      value:
        /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*()_+])[A-Za-z\d!@#$%^&*()_+]{8,15}$/,
      message: "영문, 숫자, 특수기호를 포함하여 8~15자로 입력해주세요.",
    },
  };

  return (
    <>
      {type !== "password" ? (
        <InputLayout>
          <Label>{label}</Label>
          <InputWrapper width={width}>
            <InputCustom
              placeholder={placeholder}
              type={type}
              {...register(name, userNameRules)}
              defaultValue={defaultValue}
            />
          </InputWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputLayout>
      ) : (
        <InputLayout>
          <Label>{label}</Label>
          <InputWrapper width={width}>
            <InputCustom
              placeholder={placeholder}
              type={passwordVisible ? "text" : type}
              {...register(name, passwordRules)}
              defaultValue={defaultValue}
            />
            <IconsWrapper onClick={onVisible}>
              {passwordVisible === true ? (
                <AiFillEyeInvisible size={20} />
              ) : (
                <AiFillEye size={20} />
              )}
            </IconsWrapper>
          </InputWrapper>
          {error && <ErrorMessage>{error}</ErrorMessage>}
        </InputLayout>
      )}
    </>
  );
};

const InputLayout = styled.section`
  position: relative;
  display: flex;
  flex-direction: column;
`;

const Label = styled.section`
  align-self: flex-start;
  font-size: 2.4rem;
  color: ${(props) => props.theme.color.zeroFour};
  font-weight: bold;
  padding-left: 1rem;
`;

const InputCustom = styled.input`
  ${InputStyle};
`;

const ErrorMessage = styled.p`
  font-size: 1.4rem !important;
  color: #cf5c4c !important;
  align-self: flex-start !important;
  text-align: left;
  padding: 0.25rem 0 0 1.5rem;
  font-weight: 500;
`;

const InputWrapper = styled.section`
  position: relative;
  width: ${({ width }) => (width ? width : "24rem")};
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
