import { FaPuzzlePiece } from "react-icons/fa6";
import { Link } from "react-router-dom";

function AdminProblems() {
  return (
    <>
      <h1 className="text-white font-bold text-4xl">Problems</h1>
      <div className="h-[95%] w-full -mt-10 flex justify-center items-center">
        <Link
          to={"/admin/problems/add-problem"}
          className="text-white flex flex-col hover:text-primary transition-colors cursor-pointer"
        >
          <div className="text-5xl mx-auto ">
            <FaPuzzlePiece />
          </div>
          <div className="text-3xl">Add problem</div>
        </Link>
      </div>
    </>
  );
}

export default AdminProblems;
