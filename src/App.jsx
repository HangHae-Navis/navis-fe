import React from "react";
import styled, { ThemeProvider } from "styled-components";
import Router from "./shared/Router";
import { theme } from "./utils/style/theme";
import GlobalStyle from "./utils/style/GlobalStyle";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <RootWrapper>
        <Router />
      </RootWrapper>
    </ThemeProvider>
  );
};

const RootWrapper = styled.section`
  padding: 0 0.8rem;
`;

export default App;
