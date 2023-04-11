import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation } from "react-query";
import styled from "styled-components";
import Button from "../../element/Button";
import Input from "../../element/Input";
import {
  postEmailConfirm,
  getEmailVerify,
  postSignUp,
} from "../../utils/api/api";

const Signup = ({ setisSignin }) => {
  const { register, handleSubmit, formState: errors, watch } = useForm();
  const [verify, setVerify] = useState(false);
  const [emailConfirm, setEmailConfirm] = useState(false);

  const onSignup = async (data) => {
    const signupRequest = {
      nickname: data.nickname,
      username: data.username,
      password: data.password,
      key: data.verify,
    };
    const signUp = await signupMutation.mutateAsync(signupRequest);
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
      setVerify(true);
    },
    onError: ({ error }) => {
      console.log(error);
    },
  });

  const signupMutation = useMutation(postSignUp, {
    onSuccess: ({ data }) => {
      setisSignin(true);
    },
    onError: (error) => {
      alert("에러");
      console.log(error);
    },
  });

  const onEmailConfirm = async () => {
    console.log(watch());
    const res = await emailConfirmMutation.mutateAsync(watch().username);
    console.log(res);
  };

  const onVerify = async () => {
    const res = await verifyMutation.mutateAsync(watch().verify);
    console.log(res);
  };

  return (
    <SignUpWrapper>
      <SignUpForm onSubmit={handleSubmit(onSignup)}>
        <InputWrapper>
          <Input
            type="text"
            placeholder="닉네임을 입력하세요."
            label="닉네임"
            register={register}
            name="nickname"
            width={"50rem"}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            type="text"
            placeholder="이메일 주소를 입력하세요."
            label="이메일 주소"
            register={register}
            name="username"
            width={"50rem"}
          />
          <Button onClick={onEmailConfirm} width={"10rem"}>인증</Button>
        </InputWrapper>
        {emailConfirm === true && (
          <InputWrapper>
            <Input
              type="text"
              name="verify"
              register={register}
              label="인증번호"
              placeholder="인증번호를 입력하세요."
              width={"50rem"}
            />
            <Button onClick={onVerify} width={"10rem"}>확인</Button>
          </InputWrapper>
        )}
        <InputWrapper>
          <Input
            type="password"
            label="비밀번호"
            placeholder="비밀번호를 입력하세요."
            register={register}
            name="password"
            width={"50rem"}
          />
        </InputWrapper>
        <InputWrapper>
          <Input
            label="비밀번호 확인"
            type="password"
            placeholder="비밀번호 확인을 입력하세요."
            register={register}
            name="passwordConfirm"
            full={true}
            width={"50rem"}
          />
        </InputWrapper>
        <SubmitBox>
        <Button disabled={verify === false ? true : false} width={"25rem"} height={"4rem"}>
          회원가입
        </Button>
        <p>
          계정이 존재하신가요?{" "}
          <span onClick={() => setisSignin(true)}>로그인</span>
        </p>
        </SubmitBox>
      </SignUpForm>
    </SignUpWrapper>
  );
};

const SubmitBox = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 2rem;
`

const SignUpWrapper = styled.div`
  width: 50%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  @media (max-width: 750px) {
    width: 100%;
  }
`;

const SignUpForm = styled.form`
  display: flex;
  flex-direction: column;
  justify-content: center;
  height: 65vh;
  gap: 0.8rem;
  button {
    margin-top: 1rem;
  }
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
`;

const InputWrapper = styled.div`
  display: flex;
  align-items: center;
  flex-direction: row;
  justify-content: space-between;
  gap: 1rem;
  button {
    margin-top: 4.7rem;
  }
`;

export default Signup;
