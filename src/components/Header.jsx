import React, { useCallback, useEffect, useRef, useState } from "react";
import { BsSearch, BsFillCaretDownFill, BsPerson } from "react-icons/bs";
import styled from "styled-components";
import { useNavigate } from "react-router-dom";

const Header = ({ setIsModalOpen }) => {
  // throttling을 위한 setTimeout객체 할당
  let timer = useRef(null);
  // 얼마나 스크롤이 내려갔는지
  const [scrollY, setScrollY] = useState(0);
  // 스크롤 방향이 위인지 아래인지(true위, false아래)
  const [isScrollUp, setIsScrollUp] = useState(true);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const userId = localStorage.getItem("userId");

  // throttling을 이용한 스크롤 이벤트 제어
  const handleScroll = useCallback(() => {
    if (!timer.current) {
      timer.current = setTimeout(() => {
        const { scrollY } = window;
        setScrollY((prevScrollY) => {
          if (prevScrollY > scrollY) {
            // 올라갈 때
            setIsScrollUp(true);
          } else {
            // 내려갈 때
            setIsScrollUp(false);
          }
          return scrollY;
        });
        timer.current = null;
      }, 400);
    }
  }, []);

  // window에 이벤트를 붙였을 때
  // 의존성 배열에 굳이 handleScroll을 넣어야 하는지?.. 일단 eslint에서 보여주는 warning메시지에는 넣으라고 되어있음. 이걸 굳이 따라야 할까?!
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [handleScroll]);

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
        isScrollUp={isScrollUp}
        scrollY={scrollY}
        className={"scroll__header"}
      >
        <div className="logo__container" onClick={() => navigate("/")}>
          <p className="logo">helog</p>
        </div>

        <div>
          <div className="login__info__container">
            <BsSearch style={{ fontSize: "1rem" }}></BsSearch>
            {token ? (
              <>
                <button onClick={() => navigate("/posting")}>새 글 작성</button>
                <div className="user__profile__container">
                  <BsPerson className="user__profile" />
                  <BsFillCaretDownFill className="down__fall__btn" />
                </div>
              </>
            ) : (
              <button onClick={() => setIsModalOpen(true)}>로그인</button>
            )}
          </div>
        </div>
      </StyledHeader>
    </>
  );
};

export default Header;

const StyledHeader = styled.div`
  background-color: white;
  // 최상단에 갔을 때 박스 그림자 설정
  box-shadow: ${(props) => {
    return props.scrollY <= 10
      ? "none"
      : "rgba(33, 37, 41, 0.1) 0px 0px 0.1rem 0.3rem;";
  }};

  position: fixed;
  z-index: 3;

  top: 0;
  left: 0;
  right: 0;
  // 스크롤 방향에 따른 반응형 부분
  margin-top: ${(props) => {
    return props.scrollY <= 10 ? "0px" : props.isScrollUp ? "0px" : "-5rem";
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
      border: 0.1rem solid ${(props) => props.theme.black};
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

  .user__profile__container {
    display: flex;
    align-items: center;
    cursor: pointer;
  }

  .down__fall__btn {
    font-size: 0.7rem;
    margin-left: 10px;
  }

  .user__profile {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 40px;
    height: 40px;
    background-color: rgb(220, 220, 220);
    font-size: 1rem;
    border-radius: 2rem;
    margin-left: 20px;
    &:hover {
      background-color: rgb(200, 200, 200);
    }
  }
`;
