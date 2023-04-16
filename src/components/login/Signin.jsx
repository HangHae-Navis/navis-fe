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
  const {
    register,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm();
  console.log(errors);
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
          profileImage: data.data.profileImage,
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
          width={"47rem"}
          error={errors?.username?.message}
        />
        <Input
          placeholder="비밀번호를 입력하세요."
          register={register}
          name="password"
          type="password"
          label="비밀번호"
          width={"47rem"}
          error={errors?.password?.message}
        />
        <ButtonBox>
          <Button
            disabled={false}
            className={"buttontext"}
            font={"2.3rem"}
            width={"47rem"}
            height={"4.7rem"}
          >
            로그인
          </Button>
          <div className="kakao" onClick={responseKakao}>
            <img src={Kakao} alt="kakao-logo" />
            카카오톡으로 로그인
          </div>
        </ButtonBox>
      </SigninForm>
      <p>
        계정이 존재하지 않나요?
        <span onClick={() => setisSignin(false)}>회원가입</span>
      </p>
    </SignInWrapper>
  );
};

const ButtonBox = styled.div`
  width: 100%;
  height: 15vh;
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding-bottom: 3rem;
  gap: 2rem;

  font-size: 2rem;
  @media (max-height: 750px) {
    padding-top: 1rem;
    padding-bottom: 1rem;
  }
  @media (max-height: 850px) {
    padding-top: 3rem;
    padding-bottom: 2rem;
  }
`;
const SignInWrapper = styled.div`
  height: 40vh;
  width: 50%;
  @media (max-width: 750px) {
    width: 100%;
  }
  @media (max-height: 750px) {
    height: 60vh;
  }
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 0.6rem;

  input {
    @media (max-width: 550px) {
      width: 40rem;
    }
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

  .kakao {
    cursor: pointer;
    display: flex;
    gap: 1rem;
    align-items: center;
    img {
      width: 2.5rem;
      height: 2.5rem;
    }
    width: 47rem;
    height: 4.7rem;
    background-color: #f8e50b;
    font-size: 2rem;
    font-weight: bold;
    border-radius: 3.4rem;
    ${flexCenter}
  }
`;

const SigninForm = styled.form`
  height: 40vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 3.2rem;
  @media (max-height: 750px) {
    gap: 1rem;
  }
`;

export default Signin;
