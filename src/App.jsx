import React from "react";
import { ThemeProvider } from "styled-components";
import Header from "./components/global/Header";
import Router from "./shared/Router";
import { theme } from "./utils/style/theme";
import GlobalStyle from "./utils/style/GlobalStyle";

const App = () => {
  return (
    <ThemeProvider theme={theme}>
      <GlobalStyle />
      <Header />
      <Router />
    </ThemeProvider>
  );
};

export default App;
