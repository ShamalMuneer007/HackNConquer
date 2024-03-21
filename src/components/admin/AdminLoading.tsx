import { Triangle } from "react-loader-spinner";
import { useSelector } from "react-redux";
function AdminLoading() {
  const { loading } = useSelector((state: any) => state.admin);
  return (
    <>
      {loading && (
        <div className="w-screen h-screen flex justify-center items-center fixed inset-0 z-50 bg-black/20 backdrop-blur-md">
          <Triangle
            visible={true}
            height="80"
            width="80"
            color="#4fa94d"
            ariaLabel="triangle-loading"
            wrapperStyle={{}}
            wrapperClass=""
          />
        </div>
      )}
    </>
  );
}

export default AdminLoading;
