import Tag from "../global/Tag";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { FullDateCheck } from "../../element/DateCheck";
import StarTag from "../global/StarTag";

const FloatingMenu = (props) => {
  console.log(props);
  const navi = useNavigate();

  return (
    <FloatingButtonsContainer>
      <FloatingButtonsList>
        <h1 className="title">최근 열람한 게시글</h1>
        {props?.props?.map((item) => (
          <h1
            onClick={() =>
              navi(
                `/party/detail?groupId=${props.groupId}&detailId=${item.id}&dtype=${item.dtype}&groupName=${props.groupName}&groupInfo=${props.groupInfo}&groupCode=${props.groupCode}`
              )
            }
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
  position: sticky;
  bottom: 10rem;
  left: 7rem;
  gap: 1rem;
  padding: 1rem;
  width: 20rem;
  min-height: 5rem;
  border-radius: 2rem;
  border: 0.1rem solid rgb(88, 85, 133);
  background: #ffffff;
`;
