import { combineReducers, configureStore } from "@reduxjs/toolkit";
import userSlice from "../reducers/userSlice";
import adminSlice from "../reducers/adminSlice";
const reducer = combineReducers({
  user: userSlice,
  admin: adminSlice,
});
export const store = configureStore({
  reducer,
});

export type TypeDispatch = typeof store.dispatch;
