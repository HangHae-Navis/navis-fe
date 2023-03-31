import React from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import styled from "styled-components";
import { postChat } from "../../utils/api/api";
import Button from "../../element/Button";
import { InputStyle } from "../../utils/style/mixins";
import { toast } from "react-toastify";

const ChatFormAdd = () => {
  const { register, handleSubmit, reset } = useForm();
  const queryClient = useQueryClient();
  const makeChatRoomMutate = useMutation((to) => postChat(to), {
    onSuccess: () => {
      toast.success("채팅방이 생성되었습니다.");
      queryClient.invalidateQueries("chats");
    },
    onError: () => {
      toast.error("유저를 찾을 수 없습니다.");
      reset();
    },
  });
  const onMakeChatRoom = async (data) => {
    const to = {
      to: data.email,
    };
    const res = makeChatRoomMutate.mutateAsync(to);
  };
  return (
    <ChatFormAddLayout onSubmit={handleSubmit(onMakeChatRoom)}>
      <input {...register("email")} placeholder="이메일" />
      <Button>추가</Button>
    </ChatFormAddLayout>
  );
};

const ChatFormAddLayout = styled.form`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-around;
  padding: 1rem 0.8rem;
  input {
    width: 75% !important;
    ${InputStyle}
    height: 3rem;
    padding-left: 1rem;
  }
  button {
    font-size: 1.2rem;
    height: 3rem;
    width: fit-content;
    padding: 0 1rem;
  }
`;

export default ChatFormAdd;
