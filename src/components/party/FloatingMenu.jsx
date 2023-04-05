import Tag from "../global/Tag";
import { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router";
import styled from "styled-components";
import { FullDateCheck } from "../../element/DateCheck";
import StarTag from "../global/StarTag";

const FloatingMenu = (props) =>{

    console.log(props)

    return(<FloatingButtonsContainer>
        <FloatingButtonsList>
        <h1 className="title">최근 열람한 게시글</h1>
        <h1 className="title">최근 게시글1</h1>
        <h1 className="title">최근 게시글2</h1>
        <h1 className="title">최근 게시글3</h1>
        <h1 className="title">최근 게시글4</h1>
        <h1 className="title">최근 게시글5</h1>
        </FloatingButtonsList>
    
    </FloatingButtonsContainer>);
}

export default FloatingMenu

const FloatingButtonsContainer = styled.div`
width: 20vw;
max-width: 22.5rem;
display: flex;
flex-direction: column;
gap: 0.3rem;
position: fixed;
top: 48rem;
left: 6vw;

  .title {
    font-weight: 500;
    font-size: 2.2rem;
    color: rgb(88, 85, 133);;
  }
`;

const FloatingButtonsList = styled.ul`
display:inline-block;
list-style: none;
position: fixed;
  position:sticky;
bottom: 10rem;
left: 10rem;
gap: 1rem;
  padding: 1rem;
  width: 25rem;
  min-height: 5rem;
  border-radius: 2rem;
  border: 0.1rem solid rgb(88, 85, 133);
    background: #ffffff;
`;

