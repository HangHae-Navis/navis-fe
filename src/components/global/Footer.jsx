import React from "react";
import { useLocation } from "react-router-dom";
import styled, { css } from "styled-components";
import WhiteLogo from "../../assets/whiteLogo.svg";
import Logo from "../../assets/logo.svg";

const Footer = () => {
  const { pathname } = useLocation();
  console.log(pathname);
  return (
    <FooterWrapper pathname={pathname}>
      {pathname === "/" ? (
        <img src={WhiteLogo} alt="" />
      ) : (
        <img src={Logo} alt="" />
      )}

      <span>Copyright © 2023 NAVIS. All Rights Reserved.</span>
    </FooterWrapper>
  );
};

const FooterWrapper = styled.section`
  position: fixed;
  display: flex;
  justify-content: space-around;
  bottom: 0;
  width: 100vw;
  height: 8rem;

  ${(props) =>
    props.pathname === "/"
      ? css`
          background: ${(props) => props.theme.color.zeroFour};
        `
      : css`
          background: ${(props) => props.theme.color.zeroOne};
        `}
  align-items: center;

  img {
    width: 9rem;
  }

  span {
    font-weight: 200;
    color: ${(props) => props.theme.color.zeroTwo};
    font-size: 1.35rem;
    ${(props) =>
      props.pathname !== "/" &&
      css`
        color: #a0a0a0;
      `}
  }
`;

export default Footer;
