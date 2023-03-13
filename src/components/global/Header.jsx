import React from "react";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginModalState } from "../../store/atom";

const Header = () => {
  const setLoginModal = useSetRecoilState(loginModalState);

  return (
    <HeaderWrapper>
      Header
      <button onClick={() => setLoginModal(true)}>로그인</button>
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 100vw;
  height: 4rem;
  padding: 1rem 0;
`;

export default Header;
