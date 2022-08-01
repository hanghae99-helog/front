import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { authApi } from "../../shared/axiosConfig";

// 로그인 요청
export const loginThunk = createAsyncThunk("user/login", async (loginData) => {
  console.log("loginThunk가 시작됩니다 ::: ", loginData);
  const loginRes = await authApi.signup(loginData);
  console.log(loginRes.headers);
  console.log(loginRes.data);
  return loginRes;
});

const userSlice = createSlice({
  name: "user",
  initialState: {
    userId: null,
  },
  extraReducers: (builder) => {
    // 로그인 성공 시
    builder.addCase(loginThunk.fulfilled, (state, action) => {
      console.log("loginThunk.fulfilled리듀서의 state입니다 ::: ", state);
      return console.log(
        "loginThunk.fulfilled리듀서의 action.payload입니다 ::: ",
        action.payload
      );
      //   state.content = action.payload;
    });
    // 로그인 실패 시
    builder.addCase(loginThunk.rejected, (state, action) => {
      console.log("loginThunk.rejected리듀서의 state입니다 ::: ", state);
      return console.log(
        "loginThunk.rejected리듀서의 action.payload입니다 ::: ",
        action.payload
      );
      //   state.content = action.payload;
    });
  },
});

export default userSlice.reducer;
