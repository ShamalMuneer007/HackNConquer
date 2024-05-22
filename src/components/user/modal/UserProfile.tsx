import IUserData from "@/interfaces/IUserData";
import { logout, setUser } from "@/redux/reducers/userSlice";
import { RootState } from "@/redux/store/store";
import { Line } from "rc-progress";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsPower } from "react-icons/bs";
import {
  FaMoneyBill,
  FaPencil,
  FaUserPlus,
  FaUserXmark,
} from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import profileIcon from "/profile-icon.png";
import instance from "@/config/axiosConfig";
import { USER_SERVICE_URL } from "@/constants/service_urls";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
import { Navigate, useNavigate } from "react-router-dom";
interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  userInfo: IUserData;
}
function UserProfile({ setShowModal, userInfo }: Props) {
  const { user } = useSelector((state: RootState) => state.user);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [addFriendLoader, setAddFriendLoader] = useState(false);
  const [friends, setFriends] = useState<IUserData[] | null>(null);
  const [status, setStatus] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const getFriends = async () => {
    try {
      const response: AxiosResponse = await instance.get(
        `${USER_SERVICE_URL}/user/friends/get-friends`
      );
      if (response.status === 200) {
        console.log(response);
        if (response.data) setFriends(response.data);
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  const checkUserFriendStatus = async () => {
    if (user?.userId === userInfo.userId) {
      return;
    }
    try {
      const response: AxiosResponse = await instance.get(
        `${USER_SERVICE_URL}/user/friends/get-status/${userInfo.userId}`
      );
      if (response.status === 200) {
        console.log(response);
        if (response.data) setStatus(response.data.status);
      }
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    if (user) {
      getFriends();
      checkUserFriendStatus();
    }
    return () => setStatus("");
  }, [userInfo]);
  useEffect(() => {
    console.log(status);
  }, [status]);
  const sendFriendRequest = async () => {
    try {
      setAddFriendLoader(true);
      const sendFriendRequestData = {
        senderId: user?.userId,
        receiverId: userInfo.userId,
      };
      const response: AxiosResponse = await instance.post(
        `${USER_SERVICE_URL}/user/friends/send-request`,
        sendFriendRequestData
      );
      if (response.status === 200) {
        toast.success("Friend request send successfully");
        setStatus("PENDING_REQUEST");
        const fetchUserResponse: AxiosResponse = await instance.get(
          `${USER_SERVICE_URL}/user/fetch-userdata`
        );
        dispatch(setUser(fetchUserResponse.data));
      }
    } catch (error) {
      toast.error("Something went wrong while adding friend");
    } finally {
      setAddFriendLoader(false);
    }
  };
  const removeFriend = async () => {
    try {
      setAddFriendLoader(true);
      const response: AxiosResponse = await instance.delete(
        `${USER_SERVICE_URL}/user/friends/remove-friend/${userInfo.userId}`
      );
      if (response.status === 200) {
        toast.success("Friend removed successfully");
        setStatus("NOT_FRIENDS");
        const fetchUserResponse: AxiosResponse = await instance.get(
          `${USER_SERVICE_URL}/user/fetch-userdata`
        );
        dispatch(setUser(fetchUserResponse.data));
      }
    } catch (error) {
      toast.error("Something went wrong while removing friend");
    } finally {
      setAddFriendLoader(false);
    }
  };
  const acceptFriendRequest = async () => {
    try {
      const response: AxiosResponse = await instance.put(
        `${USER_SERVICE_URL}/user/friends/accept-request/${userInfo.userId}`
      );
      if (response.status === 200) {
        toast.success("Friend request accepted");
        setStatus("FRIENDS");
        const fetchUserResponse: AxiosResponse = await instance.get(
          `${USER_SERVICE_URL}/user/fetch-userdata`
        );
        dispatch(setUser(fetchUserResponse.data));
      }
    } catch (error) {
      toast.error("Something went wrong while accepting the friend request!");
    } finally {
      setAddFriendLoader(false);
    }
  };
  const rejectFriendRequest = async () => {
    try {
      setAddFriendLoader(true);
      const response: AxiosResponse = await instance.delete(
        `${USER_SERVICE_URL}/user/friends/reject-request/${userInfo.userId}`
      );
      if (response.status === 200) {
        toast.success("Friend request rejected");
        setStatus("NOT_FRIENDS");
        const fetchUserResponse: AxiosResponse = await instance.get(
          `${USER_SERVICE_URL}/user/fetch-userdata`
        );
        dispatch(setUser(fetchUserResponse.data));
      }
    } catch (error) {
      toast.error("Something went wrong while rejecting friend request");
    } finally {
      setAddFriendLoader(false);
    }
  };
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  return (
    <div className="absolute inset-0 z-[60] bg-black/30 text-white flex justify-center backdrop-blur-md items-center h-screen w-screen">
      <div className="w-[40%] py-5 flex flex-col justify-center bg-dark-300 rounded-lg">
        <div className="w-full flex justify-end px-5">
          <button
            onClick={() => {
              setShowModal(false);
            }}
          >
            <IoIosCloseCircleOutline className="text-white  hover:text-red-600 transition-colors text-2xl" />
          </button>
        </div>
        <div className="w-full flex justify-center flex-col mb-6 items-center">
          <div className="relative hover:text-primary cursor-pointer">
            {!isImageLoaded && (
              <div className="shimmer-placeholder w-28 h-28 border rounded-full shimmer" />
            )}
            <img
              src={userInfo?.profileImage ? userInfo.profileImage : profileIcon}
              className="w-28 rounded-full"
              onLoad={handleImageLoad}
              style={{ display: isImageLoaded ? "block" : "none" }}
            />
            {user?.userId === userInfo.userId && (
              <div className="bg-dark-300 rounded-full absolute right-0 p-2  hover:text-primary cursor-pointer bottom-0 ">
                <FaPencil />
              </div>
            )}
          </div>
          <div className="relative">
            <p className="font-semibold text-lg pt-4">{userInfo?.username}</p>
            {user?.userId === userInfo.userId && (
              <FaPencil className="absolute -right-5 text-sm  hover:text-primary cursor-pointer bottom-2" />
            )}
          </div>
        </div>
        <div className="w-full justify-center flex flex-col items-center gap-2">
          {user && (
            <>
              <p className="font-bold">
                Level : <span className="font-bold">{userInfo.level}</span>
              </p>
              <Line
                className="w-[30%]"
                percent={(userInfo.xp / userInfo.currentMaxXp) * 100}
                strokeWidth={3}
                trailWidth={2}
                strokeLinecap="butt"
                strokeColor="#5bba0c"
                trailColor="#808080"
                transition=""
              ></Line>
            </>
          )}
        </div>

        <div className="flex justify-center gap-5 border-primary  my-5">
          <div className=" text-white">Problems solved : {userInfo?.level}</div>
          <div className="hover:cursor-pointer text-white">
            {userInfo.userId === user?.userId && (
              <> Friends : {friends?.length} </>
            )}
          </div>
        </div>
        {user && userInfo.userId !== user?.userId && (
          <div className="flex justify-center w-full">
            {status === "NOT_FRIENDS" && (
              <button
                onClick={sendFriendRequest}
                disabled={addFriendLoader}
                className="border p-2.5 flex items-center gap-3 rounded-lg text-sm font-semibold border-primary text-primary hover:text-white hover:bg-primary transition-colors"
              >
                {addFriendLoader ? (
                  <>
                    <span className="animate-spin w-6 h-6 border-2 border-primary rounded-full border-t-transparent"></span>
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    Add friend
                  </>
                )}
              </button>
            )}
            {user && status === "FRIENDS" && (
              <button
                onClick={removeFriend}
                disabled={addFriendLoader}
                className="border p-2.5 flex items-center gap-3 rounded-lg text-sm font-semibold border-red-600 text-red-600 hover:text-white hover:bg-red-700 transition-colors"
              >
                {addFriendLoader ? (
                  <>
                    <span className="animate-spin w-6 h-6 border-2 border-primary rounded-full border-t-transparent"></span>
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    Remove Friend
                  </>
                )}
              </button>
            )}
            {user && status === "PENDING_REQUEST" && (
              <button
                disabled
                className="border p-2.5 flex items-center gap-3 rounded-lg text-sm font-semibold border-gray-500 text-gray-500"
              >
                {addFriendLoader ? (
                  <>
                    <span className="animate-spin w-6 h-6 border-2 border-primary rounded-full border-t-transparent"></span>
                  </>
                ) : (
                  <>
                    <FaUserPlus />
                    PENDING REQUEST
                  </>
                )}
              </button>
            )}
            {user && status === "PENDING" && (
              <div className="flex items-center justify-center flex-col gap-5 text-white space-x-4">
                <div className="font-bold">Accept friend request?</div>
                <div className="flex justify-center gap-5">
                  <button
                    onClick={acceptFriendRequest}
                    className="flex items-center justify-center bg-green-400 hover:bg-green-600 transition-colors text-white rounded-md px-4 py-2 cursor-pointer"
                  >
                    <FaUserPlus className="mr-2" />
                    <span>Accept</span>
                  </button>
                  <button
                    onClick={rejectFriendRequest}
                    className="flex items-center justify-center bg-red-400 hover:bg-red-600 transition-colors text-white rounded-md px-4 py-2 cursor-pointer"
                  >
                    <FaUserXmark className="mr-2" />
                    <span>Reject</span>
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
        {user?.userId === userInfo.userId && (
          <div className="w-full flex justify-center gap-10 items-center">
            <button
              onClick={() => dispatch(logout())}
              className="hover:bg-red-600 text-red-600 border-red-600 transition-colors border hover:text-white rounded-lg p-2 flex justify-center items-center gap-2 text-sm font-bold"
            >
              <BsPower className="text-lg" />
              Logout
            </button>
            <button
              onClick={() => {
                navigate("/subscription/info");
                setShowModal(false);
              }}
              className="hover:bg-blue-600 text-blue-600 border-blue-600 transition-colors border hover:text-white rounded-lg p-2 flex justify-center items-center gap-2 text-sm font-bold"
            >
              <FaMoneyBill className="text-lg" />
              Subscriptions
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
