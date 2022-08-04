import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { noneTokenInstance } from "../../shared/axiosConfig";

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
      const res = await noneTokenInstance.post(`/api/comments/${information.postId}`,information.commentData);
      const data = res.data;
      console.log(res);
      console.log(data);
      if (data.status === true) {
          console.log("댓글 추가 완료!")
      } else {
          alert ("댓글이 추가되지 않았습니다! 다시 시도해주세요.")
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
