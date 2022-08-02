import React from "react";
import styled from "styled-components";
import { BsGraphUp, BsClock } from "react-icons/bs";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { postAuth } from "../shared/axiosConfig";

const Home = () => {
  // 무한 스크롤에 따라 콜백 함수에 전달할 페이지 번호
  let pageNum = 1;
  const posts_list_CB = async () => {
    try {
      // 최초 Home이 마운트 됐을 때 첫 번째 페이지 요청
      const res = await postAuth(1);
      return res;
    } catch (err) {
      console.log(err);
      return alert("서버와 통신이 원활하지 않습니다. 다시 시도해주세요.");
    }
  };

  // const mainpageQuery = useQuery(["posts_list"], posts_list_CB, {
  //   onSuccess(data) {
  //     console.log(data);
  //   },
  //   staleTime: 100000,
  // });
  const instance = useQueryClient();
  console.log("useQueryClient ::: ", instance);

  return (
    <>
      <div>
        <MainNav className="new___trend__container">
          <div className="new___trend">
            <div className="new__trend__icon">
              <BsClock />
            </div>
            최신
          </div>
          <div className="new___trend">
            <div className="new__trend__icon">
              <BsGraphUp />
            </div>
            트렌드
          </div>
        </MainNav>
        <MainGrid>
          <MainItem>
            <div className="image__container">
              {/* <img src="" alt=""></img> */}여기는 사진입니다.
            </div>
            <div className="content__container">
              <div>
                <h4 className="content__title">여기는 제목이구요</h4>
                <p className="content__subtitle">
                  여기는 소제목 입니다. 여기는 소제목 입니다. 여기는 소제목
                  입니다. 여기는 소제목 입니다. 여기는 소제목 입니다. 여기는
                  소제목 입니다. 여기는 소제목 입니다. 여기는 소제목 입니다.
                  여기는 소제목 입니다. 여기는 소제목 입니다. 여기는 소제목
                  입니다. 여기는 소제목 입니다.
                </p>
              </div>
              <div className="content__info__container">
                <div className="content__info__date">
                  <span>4일 전</span>
                </div>
                <div className="content__info__writer__container">
                  <div className="content__info__writer">
                    <div>
                      {/* 이미지 자리 */}
                      이미지
                    </div>
                    <div>
                      by <span>작성자</span>
                    </div>
                  </div>
                  <div className="content__info__comments">
                    <span>15개의 댓글</span>
                  </div>
                </div>
              </div>
            </div>
          </MainItem>
        </MainGrid>
      </div>
    </>
  );
};

export default Home;

const MainNav = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  height: 3rem;

  display: flex;
  .new__trend__container {
  }
  .new___trend {
    width: 7rem;
    height: 3rem;
    display: flex;
    justify-content: center;
    align-items: center;

    font-size: 1.2rem;
    font-weight: 700;

    cursor: pointer;
  }
  .new___trend:first-child {
    border-bottom: 0.159rem solid ${(props) => props.theme.black};
  }
  .new___trend:last-child {
    color: ${(props) => props.theme.gray};
  }
  .new__trend__icon {
    margin-right: 0.5rem;
  }
`;
const MainGrid = styled.div`
  display: grid;
  justify-content: center;
  gap: 2rem;

  grid-template-columns: 1fr 1fr 1fr 1fr;

  @media screen and (max-width: 1440px) {
    grid-template-columns: 1fr 1fr 1fr;
    gap: 1.5rem;
  }
  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr 1fr;
    gap: 1rem;
  }
  @media screen and (max-width: 730px) {
    grid-template-columns: 1fr;
    gap: 0.7rem;
  }
`;

const MainItem = styled.div`
  width: 100%;
  height: 100%;
  .image__container {
    width: 100%;
    height: 10.4rem;
    background-color: yellowgreen;
  }
  .content__container {
    padding: 1rem;
    background-color: rgb(102, 85, 85);
    width: 100%;
    .content__title {
      margin-bottom: 4px;
      font-size: 1rem;
    }
    .content__subtitle {
      margin-bottom: 1.5rem;
      font-size: 14px;

      overflow: hidden;
      display: -webkit-box;
      -webkit-line-clamp: 3;
      -webkit-box-orient: vertical;

      height: 3.9rem;
      line-height: 1.3rem;
    }
    .content__info__date,
    .content__info__writer,
    .content__info__comments {
      font-size: 12px;
      line-height: 18px;
      color: rgb(134, 142, 150);
    }
    .content__info__date {
      margin-bottom: 10px;
      border-bottom: 1px solid rgb(241, 243, 245);
      padding-bottom: 16px;
    }
    .content__info__writer__container {
      display: flex;
      justify-content: space-between;
      .content__info__writer {
        display: flex;

        div:first-child {
          margin-right: 8px;
        }
        div:nth-child(2) {
          span {
            color: ${(props) => props.theme.black};
            font-size: 12px;
            font-weight: 700;
          }
        }
      }
    }
  }
`;
