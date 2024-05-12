import { LANGUAGE_ID } from "@/constants/language";
import { DIFFICULTY_TEXT_COLOR } from "@/constants/style";
import IUserSolvedProblems from "@/interfaces/IUserSolvedProblems";
import { useNavigate } from "react-router-dom";
interface Props {
  userSolvedSubmissions: IUserSolvedProblems[];
}

function UserSolvedSubmissions({ userSolvedSubmissions }: Props) {
  const navigate = useNavigate();
  return (
    <>
      {userSolvedSubmissions.length > 0 ? (
        <div className="w-full bg-dark-300 px-5 py-4 mt-6 text-white rounded-lg">
          <div>
            <h3 className="font-bold text-2xl">Solved Problems</h3>
            <hr className="my-3" />
            <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
              <table className="w-full text-sm text-left rtl:text-right  dark:text-dark-600">
                <thead className="text-xs text-dark-700 uppercase bg-dark-50 dark:bg-dark-100 ">
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
                        Best Memory
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
                        Best Runtime
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
                      <div className="flex items-center">Language</div>
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {userSolvedSubmissions?.map((submission) => (
                    <tr
                      key={submission.problemId}
                      className="border-b dark:bg-dark-200 
                    dark:text-white hover:text-white hover:bg-blue-gray-900 transition-all dark:border-gray-800 cursor-pointer"
                      onClick={() =>
                        navigate(`/problems/${submission.problemNo}`)
                      }
                    >
                      <th
                        scope="row"
                        className="px-20 py-4  whitespace-nowrap "
                      >
                        {submission.problemNo}
                      </th>
                      <th scope="row" className="px-6 py-4  whitespace-nowrap ">
                        {submission.problemName}
                      </th>
                      <td
                        className={`px-6 py-4 font-bold ${
                          DIFFICULTY_TEXT_COLOR[submission.difficulty]
                        }`}
                      >
                        {submission.difficulty}
                      </td>
                      <td className="px-6 py-4 ">{submission.bestMemory} MB</td>
                      <td className="px-6 py-4">{submission.bestRuntime} ms</td>
                      <td className="px-6 py-4">
                        {Object.keys(LANGUAGE_ID).find(
                          (key) => LANGUAGE_ID[key] === submission.languageId
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      ) : (
        <div className="text-center font-bold text-white">
          Solve some problems{" "}
        </div>
      )}
    </>
  );
}

export default UserSolvedSubmissions;
