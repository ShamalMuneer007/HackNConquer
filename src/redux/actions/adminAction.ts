import instance from "@/config/axiosConfig";
import { PROBLEM_ADMIN_SERVICE_URL } from "@/constants/service_urls";
import { TestCase } from "@/interfaces/TestCase";
import { createAsyncThunk } from "@reduxjs/toolkit";
interface IProblemCode {
  sourceCode: string;
  testCases: TestCase[];
  languageId: number;
}
export const verifyProblem = createAsyncThunk(
  "admin/verifyProblem",
  async (problemCode: IProblemCode, { rejectWithValue }): Promise<any> => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("PROBLEM DETAILS : ", problemCode);
      const response = await instance.post(
        PROBLEM_ADMIN_SERVICE_URL + "/verify-problem",
        problemCode,
        config
      );
      const data = response.data;
      console.log(data);
      return data;
    } catch (error: any) {
      console.log("ERROR : ", error);
      if (error.response) {
        if (error.response.data && error.response.data.message) {
          console.log(error);
          return rejectWithValue(error.response.data);
        }
      } else {
        return rejectWithValue({
          message: error.message,
          status: error.status,
        });
      }
    }
  }
);
