import React from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import Button from "../../element/Button";

const PartyInfo = (props) => {
  const navi = useNavigate();
  return (
    <PartyInfoWrapper>
      <h1>{props?.groupName}</h1>
      <p>{props?.groupInfo}</p>
      <p>초대 코드: {props?.groupCode}</p>
      <ButtonWrapper>
        <Button onClick={() => navi(`/party/${props.groupId}/edit`)} br={false}>
          글쓰기
        </Button>
        {props.isAdmin == true ? (
          <>
            <Button br={false}>그룹미팅</Button>
            <Button
              onClick={() => navi(`/party/${props.groupId}/admin`)}
              br={false}
            >
              Admin
            </Button>
          </>
        ) : null}
      </ButtonWrapper>
    </PartyInfoWrapper>
  );
};

const PartyInfoWrapper = styled.section`
  width: 30rem;
  display: flex;
  flex-direction: column;
  position: fixed;
  top: 17rem;
  h1 {
    font-size: 2.1rem;
    margin-bottom: 2rem;
    color: ${(props) => props.theme.color.grey100};
  }

  p {
    color: ${(props) => props.theme.color.grey80};
    font-size: 1.35rem;
  }
`;

const ButtonWrapper = styled.section`
  margin-top: 5rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
`;

export default PartyInfo;

// eslint-disable-next-line no-lone-blocks
{
  /* <LeftTitleBox>
  <h1>{partyRes.data.data.data.groupName}</h1>
  <p>{partyRes.data.data.data.groupInfo}</p>
  <p>초대 코드 : {partyRes.data.data.data.groupCode}</p>
  <Button onClick={() => navi(`/party/${pam.id}/edit`)}>
    글쓰기
  </Button>
  {partyRes.data.data.data.admin === true ? (
    <Button onClick={() => navi(`/party/${pam.id}/admin`)}>
      어드민 페이지
    </Button>
  ) : (
    <Button onClick={() => doDelete(pam.id)}>그룹 탈퇴하기</Button>
  )}
  </LeftTitleBox> */
}
