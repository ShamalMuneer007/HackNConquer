// import axios from "axios";
// const API = axios.create({
//   baseURL: "http://localhost:2358",
//   headers: {
//     "Content-Type": "application/json",
//     // "X-RapidAPI-Host": "judge0-ce.p.rapidapi.com",
//     // "X-RapidAPI-Key": "aa222fac37msh188bbcc062c6c7bp1daf0ajsn612c17023d4b",
//   },
//   params: {
//     base64_encoded: "true",
//     fields: "*",
//   },
// });

// interface execResult {
//   stdout: string;
//   stderr: string;
//   status_id: number;
//   compile_output: string;
// }
// export const executeCode = async (
//   languageId: number,
//   sourceCode: string
// ): Promise<execResult> => {
//   console.log("Language ID : ", languageId);
//   console.log(btoa(sourceCode));
//   const response = await API.post("/submissions", {
//     language_id: languageId,
//     source_code: btoa(sourceCode),
//     stdin: btoa("1 2 3 4 5"),
//   });
//   console.log(response);
//   let result;
//   do {
//     await new Promise((resolve) => setTimeout(resolve, 1500));
//     result = await API.get(`/submissions/${response.data.token}`);
//   } while (result.data.status_id < 3);
//   return result.data;
// };
