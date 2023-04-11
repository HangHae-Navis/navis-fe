import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const pageMargin = css`
  margin-top: 14rem;
`;

export const InputStyle = css`
  position: relative;
  background-color: ${(props) => props.theme.color.white};
  border-radius: 5rem;
  height: 5.2rem;
  width: 100%;
  padding-left: 1.8rem;
  font-size: 1.8rem;
  border: 0.05rem solid ${(props) => props.theme.color.zeroThree};
  color: ${(props) => props.theme.color.zeroFour};

  &:focus {
    outline: none;
  }

  &::placeholder {
    color: ${(props) => props.theme.color.zeroTwo};
  }
`;

export const tagStyle = css`
  display: flex;
  width: fit-content;
  align-items: center;
  padding: 0.4rem 1rem 0.4rem 0.8rem;
  border-radius: 3.6rem;
  border: 0.05rem solid ${(props) => props.theme.color.zeroFour};
  background-color: white;
  img {
    width: 1.45rem;
  }
  span {
    padding-left: 0.5rem;
    color: ${(props) => props.theme.color.zeroFour};
    font-size: 1.15rem;
  }
`;

export const linearText = css``;
