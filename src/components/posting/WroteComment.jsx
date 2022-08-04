import React, { useState, useRef } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { commentAxios, noneTokenInstance } from "../../shared/axiosConfig";
import { editCommentReducer } from "../../redux/module/commentSlice";

const WroteComment = ({ commentData }) => {
  const { userId, createdAt, commentId, comment } = commentData;
  const modifiedRef = useRef("");
  const [isEdit, setIsEdit] = useState(false);
  const dispatch = useDispatch();
  const commentsList = useSelector((state) => state.comments);

  const handleEditBtn = async () => {
    try {
      const editData = {
        commentId: commentId,
        comment: "나 바뀐 내용임!",
        userId: userId,
        createdAt: createdAt,
        // comment : modifiedRef.current
      };
      //   await commentAxios.editComment(editData);
      let index;
      const temp = JSON.parse(JSON.stringify(commentsList));
      console.log(temp);
      temp.map((el, i) => (el.commentId === commentId ? (index = i) : el));
      temp.splice(index, 1, editData);
      dispatch(editCommentReducer(temp));
      return setIsEdit(false);
    } catch (err) {
      console.log(err);
      return alert("요청이 취소됐습니다. 다시 시도해주세요.");
    }
  };

  const handleDeleteBtn = async (commendId) => {
    try {
      const deleteComment = await commentAxios.deleteComment();
    } catch (err) {
      console.log(err);
      return alert("댓글 삭제에 실패했습니다. 다시 시도해주세요.");
    }
  };

  return (
    <>
      {isEdit ? (
        <>
          <CommentView>
            <CommentUserarea>
              <CommentUserDetail>
                <Imgarea>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASbSURBVHgB7Z0tTytBFIYP914BDiQ4cIADB0EhwYFE8ifq7g/hJ2CRSCQ4kOCobF3ruHk3maS5aSnbdnfPOe/7JE0oCTvTnmc+dvbMsNbr9b5M0PLLBDUSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAOX+MhPX1dTs+Prbt7W3b3d21jY2N6ndgPB7bYDCw4XBor6+v9vHxUb1nIL0Ae3t7dn5+XgV9FhABYuC1v79f/Q4SPD8/28vLi2UmrQA/Cfx34O/wwjXu7u7S9gi/z87O/loyELTr62vb2tqyZcFQcXp6Wv2MXiEb6SaBCDwEWDVFqmykEgABOjo6sqbAtbNJkEaAi4uLRoNfQBmXl5eWhRQCIChlnG6Dk5OTVstrkvACYKLXxJg/D5RZ1hEiE14ABGIVs/26IPgZeoHQAiDwbYz7s4AA0XuB0AIsusizKsrycmRCC+Dhyz84OLDIhBUAra/rHgCgDpGHgbAC7OzsmBc81aUuYQXY3Nw0L3iqS13CCtDFrd8sPNWlLsoIIkcCkBNWAE8JGpGTRcIKgPw9L3iqS13CCvD5+Wle8FSXuoQVAJm8HlK0UAfUJSqhJ4Fvb2/WNcgcjkxoAfDld936oieKhhYAwX96erKuwJ6B6Oni4dcBIEAXvQAC//j4aNEJLwCC30UgUGaGzSIpVgLRC7Q5FKCsLFvG0iwFPzw8tBIUlIGyspDqWcD9/X2jEuDaKCMT6R4GIUBNzAlwzWzBByl3ByNYaK23t7dLP6vHfT6u9/7+bhlZ6/V6X5YYpI0jebRu/mD2wBfSHxCBngAv9ASQ4PDwsErhwvvJE0JGo1EV9H6/72KFsS1SCDAZyFngnh2vVUwSUV4WQUILULZnlR06aMGYqDW1QDN56khZho6+Ghh2DoBgXF1dTZ3koZWvcqWubECdtg0NZUQ+QiakAGjxOA9gHhABj4wXeWyMHgX5/j85Zwi9AXoeD4+n6xJOAASk7nbwkjyCGT0meXg/mcWDYOMsIJwShtaO3mWRHT/odaINCaHmAIsEHyCQOP6tHAHXFKVukSQIsxK4aPDbBnWMdG5ACAHwhUYIfgHzEwwjEXAvQFdHwCzLzc1NiC1jrgXA2I31/Ijbr1HnCEfKuRagq/N/VgXuJLzPB9wKgMBnOITJu8RuBUDXnwHvQ4FLAbDkGrnr/x8MBV7vClwKEHHWPw+vn8mdANlaf8FrL+BOgIytv+Dxs7kSAC0kY+sveOwFXAnQ5bGvbdH0A6m6uBLAw8GPTePtaFk3AmTv/gtYF/A0DLgRgKH1Fzx9VjcCIBuHBU89nRsBkKrFgqfNJm5SwpBGVc7fz/CvWKZRUsk9bS1PvzVMfI+OiiVHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIOcfGjV2tEfztqEAAAAASUVORK5CYII="
                    alt="comment-user-thumbnail"
                  />
                </Imgarea>
                <CommentUserFropileDetail>
                  <h5>{userId}</h5>
                  <p>{createdAt}</p>
                </CommentUserFropileDetail>
              </CommentUserDetail>
              <CommentWritingButtons>
                <button onClick={handleEditBtn}>수정완료</button>
                <button onClick={() => setIsEdit(false)}>취소</button>
              </CommentWritingButtons>
            </CommentUserarea>
            <CommentContent>
                <textarea
                    defaultValue = {`${comment}`}
                />
            </CommentContent>
            <hr />
          </CommentView>
        </>
      ) : (
        <>
          <CommentView>
            <CommentUserarea>
              <CommentUserDetail>
                <Imgarea>
                  <img
                    src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAIAAAACACAYAAADDPmHLAAAACXBIWXMAAAsTAAALEwEAmpwYAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAASbSURBVHgB7Z0tTytBFIYP914BDiQ4cIADB0EhwYFE8ifq7g/hJ2CRSCQ4kOCobF3ruHk3maS5aSnbdnfPOe/7JE0oCTvTnmc+dvbMsNbr9b5M0PLLBDUSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAOX+MhPX1dTs+Prbt7W3b3d21jY2N6ndgPB7bYDCw4XBor6+v9vHxUb1nIL0Ae3t7dn5+XgV9FhABYuC1v79f/Q4SPD8/28vLi2UmrQA/Cfx34O/wwjXu7u7S9gi/z87O/loyELTr62vb2tqyZcFQcXp6Wv2MXiEb6SaBCDwEWDVFqmykEgABOjo6sqbAtbNJkEaAi4uLRoNfQBmXl5eWhRQCIChlnG6Dk5OTVstrkvACYKLXxJg/D5RZ1hEiE14ABGIVs/26IPgZeoHQAiDwbYz7s4AA0XuB0AIsusizKsrycmRCC+Dhyz84OLDIhBUAra/rHgCgDpGHgbAC7OzsmBc81aUuYQXY3Nw0L3iqS13CCtDFrd8sPNWlLsoIIkcCkBNWAE8JGpGTRcIKgPw9L3iqS13CCvD5+Wle8FSXuoQVAJm8HlK0UAfUJSqhJ4Fvb2/WNcgcjkxoAfDld936oieKhhYAwX96erKuwJ6B6Oni4dcBIEAXvQAC//j4aNEJLwCC30UgUGaGzSIpVgLRC7Q5FKCsLFvG0iwFPzw8tBIUlIGyspDqWcD9/X2jEuDaKCMT6R4GIUBNzAlwzWzBByl3ByNYaK23t7dLP6vHfT6u9/7+bhlZ6/V6X5YYpI0jebRu/mD2wBfSHxCBngAv9ASQ4PDwsErhwvvJE0JGo1EV9H6/72KFsS1SCDAZyFngnh2vVUwSUV4WQUILULZnlR06aMGYqDW1QDN56khZho6+Ghh2DoBgXF1dTZ3koZWvcqWubECdtg0NZUQ+QiakAGjxOA9gHhABj4wXeWyMHgX5/j85Zwi9AXoeD4+n6xJOAASk7nbwkjyCGT0meXg/mcWDYOMsIJwShtaO3mWRHT/odaINCaHmAIsEHyCQOP6tHAHXFKVukSQIsxK4aPDbBnWMdG5ACAHwhUYIfgHzEwwjEXAvQFdHwCzLzc1NiC1jrgXA2I31/Ijbr1HnCEfKuRagq/N/VgXuJLzPB9wKgMBnOITJu8RuBUDXnwHvQ4FLAbDkGrnr/x8MBV7vClwKEHHWPw+vn8mdANlaf8FrL+BOgIytv+Dxs7kSAC0kY+sveOwFXAnQ5bGvbdH0A6m6uBLAw8GPTePtaFk3AmTv/gtYF/A0DLgRgKH1Fzx9VjcCIBuHBU89nRsBkKrFgqfNJm5SwpBGVc7fz/CvWKZRUsk9bS1PvzVMfI+OiiVHApAjAciRAORIAHIkADkSgBwJQI4EIEcCkCMByJEA5EgAciQAORKAHAlAjgQgRwKQIwHIkQDkSAByJAA5EoAcCUCOBCBHApAjAciRAORIAHIkADkSgBwJQI4EIOcfGjV2tEfztqEAAAAASUVORK5CYII="
                    alt="comment-user-thumbnail"
                  />
                </Imgarea>
                <CommentUserFropileDetail>
                  <h5>{userId}</h5>
                  <p>{createdAt}</p>
                </CommentUserFropileDetail>
              </CommentUserDetail>
              <CommentWritingButtons>
                <button onClick={() => setIsEdit(true)}>수정</button>
                <button onClick={handleDeleteBtn}>삭제</button>
              </CommentWritingButtons>
            </CommentUserarea>
            <CommentContent>
              <h3>{comment}</h3>
            </CommentContent>
            <hr />
          </CommentView>
        </>
      )}
    </>
  );
};

export default WroteComment;

const CommentView = styled.div`
    padding-top: 1.5rem;
    padding-bottom: 1.5rem;

    hr {
        margin : 30px 0;
        margin-top : 0;
        background-color: #e9ecef;
        width: 100%;
        height: 0.5px;
        border : none;
        margin-top: 2rem;
        margin-bottom: 2rem;
    }
`;

const CommentUserarea = styled.div`
  display: flex;
  justify-content: space-between;

  img {
    width: 50px;
    height: 50px;
  }

  margin: 15px 0;
`;

const CommentUserDetail = styled.div`
    display: flex;
    justify-content: space-between;
    align-items: center;
`;

const Imgarea = styled.div``;

const CommentUserFropileDetail = styled.div`
    display: flex;
    flex-direction: column;
    margin-left: 1rem;
    text-align: left;
    h5 {
        margin: 0;
        font-size: 0.9rem;
    }
    p {
        margin-top: 0.5rem;
        color: #868e96;
        font-size: 0.875rem;
    }
`;

const CommentWritingButtons = styled.div`
  justify-content: flex-end;
  display: inline-flex;
  align-items: center;

  button {
    cursor: pointer;
    outline: none;
    border: none;
    color: #868e96;
    border-radius: 4px;
    padding: 0px 0.25rem;
    height: 2rem;
    font-size: 0.9rem;
  }
`;

const CommentContent = styled.div`
    text-align: left;

    h3 {
        font-size: 1.125rem;
        color: #212529;
        transition: color 0.125s ease-in 0s;
        line-height: 1.7;
        word-break: keep-all;
        overflow-wrap: break-word;
        font-weight : lighter;
    }

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
    }
`;
