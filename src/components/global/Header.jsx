import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginModalState } from "../../store/atom";
import { getKaKaoLogin } from "../../utils/api/api";
import { setCookie } from "../../utils/infos/cookie";
import { path } from "../../constants/path";

const Header = () => {
  const setLoginModal = useSetRecoilState(loginModalState);
  const navi = useNavigate();
  const code = window.location.search;
  const [currentPam, setCurrentPam] = useState(code);
  const [isCallBool, setIsCallBool] = useState(false);
  const nickname = localStorage.getItem("nickname");
  const getCode = useQuery(
    ["getCode", currentPam],
    () => getKaKaoLogin(currentPam),
    {
      onSuccess: () => {
        navi(`/${path.MAIN}`);
      },
      enabled: isCallBool,
    }
  );

  useEffect(() => {
    setCurrentPam(code);
    if (nickname === null && code !== "") {
      setIsCallBool(true);
    }
  }, []);

  useEffect(() => {
    if (getCode.data) {
      setCookie("token", getCode.data.data.data.token);
      localStorage.setItem("userInfo", getCode.data.data.data.nickname);
    }
  }, [getCode.data]);

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
  height: 6rem;
  padding: 1rem 0;
`;

export default Header;
