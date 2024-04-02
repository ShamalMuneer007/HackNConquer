import PageInfo from "@/components/PageInfo";
import DeleteConfirmationModal from "@/components/modals/DeleteConfirmationModal";
import instance from "@/config/axiosConfig";
import {
  PROBLEM_ADMIN_SERVICE_URL,
  PROBLEM_SERVICE_URL,
} from "@/constants/service_urls";
import { PlusIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { BsFunnelFill, BsPencilSquare, BsTrash } from "react-icons/bs";
import { FaBoxesStacked, FaMagnifyingGlass } from "react-icons/fa6";
import { Oval } from "react-loader-spinner";
import { Link, useNavigate, useSearchParams } from "react-router-dom";
import { toast } from "react-toastify";
export interface ICategoryData {
  categoryName: string;
  categoryId: string;
  categoryLevel: string;
  noOfProblems?: number;
}
function AdminCategories() {
  const [categories, setCategories] = useState<ICategoryData[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [deleteModal, setDeleteModal] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedCategoryId, setSelectedCategoryId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    setLoading(true);
    const requestedPage = parseInt(searchParams.get("page") || "1");

    const fetchProblems = async () => {
      try {
        const response = await instance.get(
          `${PROBLEM_SERVICE_URL}/get-all-category?page=${requestedPage}`
        );
        setLoading(false);
        setCategories(response.data.categories.content);
        setTotalPages(response.data.categories.totalPages);

        if (requestedPage > response.data.categories.totalPages) {
          navigate(`?page=${response.data.categories.totalPages}`);
        }
      } catch (error: any) {
        console.log(error);
        setLoading(false);
        toast.error(error.message);
      }
    };

    fetchProblems();
  }, [searchParams, navigate]);
  useEffect(() => {
    if (!deleteModal) {
      setSelectedCategoryId("");
    }
  }, [deleteModal]);
  const deleteCategory = (problemId: string) => {
    setSelectedCategoryId(problemId);
    setDeleteModal(true);
  };
  useEffect(() => {
    console.log("Problem Info : ", categories);
  }, [categories]);
  const renderEmptyState = () => (
    <div className="h-[74vh] w-full -mt-10 flex justify-center items-center">
      <Link
        to={"/admin/categories/add-category"}
        className="text-white flex flex-col hover:text-primary transition-colors cursor-pointer"
      >
        <div className="text-5xl mx-auto">
          <FaBoxesStacked />
        </div>
        <div className="text-3xl">Add Category</div>
      </Link>
    </div>
  );

  const renderCategoryList = () => (
    <>
      <div className="w-full -mt-9 flex justify-end">
        <Link
          to={"/admin/categories/add-category"}
          className="text-white me-10  flex border text-xl justify-center items-center hover:border-primary rounded-full p-2 hover:text-white hover:bg-primary transition-colors cursor-pointer"
          title="Add category"
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
      <div className="w-full flex justify-center items-center h-full">
        <div className="relative w-[80%] overflow-x-auto shadow-md sm:rounded-lg mt-10">
          <table className="w-full text-sm text-left rtl:text-right text-dark-500 dark:text-dark-400">
            <thead className="text-xs text-dark-700 uppercase bg-dark-50 dark:bg-dark-300 dark:text-white">
              <tr>
                <th scope="col" className="px-6 py-3 text-center">
                  Category name
                </th>
                <th scope="col" className="px-6 py-3 text-center">
                  <div className="flex items-center">
                    No of Problem
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
              {categories.map((category) => (
                <tr
                  key={category.categoryId}
                  className="border-b dark:bg-dark-200 dark:border-gray-800 cursor-pointer"
                  onClick={() => {
                    navigate(
                      `/admin/categories/category-details/${category.categoryId}`
                    );
                  }}
                >
                  <th
                    scope="row"
                    className="px-6 py-4 whitespace-nowrap text-center dark:text-white"
                  >
                    {category.categoryName}
                  </th>

                  <td scope="row" className="px-6 py-4">
                    {""}
                  </td>

                  <td className="py-4 flex gap-5 justify-center text-right">
                    <Link
                      to={`/admin/problems/edit-problem?id=${category.categoryId}`}
                      className="text-xl dark:text-white hover:text-yellow-700 transition-all"
                      onClick={(e) => e.stopPropagation()}
                    >
                      <BsPencilSquare />
                    </Link>
                    <button
                      onClick={(e) => {
                        deleteCategory(category.categoryId);
                        e.stopPropagation();
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
    <div>
      {deleteModal && (
        <DeleteConfirmationModal
          deleteUrl={`${PROBLEM_ADMIN_SERVICE_URL}/delete-category/${selectedCategoryId}`}
          itemField="categoryId"
          itemFieldValue={selectedCategoryId}
          setItemsState={setCategories}
          setModal={setDeleteModal}
        />
      )}
      {loading && (
        <div className="fixed w-screen h-screen z-50 bg-black/20 backdrop-blur-md flex justify-center items-center">
          <Oval
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="oval-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
      <div className="page-padding">
        <h1 className="text-white font-bold text-4xl">Categories</h1>
        {!loading &&
          (categories.length !== 0
            ? renderCategoryList()
            : !categories && renderEmptyState())}
      </div>
    </div>
  );
}

export default AdminCategories;
