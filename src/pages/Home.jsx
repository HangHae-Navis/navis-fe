import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import Login from "../components/modal/Login";
import { loginModalState } from "../store/atom";
import { getCookie } from "../utils/infos/cookie";
import styled from "styled-components";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      navigate("/main");
    }
  }, []);
  const loginState = useRecoilValue(loginModalState);
  return <LandingWrapper>{loginState === true && <Login />}</LandingWrapper>;
};

const LandingWrapper = styled.main`
  position: relative;
  min-width: 100vw;
  min-height: 100vh;
  background-color: ${(props) => props.theme.color.zeroFour};
`;

export default Home;
