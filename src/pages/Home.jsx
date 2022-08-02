import React from "react";
import styled from "styled-components";
import { BsGraphUp, BsClock } from "react-icons/bs";

const Home = () => {
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
            <div>{/* <img src="" alt=""></img> */}여기는 사진입니다.</div>
            <div>
              <div>
                <h4>여기는 제목이구요</h4>
                <p>여기는 소제목 입니다.</p>
              </div>
              <div>
                <footer>
                  <div>
                    <p>
                      <span>4일 전</span> ﹒ <span>15개의 댓글</span>
                    </p>
                  </div>
                  <div>
                    <div>
                      <div>여기는 프로필 사진이고요</div>
                      <div>by 작성자</div>
                    </div>
                    <div>
                      <div>하트표시</div>
                      <div>50</div>
                    </div>
                  </div>
                </footer>
              </div>
            </div>
          </MainItem>
          <MainItem>
            <div>{/* <img src="" alt=""></img> */}여기는 사진입니다.</div>
            <div>
              <div>
                <h4>여기는 제목이구요</h4>
                <p>여기는 소제목 입니다.</p>
              </div>
              <div>
                <footer>
                  <p>
                    <span>4일 전</span> ﹒ <span>15개의 댓글</span>
                  </p>
                </footer>
              </div>
            </div>
          </MainItem>
          <MainItem>
            <div>{/* <img src="" alt=""></img> */}여기는 사진입니다.</div>
            <div>
              <div>
                <h4>여기는 제목이구요</h4>
                <p>여기는 소제목 입니다.</p>
              </div>
              <div>
                <footer>
                  <p>
                    <span>4일 전</span> ﹒ <span>15개의 댓글</span>
                  </p>
                </footer>
              </div>
            </div>
          </MainItem>
          <MainItem>
            <div>{/* <img src="" alt=""></img> */}여기는 사진입니다.</div>
            <div>
              <div>
                <h4>여기는 제목이구요</h4>
                <p>여기는 소제목 입니다.</p>
              </div>
              <div>
                <footer>
                  <p>
                    <span>4일 전</span> ﹒ <span>15개의 댓글</span>
                  </p>
                </footer>
              </div>
            </div>
          </MainItem>
          <MainItem>
            <div>{/* <img src="" alt=""></img> */}여기는 사진입니다.</div>
            <div>
              <div>
                <h4>여기는 제목이구요</h4>
                <p>여기는 소제목 입니다.</p>
              </div>
              <div>
                <footer>
                  <p>
                    <span>4일 전</span> ﹒ <span>15개의 댓글</span>
                  </p>
                </footer>
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
  grid-auto-rows: 25.6rem;

  @media screen and (max-width: 1440px) {
    grid-template-columns: 1fr 1fr 1fr;
    grid-auto-rows: 22rem;
  }
  @media screen and (max-width: 1080px) {
    grid-template-columns: 1fr 1fr;
    grid-auto-rows: 18rem;
  }
  @media screen and (max-width: 730px) {
    grid-template-columns: 1fr;
    grid-auto-rows: 14rem;
  }
`;

const MainItem = styled.div`
  width: 100%;
  height: 100%;
`;
