import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import Login from "../components/modal/Login";
import Input from "../element/Input";
import { loginModalState } from "../store/atom";
import { getLocalStorage } from "../utils/infos/localStorage";
import { path } from "../constants/path";

const Home = () => {
  const navigate = useNavigate();
  useEffect(() => {
    if (getLocalStorage("userInfo") !== null) {
      navigate(`/${path.MAIN}`);
    }
  }, []);
  const loginState = useRecoilValue(loginModalState);
  return (
    <div>
      {loginState === true && <Login />}
      <Input />
    </div>
  );
};

export default Home;
