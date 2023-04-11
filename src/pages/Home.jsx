import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import Login from "../components/modal/Login";
import { loginModalState } from "../store/atom";
import { getCookie } from "../utils/infos/cookie";
import styled from "styled-components";
import Logo from "../assets/whiteLogo.svg";
import Polygon from "../assets/Polygon 2.svg";
import first from "../assets/1.svg";
import second from "../assets/2.svg";
import thired from "../assets/3.svg";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      navigate("/main");
    }
  }, []);
  const loginState = useRecoilValue(loginModalState);
  return (
    <LandingWrapper>
      {loginState === true && <Login />}
      <FirstInfo>
        <img src={Logo} alt="" />
        <span>스터디에 필요한 모든 기능을 한 곳에서!</span>
        <div className="ps">
          <p>관리에 필요한 불필요한 시간 낭비를 줄이고,</p>
          <p>효율적인 학습을 도와주는 플랫폼 NAVIS</p>
          <p>지금 바로 가입하고 더 나은 스터디 경험을 즐겨보세요!</p>
        </div>
        <div className="polygons">
          <img src={Polygon} alt="" />
          <img src={Polygon} alt="" />
          <img src={Polygon} alt="" />
        </div>
      </FirstInfo>
      <EtcInfo>
        <p className="primary">
          미팅과 채팅, 그룹 관리를 한 곳에서 진행하고 싶어요
        </p>
        <p>스터디에 필요한 관리, 과제, 채팅 등을 한꺼번에</p>
        <img src={first} alt="" />
      </EtcInfo>
      <EtcInfo>
        <p className="primary">
          게시글을 작성하는데에 시간을 최소화 하고 싶어요
        </p>
        <p>스터디에 필요한 관리, 과제, 채팅 등을 한꺼번에</p>
        <img src={second} alt="" />
      </EtcInfo>
      <EtcInfo>
        <p className="primary">
          필요한 기능들은 다 있지만, 무겁지 않았으면 좋겠어요
        </p>
        <p>투표, 설문조사, 과제 제출 등 편리한 기능들도 손쉽게 사용하세요</p>
        <img src={thired} alt="" />
      </EtcInfo>
    </LandingWrapper>
  );
};

const LandingWrapper = styled.main`
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${(props) => props.theme.color.zeroFour};
  padding: 18rem 0;
  display: flex;
  flex-direction: column;
  gap: 20rem;

  .primary {
    text-align: center;
    font-weight: 600;
    font-size: 3.5rem;
    padding: 0.2rem 0;
    text-decoration: underline;
    text-underline-position: under;
    color: #ffcf52;
  }
`;

const FirstInfo = styled.section`
  width: 100%;
  align-items: center;
  display: flex;
  flex-direction: column;
  gap: 3rem;

  img {
    width: 25rem;
    @media (max-width: 900px) {
      width: 30vw;
    }
    margin-bottom: 3rem;
  }

  span {
    @media (max-width: 900px) {
      font-size: 4vw;
    }
    color: #ffffff;
    font-size: 4.8rem;
  }

  .ps {
    display: flex;
    flex-direction: column;
    color: ${(props) => props.theme.color.zeroTwo};
    text-align: center;

    p {
      @media (max-width: 900px) {
        font-size: 3.4vw;
        line-height: 5rem;
      }
      font-weight: 150;
      line-height: 7.4rem;
      font-size: 2.4rem;
    }
  }

  .polygons {
    display: flex;
    flex-direction: column;
    margin-top: 8rem;
    img {
      width: 1.8rem;
      height: 1.8rem;
    }
  }
`;

const EtcInfo = styled.section`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: 5rem;
  align-items: center;

  p {
    font-weight: 200;
    font-size: 2.8rem;
    color: #ffffff;
  }

  img {
    max-width: 120rem;
    width: 90%;
  }
`;

export default Home;
