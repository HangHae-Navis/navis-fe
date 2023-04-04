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
import profile from "../../assets/ic54/profile.svg";
import { toast } from "react-toastify";

const Header = () => {
  const setLoginModal = useSetRecoilState(loginModalState);
  const [headerModal, setHeaderModal] = useState(false);
  const navi = useNavigate();
  const code = window.location.search;
  const [currentPam, setCurrentPam] = useState(code);
  const [isCallBool, setIsCallBool] = useState(false);
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
    console.log("hello");
  }, []);

  const onLogout = () => {
    removeCookie("token");
    removeLocalStorage("userInfo");
    navi("/");
    toast.success("정상적으로 로그아웃 되었습니다.");
    onModal();
    window.location.reload();
  };

  const onShift = () => {
    const token = getCookie("token");
    if (token) {
      navi("/main");
    } else {
      navi("/");
    }
  };

  const onShiftProfile = () => {
    navi("/main/profile");
    onModal();
  };

  const onModal = () => {
    setHeaderModal(!headerModal);
  };

  return (
    <HeaderWrapper>
      <img src={Logo} className="logo" alt="logo" onClick={onShift} />
      {token === undefined ? (
        <Button transparent={true} onClick={() => setLoginModal(true)}>
          Login
        </Button>
      ) : (
        <div className="icons" onClick={onModal}>
          <img src={alarm} alt="알림" />
          <img src={profile} alt="프로필" />
          {headerModal === true && (
            <HeaderMenu>
              <li onClick={onShiftProfile}>프로필 수정</li>
              <li onClick={onLogout}>로그아웃</li>
            </HeaderMenu>
          )}
        </div>
      )}
    </HeaderWrapper>
  );
};

const HeaderMenu = styled.ul`
  position: absolute;
  top: 2.5rem;
  left: 6rem;
  width: 10rem;
  height: 8rem;
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.color.zeroTwo};
  border-radius: 1.6rem;

  li {
    cursor: pointer;
    &:first-child {
      border-bottom: 0.05rem solid #c0c0c0;
    }
    height: 50%;
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.25rem;
  }
`;

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
    position: relative;
    display: flex;
    gap: 1.8rem;
    align-items: center;

    img {
      cursor: pointer;
      width: 3.5rem;
    }
  }
  .logo {
    cursor: pointer;
    width: 12rem;
  }
`;

export default Header;
