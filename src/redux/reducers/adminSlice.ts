import { createSlice } from "@reduxjs/toolkit";
import { verifyProblem } from "../actions/adminAction";

const intialState = {
  loading: false,
  message: null,
  error: null,
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
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyProblem.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyProblem.fulfilled, () => {})
      .addCase(verifyProblem.rejected, (state: any, { payload }) => {
        state.loading = false;
        state.error = payload;
      });
  },
});
export const { setLoader, setError, setMessage } = adminSlice.actions;
export default adminSlice.reducer;
