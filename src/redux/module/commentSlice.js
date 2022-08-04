import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { instance, noneTokenInstance } from "../../shared/axiosConfig";

export const commentThunk = createAsyncThunk(
  "comment/fetch",
  async (getPostId) => {
    const resultComment = await noneTokenInstance.get(
      `/api/comments/${getPostId}`
    );
    const commentsList = resultComment.data;
    return commentsList;
  }
);

//댓글 추가
export const addComment = createAsyncThunk('comment/addComment', async (information) => {
  //createAsyncThunk는 비동기로 처리하는 인자는 1개만 가능
      console.log(information);
      const newComment = {
        comment : information.commentData.comment
        }
      try {const res = await instance.post(`/api/comments/${information.commentData.postId}`,newComment);
        const data = res.data;
          return data;
      }
      catch (err) {
        console.log(err);
        return alert("서버와 통신에 실패하였습니다! 다시 시도해주세요.")
      }

     
  })
  

const commentSlice = createSlice({
  name: "comment",
  initialState: null,
  reducers: {
    editCommentReducer(state, action) {
      state = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(commentThunk.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    builder.addCase(commentThunk.rejected, (state, action) => {
      return (state = action.payload);
    });
  },
});

export const { editCommentReducer } = commentSlice.actions;
export default commentSlice.reducer;
