import React, { useEffect, useState } from "react";
import styled from "styled-components";
import PostsDetail from "../components/posting/PostsDetail";
import Comment from "../components/posting/Comment";
import { commentThunk } from "../redux/module/commentSlice";
import { useDispatch } from "react-redux";
import { useParams, useNavigate } from "react-router-dom";
import { loadingMain } from "../shared/axiosConfig";

const Comments = () => {
  const params = useParams();
  const getPostId = params.url;
  const dispatch = useDispatch();
  const [data, setData] = useState();
  const navigate = useNavigate();

  //게시글 불러오기 요청
  const viewPost = async () => {
    try {
      const res = await loadingMain.detailPage(params.url);
      setData(res.data);
    } catch (err) {
      console.log(err);
      alert("게시물을 불러 올 수 없습니다. 다시 시도해주세요.");
      return navigate("/");
    }
  };
  useEffect(() => {
    dispatch(commentThunk(getPostId));
    viewPost();
  }, []);

  return (
    <>
      {data && (
        <>
          <ComponentsWrapp>
            <ContentWrapp>
              <PostsDetail data={data} setData={setData} />
              <Comment postId={data.postId} />
            </ContentWrapp>
          </ComponentsWrapp>
        </>
      )}
    </>
  );
};
export default Comments;

const ComponentsWrapp = styled.div`
  // width : 100vw;

  margin-top: 5.5rem;
  margin-bottom: 10px;

  img {
    border-radius: 100px;
  }

  button {
    border: none;
    // width : 60px;
    font-size: 16px;
    background-color: transparent;
    padding: 4px;
  }

  h4 {
    margin-bottom: 10px;
  }
`;

const ContentWrapp = styled.div`
  width: 90%;
  max-width: 780px;
  min-width: 300px;
  margin: 0 auto;
`;
