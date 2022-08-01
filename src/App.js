import React from "react";
import { Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import Layout from "./components/Layout";
import Comments from "./pages/Comments";
import Posting from "./pages/Posting";
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
            <Route path="/comments" element={<Comments />} />
            <Route path="/posting" element={<Posting />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
