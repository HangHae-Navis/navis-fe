import React from "react";
import { ThemeProvider } from "styled-components";
import Router from "./shared/Router";
import { theme } from "./utils/style/theme";
import GlobalStyle from "./utils/style/GlobalStyle";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Router />
    </ThemeProvider>
  );
};

export default App;
