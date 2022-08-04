import React, { useEffect } from "react";
import styled from "styled-components";
import PostsDetail from "../components/posting/PostsDetail";
import Comment from "../components/posting/Comment";
import { commentThunk } from "../redux/module/commentSlice";
import { useDispatch } from "react-redux";
import { useParams } from "react-router-dom";

const Comments = () => {
  const params = useParams();
  const getPostId = params.url;
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(commentThunk(getPostId));
  }, []);

  return (
    <ComponentsWrapp>
      <ContentWrapp>
        <PostsDetail />
        <Comment />
      </ContentWrapp>
    </ComponentsWrapp>
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
