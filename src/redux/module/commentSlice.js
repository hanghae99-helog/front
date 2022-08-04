import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { noneTokenInstance } from '../../shared/axiosConfig'

export const commentThunk = createAsyncThunk("comment/fetch", async (getPostId)=> {
    const resultComment = await noneTokenInstance.get(`/api/comments/${getPostId}`);
    const commentsList = resultComment.data;
    console.log(commentsList);
    return commentsList;
})

const commentSlice = createSlice({
    name: "comment",
    initialState: null,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(commentThunk.fulfilled, (state,action)=>{
            console.log("리듀서 안 입니다 ::: ",action.payload);
            console.log("리듀서 안 입니다 ::: ",action);
            console.log("리듀서 안 입니다 ::: ",state);
            return state = action.payload;
        })
        builder.addCase(commentThunk.rejected, (state,action)=>{
            console.log("리듀서 안 입니다 ::: ",action.payload);
            return state = action.payload;
        })
    }
})

export default commentSlice.reducer;