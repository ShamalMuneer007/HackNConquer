import { IProblemData } from "@/pages/admin/AdminProblems";
import { useEffect, useState } from "react";
import Description from "./Description";
import Submissions, { ISubmissionData } from "./Submissions";
import { SolutionResponse } from "@/pages/problem/Problem";
import instance from "@/config/axiosConfig";
import { toast } from "react-toastify";
import { SUBMISSION_SERVICE_URL } from "@/constants/service_urls";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import Discussion from "./Discussion";
interface Props {
  problemInfo: IProblemData;
  submissionResponse: SolutionResponse | null;
}
function ProblemDetailWindow({ problemInfo, submissionResponse }: Props) {
  const [window, setWindow] = useState(1);
  const [submissionDatas, setSubmissionDatas] = useState<ISubmissionData[]>();
  const changeWindow = (windowNumber: number) => {
    setWindow(windowNumber);
  };
  const { user } = useSelector((state: RootState) => state.user);
  const fetchSubmissionData = async () => {
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
    if (user) {
      fetchSubmissionData();
    }
  }, []);
  return (
    <div className="h-full relative overflow-scroll scrollbar-hide w-full  bg-dark-100">
      {/* <div className="fixed inset-0 top-0  bg-gray-800 opacity-50"></div>    */}
      <div className="z-10 sticky bg-dark-200 rounded-t-md top-0">
        <div className=" text-white w-full p-4">
          <div className="w-full flex gap-10 justify-center">
            <button
              className={`${
                window == 1 ? " text-primary" : "hover:text-primary "
              } transition-all`}
              onClick={() => changeWindow(1)}
            >
              Description
            </button>
            <button
              className={`${
                window == 2 ? "text-primary" : "hover:text-primary "
              } transition-all`}
              onClick={() => changeWindow(2)}
            >
              Submissions
            </button>
            <button
              className={`${
                window == 3 ? " text-primary" : "hover:text-primary "
              } transition-all`}
              onClick={() => changeWindow(3)}
            >
              Discussions
            </button>
            {/* <button
              className={`${
                window == 4 ? " text-primary" : "hover:text-primary "
              } transition-all`}
              onClick={() => changeWindow(4)}
            >
              Solutions
            </button> */}
          </div>
        </div>
        <hr />
      </div>
      <div className="flex absolute w-full text-bold text-primary justify-end  text-sm pe-10 py-2">
        {submissionDatas?.some(
          (submissionData) => submissionData.submissionStatus === "ACCEPTED"
        ) && "SOLVED"}
      </div>
      {window == 1 && <Description problemInfo={problemInfo} />}
      {window == 2 && (
        <Submissions
          submissionResponse={submissionResponse}
          fetchSubmissionData={fetchSubmissionData}
          problemInfo={problemInfo}
          submissionDatas={submissionDatas}
        />
      )}
      {window == 3 && <Discussion problemData={problemInfo} />}
    </div>
  );
}

export default ProblemDetailWindow;
