import instance from "@/config/axiosConfig";
import { SUBMISSION_SERVICE_URL } from "@/constants/service_urls";
import { AxiosResponse } from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { Circle } from "rc-progress";
import { useSelector } from "react-redux";
import { RootState } from "@/redux/store/store";
import IUserSolvedProblems from "@/interfaces/IUserSolvedProblems";
import { DIFFICULTY_TEXT_COLOR } from "@/constants/style";
import { useNavigate } from "react-router-dom";
import { LANGUAGE_ID } from "@/constants/language";
import UserSolvedSubmissions from "@/components/user/UserSolvedSubmissions";

function UserHome() {
  const [userSolvedSubmissions, setUserSolvedSubmissions] =
    useState<IUserSolvedProblems[]>();
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
    <div className="page-padding dark:text-white h-[98.9vh]">
      <div className="w-full flex mb-10 items-center">
        <div className=""></div>
        {!user && (
          <div className="skeleton-loader h-20">
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
          </div>
        )}
        {/* User Level Progress */}

        <div className="px-7 w-full">
          <div className="mt-10 w-full rounded flex justify-around h-40 items-center ">
            {user && (
              <div className="flex flex-col gap-5 w-full justify-center items-center text-white rounded-xl p-5">
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
                <div className="flex flex-col">
                  <div className="font-bold">Level : {user.level}</div>
                </div>
                <div className="text-xs text-gray-500">
                  Solve more problems to gain xp level up
                </div>
              </div>
            )}
            <div className="justify-center text-center h-full  w-full p-10 flex items-center">
              <div className="font-bold">Global Rank : #{user?.playerRank}</div>
            </div>
            <div className="justify-center text-center h-full  w-full p-10 flex items-center">
              <div className="font-bold">Global Rank : #{user?.playerRank}</div>
            </div>
            {user?.clanId ? (
              <></>
            ) : (
              <div className=" w-full flex justify-center">
                <button className="bg-green-500 hover:bg-primary transition-colors rounded text-white font-bold p-2">
                  Join a clan
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Problems Solved */}
      {userSolvedSubmissions && (
        <UserSolvedSubmissions userSolvedSubmissions={userSolvedSubmissions} />
      )}
    </div>
  );
}

export default UserHome;
