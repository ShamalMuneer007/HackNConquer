import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { IProblemData } from "../admin/AdminProblems";
import instance from "@/config/axiosConfig";
import {
  PROBLEM_SERVICE_URL,
  SUBMISSION_SERVICE_URL,
} from "@/constants/service_urls";
import { BsCheck2Circle, BsFunnelFill } from "react-icons/bs";
import { FaMagnifyingGlass } from "react-icons/fa6";
import { LANGUAGE_ID } from "@/constants/language";
import { DIFFICULTY_TEXT_COLOR } from "@/constants/style";
import { toast } from "react-toastify";
import PageInfo from "@/components/PageInfo";
import Loading from "@/components/Loading";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import { AxiosResponse } from "axios";
import IUserSolvedProblems from "@/interfaces/IUserSolvedProblems";

function ProblemSet() {
  const [problems, setProblems] = useState<IProblemData[]>([]);
  const [loader, setLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  const { user } = useSelector((state: RootState) => state.user);
  const [userSolvedSubmissions, setUserSolvedSubmissions] =
    useState<IUserSolvedProblems[]>();

  const fetchUserSolvedSubmissions = async () => {
    try {
      const response: AxiosResponse = await instance.get(
        `${SUBMISSION_SERVICE_URL}/user/get-solved-submissions`
      );
      console.log("UserHome submission response : ", response);
      setUserSolvedSubmissions(response.data);
    } catch (error: any) {
      if (!error.response || !error.response.data) {
        toast.error("Network error!");
        return;
      }
      console.error(error);
      if (error.status >= 400 && error.status < 500 && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    if (user) {
      fetchUserSolvedSubmissions();
    }
  }, [user]);
  useEffect(() => {
    setLoader(true);
    const requestedPage = parseInt(searchParams.get("page") || "1");
    const fetchProblems = async () => {
      try {
        const response = await instance.get(
          `${PROBLEM_SERVICE_URL}/get-all-problems?page=${requestedPage}`
        );
        setLoader(false);
        setProblems(response.data.problems.content);
        setTotalPages(response.data.problems.totalPages);
        if (requestedPage > response.data.problems.totalPages) {
          navigate(`?page=${response.data.problems.totalPages}`);
        }
      } catch (error: any) {
        console.log(error);
        setLoader(false);
        toast.error(error.message);
      }
    };

    fetchProblems();
  }, [searchParams, navigate]);
  useEffect(() => {
    console.log("Problems : ", problems);
  }, [problems]);
  return (
    <>
      <Loading loading={loader} />
      <div className="page-padding">
        <div className="flex justify-between mt-12 px-10">
          <div className="relative">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
              <FaMagnifyingGlass className="text-gray-300" />
            </div>
            <input
              className="block w-full h-10 pl-10 pr-3 py-2 border focus:border-none bg-transparent rounded-md text-white placeholder-white focus:outline-none focus:ring-1 focus:ring-offset-0 focus:ring-offset-primary focus:ring-primary placeholder:text-gray-400/60"
              placeholder="Search..."
            />
          </div>
          <div className="flex">
            <div className="px-5 text-white items-center gap-2 justify-center flex hover:text-primary transition-colors cursor-pointer">
              <BsFunnelFill className="text-lg" />
              Filter
            </div>
          </div>
        </div>
        <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
          <table className="w-full text-sm text-left rtl:text-right  dark:text-dark-600">
            <thead className="text-xs text-dark-700 uppercase bg-dark-50 dark:bg-dark-300 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3"></th>
                <th scope="col" className="px-6 py-3">
                  Problem Number
                </th>
                <th scope="col" className="px-6 py-3">
                  Problem name
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Difficulty
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Acceptance
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  <div className="flex items-center">
                    Language
                    <a href="#">
                      <svg
                        className="w-3 h-3 ms-1.5"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path d="M8.574 11.024h6.852a2.075 2.075 0 0 0 1.847-1.086 1.9 1.9 0 0 0-.11-1.986L13.736 2.9a2.122 2.122 0 0 0-3.472 0L6.837 7.952a1.9 1.9 0 0 0-.11 1.986 2.074 2.074 0 0 0 1.847 1.086Zm6.852 1.952H8.574a2.072 2.072 0 0 0-1.847 1.087 1.9 1.9 0 0 0 .11 1.985l3.426 5.05a2.123 2.123 0 0 0 3.472 0l3.427-5.05a1.9 1.9 0 0 0 .11-1.985 2.074 2.074 0 0 0-1.846-1.087Z" />
                      </svg>
                    </a>
                  </div>
                </th>
              </tr>
            </thead>
            <tbody>
              {problems.map((problem) => {
                const isSolved = userSolvedSubmissions?.some(
                  (submission) => submission.problemId === problem.problemId
                );
                return (
                  <tr
                    key={problem.problemId}
                    className="border-b dark:bg-dark-200 hover:bg-dark-100 transition-all dark:border-gray-800 cursor-pointer"
                    onClick={() => navigate(`/problems/${problem.problemNo}`)}
                  >
                    <td
                      scope="row"
                      className="py-4 text-center  flex justify-center mx-auto whitespace-nowrap dark:text-white"
                    >
                      {isSolved && (
                        <div>
                          {" "}
                          <BsCheck2Circle className="text-primary" />
                        </div>
                      )}
                    </td>
                    <th
                      scope="row"
                      className="px-20 py-4  whitespace-nowrap dark:text-white"
                    >
                      {problem.problemNo}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 whitespace-nowrap dark:text-white"
                    >
                      {problem.problemName}
                    </th>
                    <td
                      className={`px-6 py-4 font-bold ${
                        DIFFICULTY_TEXT_COLOR[problem.difficulty]
                      }`}
                    >
                      {problem.difficulty}
                    </td>
                    <td className="px-6 py-4 ">{problem.acceptanceRate} % </td>
                    <td className="px-6 py-4">
                      {Object.keys(LANGUAGE_ID).find(
                        (key) => LANGUAGE_ID[key] === problem.languageId
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
        <div className="flex justify-center my-8">
          {totalPages > 1 && (
            <PageInfo
              currentPage={parseInt(searchParams.get("page") || "1")}
              totalPages={totalPages}
            />
          )}
        </div>
      </div>
    </>
  );
}

export default ProblemSet;
