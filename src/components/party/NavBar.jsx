import React from "react";
import styled from "styled-components";

const NavBar = ({ activeState, setActiveState }) => {
  return (
    <NavList>
      <li className="active">전체그룹</li>
      <li className="inActive">나의그룹</li>
      <li className="inActive">참여그룹</li>
    </NavList>
  );
};

const NavList = styled.ul`
  display: flex;
  gap: 1.6rem;

  li {
    font-size: 3.1rem;
    font-weight: 500;
  }

  .active {
    color: #121619;
  }

  .inActive {
    color: #a2a9b0;
  }
`;

export default React.memo(NavBar);
