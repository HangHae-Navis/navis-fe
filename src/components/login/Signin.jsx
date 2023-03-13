import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { Input } from "../../utils/style/mixins";

const Signin = ({ setIsSignIn }) => {
  const { register, formState: errors, watch, handleSubmit } = useForm();
  const onLogin = (data) => {
    console.log(data);
  };

  return (
    <SignInWrapper>
      <SigninForm onSubmit={handleSubmit(onLogin)}>
        <input
          type="text"
          placeholder="이메일을 입력하세요."
          {...register("email", {
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
      <button>카카오톡으로 로그인하기</button>
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

  input {
    ${Input}
  }
`;

export default Signin;
