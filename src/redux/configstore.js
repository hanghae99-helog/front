import { configureStore } from "@reduxjs/toolkit";
import commentSlice from './module/commentSlice';

const store = configureStore({
    reducer: {
        comments: commentSlice,
    }
})

export default store;