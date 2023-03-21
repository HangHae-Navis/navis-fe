import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Router from "./shared/Router";
import { theme } from "./utils/style/theme";
import GlobalStyle from "./utils/style/GlobalStyle";
import { pageMargin } from "./utils/style/mixins";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RootWrapper>
        <Router />
      </RootWrapper>
      <ToastContainerCustom autoClose={2000} limit={1} position="top-right" />
    </ThemeProvider>
  );
};

const ToastContainerCustom = styled(ToastContainer)`
  div {
    font-size: 1.35rem;
  }
`;

const RootWrapper = styled.section`
  padding: 0 0.8rem;
  overflow-x: hidden;
  ${pageMargin};
`;

export default App;
