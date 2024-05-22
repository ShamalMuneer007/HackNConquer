import Particle from "@/components/particle/Particle";
import instance from "@/config/axiosConfig";
import { USER_SERVICE_URL } from "@/constants/service_urls";
import { RootState } from "@/redux/store/store";
import profileIcon from "/profile-icon.png";
import { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

export interface IGlobalLeaderboardData {
  username: string;
  profileImage: string;
  playerRank: number;
  xp: number;
  level: number;
  email: string;
  userId: number;
}
function GlobalLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<
    IGlobalLeaderboardData[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const { user } = useSelector((state: RootState) => state.user);
  const fetchGlobalLeaderboardData = async () => {
    setLoading(true);
    try {
      const response = await instance.get(
        `${USER_SERVICE_URL}/get-global-leaderboard`
      );
      if (response && response.data) {
        console.log("global leaderboard data response", response);
        setLeaderboardData(response.data);
      } else {
      }
    } catch (error: any) {
      if (!error.response || !error.response.data) {
        toast.error("Network error!");
        return;
      }
      if (
        error.response &&
        error.response.status >= 400 &&
        error.response.status < 500
      ) {
        if (error.response.data) {
          toast.error(error.response.data.message);
        }
      } else if (error.response && error.response.status >= 500) {
        toast.error("Something went wrong on our side while fetching the data");
      }
      console.log(error);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    fetchGlobalLeaderboardData();
  }, []);
  return (
    <>
      <Particle />
      <div className="page-padding text-white relative">
        {user && (
          <div className="font-bold text-3xl">
            Current global rank : #{user?.playerRank}
          </div>
        )}
        <table className="w-full text-sm text-left rtl:text-right mt-10  dark:text-dark-600">
          <thead className="text-xs text-center text-dark-700 uppercase bg-dark-50 dark:bg-dark-100 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Rank
              </th>
              <th scope="col" className="px-6 py-3">
                Username
              </th>
              <th scope="col" className="px-6 py-3">
                Level
              </th>
              <th scope="col" className="px-6 py-3">
                Xp
              </th>
              <th scope="col" className="px-6 py-3">
                Problems solved
              </th>
            </tr>
          </thead>
          <tbody>
            {leaderboardData?.map((leaderboardUser, index) => (
              <tr
                key={leaderboardUser.userId}
                className={`${
                  index == 0 ? "h-16 font-bold text-xl" : "h-10"
                } border-b dark:bg-dark-200 
                text-center
                    dark:text-white hover:text-white hover:bg-blue-gray-900 transition-all dark:border-gray-800 cursor-pointer`}
              >
                <th
                  scope="row"
                  className={`px-20 py-4 ${
                    index === 0 && "text-yellow-700"
                  } whitespace-nowrap`}
                >
                  #{leaderboardUser.playerRank}
                </th>
                <th
                  scope="row"
                  className="px-20 py-4 whitespace-nowrap flex items-center gap-4"
                >
                  <div className="relative">
                    {index === 0 && (
                      <FaCrown className="absolute -top-2 -left-1 text-yellow-700 w-4 transform -rotate-[22deg]" />
                    )}
                    <img
                      alt="dp"
                      src={
                        leaderboardUser.profileImage
                          ? leaderboardUser.profileImage
                          : profileIcon
                      }
                      className={`${index === 0 ? "w-10" : "w-9"} rounded-full`}
                    ></img>
                  </div>
                  {leaderboardUser.username}
                </th>
                <th scope="row" className="px-6 py-4  whitespace-nowrap ">
                  {leaderboardUser.level}
                </th>
                <td>{leaderboardUser.xp}</td>
                <td className="px-6 py-4 ">{12301}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}

export default GlobalLeaderboard;
