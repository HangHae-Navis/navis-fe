import { motion } from "framer-motion";
import React from "react";
import styled from "styled-components";
import { modalVariants } from "../../utils/variants/variants";
import { InputStyle } from "../../utils/style/mixins";

const EditSpecial = () => {
  return (
    <SpecialInfoWrapper
      variants={modalVariants}
      initial="start"
      animate="animate"
    >
      <InputWrapper>
        <span>제출 기한</span>
        <input
          min={new Date().toISOString().slice(0, -8)}
          type="datetime-local"
          className="date"
        />
      </InputWrapper>
    </SpecialInfoWrapper>
  );
};

const ButtonWrapper = styled.section`
  display: flex;
  gap: 1rem;
  align-items: center;
  button {
    cursor: pointer;
    background: #eeeeee;
    border-radius: 2.5rem;
    border: 0.1rem solid ${(props) => props.theme.color.zeroThree};
    font-size: 1.25rem;
    height: 3.5rem;
    padding: 0.4rem 1.6rem;
  }
  .next {
    border: none;
    color: #ffffff;
    background-color: ${(props) => props.theme.color.zeroFour};
  }
`;

const InputWrappers = styled.section`
  width: 75%;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

const InputWrapper = styled.section`
  display: flex;
  gap: 1rem;
  align-items: center;

  span {
    width: 5rem;
    white-space: nowrap;
    font-size: 1.15rem;
  }
`;

const SpecialInfoWrapper = styled(motion.section)`
  z-index: 999;
  max-width: 60rem;
  width: 90vw;
  height: 45rem;
  background-color: #eeeeee;
  border-radius: 2.5rem;
  display: flex;
  flex-direction: column;
  justify-content: space-around;
  align-items: center;

  select {
    width: 7.5rem;
    border-radius: 5rem;
    padding-left: 0.4rem;
    margin-left: -0.4rem;
    height: 3rem;
    border: 0.1rem solid ${(props) => props.theme.color.zeroTwo};
    color: ${(props) => props.theme.color.zeroThree};
    &:focus {
      outline: none;
    }
    font-size: 1.3rem;
  }

  h1 {
    font-size: 2rem;
    color: ${(props) => props.theme.color.zeroFour};
    font-weight: 700;
  }

  input {
    color: ${(props) => props.theme.color.zeroThree} !important;
    height: 3rem !important;
    width: 100% !important;
    font-size: 1.2rem !important;
    font-weight: 500;
    ${InputStyle}
  }
`;

export default EditSpecial;
