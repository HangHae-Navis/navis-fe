import Tag from "../global/Tag";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { FullDateCheck } from "../../element/DateCheck";
import StarTag from "../global/StarTag";
import { useQueryClient } from "react-query";

const FloatingMenu = (props) => {
  const navi = useNavigate();
  const queryClient = useQueryClient();

  const naviToRecent = (data) =>{
    queryClient.removeQueries("partyDetail")
    console.log(data)
    navi(
      `/party/detail?groupId=${props.groupId}&detailId=${data.id}&dtype=${data.dtype}&groupName=${props.groupName}&groupInfo=${props.groupInfo}&groupCode=${props.groupCode}`
    )
    window.location.reload();
  }

  return (
    <FloatingButtonsContainer>
      <FloatingButtonsList>
        <h1 className="title">최근 열람한 게시글</h1>
        {props?.props?.map((item) => (
          <h1
            onClick={() => naviToRecent(item)}
            key={item.id}
            className="subtitle"
          >
            {item.title}
          </h1>
        ))}
      </FloatingButtonsList>
    </FloatingButtonsContainer>
  );
};

export default FloatingMenu;

const FloatingButtonsContainer = styled.div`
  width: 100%;
  max-width: 22.5rem;
  display: flex;
  flex-direction: column;
  gap: 1.3rem;
  position: fixed;
  top: 48rem;
  left: 6vw;

  .title {
    font-weight: 600;
    font-size: 2.2rem;
    color: rgb(88, 85, 133);
  }
  .subtitle {
    cursor: pointer;
    font-weight: 400;
    font-size: 1.8rem;
    color: #9795b5;
  }
`;

const FloatingButtonsList = styled.ul`
  display: inline-block;
  list-style: none;
  position: fixed;
  top: 47rem;
  width: 20vw;
  max-width: 20rem;
  left: 6vw;
  gap: 1rem;
  padding: 1rem;
  min-height: 5rem;
  border-radius: 2rem;
  border: 0.1rem solid rgb(88, 85, 133);
  background: #ffffff;
`;
