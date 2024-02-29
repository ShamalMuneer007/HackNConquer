import instance from "@/config/axiosConfig";
import { PROBLEM_SERVICE_URL } from "@/constants/service_urls";
import { TestCase } from "@/interfaces/TestCase";
import { createAsyncThunk } from "@reduxjs/toolkit";
interface IProblemCode {
  sourceCode: string;
  testCases: TestCase<String>[];
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
      const response = await instance.post(
        PROBLEM_SERVICE_URL + "/problem/verify-problem",
        problemCode,
        config
      );
      const data = response.data;
      return {
        status: data.status,
        message: data.message,
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
