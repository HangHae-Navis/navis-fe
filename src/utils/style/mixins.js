import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const pageMargin = css`
  margin-top: 13rem;
`;

export const InputStyle = css`
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

export const linearText = css``;
