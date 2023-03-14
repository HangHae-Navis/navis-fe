import React from "react";
import styled from "styled-components";

const Input = ({ register, placeholder, type, name, error }) => {
  return (
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
  );
};

const InputWrapper = styled.section`
  position: relative;
  display: flex;
`;

const InputCustom = styled.input``;

const ErrorMessage = styled.p`
  font-size: 1.2rem;
  color: red;
`;

Input.defaultProps = {
  type: "text",
  placeholder: "값을 입력하세요.",
  register: () => {},
};

export default Input;
