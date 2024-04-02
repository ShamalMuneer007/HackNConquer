import instance from "@/config/axiosConfig";
import { PROBLEM_ADMIN_SERVICE_URL } from "@/constants/service_urls";
import { TestCase } from "@/interfaces/TestCase";
import { TestExample } from "@/pages/admin/AddProblem";
import { createAsyncThunk } from "@reduxjs/toolkit";
interface IProblemCode {
  sourceCode: string;
  testCases: TestCase[];
  languageId: number;
}
export interface ProblemDetails {
  problemName: string;
  description: string;
  driverCode: string;
  testCases: TestCase[];
  solutionTemplate: string;
  level: number;
  categories?: string[];
  languageId: number;
  difficulty: string;
  examples?: TestExample[];
  problemLevel: number;
}

//verify problem
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

//add problem
export const addProblem = createAsyncThunk(
  "admin/addProblem",
  async (problem: ProblemDetails, { rejectWithValue }): Promise<any> => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("PROBLEM DETAILS : ", problem);
      const response = await instance.post(
        PROBLEM_ADMIN_SERVICE_URL + "/add-problem",
        problem,
        config
      );
      const data = response.data;
      console.log("SUCCESS DATA:", data);
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

//add Category
export const addCategory = createAsyncThunk(
  "admin/addCategory",
  async (category: any, { rejectWithValue }): Promise<any> => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      console.log("PROBLEM DETAILS : ", category);
      const response = await instance.post(
        PROBLEM_ADMIN_SERVICE_URL + "/add-category",
        category,
        config
      );
      const data = response.data;
      console.log("SUCCESS DATA:", data);
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
