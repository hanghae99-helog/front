import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "./Header";
import styled from "styled-components";

const Layout = () => {
  return (
    <>
      <StyledHome>
        <Headers />
        <Outlet />
      </StyledHome>
    </>
  );
};

export default Layout;

const StyledHome = styled.div`
  padding: 5rem;
`;
