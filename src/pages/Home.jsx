import { useRecoilValue } from "recoil";
import Login from "../components/modal/Login";
import { loginModalState } from "../store/atom";

const Home = () => {
  const loginState = useRecoilValue(loginModalState);
  return <div>{loginState === true && <Login />}</div>;
};

export default Home;
