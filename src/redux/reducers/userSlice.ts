import { userLogin, userRegister } from "../actions/userActions";
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../interfaces/CustomJwtPayload";
import { getCookie, removeCookie } from "typescript-cookie";
const token = getCookie("userToken");
let user = null;
if (token) {
  const decoded = jwtDecode<CustomJwtPayload>(token);
  const role = decoded.role;
  const username = decoded.sub;
  user = {
    username: username,
    role: role,
  };
}

const intialState = {
  loading: false,
  user: user,
  message: null,
  error: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers: {
    logout: (state: any) => {
      console.log("hello");
      removeCookie("userToken");
      state.loading = false;
      state.user = null;
      state.error = null;
      state.message = "Logged out successfully";
    },
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
      .addCase(userLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(userLogin.rejected, (state: any, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
        console.log("pending");
      })
      .addCase(userRegister.fulfilled, (state: any) => {
        state.loading = false;
        state.error = null;
        state.message = "user registered successfully";
        console.log("success");
      })
      .addCase(userRegister.rejected, (state: any, action) => {
        state.loading = false;
        state.error = action.payload;
        console.log("rejected");
      });
  },
});
export const { logout, setLoader, setError, setMessage } = userSlice.actions;
export default userSlice.reducer;
