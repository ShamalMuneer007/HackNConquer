import Particle from "@/components/particle/Particle";
import instance from "@/config/axiosConfig";
import { CLAN_SERVICE_URL } from "@/constants/service_urls";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { FaCrown } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import profileIcon from "/profile-icon.png";
interface IClanLeaderboarData {
  clanId: number | null;
  clanName: string;
  clanLevel: number;
  clanXp: number | null;
  clanBadgeImageUrl: string;
  members: number;
  clanRank: number | null;
}
function ClanLeaderboard() {
  const [leaderboardData, setLeaderboardData] = useState<
    IClanLeaderboarData[] | null
  >(null);
  const [loading, setLoading] = useState(false);
  const [userClanRank, setUserClanRank] = useState<number | null>(null);
  const { user } = useSelector((state: RootState) => state.user);
  const fetchClanLeaderboardData = async () => {
    setLoading(true);
    try {
      const response = await instance.get(
        `${CLAN_SERVICE_URL}/get-clan-leaderboard`
      );
      if (response && response.data) {
        console.log("global clan leaderboard data response", response);
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
    fetchClanLeaderboardData();
  }, []);
  useEffect(() => {
    if (leaderboardData && user?.clanId) {
      leaderboardData.forEach((data, index) => {
        if (data.clanId === user?.clanId) {
          setUserClanRank(index + 1);
        }
      });
    }
  }, [leaderboardData]);
  return (
    <>
      <Particle />
      <div className="page-padding text-white relative">
        <div className="font-bold text-3xl">Clan Leaderboard</div>
        {leaderboardData?.length === 0 && (
          <div className="font-bold text-4xl text-center mt-40">
            currently No clans are there..
          </div>
        )}
        {user && userClanRank && (
          <div className="font-bold text-xl md:text-3xl mt-10">
            Current global clan rank : #{userClanRank}
          </div>
        )}
        <div className="overflow-x-scroll overflow-y-scroll">
          {leaderboardData && leaderboardData?.length > 0 && (
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
                    Members
                  </th>
                </tr>
              </thead>
              <tbody>
                {leaderboardData?.map((leaderboardClan, index) => (
                  <tr
                    key={leaderboardClan.clanId}
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
                      #{index + 1}
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
                          src={leaderboardClan.clanBadgeImageUrl || profileIcon}
                          className={`${
                            index === 0 ? "w-10" : "w-9"
                          } rounded-full`}
                        ></img>
                      </div>
                      {leaderboardClan.clanName}
                    </th>
                    <th scope="row" className="px-6 py-4  whitespace-nowrap ">
                      {leaderboardClan.clanLevel}
                    </th>
                    <td>{leaderboardClan.clanXp}</td>
                    <td className="px-6 py-4 ">{leaderboardClan.members}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </>
  );
}

export default ClanLeaderboard;
