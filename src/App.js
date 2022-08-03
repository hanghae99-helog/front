import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import { GlobalStyle } from "./styles/GlobalStyle";
import { ThemeProvider } from "styled-components";
import { theme } from "./styles/GlobalStyle";

import Home from "./pages/Home";
import Layout from "./components/Layout";
import Comments from "./pages/Comments";
import Posting from "./pages/Posting";
import NotFound from "./pages/NotFound";
import { postAuth } from "./shared/axiosConfig";

function App() {

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/post/detail/:url" element={<Comments />} />
            <Route path="/posting" element={<Posting />} />
            <Route path="/posting/:postId" element={<Posting />}/>
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
