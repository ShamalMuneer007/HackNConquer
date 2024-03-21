import { createSlice } from "@reduxjs/toolkit";
import { addCategory, addProblem, verifyProblem } from "../actions/adminAction";

const intialState = {
  loading: false as boolean | null,
  message: null as string | null,
  error: null as any | null,
  response: null as any | null,
  result: null as any | null,
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
    setResponse: (state, action) => {
      state.response = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(verifyProblem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
        state.message = null;
        state.response = null;
      })
      .addCase(verifyProblem.fulfilled, (state, { payload }) => {
        console.log("REQUEST SUCCESS : ", payload);
        state.loading = false;
        state.error = null;
        state.result = payload;
        state.response = null;
        state.message = null;
      })
      .addCase(verifyProblem.rejected, (state: any, { payload }) => {
        console.log("ERROR : ", payload);
        state.loading = false;
        state.error = payload;
        state.result = null;
        state.response = null;
        state.message = null;
      })
      //Add problem
      .addCase(addProblem.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
        state.message = null;
        state.response = null;
      })
      .addCase(addProblem.fulfilled, (state, { payload }) => {
        console.log("REQUEST SUCCESS : ", payload);
        state.loading = false;
        state.error = null;
        state.result = null;
        state.response = payload;
        state.message = null;
      })
      .addCase(addProblem.rejected, (state: any, { payload }) => {
        console.log("ERROR : ", payload);
        state.loading = false;
        state.error = payload;
        state.result = null;
        state.response = null;
        state.message = null;
      })
      //Add category
      .addCase(addCategory.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.result = null;
        state.message = null;
        state.response = null;
      })
      .addCase(addCategory.fulfilled, (state, { payload }) => {
        console.log("REQUEST SUCCESS : ", payload);
        state.loading = false;
        state.error = null;
        state.result = null;
        state.response = payload;
        state.message = null;
      })
      .addCase(addCategory.rejected, (state: any, { payload }) => {
        console.log("ERROR : ", payload);
        state.loading = false;
        state.error = payload;
        state.result = null;
        state.response = null;
        state.message = null;
      });
  },
});
export const { setLoader, setError, setMessage, setResult } =
  adminSlice.actions;
export default adminSlice.reducer;
