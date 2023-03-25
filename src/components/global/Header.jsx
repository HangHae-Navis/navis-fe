import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginModalState } from "../../store/atom";
import { getKaKaoLogin } from "../../utils/api/api";
import { getCookie, removeCookie, setCookie } from "../../utils/infos/cookie";
import { path } from "../../constants/path";
import { removeLocalStorage } from "../../utils/infos/localStorage";
import Button from "../../element/Button";
import Logo from "../../assets/logo.svg";
import alarm from "../../assets/ic24/notification.svg";
import chat from "../../assets/ic24/chat.svg";
import profile from "../../assets/ic54/profile.svg";

const Header = () => {
  const setLoginModal = useSetRecoilState(loginModalState);
  const navi = useNavigate();
  const code = window.location.search;
  const [currentPam, setCurrentPam] = useState(code);
  const [isCallBool, setIsCallBool] = useState(false);
  const nickname = localStorage.getItem("userInfo");
  const token = getCookie("token");
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
    if (token === undefined && code !== "") {
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
      <img src={Logo} className="logo" alt="logo" />
      {token === undefined ? (
        <Button transparent={true} onClick={() => setLoginModal(true)}>
          Login
        </Button>
      ) : (
        <div className="icons">
          <img src={alarm} alt="알림" />
          <img src={chat} alt="채팅" />
          <img src={profile} alt="프로필" />
        </div>
      )}
    </HeaderWrapper>
  );
};

const HeaderWrapper = styled.header`
  position: fixed;
  left: 0%;
  top: 0%;
  display: flex;
  align-items: center;
  z-index: 700;
  justify-content: space-around;
  width: 100vw;
  height: 10rem;
  padding: 1rem;
  background: ${(props) => props.theme.color.zeroOne};
  .icons {
    display: flex;
    gap: 1.8rem;
    align-items: center;

    img {
      cursor: pointer;
      width: 3.5rem;
    }
  }
  .logo {
    width: 12rem;
  }
`;

export default Header;
