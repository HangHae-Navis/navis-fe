import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";
import { useSetRecoilState } from "recoil";
import styled from "styled-components";
import { loginModalState } from "../../store/atom";
import { postSignIn } from "../../utils/api/api";
import { path } from "../../constants/path";

const Signin = ({ setIsSignIn }) => {
  const navigate = useNavigate();
  const setLoginModalState = useSetRecoilState(loginModalState);
  const { register, formState: errors, handleSubmit } = useForm();
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
        <input
          type="text"
          placeholder="이메일을 입력하세요."
          {...register("username", {
            required: "이메일을 입력해주세요.",
          })}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          {...register("password", {
            required: "비밀번호를 입력해주세요.",
          })}
        />
        <button>로그인</button>
      </SigninForm>
      <button onClick={responseKakao}>카카오톡으로 로그인하기</button>
      <p onClick={() => setIsSignIn(false)}>회원가입</p>
    </SignInWrapper>
  );
};
const SignInWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SigninForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Signin;
