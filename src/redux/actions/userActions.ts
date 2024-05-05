import instance from "../../config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../interfaces/CustomJwtPayload";
import { getCookie, setCookie } from "typescript-cookie";
import IUserInformation from "../../interfaces/IUserInformation";
import {
  SUBMISSION_SERVICE_URL,
  USER_SERVICE_URL,
} from "../../constants/service_urls";

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (
    userCredentials: IUserInformation,
    { rejectWithValue }
  ): Promise<any> => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await instance.post(
        USER_SERVICE_URL + "/auth/login",
        userCredentials,
        config
      );
      const data = response.data;
      setCookie("userToken", data.accessToken);
      const userInfoResponse = await instance.get(
        `${USER_SERVICE_URL}/user/fetch-userdata`
      );
      return userInfoResponse.data;
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);

export const userOauthLogin = createAsyncThunk(
  "user/userOauthLogin",
  async (oauthToken: string | undefined, { rejectWithValue }): Promise<any> => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await instance.post(
        USER_SERVICE_URL + "/auth/google/oauth/login",
        oauthToken,
        config
      );
      const data = response.data;
      setCookie("userToken", data.accessToken);
      const userInfoResponse = await instance.get(
        `${USER_SERVICE_URL}/user/fetch-userdata`
      );
      return userInfoResponse.data;
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.status) {
        return rejectWithValue(error.response.status);
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
// export const fetchUserData = createAsyncThunk(
//   "user/fetUserData",
//   async ({}, { rejectWithValue }) => {
//     let token = getCookie("userToken");
//     try {
//       if (token) {
//         const userInfoResponse = await instance.get(
//           `${USER_SERVICE_URL}/user/fetch-userdata`
//         );
//         return { data: userInfoResponse };
//       }
//     } catch (error: any) {
//       console.error(error);
//       if (error.response && error.response.data) {
//         return rejectWithValue({
//           status: error.response.status,
//           message: error.response.data.message,
//         });
//       } else {
//         return rejectWithValue(error.message);
//       }
//     }
//   }
// );
// export const userSolvedSubmissions = createAsyncThunk(
//   "user/userSolvedSubmissions",
//   async ({}, { rejectWithValue }) => {
//     const token = getCookie("userToken");
//     try {
//       if (token) {
//         const userSolvedSubmissions = await instance.get(
//           `${SUBMISSION_SERVICE_URL}/user/get-solved-submissions`
//         );
//         return { data: userSolvedSubmissions };
//       } else {
//         console.warn("no token");
//       }
//     } catch (error: any) {
//       console.error(error);
//       if (error.response && error.response.data) {
//         return rejectWithValue({
//           status: error.response.status,
//           message: error.response.data.message,
//         });
//       } else {
//         return rejectWithValue({
//           status: error.status,
//           message: error.message,
//         });
//       }
//     }
//   }
// );
export const userRegister = createAsyncThunk(
  "user/userRegister",
  async (userData: IUserInformation, { rejectWithValue }) => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await instance.post(
        USER_SERVICE_URL + "/auth/register",
        userData,
        config
      );
      if (response && response.data && response.data.error) {
        return rejectWithValue(response.data.error);
      }
      if (response.data.accessToken) {
        setCookie("userToken", response.data.accessToken);
        const userInfoResponse = await instance.get(
          `${USER_SERVICE_URL}/user/fetch-userdata`
        );
        return {
          userData: userInfoResponse.data,
          message: response.data.message,
        };
      } else {
        return {
          message: response.data.message,
        };
      }
    } catch (error: any) {
      console.error(error);
      if (error.response && error.response.data) {
        return rejectWithValue({
          status: error.response.status,
          message: error.response.data.message,
        });
      } else {
        return rejectWithValue(error.message);
      }
    }
  }
);
