import React from "react";
import { Route, Routes } from "react-router-dom";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/GlobalStyle";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import Comments from "./pages/Comments";
import Posting from "./pages/Posting";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/posting" element={<Posting />} />
            <Route path="/posting/:postId" element={<Posting />} />
            <Route path="/post/detail/:url/:title" element={<Comments />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
