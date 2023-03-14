import React from "react";
import styled, { css } from "styled-components";
import { flexCenter } from "../utils/style/mixins";

const Button = ({ onClick, size, children, transparent }) => {
  return (
    <CustomButton transparent={transparent} size={size} onClick={onClick}>
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
`;

Button.defaultProps = {
  onClick: () => {},
  size: "m",
  transparent: false,
};

export default Button;
