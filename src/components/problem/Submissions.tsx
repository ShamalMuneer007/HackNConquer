import instance from "@/config/axiosConfig";
import { SUBMISSION_SERVICE_URL } from "@/constants/service_urls";
import { IProblemData } from "@/pages/admin/AdminProblems";
import React, { useEffect, useState } from "react";
interface Props {
  problemInfo: IProblemData;
}
export interface ISubmissionData {
  averageMemory: number;
  averageTime: number;
  submissionStatus: string;
}
function Submissions({ problemInfo }: Props) {
  const [submissionDatas, setSubmissionDatas] = useState<ISubmissionData[]>([]);
  const fetchData = async () => {
    const response = await instance.get(
      `${SUBMISSION_SERVICE_URL}/get-submissions/${problemInfo.problemId}`
    );
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <>
      <div className="text-white p-10 font-semibold text-3xl">Submissions</div>
      <div className="">
        {submissionDatas.map((submissionData) => (
          <>
            <div className="flex">
              <div>{submissionData.submissionStatus}</div>
              <div>{submissionData.averageMemory}</div>
              <div>{submissionData.averageTime}</div>
            </div>
          </>
        ))}
      </div>
    </>
  );
}

export default Submissions;
