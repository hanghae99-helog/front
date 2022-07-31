import { configureStore } from "../../node_modules/@reduxjs/toolkit/dist/configureStore";
import userSlice from "./modules/userSlice";

const store = configureStore({
  reducer: { userSlice },
});

export default store;
