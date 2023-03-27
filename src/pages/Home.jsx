import { useEffect } from "react";
import { useNavigate } from "react-router";
import { useRecoilValue } from "recoil";
import Login from "../components/modal/Login";
import { loginModalState } from "../store/atom";
import { getCookie } from "../utils/infos/cookie";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const token = getCookie("token");
    if (token) {
      navigate("/main");
    }
  }, []);
  const loginState = useRecoilValue(loginModalState);
  return <div>{loginState === true && <Login />}</div>;
};

export default Home;
