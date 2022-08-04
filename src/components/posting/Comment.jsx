import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { commentAxios, noneTokenInstance } from "../../shared/axiosConfig";
import { async } from "@firebase/util";
import WroteComment from "./WroteComment";
import { useSelector, useDispatch } from "react-redux";
import { useParams } from "react-router-dom";
import { commentThunk } from "../../redux/module/commentSlice";
import { addComment } from "../../redux/module/commentSlice";

const Comment = ({ postId }) => {
  const dispatch = useDispatch();
  const params = useParams();
  const getUrl = params.url;
  const [commentState, setCommentState] = useState([]);
  const [commentsList, setCommentsList] = useState([]);
  // 리듀서에서 받아옴.
  const requestsAllComments = useSelector((state) => state.comments);
  const comment_ref = React.useRef(null);

  useEffect(() => {
    // 댓글 요청
    const commentsListFunc = async () => {
      const reqCommentsList = await noneTokenInstance.get(
        `/api/comments/${postId}`
      );
      // 리듀서에 초기화
      dispatch(commentThunk(postId));
      setCommentsList(requestsAllComments);
      return setCommentState(reqCommentsList.data);
    };
    commentsListFunc();
  }, []);
  const getUserToken = localStorage.getItem("token");
  const submitComment = () => {
    //보내줄 데이터 모아서 변수에 담기!
    if (!getUserToken) {
      return alert("로그인이 필요합니다!");
    }
    const commentData = {
      comment: comment_ref.current.value,
      postId: postId,
    };
    //리덕스의 addUser 함수를 이용해서
    dispatch(addComment({ commentData }));

    window.location.reload("/");
  };

  return (
    <CommentWrapper>
      <CommentWritingarea>
        <CommentWritingDetail>
          <textarea placeholder="댓글을 작성하세요" ref={comment_ref} />
          <br />
        </CommentWritingDetail>
        <button className="commentbutton" onClick={submitComment}>
          댓글 작성
        </button>
      </CommentWritingarea>
      {commentState?.map((el) => {
        return (
          <WroteComment
            commentsList={commentState}
            setCommentsList={setCommentState}
            commentData={el}
            key={el.commentId}
          />
        );
      })}
    </CommentWrapper>
  );
};

export default Comment;

const CommentWrapper = styled.div`
  text-align: right;

  .commentbutton {
    background: #12b886;
    color: white;
    width: 112px;
    border: none;
    padding: 0.4rem;
    border-radius: 4px;
    font-weight: bolder;
    font-size: 1rem;
    margin-bottom: 1rem;
  }
`;

const CommentWritingarea = styled.div`
  textarea {
    resize: none;
    width: 100%;
    border: 1px solid #f1f3f5;
    outline: none;
    background: #ffffff;
    color: black;
    line-height: 1.75;
    font-size: 1rem;
    height: 7.375rem;
    padding: 1rem 1rem 1.5rem;
    box-sizing: border-box;
    margin-bottom: 1.5rem;
    border-radius: 4px;
    min-height: 6.125rem;
    .placeholder {
      color: #dee2e6;
    }
  }
`;

const CommentWritingDetail = styled.div`
  text-align: left;
`;
