import instance from "../../config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../interfaces/CustomJwtPayload";
import { setCookie } from "typescript-cookie";
import IUserInformation from "../../interfaces/IUserInformation";
import { USER_SERVICE_URL } from "../../constants/service_urls";

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
      const decodedJwt = jwtDecode<CustomJwtPayload>(data.accessToken);
      setCookie("userToken", data.accessToken);
      return {
        username: decodedJwt.sub,
        role: decodedJwt.role,
      };
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
      const decodedJwt = jwtDecode<CustomJwtPayload>(data.accessToken);
      setCookie("userToken", data.accessToken);
      return {
        username: decodedJwt.sub,
        role: decodedJwt.role,
      };
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
      return response.data;
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
