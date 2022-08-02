import React, { useState } from "react";
import { Outlet } from "react-router-dom";
import Headers from "./Header";
import styled from "styled-components";
import { LoginModal, ModalBackground } from "./Modal";
import { createPortal } from "react-dom";

const Layout = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isToggle, setIsToggle] = useState(false);

  // 헤더 토클이 열려있을 때 외부 영역 클릭 시 닫히기
  const handleCloseToggle = () => {
    if (isToggle === true) setIsToggle(false);
  };
  return (
    <>
      <StyledHome onClick={handleCloseToggle}>
        <Headers
          setIsModalOpen={setIsModalOpen}
          isToggle={isToggle}
          setIsToggle={setIsToggle}
        />
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
  padding: 4rem 12.5rem;
  @media screen and (max-width: 1080px) {
    padding: 4rem 5rem;
  }
  @media screen and (max-width: 930px) {
    padding: 4rem 2rem;
  }
`;
