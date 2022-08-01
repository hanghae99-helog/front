import { configureStore } from "@reduxjs/toolkit";
import userSlice from "./modules/userSlice";

const store = configureStore({
  reducer: { userSlice },
});

export default store;
