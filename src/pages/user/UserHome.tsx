import instance from "@/config/axiosConfig";
import { SUBMISSION_SERVICE_URL } from "@/constants/service_urls";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Circle } from "rc-progress";
import { useDispatch, useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";

function UserHome() {
  const [userSolvedSubmissions, setUserSolvedSubmissions] = useState();
  const { user } = useSelector((state: RootState) => state.user);
  const fetchUserSolvedSubmissions = async () => {
    try {
      const response: AxiosResponse = await instance.get(
        `${SUBMISSION_SERVICE_URL}/user/get-solved-submissions`
      );
      console.log("UserHome submission response : ", response);
      setUserSolvedSubmissions(response.data);
    } catch (error: any) {
      console.error(error);
      if (error.status >= 400 && error.status < 500 && error.response) {
        toast.error(error.response.data.message);
      } else {
        toast.error(error.message);
      }
    }
  };
  useEffect(() => {
    fetchUserSolvedSubmissions();
  }, []);
  useEffect(() => {
    console.log("SOLVED SUBMISSIONS : ", userSolvedSubmissions);
  }, [userSolvedSubmissions]);
  return (
    <div className="page-padding dar  k:text-white h-[98.9vh]">
      <div className="w-full flex h-full">
        <div className=""></div>
        {!user && (
          <div className="skeleton-loader h-20">
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
          </div>
        )}
        {user && (
          <div className="bg-dark-300/70 w-[40%] h-[50%] text-white rounded-xl p-5">
            {/* <h3 className="text-xl font-bold text-white">Problems Solved</h3> */}
            <div className="w-28 relative flex items-center justify-center">
              <Circle
                percent={(user.xp / user.currentMaxXp) * 100}
                strokeWidth={3}
                strokeColor="#5bba0c"
              ></Circle>
              <div className="absolute text-center text-xl ">
                <div className="flex items-center">
                  <div>{user.xp}</div>
                  <div className="h-4 border-r border-gray-500 mx-2"></div>
                  <div>{user.currentMaxXp}</div>
                </div>
                <div>
                  <span className="h-0">XP</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserHome;
