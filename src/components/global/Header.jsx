import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginModalState } from "../../store/atom";
import { getKaKaoLogin } from "../../utils/api/api";
import { removeCookie, setCookie } from "../../utils/infos/cookie";
import { path } from "../../constants/path";
import { removeLocalStorage } from "../../utils/infos/localStorage";
import Button from "../../element/Button";

const Header = () => {
  const setLoginModal = useSetRecoilState(loginModalState);
  const navi = useNavigate();
  const code = window.location.search;
  const [currentPam, setCurrentPam] = useState(code);
  const [isCallBool, setIsCallBool] = useState(false);
  const nickname = localStorage.getItem("userInfo");
  const getCode = useQuery(
    ["getCode", currentPam],
    () => getKaKaoLogin(currentPam),
    {
      onSuccess: ({ data }) => {
        navi(`/${path.MAIN}`);
        setCookie("token", data.data.token);
        localStorage.setItem("userInfo", data.data.nickname);
      },
      enabled: isCallBool,
    }
  );

  useEffect(() => {
    if (nickname === null && code !== "") {
      setCurrentPam(code);
      setIsCallBool(true);
    }
  }, []);

  const onLogout = () => {
    removeCookie("token");
    removeLocalStorage("userInfo");
    navi("/");
  };

  return (
    <HeaderWrapper>
      {/* <img src={Logo} className="logo" alt="logo" /> */}
      <h1>로고</h1>
      {nickname === null ? (
        <Button transparent={true} onClick={() => setLoginModal(true)}>
          Login
        </Button>
      ) : (
        <Button transparent={true} onClick={onLogout}>
          Logout
        </Button>
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  cursor: pointer;
  position: fixed;
  left: 0%;
  top: 0%;
  display: flex;
  align-items: center;
  z-index: 999;
  justify-content: space-around;
  width: 100vw;
  height: 10rem;
  padding: 1rem;
  background: ${(props) => props.theme.color.zeroOne};
  .logo {
    width: 10.5rem;
  }
`;

export default Header;
