import Loading from "@/components/Loading";
import PageInfo from "@/components/PageInfo";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import instance from "@/config/axiosConfig";
import { LANGUAGE_ID } from "@/constants/language";
import {
  PROBLEM_ADMIN_SERVICE_URL,
  PROBLEM_SERVICE_URL,
} from "@/constants/service_urls";
import { DIFFICULTY_TEXT_COLOR } from "@/constants/style";
import { TestCase } from "@/interfaces/TestCase";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { BsFunnelFill, BsPencilSquare, BsTrash } from "react-icons/bs";
import { FaMagnifyingGlass, FaPuzzlePiece } from "react-icons/fa6";
import { Oval, Rings } from "react-loader-spinner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
export interface IProblemData {
  problemName: string;
  description: string;
  category: IProblemCategory[];
  problemNo: number;
  problemId: string;
  languageId: number;
  difficulty: string;
  driverCode: string;
  solutionTemplate: string;
  testCases: TestCase[];
  updatedAt: string;
  createdAt: string;
}
export interface IProblemCategory {
  categoryName: string;
  createdAt: string;
  updatedAt: string;
}
function AdminProblems() {
  const [problems, setProblems] = useState<IProblemData[]>([]);
  const [loader, setLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProblemId, setSelectedProblemId] = useState("");
  const [deleteModal, setDeleteModal] = useState(false);
  const navigate = useNavigate();
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
  useEffect(() => {
    if (!deleteModal) {
      setSelectedProblemId("");
    }
  }, [deleteModal]);
  const deleteProblem = (problemId: string) => {
    setSelectedProblemId(problemId);
    setDeleteModal(true);
  };

  const renderEmptyState = () => (
    <div className="h-[74vh] w-full -mt-10 flex justify-center items-center">
      <Link
        to={"/admin/problems/add-problem"}
        className="text-white flex flex-col hover:text-primary transition-colors cursor-pointer"
      >
        <div className="text-5xl mx-auto">
          <FaPuzzlePiece />
        </div>
        <div className="text-3xl">Add problem</div>
      </Link>
    </div>
  );

  const renderProblemsList = () => (
    <>
      <div className="w-full -mt-9 flex justify-end">
        <Link
          to={"/admin/problems/add-problem"}
          className="text-white me-10  flex border text-xl justify-center items-center hover:border-primary rounded-full p-2 hover:text-white hover:bg-primary transition-colors cursor-pointer"
          title="Add problem"
        >
          <PlusIcon />
        </Link>
      </div>
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
        <table className="w-full text-sm text-left rtl:text-right text-dark-500 dark:text-dark-400">
          <thead className="text-xs text-dark-700 uppercase bg-dark-50 dark:bg-dark-300 dark:text-white">
            <tr>
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
              <th scope="col" className="px-6 py-3">
                <span className="sr-only">Edit</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {problems.map((problem) => (
              <tr
                key={problem.problemId}
                className="border-b dark:bg-dark-200 dark:border-gray-800 cursor-pointer"
              >
                <th
                  scope="row"
                  className="px-20 py-4 font-mediu whitespace-nowrap dark:text-white"
                  onClick={() => {
                    navigate(
                      `/admin/problems/problem-details/${problem.problemId}`
                    );
                  }}
                >
                  {problem.problemNo}
                </th>
                <th
                  scope="row"
                  className="px-6 py-4 font-mediu whitespace-nowrap dark:text-white"
                  onClick={() => {
                    navigate(
                      `/admin/problems/problem-details/${problem.problemId}`
                    );
                  }}
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
                <td className="px-6 py-4">{""}</td>
                <td className="px-6 py-4">
                  {Object.keys(LANGUAGE_ID).find(
                    (key) => LANGUAGE_ID[key] === problem.languageId
                  )}
                </td>
                <td className="py-4 flex gap-5 justify-center text-right">
                  <Link
                    to={`/admin/problems/edit-problem?id=${problem.problemId}`}
                    className="text-xl dark:text-white hover:text-yellow-700 transition-all"
                  >
                    <BsPencilSquare />
                  </Link>
                  <button
                    onClick={() => {
                      deleteProblem(problem.problemId);
                    }}
                    className="text-xl dark:text-white hover:text-red-600 transition-all"
                  >
                    <BsTrash />
                  </button>
                </td>
              </tr>
            ))}
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
    </>
  );

  return (
    <>
      {deleteModal && (
        <DeleteConfirmationModal
          deleteUrl={`${PROBLEM_ADMIN_SERVICE_URL}/delete-problem/${selectedProblemId}`}
          itemField="problemId"
          itemFieldValue={selectedProblemId}
          setItemsState={setProblems}
          setModal={setDeleteModal}
        />
      )}
      <Loading loading={loader} />{" "}
      <div className="page-padding">
        <h1 className="text-white font-bold text-4xl">Problems</h1>
        {!loader &&
          (problems.length !== 0 ? renderProblemsList() : renderEmptyState())}
      </div>
    </>
  );
}

export default AdminProblems;
