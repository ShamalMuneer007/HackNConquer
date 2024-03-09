import { createSlice } from "@reduxjs/toolkit";
import { verifyProblem } from "../actions/adminAction";

const intialState = {
  loading: false,
  message: null,
  error: null,
  result: null,
};

const adminSlice = createSlice({
  name: "admin",
  initialState: intialState,
  reducers: {
    setLoader: (state, action) => {
      state.loading = action.payload;
    },
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setResult: (state, action) => {
      state.result = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyProblem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
        state.message = null;
      })
      .addCase(verifyProblem.fulfilled, (state, { payload }) => {
        console.log("REQUEST SUCCESS : ", payload);
        state.loading = false;
        state.error = null;
        state.result = payload;
        state.message = null;
      })
      .addCase(verifyProblem.rejected, (state: any, { payload }) => {
        console.log("ERROR : ", payload);
        state.loading = false;
        state.error = payload;
        state.result = null;
        state.message = null;
      });
  },
});
export const { setLoader, setError, setMessage, setResult } =
  adminSlice.actions;
export default adminSlice.reducer;
