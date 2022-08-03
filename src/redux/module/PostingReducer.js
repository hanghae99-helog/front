// import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
// import axios from 'axios';

// //포스팅 작성
// export const addPosting = createAsyncThunk('posting/addPosting', async (information) => {
//     //createAsyncThunk는 비동기로 처리하는 인자는 1개만 가능
//         const res = await axios.post(`http://localhost:5001/posting`,information.new_PostingData);
//         const data = res.data;
//         if (data.status !== 201) {
//             console.log ("포스팅 실패")
//         }
//     })


// //상세페이지 보여주기
// export const viewPosting = createAsyncThunk('posting/viewPosting', async (information) => {
//     //createAsyncThunk는 비동기로 처리하는 인자는 1개만 가능
//         const res = await axios.get(`http://localhost:5001/posting/${url}`,information.new_PostingData);
//         // const res = await axios.get(`/api/posting?url=${url}`,information.new_PostingData);
//         const data = res.data;
//         console.log(data);
//         if (data.status !== 200) {
//             console.log ("상세페이지 로딩 실패")
//         }
//     })


// const initialState = {
//     postingData:[]
// }

// const postingSlice = createSlice({
//     name : 'posting',
//     initialState,
//     reducers : {
//         createPosting : (state, action) => {
//             state.postingData.title = action.title;
//             state.postingData.viewcontent = action.viewcontent;
//             state.postingData.Writingcontent = action.writingcontent;
//             state.postingData.subtitle = action.subtitle;
//             state.postingData.thumbnail = action.imageUrl;
//             state.postingData.url = action.url;
//         },
//     },
   
//     extraReducers : (builder) => {
//         builder.addCase(viewPosting.fulfilled, (state, action) => {
            
//         })
//     }
// });

// export const postingActions = postingSlice.actions;
// export default postingSlice.reducer;