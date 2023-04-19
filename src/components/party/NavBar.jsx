import React from "react";
import styled from "styled-components";

const NavBar = ({ activeState, setActiveState, setState }) => {
  const onChangeNavi = (e) => {
    setActiveState(e.target.innerText);
    switch(e.target.innerText){
      case '전체그룹':
        setState.current = 'all'
      break;
      case '나의그룹':
        setState.current = 'myOwn'
      break;
      case '참여그룹':
        setState.current = 'joined'
      break;
      default:;
    }
  };
  return (
    <NavList>
      <li
        className={activeState === "전체그룹" ? "active" : "inActive"}
        onClick={onChangeNavi}
      >
        전체그룹
      </li>
      <li
        className={activeState === "나의그룹" ? "active" : "inActive"}
        onClick={onChangeNavi}
      >
        나의그룹
      </li>
      <li
        className={activeState === "참여그룹" ? "active" : "inActive"}
        onClick={onChangeNavi}
      >
        참여그룹
      </li>
    </NavList>
  );
};

const NavList = styled.ul`
  display: flex;
  gap: 1.6rem;

  li {
    cursor: pointer;
    font-size: 2.5rem;
    font-weight: 500;
  }

  .active {
    color: ${(props) => props.theme.color.zeroFour};
  }

  .inActive {
    color: ${(props) => props.theme.color.zeroThree};
  }
`;

export default React.memo(NavBar);
