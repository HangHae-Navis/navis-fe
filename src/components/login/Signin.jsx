import React from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import styled from "styled-components";
import { postSignIn } from "../../utils/api/api";
import { Input } from "../../utils/style/mixins";

const Signin = ({ setIsSignIn }) => {
  const { register, formState: errors, handleSubmit } = useForm();

  const signinMutation = useMutation(postSignIn, {
    onSuccess: ({ data }) => {
      setIsSignIn(false);
    },
  });

  const onLogin = async (data) => {
    const signinRequest = {
      username: data.username,
      password: data.password,
    };
    const res = await signinMutation.mutateAsync(signinRequest);
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
