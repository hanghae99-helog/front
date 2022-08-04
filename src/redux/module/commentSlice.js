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

const commentSlice = createSlice({
  name: "comment",
  initialState: null,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(commentThunk.fulfilled, (state, action) => {
      return (state = action.payload);
    });
    builder.addCase(commentThunk.rejected, (state, action) => {
      return (state = action.payload);
    });
  },
});

export default commentSlice.reducer;
