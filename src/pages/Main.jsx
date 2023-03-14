import React from "react";
import { useForm } from "react-hook-form";
import Button from "../element/Button";
import Input from "../element/Input";
const Main = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onTest = (data) => {
    console.log(errors);
    console.log(data, " 안녕");
  };

  return (
    <form onSubmit={handleSubmit(onTest)}>
      <Input
        register={register}
        name={"username"}
        placeholder={"이메일을 입력하세요."}
        error={errors?.username?.message}
        type="text"
        label="이메일 주소"
      />
      <Button>제출</Button>
    </form>
  );
};

export default Main;
