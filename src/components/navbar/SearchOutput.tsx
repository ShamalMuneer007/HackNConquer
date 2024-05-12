import IUserData from "@/interfaces/IUserData";
import profileIcon from "/profile-icon.png";
import React, { SetStateAction, useEffect, useState, Dispatch } from "react";
import UserProfile from "../user/modal/UserProfile";
interface Props {
  searchDatas: IUserData[] | null;
  setUserInfo: Dispatch<SetStateAction<IUserData | null>>;
  setShowProfileModal: Dispatch<SetStateAction<boolean>>;
}
function SearchOutput({
  searchDatas,
  setUserInfo,
  setShowProfileModal,
}: Props) {
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  return (
    <>
      <div className="w-full bg-dark-400 text-white rounded-lg p-3 max-h-40 overflow-y-scroll">
        {searchDatas ? (
          <>
            <div className="flex flex-col justify-center">
              {searchDatas.map((data) => (
                <div
                  className="flex items-center gap-5 cursor-pointer hover:bg-dark-200 p-2 rounded-lg"
                  onClick={() => {
                    setUserInfo(data);
                    setShowProfileModal(true);
                  }}
                >
                  {!isImageLoaded && (
                    <div className="shimmer-placeholder w-[20%]  h-[20%] rounded-full shimmer" />
                  )}
                  <img
                    src={data.profileImage ? data.profileImage : profileIcon}
                    className="w-[20%] rounded-full"
                    onLoad={handleImageLoad}
                    style={{ display: isImageLoaded ? "block" : "none" }}
                  />
                  <p>{data.username}</p>
                </div>
              ))}
            </div>
          </>
        ) : (
          <p className="text-center">No such users</p>
        )}
      </div>
    </>
  );
}

export default SearchOutput;
