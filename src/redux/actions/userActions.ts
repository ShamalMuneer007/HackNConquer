import instance from "../../config/axiosConfig";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { jwtDecode } from "jwt-decode";
import { CustomJwtPayload } from "../../interfaces/CustomJwtPayload";
import { setCookie } from "typescript-cookie";
import IUserInformation from "../../interfaces/IUserInformation";

export const userLogin = createAsyncThunk(
  "user/userLogin",
  async (
    userCredentials: IUserInformation,
    { rejectWithValue }: any
  ): Promise<any> => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      const response = await instance.post(
        "/auth/login",
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
        return rejectWithValue(
          "An error occurred while processing your request."
        );
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
      const response = await instance.post(`/auth/register`, userData, config);
      console.log(response);
      if (response && response.data && response.data.error) {
        return rejectWithValue(response.data.error);
      }
    } catch (error: any) {
      console.log(error);
      if (error.response.data) {
        console.log(error.response.data);
        return rejectWithValue(error.response.data);
      } else {
        return rejectWithValue(
          "An error occurred while processing your request."
        );
      }
    }
  }
);
