import {
  userLogin,
  userOauthLogin,
  userRegister,
} from "../actions/userActions";
import { createSlice } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../interfaces/CustomJwtPayload";
import { getCookie, removeCookie } from "typescript-cookie";
import instance from "@/config/axiosConfig";
import { AxiosResponse } from "axios";
import { USER_SERVICE_URL } from "@/constants/service_urls";
import { useRouteLoaderData } from "react-router-dom";
import IUserState from "@/interfaces/IUserState";

const token = getCookie("userToken");
let user = null;
if (token) {
  const decoded = jwtDecode<CustomJwtPayload>(token);
  if (decoded.exp * 1000 < Date.now()) {
    console.log("Unauthorized request!");
    removeCookie("userToken");
  } else {
    try {
      console.log("USER TOKEN", token);
      const response: AxiosResponse = await instance.get(
        `${USER_SERVICE_URL}/user/fetch-userdata`
      );
      user = response.data;
    } catch (error: any) {
      console.error(error.message);
    }
  }
}

const intialState: IUserState = {
  loading: false,
  user: user,
  message: null,
  error: null,
  solvedProblems: null,
};

const userSlice = createSlice({
  name: "user",
  initialState: intialState,
  reducers: {
    logout: (state) => {
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
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
    setsolvedProblems: (state, action) => {
      state.solvedProblems = action.payload;
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
      .addCase(userLogin.rejected, (state, action) => {
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
      .addCase(userOauthLogin.rejected, (state, action) => {
        state.loading = false;
        state.user = null;
        state.error = action.payload;
      })
      //User Register Reducer
      .addCase(userRegister.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(userRegister.fulfilled, (state, { payload }: any) => {
        state.loading = false;
        state.error = null;
        console.log("Registration fulfilled message : ", payload.message);
        state.message = { message: payload.message, status: 200 };
        state.user = payload.userData ? payload.userData : null;
        console.log("Registration success");
      })
      .addCase(userRegister.rejected, (state: any, { payload }) => {
        state.loading = false;
        state.error = payload;
        console.log("Registration Rejected....", payload);
      });
    //Solved Submission Reducers
    // .addCase()
  },
});
export const {
  logout,
  setLoader,
  setError,
  setMessage,
  setUser,
  setsolvedProblems,
} = userSlice.actions;
export default userSlice.reducer;
