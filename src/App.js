import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/GlobalStyle";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
