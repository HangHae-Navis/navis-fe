import React from "react";
import styled, { css } from "styled-components";
import { flexCenter } from "../utils/style/mixins";

const Button = ({ onClick, size, children, transparent, disabled, full }) => {
  return (
    <CustomButton
      disabled={disabled}
      transparent={transparent}
      size={size}
      onClick={onClick}
      full={full}
    >
      {children}
    </CustomButton>
  );
};

const CustomButton = styled.button`
  padding: 0 2rem;
  width: fit-content;
  height: 4rem;
  border-radius: 3.4rem;
  color: white;
  background-color: ${(props) => props.theme.color.zeroFour};
  font-size: 1.25rem;
  border: none;

  ${(props) =>
    props.transparent === true &&
    css`
      border: 0.1rem solid ${(props) => props.theme.color.zeroTwo};
      color: ${(props) => props.theme.color.zeroFour};
      background: ${(props) => props.theme.color.white};
    `}

  ${(props) =>
    props.full === true &&
    css`
      width: 100%;
    `}
`;

Button.defaultProps = {
  onClick: () => {},
  size: "m",
  transparent: false,
  disabled: false,
  full: false,
};

export default Button;
