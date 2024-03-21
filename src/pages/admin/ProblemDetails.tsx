import instance from "@/config/axiosConfig";
import { PROBLEM_SERVICE_URL } from "@/constants/service_urls";
import { AxiosError } from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import { IProblemData } from "./AdminProblems";
import { Triangle } from "react-loader-spinner";

function ProblemDetails() {
  const { problemId } = useParams();
  const [problemInfo, setProblemInfo] = useState<IProblemData>();
  const [loading, setLoading] = useState(false);
  useEffect(() => {
    setLoading(true);
    instance
      .get(`${PROBLEM_SERVICE_URL}/get-problem/${problemId}`)
      .then((response) => {
        setLoading(false);
        console.log("Response : ", response);
        if (response.status === 200) {
          setProblemInfo(response.data);
        }
      })
      .catch((error: AxiosError) => {
        setLoading(false);
        console.error(error);
        toast.error(error.message);
      });
  }, []);
  useEffect(() => {
    console.log("Problem Info : ", problemInfo);
  }, [problemInfo]);

  return (
    <div>
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
    </div>
  );
}

export default ProblemDetails;
