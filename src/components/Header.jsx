import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsSearch } from "react-icons/bs";
import styled from "styled-components";

const Header = () => {
  let timer = null;
  const [scrollY, setScrollY] = useState(0);
  const [scrollUpDown, setScrollUpDown] = useState(true);

  const handleScroll = useCallback(() => {
    if (!timer) {
      timer = setTimeout(() => {
        const { scrollY } = window;
        setScrollY((prevScrollY) => {
          if (prevScrollY > scrollY) {
            // 올라갈 때
            setScrollUpDown(true);
          } else {
            // 내려갈 때
            setScrollUpDown(false);
          }
          return scrollY;
        });
        timer = null;
      }, 400);
    }
  }, [timer]);

  // window에 이벤트를 붙였을 때
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  /*   월요일 대호님에게 물어보기
  headerScrollY 라는 reference를 바인딩했을 때
  useEffect(() => {
    headerScrollY.current.addEventListener("scroll", handleScroll);
    return () =>
      headerScrollY.current.removeEventListener("scroll", handleScroll);
  }, []); */
  if (window.location.pathname === '/posting')  return null;
  return (
    <>
      <StyledHeader
        scrollUpDown={scrollUpDown}
        scrollY={scrollY}
        className={"scroll__header"}
      >
        <div className="logo__container">
          <p className="logo">helog</p>
        </div>
        <div>
          <div className="login__info__container">
            <BsSearch style={{ fontSize: "1rem" }}></BsSearch>
            <button>로그인</button>
          </div>
        </div>
      </StyledHeader>
    </>
  );
};

export default Header;

const StyledHeader = styled.div`
  background-color: white;
  box-shadow: ${(props) => {
    return props.scrollY === 0 ? "none" : "rgba(0, 0, 0, 0.1) 0px 0.1rem 0px;";
  }};

  position: fixed;
  z-index: 3;

  top: 0;
  left: 0;
  right: 0;
  margin-top: ${(props) => {
    return props.scrollUpDown ? "0px" : "-5rem";
  }};

  height: 4.7rem;

  transition: margin-top 0.2s ease-in-out, background-color 0.1s ease;

  padding: 0 5.5rem;

  display: flex;
  justify-content: space-between;
  align-items: center;

  * {
    cursor: pointer;
    color: ${(props) => props.theme.black};
  }
  .logo {
    font-family: "Fira Mono", monospace;
    font-size: 1.8rem;
    font-weight: 700;
  }
  .login__info__container {
    display: flex;
    align-items: center;

    button {
      border: none;
      background: inherit;
      margin-left: 1.3rem;

      height: 2rem;
      width: 6.3rem;
      border: 0.1rem solid rgb(0, 0, 0);
      border-radius: 1rem;
      font-size: 1rem;
      font-weight: 700;

      &:hover {
        background-color: ${(props) => props.theme.black};
        color: white;
        transition: all 0.2s ease-in-out;
      }
    }
  }
`;
