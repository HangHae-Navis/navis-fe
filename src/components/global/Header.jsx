import React, { useEffect, useState } from "react";
import { useQuery } from "react-query";
import { useNavigate } from "react-router";
import { useRecoilState, useSetRecoilState } from "recoil";
import styled, { css } from "styled-components";
import {
  alarmState,
  loginModalState,
  signinModalState,
} from "../../store/atom";
import { getKaKaoLogin } from "../../utils/api/api";
import { getCookie, removeCookie, setCookie } from "../../utils/infos/cookie";
import { path } from "../../constants/path";
import { removeLocalStorage } from "../../utils/infos/localStorage";
import Button from "../../element/Button";
import Logo from "../../assets/logo.svg";
import alarm from "../../assets/ic24/notification.svg";
import profile from "../../assets/ic54/profile.svg";
import { toast } from "react-toastify";
import { EventSourcePolyfill, NativeEventSource } from "event-source-polyfill";
import Alarm from "../alarm/Alarm";
import { useLocation } from "react-router-dom";
import White from "../../assets/whiteLogo.svg";

const Header = () => {
  const { pathname } = useLocation();
  const EventSource = EventSourcePolyfill || NativeEventSource;
  const setLoginModal = useSetRecoilState(loginModalState);
  const setSigninModal = useSetRecoilState(signinModalState);
  const [headerModal, setHeaderModal] = useState(false);
  const [alarmModal, setAlarmModal] = useRecoilState(alarmState);
  const navi = useNavigate();
  const code = window.location.search;
  const [currentPam, setCurrentPam] = useState(code);
  const [isCallBool, setIsCallBool] = useState(false);
  const token = getCookie("token");
  const storedData = JSON.parse(localStorage.getItem("userInfo"));
  const profileImage =
    token != null
      ? storedData?.profileImage == null
        ? profile
        : storedData?.profileImage
      : profile;

  const getCode = useQuery(
    ["getCode", currentPam],
    () => getKaKaoLogin(currentPam),
    {
      onSuccess: ({ data }) => {
        navi(`/${path.MAIN}`);
        setCookie("token", data.data.token);
        localStorage.setItem(
          "userInfo",
          JSON.stringify({
            nickname: data.data.nickname,
            username: data.data.username,
          })
        );
      },
      enabled: isCallBool,
    }
  );

  const openModal = (props) => {
    setLoginModal(true);
    setSigninModal(props);
  };

  useEffect(() => {
    let eventSource;
    if (token === undefined && code !== "") {
      setCurrentPam(code);
      setIsCallBool(true);
    }

    setAlarmModal(false);

    if (token !== undefined) {
      try {
        eventSource = new EventSource(
          `${process.env.REACT_APP_BASEURL}subscribe`,
          {
            headers: {
              Authorization: token,
            },
            withCredentials: true,
          }
        );

        eventSource.onmessage = (event) => {
          if (!event.data.includes("EventStream Created."))
            toast.success("알림이 도착했습니다", {
              toastId: "alarm",
            });
        };

        /* EVENTSOURCE ONERROR ------------------------------------------------------ */
      } catch (error) {}

      return () => {
        eventSource.close();
      };
    }
  }, [token, pathname]);

  const onLogout = () => {
    removeCookie("token");
    removeLocalStorage("userInfo");
    toast.success("정상적으로 로그아웃 되었습니다.");
    navi("/");
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
    setAlarmModal(false);
  };

  const onModal_t = () => {
    setAlarmModal(!alarmModal);
    setHeaderModal(false);
  };

  return (
    <HeaderWrapper pathname={pathname}>
      {token === undefined ? (
        <>
          <img src={White} className="logo" alt="logo" onClick={onShift} />
          <div className="buttons">
            <Button transparent={true} onClick={() => openModal(true)}>
              Login
            </Button>
            <button className="signup" onClick={() => openModal(false)}>
              가입하기
            </button>
          </div>
        </>
      ) : (
        <>
          <img src={Logo} className="logo" alt="logo" onClick={onShift} />
          <div className="icons">
            <img src={alarm} alt="알림" onClick={onModal_t} />
            <Profileimg src={profileImage} onClick={onModal} alt="프로필" />
            {headerModal === true && (
              <HeaderMenu>
                <li onClick={onShiftProfile}>프로필 수정</li>
                <li onClick={onLogout}>로그아웃</li>
              </HeaderMenu>
            )}
            {alarmModal === true && <Alarm />}
          </div>
        </>
      )}
    </HeaderWrapper>
  );
};

const Profileimg = styled.img`
  border-radius: 50%;
`;

const HeaderMenu = styled.ul`
  position: absolute;
  top: 2.5rem;
  left: 6rem;
  width: 10rem;
  height: 8rem;
  display: flex;
  flex-direction: column;
  background: rgba(246, 246, 246, 0.8);
  box-shadow: 4px 4px 16px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(16px);

  border-radius: 16px;

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
  height: 7rem;
  padding: 1rem;

  .buttons {
    display: flex;
    gap: 1.2rem;
    align-items: center;

    .signup {
      padding: 0 2rem;
      width: fit-content;
      height: 4rem;
      border-radius: 3.4rem;
      color: ${(props) => props.theme.color.zeroFour};
      background-color: #ffcf52;
      font-size: 1.6rem;
      border: none;
      cursor: pointer;
    }
  }

  button {
    font-weight: 500;
  }

  ${(props) =>
    props.pathname === "/"
      ? css`
          background: ${(props) => props.theme.color.zeroFour};
        `
      : css`
          background: ${(props) => props.theme.color.zeroOne};
        `}
  .icons {
    position: relative;
    display: flex;
    gap: 1.8rem;
    align-items: center;

    img {
      cursor: pointer;
      width: 3.5rem;
      height: 3.5rem;
    }
  }
  .logo {
    cursor: pointer;
    width: 12rem;
  }
`;

export default Header;
