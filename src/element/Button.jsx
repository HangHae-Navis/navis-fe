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
  width,
  height,
  font,
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
      width={width}
      height={height}
      font={font}
    >
      {children}
    </CustomButton>
  );
};

const CustomButton = styled.button`
  padding: 0 2rem;
  
  width: ${({ width }) => (width ? width : "fit-content")};
  height: ${({ height }) => (height ? height : "4rem")};
  border-radius: 3.4rem;
  color: white;
  background-color: ${(props) => props.theme.color.zeroFour};
  font-size: ${({ font }) => (font ? font : "1.6rem")};
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
