import React from "react";
import styled from "styled-components";

const NavBar = () => {
  return (
    <NavList>
      <li>전체그룹</li>
      <li>나의그룹</li>
      <li>참여그룹</li>
    </NavList>
  );
};

const NavList = styled.ul`
  display: flex;
  gap: 1rem;

  li {
    font-size: 2.4rem;
  }
`;

export default NavBar;
