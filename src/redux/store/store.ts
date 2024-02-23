import { configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducers/userSlice";

export const store = configureStore({
  reducer: {
    user: userSlice,
  },
});

export type TypeDispatch = typeof store.dispatch;
