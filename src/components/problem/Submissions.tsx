import instance from "@/config/axiosConfig";
import { SUBMISSION_SERVICE_URL } from "@/constants/service_urls";
import { IProblemData } from "@/pages/admin/AdminProblems";
import { SolutionResponse } from "@/pages/problem/Problem";
import React, { useEffect, useState } from "react";
import { BsClock, BsCpu, BsMemory } from "react-icons/bs";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
interface Props {
  problemInfo: IProblemData;
  submissionResponse: SolutionResponse | null;
}
export interface ISubmissionData {
  averageMemory: number;
  averageTime: number;
  submissionStatus: string;
  submittedAt: string;
}
function Submissions({ problemInfo, submissionResponse }: Props) {
  const [submissionDatas, setSubmissionDatas] = useState<ISubmissionData[]>([]);
  const { user } = useSelector((state: any) => state.user);
  const fetchData = async () => {
    try {
      const response = await instance.get(
        `${SUBMISSION_SERVICE_URL}/user/get-problem-submission/${problemInfo.problemId}`
      );
      console.log(response);
      setSubmissionDatas(response.data);
    } catch (e: any) {
      toast.error(e.message);
      console.error(e);
    }
  };
  useEffect(() => {
    if (!user) {
      return;
    }
    console.log("FROM SUBMISSIONS : ", submissionResponse);
    fetchData();
  }, [submissionResponse]);
  return (
    <>
      <div className="text-white p-10 font-semibold text-3xl">Submissions</div>
      <div className="">
        {!user && (
          <div className="text-center text-gray-400 font-semibold">
            Please login to see your submssions to this problem.
          </div>
        )}
        {user && !submissionDatas && (
          <div>You have done no submssions to this problem yet!</div>
        )}
        {submissionDatas && submissionDatas.length > 0 && (
          <div className="overflow-x-auto">
            <table className="w-full text-sm text-gray-300 dark:text-gray-400">
              <thead className="text-xs uppercase bg-gray-700 dark:bg-transparent dark:text-gray-400">
                <tr>
                  <th scope="col" className="py-3  px-6">
                    Submission Status
                  </th>
                  <th scope="col" className="py-3  px-6">
                    Average Memory
                  </th>
                  <th scope="col" className="py-3 px-6">
                    Average Time
                  </th>
                  <th scope="col" className="py-3 px-6">
                    submitted at
                  </th>
                </tr>
              </thead>
              <tbody>
                {submissionDatas.map((submissionData, index) => (
                  <tr
                    key={index}
                    className="border-b bg-transparent-800 border-gray-800 hover:bg-gray-800 hover:cursor-pointer"
                  >
                    <td
                      className={`py-4 px-6  whitespace-nowrap text-center font-semibold ${
                        submissionData.submissionStatus === "ACCEPTED"
                          ? "text-green-600"
                          : "text-red-600"
                      }`}
                    >
                      {submissionData.submissionStatus}
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="gap-2 flex justify-center items-center">
                        <BsCpu />
                        {submissionData.averageMemory} MB
                      </div>
                    </td>
                    <td className="py-4 px-6 text-center">
                      <div className="gap-2 flex justify-center items-center">
                        <BsClock />
                        {submissionData.averageTime} ms
                      </div>
                    </td>
                    <td className="text-center text-sm">
                      {submissionData.submittedAt}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </>
  );
}

export default Submissions;
