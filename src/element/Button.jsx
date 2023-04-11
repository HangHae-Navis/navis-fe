import React from "react";
import styled, { css } from "styled-components";

const Button = ({
  onClick,
  br,
  children,
  transparent,
  disabled,
  full,
  type,
  color,
}) => {
  return (
    <CustomButton
      disabled={disabled}
      transparent={transparent}
      br={br}
      onClick={onClick}
      full={full}
      type={type}
      color={color}
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
  font-size: 1.6rem;
  border: none;
  cursor: pointer;

  ${(props) =>
    props.transparent === true &&
    css`
      border: 0.05rem solid ${(props) => props.theme.color.zeroTwo};
      color: ${(props) => props.theme.color.zeroFour};
      background: transparent;
      color: ${(props) => (props.color ? props.color : "white")};
    `}

  ${(props) =>
    props.full === true &&
    css`
      width: 100%;
    `}

  ${(props) =>
    props.br === false &&
    css`
      border-radius: 0.8rem;
    `}
`;

Button.defaultProps = {
  onClick: () => {},
  br: true,
  transparent: false,
  disabled: false,
  full: false,
};

export default Button;
