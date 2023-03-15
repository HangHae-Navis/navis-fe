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
  cursor: pointer;
  padding: 0.8rem;
  ${flexCenter}
  width: 8rem;
  height: 3.5rem;
  border: none;
  font-size: 1.45rem;
  border-radius: 0.8rem;
  background: ${(props) => props.theme.color.primary};
  color: white;
  font-weight: 500;
  ${(props) =>
    props.transparent === true &&
    css`
      background-color: transparent;
      border: 0.01rem solid ${(props) => props.theme.color.white};
    `}
  &:disabled {
    background: ${(props) => props.theme.color.grey20};
    color: ${(props) => props.theme.color.grey50};
  }
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
