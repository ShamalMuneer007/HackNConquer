import {
  userLogin,
  userOauthLogin,
  userRegister,
} from "../actions/userActions";
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../interfaces/CustomJwtPayload";
import { getCookie, removeCookie, setCookie } from "typescript-cookie";
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
      //User Login reducers
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
      //user Oauth Login reducer
      .addCase(userOauthLogin.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userOauthLogin.fulfilled, (state, { payload }) => {
        state.loading = false;
        state.user = payload;
        state.error = null;
      })
      .addCase(userOauthLogin.rejected, (state: any, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      //User Register Reducer
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state: any, { payload }: any) => {
        const { accessToken, message } = payload;
        state.loading = false;
        state.error = null;
        state.message = { message, status: 200 };
        console.log("Register action fullfilled: ", payload);
        if (!accessToken) {
          state.user = null;
          return;
        }
        const decodedJwt = jwtDecode<CustomJwtPayload>(accessToken);
        setCookie("userToken", accessToken);
        state.user = {
          username: decodedJwt.sub,
          role: decodedJwt.role,
        };
        console.log("Registration success");
      })
      .addCase(userRegister.rejected, (state: any, { payload }) => {
        state.loading = false;
        state.error = payload;
        console.log("Registration Rejected....", payload);
      });
  },
});
export const { logout, setLoader, setError, setMessage } = userSlice.actions;
export default userSlice.reducer;
