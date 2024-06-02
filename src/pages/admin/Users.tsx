import PageInfo from "@/components/PageInfo";
import instance from "@/config/axiosConfig";
import { USER_SERVICE_URL } from "@/constants/service_urls";
import IUserData from "@/interfaces/IUserData";
import { logout } from "@/redux/reducers/userSlice";
import { useEffect, useState } from "react";
import { BsStop } from "react-icons/bs";
import { useDispatch } from "react-redux";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { MdBlock } from "react-icons/md";
import { toast } from "react-toastify";
import { FaUser } from "react-icons/fa6";

function Users() {
  const [userData, setUserData] = useState<IUserData[]>([]);
  const [loader, setLoader] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [searchParams, setSearchParams] = useSearchParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const fetchUserData = async (requestedPage: number) => {
    try {
      const response = await instance.get(
        `${USER_SERVICE_URL}/admin/get-all-user?page=${requestedPage}`
      );
      if (requestedPage > response.data.users.totalPages) {
        navigate(`?page=${response.data.users.totalPages}`);
      }
      if (response.status === 200) {
        setUserData(response.data.users.content);
        setTotalPages(response.data.users.totalPages);
      } else {
        toast.error("Something went wrong on our side..");
      }
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        dispatch(logout());
      } else if (error.status >= 400 && error.status < 500) {
        toast.error(error.response.data.message);
      } else if (error.status > 500) {
        toast.error("Something went wrong on our side..");
      } else {
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    const requestedPage = parseInt(searchParams.get("page") || "1");
    console.log("Request Page : ", requestedPage);
    fetchUserData(requestedPage);
  }, [searchParams, navigate]);
  const blockUser = (userId: number) => {};
  const unBlockUser = (userId: number) => {};
  return (
    <div className="page-padding">
      <h1 className="text-white font-bold text-4xl">Users</h1>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mt-10">
        <table className="w-full text-sm text-left rtl:text-right  dark:text-dark-500">
          <thead className="text-xs text-dark-700 uppercase bg-dark-50 dark:bg-dark-400 dark:text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                <div className="flex items-center">
                  Level
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
                  xp
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
                  User clan Id
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
            {userData.map(
              (user) =>
                user.role !== "ROLE_ADMIN" && (
                  <tr
                    key={user.userId}
                    className="border-b dark:bg-dark-200 hover:bg-dark-100 transition-colors dark:border-gray-800 cursor-pointer"
                  >
                    <th
                      scope="row"
                      className="px-20 py-4 font-mediu whitespace-nowrap dark:text-white"
                    >
                      {user.username}
                    </th>
                    <th
                      scope="row"
                      className="px-6 py-4 font-mediu whitespace-nowrap dark:text-white"
                    >
                      {user.level}
                    </th>
                    <td className={`px-6 py-4 font-bold`}>{user.xp}</td>
                    <td className="px-6 py-4">{user.clanId || "nil"}</td>

                    <td className="py-4 flex gap-5 justify-center text-right">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          !user.blocked
                            ? blockUser(user.userId)
                            : unBlockUser(user.userId);
                        }}
                        className="text-xl dark:text-white hover:text-red-600 transition-all"
                      >
                        {!user.blocked ? <MdBlock /> : <FaUser />}
                      </button>
                    </td>
                  </tr>
                )
            )}
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
  );
}

export default Users;
