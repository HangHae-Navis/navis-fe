import React from "react";
import { useForm } from "react-hook-form";
import Button from "../element/Button";
import Input from "../element/Input";
const Main = () => {
  const { register, watch, handleSubmit, formState: errors } = useForm();
  console.log(watch());
  return (
    <div>
      <Input
        register={register}
        name={"username"}
        placeholder={"이메일을 입력하세요."}
        error={errors?.username?.message}
        type="text"
      />
      <Button>제출</Button>
    </div>
  );
};

export default Main;
