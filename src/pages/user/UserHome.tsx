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
import { Link, useNavigate } from "react-router-dom";
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
        {!user && (
          <div className="skeleton-loader h-20">
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
            <div className="skeleton-item"></div>
          </div>
        )}
        {/* User Level Progress */}
        <div className="px-7 w-full">
          <div className="mt-10 rounded flex md:flex-row mb-10 flex-col justify-evenly h-40 items-center ">
            {user && (
              <div className="flex flex-col gap-5 md:w-[50%] justify-center mb-10 items-center text-white rounded-xl">
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
                  Solve more problems to gain xp and level up
                </div>
              </div>
            )}
            <div className="flex flex-col md:flex-row gap-10 w-full md:gap-0 justify-between">
              <div className="justify-center text-center w-full flex items-center">
                <div className="font-bold">
                  Global Rank : #{user?.playerRank}
                </div>
              </div>
              <div className="justify-center text-center w-full flex items-center">
                <div className="font-bold">
                  Friends Rank : #{user?.playerRank}
                </div>
              </div>

              {user?.clanId ? (
                <div className="justify-center text-center w-full flex items-center">
                  <div className="font-bold">
                    Clan Rank : #{user.playerRank}
                  </div>
                </div>
              ) : (
                <div className=" w-full flex justify-center">
                  <Link to="/clan">
                    <button className="bg-green-500 hover:bg-primary transition-colors rounded text-white font-bold p-2">
                      Join a clan
                    </button>
                  </Link>
                </div>
              )}
            </div>
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
