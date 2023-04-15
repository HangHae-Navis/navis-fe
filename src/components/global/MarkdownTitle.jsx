import React from "react";
import styled from "styled-components";
import Star from "../../assets/ic20/star.svg";
import impo from "../../assets/ic20/importance.svg";
import vote from "../../assets/ic20/vote.svg";
import task from "../../assets/ic20/task.svg";
import Tag from "./Tag";
import StarTag from "./StarTag";
import Button from "../../element/Button";
import { useMutation, useQueryClient } from "react-query";
import { deleteBoardDetailPage } from "../../utils/api/api";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const MarkdownTitle = ({ postInfo, dtype, author, role, authorRole, groupId, detailId }) => {
  const date = new Date(postInfo.createAt);
  const queryClient = useQueryClient()
  const navi = useNavigate()

  const deleteHomework = useMutation(deleteBoardDetailPage, {
    onSuccess: ({ data }) => {
      toast.success("게시글을 삭제했습니다.");
      queryClient.invalidateQueries();
      navi(`/party/${groupId}`)
    },
  });

  const onclick = () =>{
    const keepGoing = window.confirm("정말 이 게시글을 삭제하시겠습니까?")
    if(keepGoing == true){
    const res = deleteHomework.mutateAsync({ groupId, dtype, detailId });
    }
  }

  return (
    <TitleRenderContent>
      <TitleTopWrapper>
        <Tag dtype={dtype} />
        <StarTag important={postInfo?.important} />
      </TitleTopWrapper>
      <TitleMidWrapper>
        <h1>{postInfo?.title}</h1>
        <HashTagWrapper>
          {postInfo?.hashtagList?.map((tag, i) => (
            <li key={i}>#{tag}</li>
          ))}
        </HashTagWrapper>
      </TitleMidWrapper>
      <BottomBox>
      <TitleBottomWrapper>
        <p>{postInfo?.subtitle}</p>
        <span>
          {postInfo?.nickname} | {`${date.toLocaleDateString()}`}
        </span>
      </TitleBottomWrapper>
      
      {role == "ADMIN"
      ?<ButtonBox>
      <Button onClick={() => onclick()}>삭제하기</Button>
      <Button onClick={() => navi(`/party/${groupId}`)}>목록으로</Button>
      </ButtonBox>
      :role == "SUPPORT"
        ?authorRole == "USER"
            ?<ButtonBox>
            <Button onClick={() => onclick()}>삭제하기</Button>
            <Button onClick={() => navi(`/party/${groupId}`)}>목록으로</Button>
            </ButtonBox>
            :author === true
                ?<ButtonBox>
                <Button onClick={() => onclick()}>삭제하기</Button>
                <Button onClick={() =>navi(`/party/${groupId}`)}>목록으로</Button>
                </ButtonBox>
                :<Button onClick={() => navi(`/party/${groupId}`)}>목록으로</Button>
        :author === true
            ?<ButtonBox>
            <Button onClick={() => onclick()}>삭제하기</Button>
            <Button onClick={() => navi(`/party/${groupId}`)}>목록으로</Button>
            </ButtonBox>
            :<ButtonBox>
            <Button onClick={() => navi(`/party/${groupId}`)}>목록으로</Button>
            </ButtonBox>
      }
      </BottomBox>
    </TitleRenderContent>
  );
};

const ButtonBox = styled.div`
display : flex;
align-items: center;
  justify-content: space-between;
  flex-direction: row;
  gap : 1rem;
`

const BottomBox = styled.div`
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: space-between;
  flex-direction: row;
`

const TitleTopWrapper = styled.section`
  display: flex;
  gap: 0.8rem;
`;

const TitleBottomWrapper = styled.section`
  display: flex;
  gap: 1rem;
  align-items: center;

  p {
    color: #878787;
    font-size: 1.3rem;
  }
  span {
    font-size: 1.2rem;
    color: ${(props) => props.theme.color.grey40};
  }
`;

const TitleMidWrapper = styled.section`
  display: flex;
  gap: 0.8rem;
  align-items: center;
`;

const HashTagWrapper = styled.ul`
  display: flex;
  align-items: center;
  gap: 0.8rem;

  li {
    font-size: 1.1rem;
    color: ${(props) => props.theme.color.zeroThree};
  }
`;

const TitleRenderContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding-bottom: 2.3rem;
  h1 {
    max-width: 80%;
    width: fit-content;
    font-size: 2.1rem;
    line-height: 1.45;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  border-bottom: 1px solid hsla(0, 0%, 50%, 0.33);
`;

export default MarkdownTitle;
