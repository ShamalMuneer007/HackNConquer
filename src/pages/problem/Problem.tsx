import instance from "@/config/axiosConfig";
import {
  PROBLEM_SERVICE_URL,
  SUBMISSION_SERVICE_URL,
} from "@/constants/service_urls";
import { useEffect, useState } from "react";

import { useParams } from "react-router-dom";
import { IProblemData } from "../admin/AdminProblems";
import { toast } from "react-toastify";
import Loading from "@/components/Loading";
import {
  ResizableHandle,
  ResizablePanelGroup,
  ResizablePanel,
} from "@/shadcn/ui/resizable";
import ProblemDetailWindow from "@/components/problem/ProblemDetailWindow";
import { useSelector } from "react-redux";
import SolutionWindow from "@/components/problem/SolutionWindow";
import SubmissionResponseWindow from "@/components/problem/SubmissionResponseWindow";
import { AxiosResponse } from "axios";

export interface SubmissionTestCase {
  input: string;
  output: string;
  expectedOutput?: string;
}
export interface SolutionResponse {
  acceptedCases: SubmissionTestCase[];
  rejectedCases: SubmissionTestCase[];
  averageTime: number;
  averageMemory: number;
  submissionStatus: string;
  totalTestCases: number;
}
function Problem() {
  const { problemNumber } = useParams();
  const [problemInfo, setProblemInfo] = useState<IProblemData>();
  const [loading, setLoading] = useState(false);
  const [language, setLanguage] = useState("");
  const [solutionCode, setSolutionCode] = useState<string | undefined>("");
  const [errorResponse, setErrorResponse] = useState("");
  const [submissionResponse, setSubmissionResponse] =
    useState<SolutionResponse | null>(null);
  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await instance.get(
        `${PROBLEM_SERVICE_URL}/get-problem-info/${problemNumber}`
      );
      if (response.status === 200) {
        setProblemInfo(response.data);
      }
    } catch (error: any) {
      if (error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchData();
  }, [problemNumber]);
  useEffect(() => {
    setSolutionCode(problemInfo?.solutionTemplate);
  }, [problemInfo]);
  const { user } = useSelector((state: any) => state.user);

  const handleCodeSubmission = () => {
    setSubmissionResponse(null);
    setErrorResponse("");
    if (!user) {
      toast.error("Please login to submit your solution", {
        draggable: true,
      });
      return;
    }
    const submitSolution = async () => {
      setLoading(true);
      console.log("USER DATA  :", user);
      const submissionData = {
        userId: user.userId,
        problemId: problemInfo?.problemId,
        languageId: problemInfo?.languageId,
        solutionCode,
        driverCode: problemInfo?.driverCode,
        problemLevel: problemInfo?.problemLevel,
      };
      console.log(submissionData);
      try {
        const response: AxiosResponse<SolutionResponse> = await instance.post(
          `${SUBMISSION_SERVICE_URL}/user/submit-solution`,
          submissionData
        );
        setSubmissionResponse(response.data);
        console.log(response);
      } catch (error: any) {
        console.error(error);
        if (error.response && error.response.status >= 500) {
          toast.error("Something went wrong... Please try again later");
        }
        if (
          error.response &&
          error.response.data &&
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          console.log("CLIENT ERROR : ", error.response);
          setErrorResponse(error.response.data.message);
        }
      } finally {
        setLoading(false);
      }
    };
    submitSolution();
  };
  return (
    <>
      <Loading loading={loading} />
      <div className="mt-[4.3%] h-[90vh] rounded-xl overflow-hidden">
        {problemInfo && (
          <div className="h-screen">
            <ResizablePanelGroup direction="horizontal">
              <ResizablePanel defaultSize={44}>
                <ProblemDetailWindow
                  problemInfo={problemInfo}
                  submissionResponse={submissionResponse}
                />
              </ResizablePanel>
              <ResizableHandle
                withHandle
                className="hover:bg-green-700/50 text-white active:bg-green-700/50 flex justify-center items-center w-[0.3rem] h-full"
              />
              <ResizablePanel>
                <ResizablePanelGroup direction="vertical" className="h-100vh">
                  <ResizablePanel defaultSize={60}>
                    <SolutionWindow
                      handleCodeSubmission={handleCodeSubmission}
                      problemInfo={problemInfo}
                      setSolutionCode={setSolutionCode}
                    />
                  </ResizablePanel>
                  <ResizableHandle
                    withHandle
                    className="hover:bg-green-700/50 text-white active:bg-green-700/50 flex justify-center items-center w-[0.3rem] h-full"
                  />
                  <ResizablePanel>
                    <SubmissionResponseWindow
                      submissionResponse={submissionResponse}
                      errorResponse={errorResponse}
                    />
                  </ResizablePanel>
                </ResizablePanelGroup>
              </ResizablePanel>
            </ResizablePanelGroup>
          </div>
        )}
      </div>
    </>
  );
}

export default Problem;
