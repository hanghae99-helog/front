import { configureStore } from "@reduxjs/toolkit";
import postingReducer from './module/PostingReducer';

const store = configureStore({
    reducer: {
        posting:postingReducer,

    }
})

export default store;