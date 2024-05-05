import IUserData from "@/interfaces/IUserData";
import { logout, setUser } from "@/redux/reducers/userSlice";
import { RootState } from "@/redux/store/store";
import { Line } from "rc-progress";
import { Dispatch, SetStateAction, useState } from "react";
import { BsPower } from "react-icons/bs";
import { FaPencil, FaUserPlus } from "react-icons/fa6";
import { IoIosCloseCircleOutline } from "react-icons/io";
import { useDispatch, useSelector } from "react-redux";
import profileIcon from "/profile-icon.png";
import instance from "@/config/axiosConfig";
import { USER_SERVICE_URL } from "@/constants/service_urls";
import { toast } from "react-toastify";
import { AxiosResponse } from "axios";
interface Props {
  setShowModal: Dispatch<SetStateAction<boolean>>;
  userInfo: IUserData;
}
function UserProfile({ setShowModal, userInfo }: Props) {
  const { user } = useSelector((state: RootState) => state.user);
  const [isImageLoaded, setIsImageLoaded] = useState(false);
  const [addFriendLoader, setAddFriendLoader] = useState(false);
  const dispatch = useDispatch();
  const sendFriendRequest = async () => {
    try {
      setAddFriendLoader(true);
      const response: AxiosResponse = await instance.post(
        `${USER_SERVICE_URL}/user/add-friend/${userInfo.userId}`
      );
      if (response.status === 200) {
        toast.success("Friend added successfully");
        const response: AxiosResponse = await instance.get(
          `${USER_SERVICE_URL}/user/fetch-userdata`
        );
        dispatch(setUser(response.data));
      }
    } catch (error) {
      toast.error("Something went wrong while adding friend");
    } finally {
      setAddFriendLoader(false);
    }
  };
  const handleImageLoad = () => {
    setIsImageLoaded(true);
  };
  return (
    <div className="absolute inset-0 z-[60] bg-black/30 text-white flex justify-center backdrop-blur-md items-center h-screen w-screen">
      <div className="w-[40%] h-[60%] bg-dark-300 rounded-lg">
        <div className="w-full flex justify-end px-5 py-3">
          <button
            onClick={() => {
              setShowModal(false);
            }}
          >
            <IoIosCloseCircleOutline className="text-white  hover:text-red-600 transition-colors text-2xl" />
          </button>
        </div>
        <div className="w-full flex justify-center flex-col my-6 items-center">
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
                Level : <span className="font-bold">{user.level}</span>
              </p>
              <Line
                className="w-[30%]"
                percent={(user.xp / user.currentMaxXp) * 100}
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
          <div className=" text-white">
            Friends : {userInfo?.friends?.length}
          </div>
        </div>
        {userInfo.userId !== user?.userId && (
          <div className="flex justify-center w-full">
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
          </div>
        )}
        {user?.userId === userInfo.userId && (
          <div className="w-full flex justify-center items-center">
            <button
              onClick={() => dispatch(logout())}
              className="hover:bg-red-600 text-red-600 border-red-600 transition-colors border hover:text-white rounded-lg p-2 flex justify-center items-center gap-2 text-sm font-bold"
            >
              <BsPower className="text-lg" />
              Logout
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default UserProfile;
