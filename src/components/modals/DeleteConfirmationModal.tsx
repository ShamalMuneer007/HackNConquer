import instance from "@/config/axiosConfig";
import { Dispatch, SetStateAction } from "react";
import { toast } from "react-toastify";
interface Props {
  deleteUrl: string;
  itemField: string;
  itemFieldValue: any;
  setItemsState: Dispatch<SetStateAction<any>>;
  setModal: Dispatch<SetStateAction<boolean>>;
}
function DeleteConfirmationModal({
  deleteUrl,
  itemField,
  itemFieldValue,
  setItemsState,
  setModal,
}: Props) {
  const handleDeleteClick = () => {
    instance
      .delete(deleteUrl)
      .then((response) => {
        if (response.status === 200) {
          toast.success("Item deleted successfully.");
          setItemsState((items: any[]) => {
            if (Array.isArray(items)) {
              return items.filter((item: { [key: string]: string }) => {
                console.log(
                  itemFieldValue === item[itemField]
                    ? "Found !!!"
                    : ":( Not found"
                );
                return item[itemField] !== itemFieldValue;
              });
            } else return;
          });
          setModal(false);
        }
        console.warn(response);
      })
      .catch((error) => {
        toast.error(error.message);
      });
  };
  return (
    <div className="bg-black/20 absolute top-0 left-0 backdrop-blur-md inset-0 z-50 h-screen w-screen flex justify-center items-center">
      <div className="bg-dark-100 w-[45%] h-[60%] flex flex-col justify-center rounded-lg items-center">
        <div className="flex w-full justify-center items-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            x="0px"
            y="0px"
            width="128"
            height="128"
            viewBox="0,0,256,256"
            className="fill:#000000;"
          >
            <g
              fill="#ff2222"
              fill-rule="nonzero"
              stroke="none"
              stroke-width="1"
              stroke-linecap="butt"
              stroke-linejoin="miter"
              stroke-miterlimit="10"
              stroke-dasharray=""
              stroke-dashoffset="0"
              font-family="none"
              font-weight="none"
              font-size="none"
              text-anchor="none"
              className="mix-blend-mode: normal"
            >
              <g transform="scale(2,2)">
                <path d="M49,1c-1.66,0 -3,1.34 -3,3c0,1.66 1.34,3 3,3h30c1.66,0 3,-1.34 3,-3c0,-1.66 -1.34,-3 -3,-3zM24,15c-7.17,0 -13,5.83 -13,13c0,7.17 5.83,13 13,13h77v63c0,9.37 -7.63,17 -17,17h-40c-9.37,0 -17,-7.63 -17,-17v-52c0,-1.66 -1.34,-3 -3,-3c-1.66,0 -3,1.34 -3,3v52c0,12.68 10.32,23 23,23h40c12.68,0 23,-10.32 23,-23v-63.35937c5.72,-1.36 10,-6.50062 10,-12.64062c0,-7.17 -5.83,-13 -13,-13zM24,21h80c3.86,0 7,3.14 7,7c0,3.86 -3.14,7 -7,7h-80c-3.86,0 -7,-3.14 -7,-7c0,-3.86 3.14,-7 7,-7zM50,55c-1.66,0 -3,1.34 -3,3v46c0,1.66 1.34,3 3,3c1.66,0 3,-1.34 3,-3v-46c0,-1.66 -1.34,-3 -3,-3zM78,55c-1.66,0 -3,1.34 -3,3v46c0,1.66 1.34,3 3,3c1.66,0 3,-1.34 3,-3v-46c0,-1.66 -1.34,-3 -3,-3z"></path>
              </g>
            </g>
          </svg>
        </div>
        <div className="text-2xl mt-7 text-center text-white font-semibold">
          Are you sure you want to delete this item ?{" "}
        </div>
        <div className="mt-10 flex gap-10 justify-around">
          <button
            onClick={handleDeleteClick}
            className="p-3 hover:bg-red-600 font-bold rounded-lg transition-colors hover:text-white text-red-600 border-red-600 border"
          >
            Delete
          </button>
          <button
            onClick={() => setModal(false)}
            className="p-3 hover:bg-yellow-600 font-bold rounded-lg transition-colors hover:text-black text-yellow-600 border-yellow-600 border"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export default DeleteConfirmationModal;
