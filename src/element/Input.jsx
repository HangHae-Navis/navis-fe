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
  rule,
}) => {
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
          <InputWrapper width={width}>
            <InputCustom
              placeholder={placeholder}
              type={type}
              {...register(name, rule)}
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
              {...register(name, rule)}
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
