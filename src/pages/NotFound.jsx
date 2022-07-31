import React from "react";
import styled from "styled-components";

const NotFound = () => {
  return (
    <>
      <StyledNotFount>404!!</StyledNotFount>
    </>
  );
};

export default NotFound;

const StyledNotFount = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  font-size: 5rem;
  color: #9acd32;
`;
