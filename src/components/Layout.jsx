import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Headers from "./Header";
import styled from "styled-components";
import { LoginModal, ModalBackground } from "./Modal";
import { createPortal } from "react-dom";

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  return (
    <>
      <StyledHome>
        <Headers setIsModalOpen={setIsModalOpen} />
        {isModalOpen && (
          <React.Fragment>
            {createPortal(
              <ModalBackground />,
              document.getElementById("login__modal__background")
            )}
            {createPortal(
              <LoginModal setIsModalOpen={setIsModalOpen} />,
              document.getElementById("login__modal")
            )}
          </React.Fragment>
        )}
        <Outlet />
      </StyledHome>
    </>
  );
};

export default Layout;

const StyledHome = styled.div`
  padding: 5rem;
`;
