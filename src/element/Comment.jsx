import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";
import styled from "styled-components";
import { deleteCommentPage, putCommentPage } from "../utils/api/api";
import profile from "../assets/ic54/profile.svg";

function Comment(props) {
  const queryclient = useQueryClient();
  const deleteComment = useMutation(deleteCommentPage, {
    onSuccess: (data) => {
      queryclient.invalidateQueries("comment");
      toast.success("댓글이 삭제되었습니다.", {
        toastId: "commentDelete",
      });
    },
  });
  const profileImage =
    props.profileImage != null ? props.profileImage : profile;

  const doDeletComment = () => {
    const res = deleteComment.mutateAsync({
      groupId: props.groupId,
      detailId: props.detailId,
      commentId: props.id,
    });
  };

  return (
    <CommentBox>
      <img src={profileImage} alt="profile" />
      <div className="comment">
        <span>{props.nickname}</span>
        <p>{props.content}</p>
      </div>
      {props.isAdmin.current === true || props.owned === true ? (
        <section onClick={doDeletComment}>X</section>
      ) : null}
    </CommentBox>
  );
}

const CommentBox = styled.li`
  display: flex;
  align-items: center;
  gap: 0.8rem;
  height: 5rem;

  span {
    font-size: 1.12rem;
  }

  p {
    font-size: 1.25rem;
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
    object-fit: cover;
    width: 3.2rem;
    height: 3.2rem;
    border-radius: 50%;
  }
`;

export default Comment;
