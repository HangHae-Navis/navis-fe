import { css } from "styled-components";

export const flexCenter = css`
  display: flex;
  align-items: center;
  justify-content: center;
`;

export const Input = css`
  width: 100%;
  height: 4rem;
  border-radius: 0.6rem;
  padding: 0.2rem 0.8rem;
  font-size: 1.15rem;

  &:focus {
    outline: none;
  }
`;

export const Button = css`
  padding: 0.8rem;
  ${flexCenter}
  width: 8rem;
  height: 4rem;
  border: none;
  font-size: 1.3rem;
  border-radius: 0.8rem;
`;

export const linearText = css``;
