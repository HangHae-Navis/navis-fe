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

const Signin = ({ setIsSignIn }) => {
  const navigate = useNavigate();
  const setLoginModalState = useSetRecoilState(loginModalState);
  const { register, formState: errors, handleSubmit } = useForm();
  const [disable, setDisable] = useState(false);
  const signinMutation = useMutation(postSignIn, {
    onSuccess: ({ data }) => {
      setLoginModalState(false);
      navigate(`/${path.MAIN}`);
    },
  });
  const onLogin = async (data) => {
    const signinRequest = {
      username: data.username,
      password: data.password,
    };
    const res = await signinMutation.mutateAsync(signinRequest);
  };
  const Rediect_Url = "http://localhost:3000";
  //const Rediect_Url = "http://hanghae1teamwork.s3-website.ap-northeast-2.amazonaws.com"
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
        />
        <Input
          placeholder="비밀번호를 입력하세요."
          register={register}
          name="username"
          type="password"
          label="비밀번호"
        />
        <Button disabled={true} full={true}>
          로그인
        </Button>
        <div className="kakao" onClick={responseKakao}>
          <img src={Kakao} alt="kakao-logo" />
          카카오톡으로 로그인하기
        </div>
      </SigninForm>
      <p>
        계정이 존재하지 않나요?
        <span onClick={() => setIsSignIn(false)}>회원가입</span>
      </p>
    </SignInWrapper>
  );
};
const SignInWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;

  p {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    font-size: 1.1rem;

    span {
      cursor: pointer;
      text-decoration: underline;
      font-size: 1.1rem;
    }
  }

  .kakao {
    cursor: pointer;
    display: flex;
    gap: 1rem;
    align-items: center;
    img {
      width: 1.5rem;
      height: 1.5rem;
    }
    width: 100%;
    height: 4rem;
    background-color: #f4d501;
    font-size: 1.35rem;
    font-weight: 500;
    border-radius: 0.8rem;
    ${flexCenter}
  }
`;

const SigninForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1.2rem;
`;

export default Signin;
