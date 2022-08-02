import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { AiOutlineClose } from "react-icons/ai";
import { useForm } from "react-hook-form";
import { authApi } from "../shared/axiosConfig";

// 모달 배경 컴포넌트
export const ModalBackground = () => {
  // Modal켜졌을 때 스크롤 막기
  useEffect(() => {
    document.body.style.cssText = `
      position: fixed; 
      top: -${window.scrollY}px;
      overflow-y: scroll;
      width: 100%;`;
    return () => {
      const scrollY = document.body.style.top;
      document.body.style.cssText = "";
      window.scrollTo(0, parseInt(scrollY || "0", 10) * -1);
    };
  }, []);

  return (
    <>
      <StyledModalBackground />
    </>
  );
};

// 로그인 및 회원가입 모달 컴포넌트
export const LoginModal = ({ setIsModalOpen }) => {
  const [isLogin, setIsLogin] = useState(true);
  const [duplicationState, setDuplicationState] = useState(null);

  // useForm 불러오기
  const {
    register,
    handleSubmit,
    getValues,
    formState: { isValid, errors, dirtyFields },
  } = useForm({ mode: "onChange" });

  // 중복체크 여부에 따른 state변화
  useEffect(() => {
    // 최초에는 null로 초기화를 해주면서 헬퍼 메시지가 뜨지 않도록 해주자.
    if (duplicationState !== null) {
      // 변화가 있으면(dirtyFields.userId가 true) state를 false로 해서 회원가입이 안되도록 하자
      setDuplicationState(!dirtyFields.userId);
    }
  }, [dirtyFields.userId, duplicationState]);

  // 로그인 버튼 핸들러
  const handleLogin = async (userData) => {
    try {
      const resUserData = await authApi.signin(userData);
      localStorage.setItem("token", resUserData.headers?.token);
      const getUserId = resUserData.data[0].userId;
      localStorage.setItem("userId", getUserId);
      return setIsModalOpen(false);
    } catch (err) {
      alert("다시 로그인 해주세요.");
      console.log(err);
      return err.message;
    }
  };

  // 회원가입 버튼 핸들러
  const handleSignup = async (userData) => {
    try {
      const res = await authApi.signup(userData);
      res.status === 200
        ? setIsLogin(true)
        : alert("회원가입에 실패했습니다. 다시 시도해주세요.");
    } catch (err) {
      alert("회원가입에 실패했습니다. 다시 시도해주세요.");
      console.log(err);
      return err.message;
    }
  };

  // 아이디 중복체크 버튼 핸들러
  const handleDuplication = async (userId) => {
    try {
      const res = await authApi.checkedDuplication(userId);
      // "result" : boolean , false 중복없음 , true 중복있음
      if (res.data.result === "true") {
        return console.log("true::: ", res.data.result);
      } else {
        // 중복이 없다면 userId의 변화가 없다고 바꿔주기
        dirtyFields.userId = false;
        // 중복이 없다면 state를 true로 바꾸어서 회원가입 버튼을 누를 수 있도록 하기!
        return setDuplicationState(true);
      }
    } catch (err) {
      alert("중복체크를 다시 시도해주세요");
      console.log(err);
      return err.message;
    }
  };

  return (
    <>
      <StyledModalContainer>
        <StyledModal duplicationState={duplicationState}>
          <div className="modal__img__container">
            <img
              src="https://static.velog.io/static/media/undraw_joyride_hnno.fae6b95e.svg"
              alt=""
            ></img>
            <div>환영합니다!</div>
          </div>
          <div className="modal__input__container">
            <div className="close__container">
              <AiOutlineClose onClick={() => setIsModalOpen(false)} />
            </div>
            {isLogin ? (
              <section>
                <div>
                  <h2>로그인</h2>
                  <form onSubmit={handleSubmit(handleLogin)}>
                    <div>
                      <input
                        placeholder="아이디"
                        autoComplete="off"
                        type="text"
                        {...register("userId", {
                          required: "아이디를 입력하세요",
                        })}
                      ></input>
                      <button
                        className="handle__login__btn"
                        type="submit"
                        disabled={!isValid}
                      >
                        로그인
                      </button>
                    </div>
                    {errors.userId && (
                      <StyledModalError>
                        {errors.userId.message}
                      </StyledModalError>
                    )}
                    <input
                      placeholder="비밀번호"
                      type="password"
                      {...register("password", {
                        required: "비밀번호를 입력해주세요",
                      })}
                    ></input>
                    {errors.password && (
                      <StyledModalError>
                        {errors.password.message}
                      </StyledModalError>
                    )}
                  </form>
                </div>
                <footer>
                  <span>아직 회원이 아니신가요?</span>
                  <div onClick={() => setIsLogin(false)}>회원가입</div>
                </footer>
              </section>
            ) : (
              <section>
                <div>
                  <h2>회원가입</h2>
                  <form onSubmit={handleSubmit(handleSignup)}>
                    <div className="checked__duplication__container">
                      <input
                        type="text"
                        placeholder="아이디 (4~10자)"
                        autoComplete="off"
                        {...register("userId", {
                          required: "아이디를 입력해주세요.",
                          minLength: 4,
                          maxLength: 10,
                          pattern: /[A-Za-z0-9]/,
                        })}
                      ></input>
                      <div
                        className="checked__duplication"
                        onClick={() => {
                          const getId = getValues("userId");
                          handleDuplication(getId);
                        }}
                      >
                        중복확인
                      </div>
                    </div>
                    {errors.userId && (
                      <StyledModalError>
                        {errors.userId.message}
                      </StyledModalError>
                    )}
                    {errors.userId && errors.userId.type === "minLength" && (
                      <StyledModalError>
                        아이디는 4자 이상입니다.
                      </StyledModalError>
                    )}
                    {errors.userId && errors.userId.type === "maxLength" && (
                      <StyledModalError>
                        아이디는 10자 이하입니다.
                      </StyledModalError>
                    )}
                    {errors.userId && errors.userId.type === "pattern" && (
                      <StyledModalError>
                        영어 대﹒소문자와 숫자만 가능합니다.
                      </StyledModalError>
                    )}
                    {duplicationState === null ? null : !duplicationState ? (
                      <StyledModalError>중복확인을 해주세요.</StyledModalError>
                    ) : null}
                    <input
                      type="text"
                      placeholder="이름"
                      autoComplete="off"
                      {...register("name", {
                        required: "이름을 입력해주세요.",
                      })}
                    ></input>
                    {errors.name && (
                      <StyledModalError>{errors.name.message}</StyledModalError>
                    )}
                    <input
                      type="password"
                      placeholder="비밀번호(8~20자)"
                      autoComplete="off"
                      {...register("password", {
                        required: "비밀번호를 입력해주세요",
                        minLength: 8,
                        maxLength: 20,
                        pattern: /[A-Za-z0-9!@#$%^&*+]/,
                      })}
                    ></input>
                    {errors.password && (
                      <StyledModalError>
                        {errors.password.message}
                      </StyledModalError>
                    )}
                    {errors.password &&
                      errors.password.type === "minLength" && (
                        <StyledModalError>
                          비밀번호는 8자 이상입니다.
                        </StyledModalError>
                      )}
                    {errors.password &&
                      errors.password.type === "maxLength" && (
                        <StyledModalError>
                          비밀번호는 20자 이상입니다.
                        </StyledModalError>
                      )}
                    {errors.password && errors.password.type === "pattern" && (
                      <StyledModalError>
                        영어 대﹒소문자,숫자, 특수기호(!@#$%^&*+)
                      </StyledModalError>
                    )}
                    <input
                      type="password"
                      placeholder="비밀번호 확인"
                      autoComplete="off"
                      {...register("passwordCheck", {
                        required: true,
                        validate: {
                          checkedPassword: (value) =>
                            getValues("password") === value ||
                            "비밀번호가 일치하지 않습니다.",
                        },
                      })}
                    ></input>
                    {errors.passwordCheck && (
                      <StyledModalError>
                        {errors.passwordCheck.message}
                      </StyledModalError>
                    )}
                    <button
                      type="submit"
                      disabled={!isValid && !duplicationState}
                    >
                      회원가입
                    </button>
                  </form>
                </div>
                <footer>
                  <span>계정이 이미 있으신가요?</span>
                  <div onClick={() => setIsLogin(true)}>로그인</div>
                </footer>
              </section>
            )}
          </div>
        </StyledModal>
      </StyledModalContainer>
    </>
  );
};

// 모달 백그라운드
const StyledModalBackground = styled.div`
  width: 100vw;
  height: 100vh;
  background-color: rgba(249, 249, 249, 0.8);
  position: fixed;
  top: 0;
  z-index: 10;
`;

// 모달 컨테이너
const StyledModalContainer = styled.div`
  z-index: 30;
  position: fixed;
  left: 0;
  top: 0;

  height: 100vh;
  width: 100vw;

  display: flex;
  justify-content: center;
  align-items: center;
`;

// 모달 본체
const StyledModal = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;

  width: 610px;
  height: 538px;

  background-color: white;

  box-shadow: rgba(0, 0, 0, 0.09) 0px 2px 12px 0px;

  // 모달 이미지
  .modal__img__container {
    width: 219px;
    height: 100%;
    padding: 24px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: #f8f9fa;

    font-size: 28px;
    font-weight: 600;

    img {
      object-fit: contain;
      width: 168px;
      height: 108px;
      margin-bottom: 25px;
    }
  }

  // 모달 로그인 폼
  .modal__input__container {
    padding: 1.5rem;
    width: 394px;
    height: 100%;
    .close__container {
      font-size: 1.4rem;
      margin-bottom: 36px;
      display: flex;
      justify-content: flex-end;
      color: rgb(134, 142, 150);
      cursor: pointer;
      &:hover {
        color: rgb(33, 37, 41);
      }
    }
    section {
      height: 430px;
      display: flex;
      flex-direction: column;
      justify-content: space-between;
      h2 {
        font-size: 21px;
        font-weight: 600;
        margin-bottom: 1rem;
      }
      form {
        display: flex;
        flex-direction: column;
        justify-content: center;
        input {
          outline: none;
          padding: 0.9rem 1rem;
          font-size: 1rem;
          border: 0.07rem solid rgba(0, 0, 0, 0.2);
          width: 70%;
          height: 48px;
          margin-bottom: 1rem;
        }
        input:first-child {
          border-right: none;
        }
        .checked__duplication__container {
          display: flex;
        }
        button,
        .checked__duplication {
          background-color: #22c996;
          border: none;
          padding: 1px 6px;
          font-size: 1rem;
          font-weight: 700;
          color: white;
          cursor: pointer;
          width: 30%;
          height: 48px;

          &:hover {
            background-color: #41e2af;
          }
        }
        .checked__duplication {
          display: flex;
          justify-content: center;
          align-items: center;
          pointer-events: ${(props) =>
            !props.duplicationState ? "auto" : "none"};
          background-color: ${(props) =>
            !props.duplicationState ? "#22c996" : "#41e2af"};
        }
        button:last-child:not(.handle__login__btn) {
          margin: auto;
          background-color: ${(props) =>
            props.duplicationState ? "#22c996" : "#41e2af"};
        }
      }
      footer {
        display: flex;
        justify-content: flex-end;
        color: rgb(33, 37, 41);
        div {
          color: rgb(18, 184, 134);
          font-weight: 700;
          margin-left: 5px;
          border: none;
          cursor: pointer;
          &:hover {
            text-decoration: underline;
          }
        }
      }
    }
  }
`;

const StyledModalError = styled.p`
  margin-bottom: 1rem;
  margin-top: -0.8rem;
  padding-left: 1rem;
  font-size: 1rem;
  color: rgb(18, 184, 134);
`;
