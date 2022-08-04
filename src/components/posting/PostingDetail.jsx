import React, { useState } from "react";
import styled from "styled-components";
import { ReactComponent as ThumbnailIcon } from "../../images/Thumbnailcon.svg";
import { ReactComponent as PublicIcon } from "../../images/PublicIcon.svg";
import { ReactComponent as RockIcon } from "../../images/RockIcon.svg";
import { ReactComponent as MenuIcon } from "../../images/MenuIcon.svg";
import "@toast-ui/editor/dist/toastui-editor-viewer.css";
import { storage } from "../../shared/firebase";
import { getDownloadURL, ref, uploadBytes } from "firebase/storage";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";
import { instance } from "../../shared/axiosConfig";
import { useParams } from "react-router-dom";


// 작성 모달창
const PostingDetail = ({ setModalUp, postingData, modifyPostData }) => {
  const getUserId = localStorage.getItem("userId");
  const navigate = useNavigate();
  const [previewImg, setPreviewImg] = useState(null);
  const [imageUrl, setimageUrl] = useState(null);
  const location = useLocation();
  

  const getPostId = location.state?.postId;
  const getPostUrl = location.state?.url;
  console.log(location);
  //이미지 선택시 발생하는 이벤트
  const onLoadFile = async (e) => {
    //이미지 미리보기
    const reader = new FileReader();
    const file = e.target.files[0];

    // 파일 내용을 읽어옵니다.
    reader.readAsDataURL(file);
    // 읽기가 끝나면 발생하는 이벤트 핸들러예요! :)
    reader.onloadend = () => {
      // reader.result는 파일의 컨텐츠(내용물)입니다!
      setPreviewImg(reader.result);
    };

    //이미지 파이어베이스에 저장하기
    const upload_image = await uploadBytes(
      ref(storage, `images/${e.target.files[0].name}`),
      e.target.files[0]
    );

    //이미지 url 가져오기
    const image_url = await getDownloadURL(upload_image.ref);
    setimageUrl(image_url);
  };

  let inputRef;

  //subtitle값 가져오기
  const subtitleRef = React.useRef("");

  //모달창 내리기, 스크롤 풀기
  const ModalDown = () => {
    setModalUp(false);
    document.body.style.overflow = "unset";
  };

  const Posting = async () => {
    if (!modifyPostData) {
      //게시글 추가하기
      const new_PostingData = {
        title: postingData.title,
        viewContent: postingData.viewcontent,
        writingContent: postingData.writingcontent,
        subTitle: subtitleRef.current.value,
        url: `${getUserId}/${postingData.title}-${Date.now()}`,
        thumbnail: imageUrl,
      };
      console.log(new_PostingData);
      try {
        const res = await instance.post("/api/posting", new_PostingData);
        console.log(res);

        return navigate(`/post/detail/${new_PostingData.url}`);
      } catch (err) {
        return console.log(err);
      }
    } else {
      //게시글 수정하기
      const new_modifyPostData = {
        title: modifyPostData.title,
        viewContent: modifyPostData.viewcontent,
        writingContent: modifyPostData.writingcontent,
        subTitle: subtitleRef.current.value,
        url: `${getPostUrl}`,
        thumbnail: modifyPostData.thumbnail,
      };

      console.log(modifyPostData.id);
      try {
        const modifyRes = await instance.put(
          `/api/posting/${getPostId}`,
          new_modifyPostData
        );
        console.log(modifyRes);

        return navigate(`/post/detail/${new_modifyPostData.url}`);
        
      } catch (err) {
        return console.log(err);
      }


    }
  };

  return (
    <>
      {modifyPostData ? (
        <PostingDetailWarrap>
          <ContentWarrp>
            <Previewarea>
              <Imagearea>
                <h3>포스트 미리보기</h3>
                <PreviewButtons>
                  <button>재업로드</button>
                  <p>&middot;</p>
                  <button>제거</button>
                </PreviewButtons>
                <Thumbnail>
                  <img src={modifyPostData.thumbnail} alt="img" width="100%" />
                </Thumbnail>
              </Imagearea>
              <Postarea>
                <h4>{modifyPostData.title}</h4>
                <textarea
                  type="text"
                  defaultValue={modifyPostData.writingcontent.replace(
                    /(<([^>]+)>)/gi,
                    ""
                  )}
                  ref={subtitleRef}
                />
                <p>{}/150</p>
              </Postarea>
            </Previewarea>
            <hr />
            <UserChoicearea>
              <PublicSettingsarea>
                <PublicSettings>
                  <h2>공개 설정</h2>
                  <PublicSettingsButtons>
                    <button>
                      <PublicIcon />
                      전체 공개
                    </button>
                    <button>
                      <RockIcon />
                      비공개
                    </button>
                  </PublicSettingsButtons>
                </PublicSettings>

                <UrlSettings>
                  <h2>URL 설정</h2>
                  <input
                   defaultValue={`${getPostUrl}`}
                    // defaultValue={`/@${getUserId}/${smodifyPostData.title}`}
                  ></input>
                </UrlSettings>

                <SeriesSettings>
                  <h2>시리즈 설정</h2>
                  <button>
                    <MenuIcon />
                    &nbsp;&nbsp;시리즈에 추가하기
                  </button>
                </SeriesSettings>
              </PublicSettingsarea>

              <Buttons>
                <button onClick={ModalDown} className="fail">
                  취소
                </button>
                <button className="Success" onClick={Posting}>
                  출간하기
                </button>
              </Buttons>
            </UserChoicearea>
          </ContentWarrp>
        </PostingDetailWarrap>
      ) : (
        <PostingDetailWarrap>
          <ContentWarrp>
            <Previewarea>
              <Imagearea>
                <h3>포스트 미리보기</h3>
                {previewImg ? (
                  <>
                    <PreviewButtons>
                      <button>재업로드</button>
                      <p>&middot;</p>
                      <button>제거</button>
                    </PreviewButtons>
                    <Thumbnail>
                      <img src={previewImg} alt="img" width="100%" />
                    </Thumbnail>
                  </>
                ) : (
                  <Thumbnail>
                    <ThumbnailIcon fill="#868e96" width="118px" />
                    <input
                      type="file"
                      accept="image/*"
                      ref={(refParam) => (inputRef = refParam)}
                      style={{ display: "none" }}
                      onChange={onLoadFile}
                    />
                    <button onClick={() => inputRef.click()}>
                      썸네일 업로드
                    </button>
                  </Thumbnail>
                )}
              </Imagearea>
              <Postarea>
                <h4>{postingData.title}</h4>
                <textarea
                  type="text"
                  defaultValue={postingData.writingcontent.replace(
                    /(<([^>]+)>)/gi,
                    ""
                  )}
                  ref={subtitleRef}
                />
                <p>{}/150</p>
              </Postarea>
            </Previewarea>
            <hr />
            <UserChoicearea>
              <PublicSettingsarea>
                <PublicSettings>
                  <h2>공개 설정</h2>
                  <PublicSettingsButtons>
                    <button>
                      <PublicIcon />
                      전체 공개
                    </button>
                    <button>
                      <RockIcon />
                      비공개
                    </button>
                  </PublicSettingsButtons>
                </PublicSettings>

                <UrlSettings>
                  <h2>URL 설정</h2>
                  <input
                    defaultValue={`/@${getUserId}/${postingData.title}`}
                  ></input>
                </UrlSettings>

                <SeriesSettings>
                  <h2>시리즈 설정</h2>
                  <button>
                    <MenuIcon />
                    &nbsp;&nbsp;시리즈에 추가하기
                  </button>
                </SeriesSettings>
              </PublicSettingsarea>

              <Buttons>
                <button onClick={ModalDown} className="fail">
                  취소
                </button>
                <button className="Success" onClick={Posting}>
                  출간하기
                </button>
              </Buttons>
            </UserChoicearea>
          </ContentWarrp>
        </PostingDetailWarrap>
      )}
    </>
  );
};

export default PostingDetail;

const PostingDetailWarrap = styled.div`
  width: 100vw;
  height: 100vh;
  align-items: center;
  background: #f8f9fa;
  text-align: left;
  hr {
    height: 70vh;
    width: 1px;
    border-width: 0;
    color: gray;
    background-color: #000;
    margin-left: 2rem;
    margin-right: 2rem;
  }

  h2 {
    font-size: 22px;
    margin-top: 2rem;
    margin-bottom: 0.5rem;
  }

  button {
    color: #12b886;
  }
`;

const ContentWarrp = styled.div`
  width: 768px;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: 0 auto;
  padding-top: 5.6rem;
  box-sizing: border-box;
`;

const Previewarea = styled.div`
  background: var(--bg-element3);
  height: 80%;

  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;

  button {
    margin-top: 0.1rem;
    padding: 0.25rem 2rem;
    background: #ffffff;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 2%) 0px 0px 4px;
    font-size: 1rem;
    line-height: 1.5;
    color: #12b886;
    outline: none;
    border: none;
    cursor: pointer;
    font-weight: bold;
  }
`;

const Imagearea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;

  h3 {
    margin: 0;
    margin-bottom: 0.5rem;
  }
`;

const Thumbnail = styled.div`
  display: flex;
  box-sizing: border-box;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #e9ecef;
  width: 350px;
  height: 200px;
  overflow: hidden;
`;

const PreviewButtons = styled.div`
  display: flex;
  text-align: right;
  align-items: center;
  justify-content: flex-end;
  font-size: 10px;
  button {
    background: transparent;
    color: gray;
    padding: 5px;
    font-weight: lighter;
    text-decoration: underline;
  }

  p {
    margin-left: 0.1rem;
    margin-right: 0.1rem;
    border-radius: 1px;
  }
`;

const Postarea = styled.div`
  width: 100%;
  text-align: right;

  h4 {
    margin-top: 2rem;
    margin-bottom: 0.8rem;
    text-align: left;
  }

  h {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    color: var(--text3);
  }

  textarea {
    resize: none;
    width: 100%;
    border: none;
    outline: none;
    box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;
    background: #ffffff;
    color: var(--text1);
    line-height: 1.5;
    font-size: 0.875rem;
    height: 7rem;
    padding: 0.75rem 1rem;
    margin-bottom: 0.5rem;
    box-sizing: border-box;
  }

  p {
    font-size: 0.8rem;
  }
`;

const UserChoicearea = styled.div`
    flex: 1 1 0%;
    margin-top: 0;

}

`;

const PublicSettingsarea = styled.div`
  width: 100%;

  button {
    outline: none;
    flex: 1 1 0%;
    height: 3rem;
    align-items: center;
    justify-content: flex-start;
    font-weight: bold;
    background: #ffffff;
    font-size: 1.125rem;
    box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px 0px;
    border-radius: 4px;
    cursor: pointer;
    border: solid 1px var(--primary2);
  }
`;

const PublicSettings = styled.div`
  h2 {
    margin-top: 0;
  }
`;

const PublicSettingsButtons = styled.div`
  display: flex;

  button {
    box-sizing: border-box;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
    padding: 0 20px;
    margin-right: 20px;
  }
`;

const UrlSettings = styled.div`
  width: 100%;
  input {
    resize: none;
    width: 100%;
    border: none;
    outline: none;
    box-shadow: rgb(0 0 0 / 3%) 0px 0px 4px 0px;
    background: #ffffff;
    color: var(--text1);
    line-height: 1.5;
    padding: 0.5rem 0.875rem;
    box-sizing: border-box;
  }
`;

const SeriesSettings = styled.div`
  button {
    background: #ffffff;
    height: 3rem;
    width: 100%;
    border-radius: 4px;
    box-shadow: rgb(0 0 0 / 5%) 0px 0px 4px 0px;
    border: none;
    outline: none;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 1.125rem;
    font-weight: bold;
    cursor: pointer;
  }
`;

const Buttons = styled.div`
  display: flex;

  justify-content: flex-end;
  button {
    font-weight: bold;
    cursor: pointer;
    outline: none;
    border: none;
    background-color: #ffffff;
    border-radius: 4px;
    padding: 0px 1.2rem;
    height: 2.5rem;
    font-size: 1.125rem;
    margin-top: 5rem;
    margin-left: 10px;
  }

  .fail {
    background-color: transparent;
  }

  .Success {
    background-color: #12b886;
    color: white;
  }
`;
