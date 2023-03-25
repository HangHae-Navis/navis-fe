import { useState } from "react";
import { useForm } from "react-hook-form";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { deleteCommentPage, putCommentPage } from "../utils/api/api";
import Button from "./Button";
import Input from "./Input";
import profile from "../assets/ic54/profile.svg";

function Comment(props) {
  const [isPut, setIsPut] = useState(false);
  const queryclient = useQueryClient();
  const { register, formState: errors, handleSubmit } = useForm();
  const deleteComment = useMutation(deleteCommentPage, {
    onSuccess: (data) => {
      queryclient.invalidateQueries("comment");
      toast.success("댓글이 삭제되었습니다.", {
        toastId: "commentDelete",
      });
    },
  });

  const putComment = useMutation(putCommentPage, {
    onSuccess: (data) => {
      queryclient.invalidateQueries("comment");
      toast.success("댓글이 수정되었습니다.", {
        toastId: "commentDelete",
      });
    },
  });

  const onPut = async (data) => {
    const payload = {
      groupId: props.groupId,
      detailId: props.detailId,
      commentId: props.id,
      value: data,
    };
    const res = await putComment.mutateAsync(payload);
  };

  const doDeletComment = () => {
    const res = deleteComment.mutateAsync({
      groupId: props.groupId,
      detailId: props.detailId,
      commentId: props.id,
    });
  };
  const doPutComment = () => {
    //const res = putComment.mutateAsync({groupId: props.groupId, detailId: props.detailId, commentId: props.id, value : })
  };

  return (
    <CommentBox>
      <img src={profile} alt="profile" />
      <div className="comment">
        <span>{props.nickname}</span>
        <p>{props.content}</p>
      </div>
      {/* {props.isAdmin === true ? (
        <Button onClick={() => setIsPut(!isPut)}>수정하기</Button>
      ) : null} */}
      {props.isAdmin === true || props.owned == true ? (
        <section onClick={doDeletComment}>X</section>
      ) : null}
      {isPut === false ? null : (
        <form onSubmit={handleSubmit(onPut)}>
          <Input
            placeholder="댓글을 수정하시오."
            register={register}
            name="content"
            type="text"
            label="댓글수정"
          />
          <Button>수정 완료</Button>
        </form>
      )}
    </CommentBox>
  );
}

const CommentBox = styled.li`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  height: 5rem;

  span {
    font-size: 1.1rem;
  }

  p {
    font-size: 1rem;
  }
  .center {
    display: flex;
    flex-direction: column;
    gap: 0.8rem;
  }

  .comment {
    width: 100%;
    display: flex;
    flex-direction: column;
    gap: 0.6rem;
  }

  .form {
    width: 100%;
    button {
      cursor: pointer;
      width: 5rem;
      height: 5rem;
      border-radius: 1.6rem;
      border: none;
      color: ${(props) => props.theme.color.zeroOne};
      background-color: ${(props) => props.theme.color.zeroThree};
      margin-left: 0.8rem;
      font-size: 1.2rem;
    }
    .inputLayout {
      display: flex;
      align-items: center;
      textarea {
        width: 80%;
        border-radius: 0.4rem;
        border: none;
        font-size: 1.1rem;
        padding: 0.8rem;
        resize: none;
        &:focus {
          outline: none;
        }
      }
    }
  }

  img {
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
  }
`;

export default Comment;
