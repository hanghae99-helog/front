import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { BsGraphUp, BsClock, BsPerson } from "react-icons/bs";
import { loadingMain } from "../shared/axiosConfig";
import { CircleLoader } from "react-spinners";
import { useNavigate } from "react-router-dom";

const Home = () => {
  const [pageNum, setPageNum] = useState(1);
  const [getPosts, setGetPosts] = useState([]);
  const [target, setTarget] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [fullPosts, setFullPosts] = useState([]);
  const navigater = useNavigate();

  const fetchingPosts = async () => {
    setIsLoading(true);
    const fetchResult = await loadingMain.infiniteScroll(pageNum);
    setGetPosts(fetchResult.data.content);
    // 첫 요청에서는 바로 setState
    if (fullPosts.length === 0) {
      setFullPosts(fetchResult.data.content);
    } else {
      const injected = JSON.parse(JSON.stringify(fullPosts));
      fetchResult.data?.content.map((el) => injected.push(el));
      setFullPosts(injected);
    }
    setPageNum(pageNum + 1);
    return setIsLoading(false);
  };

  const onIntersect = ([entry]) => {
    if (entry.isIntersecting && !isLoading) {
      fetchingPosts();
    }
  };

  useEffect(() => {
    let observer;
    if (target) {
      observer = new IntersectionObserver(onIntersect, { threshold: 0.5 });
      observer.observe(target);
    }
    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <>
      {/* 로딩 스피너 구현하기 */}
      {/* {isLoading && (
        <StyledSpinnerBackground>
          <CircleLoader color="#21C997" />
        </StyledSpinnerBackground>
      )} */}
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
      <MainGrid className="main__grid">
        {fullPosts.map((el) => {
          return (
            <>
              <MainItem
                key={el.url}
                onClick={() => navigater(`/post/detail/${el.url}`)}
              >
                <div className="image__container">
                  <img src={el.thumbnail} alt=""></img>
                </div>
                <div className="content__container">
                  <div>
                    <h4 className="content__title">{el.title}</h4>
                    <p className="content__subtitle">{el.subTitle}</p>
                  </div>
                  <div className="content__info__container">
                    <div className="content__info__date">
                      <span>{el.createdAt}</span>
                    </div>
                    <div className="content__info__writer__container">
                      <div className="content__info__writer">
                        <div className="content__info__profile">
                          <BsPerson />
                        </div>
                        <div>
                          by <span>{el.userId}</span>
                        </div>
                      </div>
                      <div className="content__info__comments">
                        <span>댓글 {el.commentCount}개</span>
                      </div>
                    </div>
                  </div>
                </div>
              </MainItem>
            </>
          );
        })}
        {!isLoading && <div ref={setTarget}></div>}
      </MainGrid>
      {isLoading && (
        <StyledSpinnerBackground>
          <CircleLoader />
        </StyledSpinnerBackground>
      )}
    </>
  );
};

export default Home;

const MainNav = styled.div`
  margin-top: 1.5rem;
  margin-bottom: 1rem;
  height: 3rem;

  display: flex;
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
  border: 1px solid rgba(0, 0, 0, 0.2px);
  border-radius: 0.25rem;
  box-shadow: rgb(0 0 0 / 8%) 0px 12px 20px 0px;
  transition: all 0.1s ease;
  cursor: pointer;
  &:hover {
    transform: translateY(-8px);
    box-shadow: rgba(0, 0, 0, 0.3) 0px 0.25rem 1rem 0px;
  }
  .image__container {
    width: 100%;
    height: 10.4rem;
    img {
      border-radius: 0.25rem;
      width: 100%;
      height: 100%;
      object-fit: cover;
    }
  }
  .content__container {
    padding: 1rem;
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
      display: flex;
      align-items: center;
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
        justify-content: center;
        align-items: center;
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
    .content__info__profile {
      background-color: ${(props) => props.theme.gray};
      width: 1.5rem;
      height: 1.5rem;
      border-radius: 3rem;
      color: white;
      font-size: 1rem;
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
`;

const StyledSpinnerBackground = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  z-index: 30;
`;
