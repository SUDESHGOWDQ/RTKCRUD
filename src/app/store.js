// src/app/store.js
import { configureStore } from "@reduxjs/toolkit";
import postsReducer from "../features/postsSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducer,
  },
});
