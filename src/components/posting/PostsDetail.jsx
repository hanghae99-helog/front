import React from "react";
import styled from "styled-components";
// import { useRef, useCallback } from "react";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { Viewer } from "@toast-ui/react-editor";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { async } from "@firebase/util";
import { useNavigate } from "react-router-dom";
import Modal from "../../components/posting/Modal";
import { instance } from "../../shared/axiosConfig";

//상세페이지
const PostsDetail = ({ data, setData }) => {
    document.body.style.overflow = "unset";
  //게시글 삭제 모달
  const [modalUp, setModalUp] = useState(false);
  const navigate = useNavigate();

  const ModalUp = () => {
    setModalUp(true);
    document.body.style.overflow = "hidden";
  };

  const ModalDown = () => {
    setModalUp(false);
    document.body.style.overflow = "unset";
  };

  //게시글 삭제 요청
  const deletePost = async () => {
    try {
      const deleteRes = await instance.delete(`/api/posting/${data.postId}`);
      console.log(deleteRes);
      navigate("/");
    } catch (err) {
      return console.log(err);
    }
  };

  return (
    <>
      {data && (
        <>
          <PostingWarrap>
            <Titlearea>
              <h1>{data.title}</h1>
              <TitleBody>
                <Userarea>
                  <h4>{data.userId}</h4>
                  <p>&middot;</p>
                  <p>{data.createAt}</p>
                </Userarea>
                <WritingButtons>
                  <button
                    onClick={() => {
                      //수정 버튼 누르면 navigate에 data를 넣어서 함께 이동시킨다!
                      navigate(`/posting/${data.postId}`, {
                        state: { ...data },
                      });
                    }}
                  >
                    수정
                  </button>
                  <button onClick={ModalUp}>삭제</button>
                  {modalUp && (
                    <Modal>
                      <DeleteModal>
                        <h4>포스트 삭제</h4>
                        <p>정말로 삭제하시겠습니까?</p>
                        <div className="modalBtns">
                          <button className="cansle" onClick={ModalDown}>
                            취소
                          </button>
                          <button className="submit" onClick={deletePost}>
                            확인
                          </button>
                        </div>
                      </DeleteModal>
                    </Modal>
                  )}
                </WritingButtons>
              </TitleBody>
            </Titlearea>

            <Content>
              <h3>
                <img src={data.thumbnail} alt="img" />
                <div id="editor">
                  <Viewer class="viewer" initialValue={data.viewContent} />
                </div>
              </h3>
              <Profilearea>
                <img
                  src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASbSURBVHgB7Z0tTytBFIYP914BDiQ4cIADB0EhwYFE8ifq7g/hJ2CRSCQ4kOCobF3ruHk3maS5aSnbdnfPOe/7JE0oCTvTnmc+dvbMsNbr9b5M0PLLBDUSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAOX+MhPX1dTs+Prbt7W3b3d21jY2N6ndgPB7bYDCw4XBor6+v9vHxUb1nIL0Ae3t7dn5+XgV9FhABYuC1v79f/Q4SPD8/28vLi2UmrQA/Cfx34O/wwjXu7u7S9gi/z87O/loyELTr62vb2tqyZcFQcXp6Wv2MXiEb6SaBCDwEWDVFqmykEgABOjo6sqbAtbNJkEaAi4uLRoNfQBmXl5eWhRQCIChlnG6Dk5OTVstrkvACYKLXxJg/D5RZ1hEiE14ABGIVs/26IPgZeoHQAiDwbYz7s4AA0XuB0AIsusizKsrycmRCC+Dhyz84OLDIhBUAra/rHgCgDpGHgbAC7OzsmBc81aUuYQXY3Nw0L3iqS13CCtDFrd8sPNWlLsoIIkcCkBNWAE8JGpGTRcIKgPw9L3iqS13CCvD5+Wle8FSXuoQVAJm8HlK0UAfUJSqhJ4Fvb2/WNcgcjkxoAfDld936oieKhhYAwX96erKuwJ6B6Oni4dcBIEAXvQAC//j4aNEJLwCC30UgUGaGzSIpVgLRC7Q5FKCsLFvG0iwFPzw8tBIUlIGyspDqWcD9/X2jEuDaKCMT6R4GIUBNzAlwzWzBByl3ByNYaK23t7dLP6vHfT6u9/7+bhlZ6/V6X5YYpI0jebRu/mD2wBfSHxCBngAv9ASQ4PDwsErhwvvJE0JGo1EV9H6/72KFsS1SCDAZyFngnh2vVUwSUV4WQUILULZnlR06aMGYqDW1QDN56khZho6+Ghh2DoBgXF1dTZ3koZWvcqWubECdtg0NZUQ+QiakAGjxOA9gHhABj4wXeWyMHgX5/j85Zwi9AXoeD4+n6xJOAASk7nbwkjyCGT0meXg/mcWDYOMsIJwShtaO3mWRHT/odaINCaHmAIsEHyCQOP6tHAHXFKVukSQIsxK4aPDbBnWMdG5ACAHwhUYIfgHzEwwjEXAvQFdHwCzLzc1NiC1jrgXA2I31/Ijbr1HnCEfKuRagq/N/VgXuJLzPB9wKgMBnOITJu8RuBUDXnwHvQ4FLAbDkGrnr/x8MBV7vClwKEHHWPw+vn8mdANlaf8FrL+BOgIytv+Dxs7kSAC0kY+sveOwFXAnQ5bGvbdH0A6m6uBLAw8GPTePtaFk3AmTv/gtYF/A0DLgRgKH1Fzx9VjcCIBuHBU89nRsBkKrFgqfNJm5SwpBGVc7fz/CvWKZRUsk9bS1PvzVMfI+OiiVHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIOcfGjV2tEfztqEAAAAASUVORK5CYII="
                  alt="profile"
                />
                <ProfileDetail>
                  <h2>{data.userId}</h2>
                  <p>빙글빙글 돌아가는 달구의 하루</p>
                </ProfileDetail>
              </Profilearea>
            </Content>
            <hr />
            <h4>{data.commentCount}개의 댓글</h4>
          </PostingWarrap>
        </>
      )}
    </>
  );
};

export default PostsDetail;

const PostingWarrap = styled.div`
  text-align: left;
  padding-bottom: 0.8rem;

  .Modal {
    position: fixed;
    top: 0px;
    left: 0px;
    width: 100%;
    height: 100%;
    z-index: 60;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgba(249, 249, 249, 0.85);
    text-align: left;

    .DeleteModal {
      box-sizing: border-box;
      width: 25rem;
      border-radius: 4px;
      background: #ffffff;
      padding: 2rem 1.5rem;
      box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
    }

    p {
      line-height: 1.5;
      font-size: 1rem;
      color: #495057;
      margin-top: 1rem;
      margin-bottom: 1rem;
      white-space: pre-wrap;
    }

    .modalBtns {
      margin-top: 2rem;
      display: flex;
      justify-content: flex-end;
    }

    .cansle {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      cursor: pointer;
      outline: none;
      border: none;
      background: none;
      color: #12b886;
      border-radius: 4px;
      padding: 0px 1.25rem;
      height: 2rem;
      font-size: 1rem;
    }

    .submit {
      display: inline-flex;
      align-items: center;
      justify-content: center;
      font-weight: bold;
      cursor: pointer;
      outline: none;
      border: none;
      background: #12b886;
      color: #ffffff;
      border-radius: 4px;
      padding: 0px 1.25rem;
      height: 2rem;
      font-size: 1rem;
    }
  }

  hr {
    margin: 30px 0;
    margin-top: 0;
    background-color: #e9ecef;
    width: 100%;
    height: 0.5px;
    border: none;
    margin-top: 2rem;
    margin-bottom: 4.5rem;
  }

  h4 {
    font-size: 1.125rem;
    line-height: 1.5;
    font-weight: 600;
    margin-bottom: 1rem;
  }
`;

const DeleteModal = styled.div`
  width: 25rem;
  border-radius: 4px;
  background: #ffffff;
  padding: 2rem 1.5rem;
  box-shadow: rgb(0 0 0 / 9%) 0px 2px 12px 0px;
  animation: 0.4s ease-in-out 0s 1 normal forwards running cptskd;
`;

const Titlearea = styled.div`
  // font-size : 2em;
  // font-weight : 800;
  // 폰트 변경 후 바꿀 것!
  font-size: 1.5rem;

  h1 {
    margin-bottom: 32px;
  }
`;

const Content = styled.div`
  h3 {
    padding-bottom: 80px;
  }

  img {
    max-height: 100vh;
    max-width: 100%;
    width: auto;
    margin: 2rem auto 60px;
    height: auto;
    display: block;
  }

  #editor {
    width: 100%;
    .toastui-editor-contents {
      font-size: 18px;
      line-height: 1.5;
      padding-bottom: 180px;
    }
  }
`;

const TitleBody = styled.div`
  padding-bottom: 30px;
  display: flex;
  justify-content: space-between;
  align-items: center;
`;
const WritingButtons = styled.div`
  text-align: right;
  button {
    color: #868e96;
  }
`;

const Userarea = styled.div`
  display: flex;

  h4 {
    padding: 5px;
    font-size: 16px;
  }

  p {
    margin-top: 6px;
    margin-left: 0.2rem;
    margin-right: 0.2rem;
    border-radius: 1px;
    font-size: 15px;
    color: #495057;
  }
`;
const Profilearea = styled.div`
  display: flex;
  text-align: left;
  align-items: center;
  img {
    width: 125px;
    height: 125px;
    margin: 0;
  }
`;
const ProfileDetail = styled.div`
  display: flex;
  flex-direction: column;
  padding: 15px;
  // margin-top : 10px;

  p {
    color: #495057;
    margin-top: 15px;
    font-size: 1.125rem;
  }
`;
