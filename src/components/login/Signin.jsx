import React from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Signin = () => {
  const { register, formState: errors, watch, handleSubmit } = useForm();
  const onLogin = (data) => {
    console.log(data);
  };

  return (
    <SignInWrapper onSubmit={handleSubmit(onLogin)}>
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
    </SignInWrapper>
  );
};

const SignInWrapper = styled.form`
  width: 60rem;
  height: 50rem;
  background-color: white;
`;

export default Signin;
