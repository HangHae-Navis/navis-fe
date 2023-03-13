import React, { useState } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";

const Signup = () => {
  const { register, handleSubmit, formState: errors } = useForm();
  const [verify, setVerify] = useState(true);

  const onRegister = (data) => {
    console.log(data);
  };

  return (
    <SignUpWrapper>
      <SignUpForm onSubmit={handleSubmit(onRegister)}>
        <input
          type="text"
          placeholder="닉네임을 입력하세요."
          {...register("nickname")}
        />
        <input
          type="text"
          placeholder="이메일 주소를 입력하세요."
          {...register("username")}
        />
        <input
          type="password"
          placeholder="비밀번호를 입력하세요."
          {...register("password")}
        />
        <input
          type="password"
          placeholder="비밀번호 확인을 입력하세요."
          {...register("passwordConfirm")}
        />
        <button disabled={verify ? false : true}>회원가입</button>
      </SignUpForm>
    </SignUpWrapper>
  );
};

const SignUpWrapper = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
`;

export default Signup;
