import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginModalState } from "../../store/atom";
import { postSignIn } from "../../utils/api/api";
import { path } from "../../constants/path";
import Input from "../../element/Input";
import Button from "../../element/Button";
import { flexCenter } from "../../utils/style/mixins";
import Kakao from "../../assets/kakao.webp";
import { setLocalStorage } from "../../utils/infos/localStorage";
import { toast } from "react-toastify";

const Signin = ({ setisSignin }) => {
  const navigate = useNavigate();
  const setLoginModalState = useSetRecoilState(loginModalState);
  const { register, formState: errors, handleSubmit, reset } = useForm();
  const [disable, setDisable] = useState(false);
  const signinMutation = useMutation(postSignIn, {
    onSuccess: ({ data }) => {
      reset();
      setLoginModalState(false);
      navigate(`/${path.MAIN}`);
      setLocalStorage(
        "userInfo",
        JSON.stringify({
          nickname: data.data.nickname,
          username: data.data.username,
        })
      );
    },
    onError: ({ response }) => {
      if (response.data.data === "MEMBER_NOT_FOUND")
        return toast.error("로그인 혹은 비밀번호가 틀렸습니다", {
          toastId: "loginError",
        });
    },
  });
  const onLogin = async (data) => {
    const signinRequest = {
      username: data.username,
      password: data.password,
    };
    const res = await signinMutation.mutateAsync(signinRequest);
  };
  const Rediect_Url = "http://navis.kro.kr";
  const responseKakao = () => {
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${process.env.REACT_APP_REST_API_KEY}&redirect_uri=${Rediect_Url}&response_type=code`;
  };
  return (
    <SignInWrapper>
      <SigninForm onSubmit={handleSubmit(onLogin)}>
        <Input
          placeholder="이메일을 입력하세요."
          register={register}
          name="username"
          type="text"
          label="이메일 주소"
          width={"50rem"}
        />
        <Input
          placeholder="비밀번호를 입력하세요."
          register={register}
          name="password"
          type="password"
          label="비밀번호"
          width={"50rem"}
        />
        <ButtonBox>
        <div className="kakao" onClick={responseKakao}>
          <img src={Kakao} alt="kakao-logo" />
          카카오톡으로 로그인
        </div>
        <Button disabled={false}  width={"13rem"} height={"6rem"}>
          로그인
        </Button>
        </ButtonBox>
      </SigninForm>
      <p>
        계정이 존재하지 않나요?
        <span onClick={() => setisSignin(false)}>회원가입</span>
      </p>
    </SignInWrapper>
  );
};

const KaKaoButton = styled.div`
display: flex;
justify-content: center;
flex-direction: row;
align-items: center;
  width: 20rem;
  height: 6rem;
`

const ButtonBox = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  flex-direction: row;
  align-items: center;
  padding-top: 5rem;
  padding-bottom: 3rem;
  gap: 2rem;
`
const SignInWrapper = styled.div`
  width: 50%;
  @media (max-width: 750px) {
    width: 100%;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;

  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 2.1rem;
    color: #505050;
    span {
      cursor: pointer;
      font-weight: bold;
      text-decoration: underline;
      font-size: 2.2rem;
    }
  }

  .kakao {
    cursor: pointer;
    display: flex;
    gap: 1rem;
    align-items: center;
    img {
      width: 2.5rem;
      height: 2.5rem;
    }
    width: 25rem;
    height: 6rem;
    background-color: #F8E50B;
    font-size: 1.8rem;
    font-weight: bold;
    border-radius: 3.4rem;
    ${flexCenter}
  }
`;

const SigninForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3.2rem;
`;

export default Signin;
