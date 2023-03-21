import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Login from "../components/modal/Login";
import { loginModalState } from "../store/atom";
import { path } from "../constants/path";
import { getCookie } from "../utils/infos/cookie";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    const isUserCookie = getCookie("token");
    if (isUserCookie !== undefined) {
      navigate(`/${path.MAIN}`);
    }
  }, []);
  const loginState = useRecoilValue(loginModalState);
  return <div>{loginState === true && <Login />}</div>;
};

export default Home;
