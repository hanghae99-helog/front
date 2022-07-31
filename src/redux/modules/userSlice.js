import { createAsyncThunk } from "../../../node_modules/@reduxjs/toolkit/dist/createAsyncThunk";
import { createSlice } from "../../../node_modules/@reduxjs/toolkit/dist/createSlice";
import { authApi } from "../../shared/axiosConfig";

// 로그인 요청
export const loginThunk = createAsyncThunk("user/login", async (loginData) => {
  const loginRes = await authApi.signup(loginData);
  console.log("loginThunk 안 입니다 ::: ", loginRes);
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
