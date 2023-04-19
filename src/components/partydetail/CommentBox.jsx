import "react-loading-skeleton/dist/skeleton.css";
import React, { useState } from "react";
import conver from "../../assets/ic24/conversation.svg";
import profile from "../../assets/ic54/profile.svg";
import { getLocalStorage } from "../../utils/infos/localStorage";
import styled from "styled-components";
import { getCookie } from "../../utils/infos/cookie";
import Comment from "../../element/Comment";
export const CommentBox = (props) =>{
    
    const [comment, setComment] = useState("");
    const myUserName = JSON.parse(getLocalStorage("userInfo")).nickname;
    const token = getCookie("token");
    const storedData = JSON.parse(localStorage.getItem("userInfo"));
    const profileImage =
      token != null
        ? storedData.profileImage == null ? profile : storedData.profileImage
        : profile;
  
    const PostComment = () =>{
        props.onPost(comment)
        setComment("")
    }

    return(
        <DetailCommentcontainer>
        <DetailCommentTopWrapper>
          <span>댓글 {props.getComment?.data?.data?.data?.content.length}</span>
          <img src={conver} alt="댓글" />
        </DetailCommentTopWrapper>
        <DetailCommentsWrapper />
        <DetailCommentMapWrapper>
          {props.commentList?.map((comment) => (
            <Comment key={comment.id}
              id={comment.id}
              profileImage={comment.profileImage}
              groupId={props.groupId}
              detailId={props.detailId}
              content={comment.content}
              nickname={comment.nickname}
              createAt={comment.createAt}
              isAdmin={props.isAdmin}
              owned={comment.owned}/>))}
        </DetailCommentMapWrapper>
        <DetailCommentInputWrapper>
          <img src={profileImage} alt="프로필" />
          <form className="form" onSubmit={(e) => {e.preventDefault(); PostComment();}}>
            <section className="center">
              <span>{myUserName}</span>
              <div className="inputLayout">
                <textarea cols="49" rows="2" maxLength="98" placeholder="댓글을 입력해주세요." value={comment} onChange={(e) => setComment(e.target.value)}/>
                <button>등록</button>
              </div>
            </section>
          </form>
        </DetailCommentInputWrapper>
      </DetailCommentcontainer>)
}

const DetailCommentsWrapper = styled.section`
display: flex;
flex-direction: column;
gap: 0.2rem;
justify-content: center;

img {
  width: 3.2rem;
  height: 3.2rem;
  border-radius: 50%;
}
`;

const DetailCommentMapWrapper = styled.ul`
display: flex;
flex-direction: column;
gap: 0.8rem;
`;

const DetailCommentInputWrapper = styled.section`
display: flex;
gap: 1rem;

.center {
  display: flex;
  flex-direction: column;
  gap: 0.8rem;
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

const DetailCommentTopWrapper = styled.section`
display: flex;
gap: 0.5rem;
align-items: center;
color: ${(props) => props.theme.color.zeroFour};
span {
  font-size: 1.3rem;
}
img {
  width: 1.8rem;
}
`;

const DetailCommentcontainer = styled.div`
display: flex;
flex-direction: column;
gap: 1rem;
max-width: 128rem;
width: 60vw;
background-color: ${(props) => props.theme.color.zeroOne};
padding: 3.2rem;
margin-left: 5rem;
border-radius: 0.8rem;
`;