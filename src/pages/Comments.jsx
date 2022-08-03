import React, { useEffect } from "react";
import styled from "styled-components";
import { useRef, useCallback } from "react";
import PostsDetail from "../components/posting/PostsDetail";
import Comment from "../components/posting/Comment";

const Comments = () => {
  return (
    <ComponentsWrapp>
      <ContentWrapp>
        <PostsDetail />
        <hr />
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

  hr {
    margin: 30px 0;
  }

  h4 {
    margin-bottom: 10px;
  }
`;

const ContentWrapp = styled.div`
  width: 80%;
  max-width: 780px;
  min-width: 300px;
  margin: 0 auto;
`;
