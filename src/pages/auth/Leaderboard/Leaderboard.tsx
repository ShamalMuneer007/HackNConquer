import React from "react";
import { FaGlobe, FaShield, FaUsers } from "react-icons/fa6";
import { Link } from "react-router-dom";

function Leaderboard() {
  return (
    <div className="page-padding dark:text-white h-screen overflow-hidden">
      <h2 className="font-bold text-2xl text-center">LEADERBOARD</h2>
      <div className="mt-4 bg-primary w-full rounded-2xl h-[0.08rem]"></div>
      <div className="flex flex-col gap-5 text-xl font-bold h-full justify-center items-center">
        <Link
          to={"/leaderboard/global"}
          className="w-full gap-5 hover:text-green-300 transition-colors h-32 cursor-pointer border border-dark-400 rounded-2xl flex flex-col justify-center items-center"
        >
          <FaGlobe className="text-center text-3xl" />
          Global Leaderboard
        </Link>
        <div className="w-full gap-5 hover:text-green-300 transition-colors h-32 cursor-pointer border border-dark-400 rounded-2xl flex flex-col justify-center items-center">
          <FaShield className="text-center text-3xl" />
          Clan Leaderboard
        </div>
        <div className="w-full gap-5 hover:text-green-300 transition-colors h-32 cursor-pointer border border-dark-400 rounded-2xl flex flex-col justify-center items-center">
          <FaUsers className="text-center text-3xl" />
          Friends Leaderboard
        </div>
      </div>
    </div>
  );
}

export default Leaderboard;
