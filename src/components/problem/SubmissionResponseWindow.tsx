import { SolutionResponse } from "@/pages/problem/Problem";
import { useEffect, useState } from "react";
import { BsClock, BsCpu } from "react-icons/bs";

interface Props {
  submissionResponse: SolutionResponse | null;
  errorResponse: string;
}
function SubmissionResponseWindow({
  submissionResponse,
  errorResponse,
}: Props) {
  const [result, setResult] = useState<JSX.Element>(<></>);
  const [acceptedOpen, setAcceptedOpen] = useState(false);
  const [rejectedOpen, setRejectedOpen] = useState(false);

  const toggleDropdown = (e: any) => {
    if (e.target.name === "accepted") {
      setAcceptedOpen(!acceptedOpen);
    } else {
      setRejectedOpen(!rejectedOpen);
    }
  };

  useEffect(() => {
    const resultEle = (
      <>
        <div className="flex gap-5 items-center text-gray-400">
          <div
            className={`${
              submissionResponse?.submissionStatus === "ACCEPTED"
                ? "text-green-400"
                : "text-red-600"
            } font-bold text-xl  px-5 pt-0`}
          >
            {submissionResponse?.submissionStatus === "ACCEPTED"
              ? "ACCEPTED"
              : "WRONG ANSWER"}
          </div>
          <div className="font-semibold flex items-center gap-2 text-sm">
            <BsCpu className="text-base" /> Memory :{" "}
            {submissionResponse?.averageMemory} MB
          </div>
          |
          <div className="font-semibold flex items-center gap-2 text-sm">
            <BsClock className="text-base" />
            Time : {submissionResponse?.averageTime} ms
          </div>
        </div>
        <hr className="mt-4" />
        <div className="p-5 mb-2  justify-center items-center">
          <div className="flex flex-col gap-5">
            <div>
              <span className="font-bold text-green-600">Accepted Cases</span>
              <span>
                {" "}
                : {submissionResponse?.acceptedCases.length} /
                {submissionResponse?.totalTestCases}
              </span>
            </div>
            {submissionResponse?.acceptedCases &&
              submissionResponse?.acceptedCases.length > 0 && (
                <div className="w-full mb-4">
                  <div className="">
                    <button
                      type="button"
                      name="accepted"
                      className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-white bg-green-500 rounded-lg hover:bg-green-600 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75"
                      id="accepted-cases-dropdown"
                      aria-haspopup="true"
                      aria-expanded={acceptedOpen}
                      onClick={(e) => toggleDropdown(e)}
                    >
                      <span>
                        Accepted Cases (
                        {submissionResponse?.acceptedCases.length})
                      </span>
                      <svg
                        className={`w-5 h-5 ml-2 -mr-1 transition-transform ${
                          acceptedOpen ? "transform rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {acceptedOpen && (
                      <div
                        id="accepted-cases-dropdown-menu"
                        className="z-10 w-full bg-dark-100 rounded-t  rounded-lg shadow-lg"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="accepted-cases-dropdown"
                      >
                        {submissionResponse.acceptedCases.map(
                          (acceptedCase, index) => (
                            <div
                              key={index}
                              className="flex p-4 text-white rounded-md "
                              role="menuitem"
                            >
                              <span className="pe-5 text-primary">
                                {index + 1}
                              </span>
                              <div className="flex flex-col gap-2">
                                <div>
                                  <span className="font-semibold">Input:</span>{" "}
                                  {acceptedCase.input.split("\n")[0]}
                                  {acceptedCase.input.split("\n")[1] &&
                                    `,  ${acceptedCase.input.split("\n")[1]}`}
                                </div>
                                <div>
                                  <span className="font-semibold">Output:</span>{" "}
                                  {acceptedCase.output}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
          <div className="flex flex-col gap-5">
            <div>
              <span className="font-bold text-red-600">Rejected Cases</span>
              <span>
                {" "}
                : {submissionResponse?.rejectedCases.length} /
                {submissionResponse?.totalTestCases}
              </span>
            </div>
            {submissionResponse?.rejectedCases &&
              submissionResponse?.rejectedCases.length > 0 && (
                <div className="w-full mb-4">
                  <div className="">
                    <button
                      type="button"
                      className="flex items-center justify-between w-full px-4 py-2 text-sm font-medium text-left text-white bg-red-500 rounded-lg hover:bg-red-600 focus:outline-none focus-visible:ring focus-visible:ring-green-500 focus-visible:ring-opacity-75"
                      id="accepted-cases-dropdown"
                      aria-haspopup="true"
                      aria-expanded={rejectedOpen}
                      name="rejected"
                      onClick={(e) => toggleDropdown(e)}
                    >
                      <span>
                        Rejected Cases (
                        {submissionResponse?.rejectedCases.length})
                      </span>
                      <svg
                        className={`w-5 h-5 ml-2 -mr-1 transition-transform ${
                          rejectedOpen ? "transform rotate-180" : ""
                        }`}
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                        aria-hidden="true"
                      >
                        <path
                          fillRule="evenodd"
                          d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </button>
                    {rejectedOpen && (
                      <div
                        id="accepted-cases-dropdown-menu"
                        className="z-10 w-full bg-dark-100 rounded-t  rounded-lg shadow-lg"
                        role="menu"
                        aria-orientation="vertical"
                        aria-labelledby="accepted-cases-dropdown"
                      >
                        {submissionResponse?.rejectedCases.map(
                          (rejectedCase, index) => (
                            <div
                              key={index}
                              className="flex p-4 text-white rounded-md "
                              role="menuitem"
                            >
                              <span className="pe-5 text-primary">
                                {index + 1}
                              </span>
                              <div className="flex flex-col gap-2">
                                <div>
                                  <span className="font-semibold">
                                    Input :{" "}
                                  </span>{" "}
                                  {rejectedCase.input.split("\n")[0]}
                                  {rejectedCase.input.split("\n")[1] &&
                                    `,  ${rejectedCase.input.split("\n")[1]}`}
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    Output :{" "}
                                  </span>{" "}
                                  {rejectedCase.output}
                                </div>
                                <div>
                                  <span className="font-semibold">
                                    Expected Output :{" "}
                                  </span>{" "}
                                  {rejectedCase.expectedOutput}
                                </div>
                              </div>
                            </div>
                          )
                        )}
                      </div>
                    )}
                  </div>
                </div>
              )}
          </div>
        </div>
      </>
    );
    setResult(resultEle);
  }, [submissionResponse, rejectedOpen, acceptedOpen]);
  return (
    <>
      <div className="h-full bg-dark-200 rounded-b-lg relative overflow-y-scroll scrollbar-hide">
        <div className="bg-dark-300 w-full flex items-center text-white p-6 h-10 sticky top-0">
          Test results
        </div>
        <div className="p-5">
          <div className="h-full text-white">
            {submissionResponse ? (
              result
            ) : errorResponse ? (
              <>
                <div className="flex gap-5 items-center text-gray-400">
                  <div className="text-red-600 font-bold text-xl  px-5 pt-0">
                    ERROR
                  </div>
                </div>
                <hr className="mt-4" />
                <div className="text-center mt-8 text-red-700 font-bold rounded w-full">
                  {errorResponse}
                </div>
              </>
            ) : (
              <div className="flex justify-center my-auto items-center h-52 font-semibold text-gray-500 text-lg">
                Please submit the solution
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default SubmissionResponseWindow;
