import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import styled from "styled-components";
import {
  postEmailConfirm,
  getEmailVerify,
  postSignUp,
} from "../../utils/api/api";

const Signup = ({ setIsSignIn }) => {
  const { register, handleSubmit, formState: errors, watch } = useForm();
  const [verify, setVerify] = useState(true);
  const [emailConfirm, setEmailConfirm] = useState(false);
  const [verifyState, setVerifyState] = useState("");

  const onSignup = async (data) => {
    const signupRequest = {
      nickname: data.nickname,
      username: data.username,
      password: data.password,
    };
    const signUp = await signupMutation.mutateAsync(signupRequest);
    console.log(signUp);
  };

  const onVerifyChange = (e) => {
    setVerifyState(e.target.value);
  };

  const emailConfirmMutation = useMutation(postEmailConfirm, {
    onSuccess: ({ data }) => {
      setEmailConfirm(true);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const verifyMutation = useMutation(getEmailVerify, {
    onSuccess: ({ data }) => {
      console.log(data);
    },
    onError: (error) => {
      console.log(error);
    },
  });

  const signupMutation = useMutation(postSignUp, {
    onSuccess: ({ data }) => {
      setIsSignIn(true);
    },
    onError: (error) => {
      alert("에러");
      console.log(error);
    },
  });

  const onEmailConfirm = async () => {
    const res = await emailConfirmMutation.mutateAsync(watch().username);
    console.log(res);
  };

  const onVerify = async () => {
    const res = await verifyMutation.mutateAsync(verifyState);
    console.log(res);
  };

  return (
    <SignUpWrapper>
      <SignUpForm onSubmit={handleSubmit(onSignup)}>
        <InputWrapper>
          <input
            type="text"
            placeholder="닉네임을 입력하세요."
            {...register("nickname")}
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="text"
            placeholder="이메일 주소를 입력하세요."
            {...register("username")}
          />
          <div onClick={onEmailConfirm}>인증</div>
        </InputWrapper>
        {emailConfirm === true && (
          <InputWrapper>
            <input
              type="text"
              value={verifyState}
              onChange={onVerifyChange}
              placeholder="인증번호를 입력하세요."
            />
            <div onClick={onVerify}>확인</div>
          </InputWrapper>
        )}
        <InputWrapper>
          <input
            type="password"
            placeholder="비밀번호를 입력하세요."
            {...register("password")}
          />
        </InputWrapper>
        <InputWrapper>
          <input
            type="password"
            placeholder="비밀번호 확인을 입력하세요."
            {...register("passwordConfirm")}
          />
        </InputWrapper>
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
  gap: 0.8rem;
`;

const InputWrapper = styled.div`
  display: flex;
  gap: 1rem;
  align-items: center;
`;

export default Signup;
