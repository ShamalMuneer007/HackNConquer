import instance from "@/config/axiosConfig";
import { CLAN_SERVICE_URL, USER_SERVICE_URL } from "@/constants/service_urls";
import { FRONTEND_URL } from "@/constants/url";
import IUserData from "@/interfaces/IUserData";
import { logout, setUser } from "@/redux/reducers/userSlice";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import profileImg from "/profile-icon.png";
import { AxiosResponse } from "axios";
import { useNavigate } from "react-router-dom";
function ClanInfo() {
  const { user } = useSelector((state: RootState) => state.user);
  const [clanData, setClanData] = useState<IClanData | null>(null);
  const [members, setMembers] = useState<IUserData[] | null>(null);
  const [showOptions, setShowOptions] = useState<number | null>(null);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const toggleOptions = (memberId: number) => {
    setShowOptions(showOptions === memberId ? null : memberId);
  };
  const fetchClanData = async () => {
    try {
      if (user?.clanId) {
        const response = await instance.get(
          `${CLAN_SERVICE_URL}/get-info/${user.clanId}`
        );
        setClanData(response.data);
      }
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        dispatch(logout());
      } else if (error.status >= 400 && error.status < 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong on our side..");
      }
    }
  };
  useEffect(() => {
    fetchClanData();
  }, [user]);
  useEffect(() => {
    const fetchClanMembers = async () => {
      try {
        if (clanData && clanData.members) {
          const response = await instance.post(
            `${USER_SERVICE_URL}/get-users`,
            clanData.members
          );
          setMembers(response.data);
        }
      } catch (error: any) {
        if (error.status === 401 || error.status === 403) {
          dispatch(logout());
        } else if (error.status >= 400 && error.status < 500) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong on our side..");
        }
      }
    };
    fetchClanMembers();
  }, [clanData]);
  const leaveClanButtonClickHandler = async () => {
    try {
      const response = await instance.patch(
        `${CLAN_SERVICE_URL}/user/leave/${user?.clanId}`
      );
      if (response.status === 200) {
        toast.success("Left clan successfully !!");
        const fetchUserResponse: AxiosResponse = await instance.get(
          `${USER_SERVICE_URL}/user/fetch-userdata`
        );
        dispatch(setUser(fetchUserResponse.data));
        navigate("/clan");
      }
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        dispatch(logout());
      } else if (error.status >= 400 && error.status < 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong on our side..");
      }
    }
  };
  const disbandClanButtonClickHandler = async () => {
    try {
      const response = await instance.delete(
        `${CLAN_SERVICE_URL}/user/disband/${user?.clanId}`
      );
      if (response.status === 200) {
        toast.success("clan disband done successfully !!");
        const fetchUserResponse: AxiosResponse = await instance.get(
          `${USER_SERVICE_URL}/user/fetch-userdata`
        );
        dispatch(setUser(fetchUserResponse.data));
        navigate("/clan");
      }
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        dispatch(logout());
      } else if (error.status >= 400 && error.status < 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong on our side..");
      }
    }
  };

  const handleRemoveMember = async (memberId: number) => {
    try {
      const response = await instance.patch(
        `${CLAN_SERVICE_URL}/user/member/remove/${user?.clanId}/${memberId}`
      );
      if (response.status === 200) {
        toast.success("member removed !!");
        const fetchUserResponse: AxiosResponse = await instance.get(
          `${USER_SERVICE_URL}/user/fetch-userdata`
        );
        dispatch(setUser(fetchUserResponse.data));
        fetchClanData();
      }
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        dispatch(logout());
      } else if (error.status >= 400 && error.status < 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong on our side..");
      }
    }
  };
  const handleTransferOwnership = async (memberId: number) => {
    try {
      const response = await instance.patch(
        `${CLAN_SERVICE_URL}/user/owner/handle-to/${memberId}/${clanData?.clanId}`
      );
      if (response.status === 200) {
        toast.success("clan ownership handled to member successfully !!");
        toast.warn("You are not the owner of the clan now");
        const fetchUserResponse: AxiosResponse = await instance.get(
          `${USER_SERVICE_URL}/user/fetch-userdata`
        );
        dispatch(setUser(fetchUserResponse.data));
        fetchClanData();
      }
    } catch (error: any) {
      if (error.status === 401 || error.status === 403) {
        dispatch(logout());
      } else if (error.status >= 400 && error.status < 500) {
        toast.error(error.response.data.message);
      } else {
        toast.error("Something went wrong on our side..");
      }
    }
  };
  return (
    <>
      <div className="dark:text-white bg-dark-300 rounded-lg  p-5 px-10 relative">
        <div className="absolute flex gap-4 right-10 top-10">
          {user?.userId === clanData?.owner ? (
            <button
              onClick={disbandClanButtonClickHandler}
              className="border-red-600 border text-red-600 hover:bg-red-600 hover:text-white transition-colors rounded-md p-3 font-bold"
            >
              Disband
            </button>
          ) : (
            // user &&
            // members?.includes(user) && (
            <button
              onClick={leaveClanButtonClickHandler}
              className="border-red-600 border text-red-600 hover:bg-red-600 hover:text-white transition-colors rounded-md p-3 font-bold"
            >
              Leave clan
            </button>
            // )
          )}
        </div>
        <div className="absolute left-10 top-12 flex items-center">
          <p className="text-gray-500">Created at : {clanData?.createdAt}</p>
        </div>

        <div className="flex items-center justify-center gap-5">
          <img
            src={clanData?.clanBadgeImageUrl}
            className="w-20 h-20 rounded-lg"
          ></img>
          {/* <div className="flex w-full justify-center"> */}
          <h2 className="font-bold text-2xl">{clanData?.clanName}</h2>
        </div>
        <div className="flex justify-around font-bold text-xl mt-5">
          <p>Clan rank : {clanData?.clanRank || "null"}</p>
          <p>Clan level : {clanData?.level || "null"}</p>
        </div>
        <div className="flex justify-center">
          <p className=" mt-6 font-semibold">
            Clan Invitation URL :{" "}
            <a className="text-blue-500" href="#">
              {`${FRONTEND_URL}/clan/join/${clanData?.clanId}`}
            </a>
          </p>
        </div>
        <div>
          {members && members.length == 0 && (
            <>
              <h4 className="text-center font-bold p-10 text-2xl">
                No members in your clan.. Invite users to add them
              </h4>
            </>
          )}
          {members && members.length > 0 && (
            <>
              <h2 className="text-xl font-bold mb-4 dark:text-white">
                {clanData?.members.length} Member/s
              </h2>
              <div className="overflow-x-auto">
                <table className="w-full table-auto bg-white dark:bg-dark-200 text-white rounded-lg shadow-md">
                  <thead>
                    <tr className="bg-gray-200 dark:bg-dark-100 rounded-lg uppercase text-sm leading-normal">
                      <th className="py-3 px-6 text-left">Member</th>
                      <th className="py-3 px-6 text-left">Rank</th>
                      <th className="py-3 px-6 text-left">Level</th>
                      <th className="py-3 px-6 text-left">Xp</th>
                      {clanData?.owner === user?.userId && (
                        <th className="py-3 px-6 text-left">Actions</th>
                      )}
                    </tr>
                  </thead>
                  <tbody className="text-white">
                    {members.map((member, index) => (
                      <tr
                        key={member.userId}
                        className="border-b border-gray-200 dark:border-gray-700 hover:bg-blue-gray-900 cursor-pointer  transition-colors duration-200"
                      >
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <img
                              src={member.profileImage || profileImg}
                              alt={member.username}
                              className="w-8 h-8 rounded-full mr-2"
                            />
                            <span>{member.username}</span>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <p className="font-bold">#{index + 1}</p>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <p className="font-bold">{member.level}</p>
                          </div>
                        </td>
                        <td className="py-3 px-6 text-left whitespace-nowrap">
                          <div className="flex items-center gap-2">
                            <p className="font-bold">{member.xp}</p>
                          </div>
                        </td>
                        {clanData?.owner === user?.userId && (
                          <td className="py-3 px-6 text-left ">
                            <div className="relative">
                              <button
                                className="text-white transition-colors duration-200"
                                onClick={() => toggleOptions(member.userId)}
                              >
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  className="h-5 w-5"
                                  viewBox="0 0 20 20"
                                  fill="currentColor"
                                >
                                  <path d="M10 6a2 2 0 110-4 2 2 0 010 4zM10 12a2 2 0 110-4 2 2 0 010 4zM10 18a2 2 0 110-4 2 2 0 010 4z" />
                                </svg>
                              </button>
                              {showOptions === member.userId && (
                                <div className="absolute right-10 -top-10 bg-white dark:bg-gray-800 rounded-md shadow-lg z-20">
                                  <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                                    onClick={() =>
                                      handleRemoveMember(member.userId)
                                    }
                                  >
                                    Remove Member
                                  </button>

                                  <button
                                    className="block w-full text-left px-4 py-2 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors duration-200"
                                    onClick={() =>
                                      handleTransferOwnership(member.userId)
                                    }
                                  >
                                    Transfer Ownership
                                  </button>
                                </div>
                              )}
                            </div>
                          </td>
                        )}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </>
          )}
        </div>
      </div>
    </>
  );
}

export default ClanInfo;
