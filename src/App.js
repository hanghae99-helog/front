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
  // 메인 페이지 useQuery 핸들러
  const handlePostsList = async () => {
    const res = await postAuth.mainLoading(1);
    console.log("CB 안 ::: ", res);
    return res;
  };

  // 최초 게시물 한 번 불러오기
  useQuery(["posts_list"], handlePostsList, {
    onSuccess(data) {
      console.log(data);
    },
    onError(data) {
      alert("");
    },
    refetchOnWindowFocus: false,
  });

  return (
    <>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route index element={<Home />} />
            <Route path="/comments" element={<Comments />} />
            <Route path="/posting" element={<Posting />} />
            <Route path="/*" element={<NotFound />} />
          </Route>
        </Routes>
      </ThemeProvider>
    </>
  );
}

export default App;
