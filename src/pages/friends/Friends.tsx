import instance from "@/config/axiosConfig";
import { USER_SERVICE_URL } from "@/constants/service_urls";
import IUserData from "@/interfaces/IUserData";
import { logout } from "@/redux/reducers/userSlice";
import { RootState } from "@/redux/store/store";
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import defaultProfileImg from "/profile-icon.png";
interface IFriendsData {
  user: IUserData;
  requestedAt: string;
}
function Friends() {
  const [friendRequests, setFriendRequests] = useState<IFriendsData[]>([]);
  const [friends, setFriends] = useState<IUserData[]>([]);
  const dispatch = useDispatch();
  const { user } = useSelector((state: RootState) => state.user);
  useEffect(() => {
    const fetchFriendRequests = async () => {
      try {
        const response = await instance.get(
          `${USER_SERVICE_URL}/user/friends/get-requests`
        );
        console.log("Get friend request response : ", response);
        if (response.status === 200) {
          setFriendRequests(response.data);
        }
      } catch (error: any) {
        if (!error.response || !error.response.data) {
          toast.error("Network error!");
          return;
        }
        if (error.status === 401 || error.status === 403) {
          dispatch(logout());
        } else if (error.status >= 400 && error.status < 500) {
          toast.error(error.response.data.message);
        } else {
          toast.error("Something went wrong on our side..");
        }
      }
    };
    const fetchUserFriends = async () => {
      try {
        const response = await instance.get(
          `${USER_SERVICE_URL}/user/friends/get-friends`
        );
        console.log("Get friend request response : ", response);
        if (response.status === 200) {
          setFriends(response.data);
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
    if (user) {
      fetchFriendRequests();
      fetchUserFriends();
    }
  }, [user]);
  const handleAcceptRequest = async (userId: number) => {
    try {
      const response = await instance.post(
        `${USER_SERVICE_URL}/user/friends/accept-request/${userId}`
      );
      if (response.status === 200) {
        toast.info("Friend request accepted");
        const newFriend = friendRequests.filter(
          (request) => request.user.userId === userId
        )[0].user;
        setFriends((friends) => [...friends, newFriend]);
        const newData = friendRequests.filter(
          (request) => request.user.userId !== userId
        );
        setFriendRequests(newData);
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
  const handleRejectRequest = async (userId: number) => {
    try {
      const response = await instance.delete(
        `${USER_SERVICE_URL}/user/friends/reject-request/${userId}`
      );
      if (response.status === 200) {
        toast.info("Friend request rejected !");
        const newData = friendRequests.filter(
          (request) => request.user.userId !== userId
        );
        setFriendRequests(newData);
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
  const removeFriendClickHandler = async (userId: number) => {
    try {
      const response = await instance.delete(
        `${USER_SERVICE_URL}/user/friends/remove-friend/${userId}`
      );
      if (response.status === 200) {
        toast.info("Friend removed !");
        const newData = friends.filter((friend) => friend.userId !== userId);
        setFriends(newData);
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
      <div className="page-padding dark:text-white">
        <h2 className="font-bold text-4xl my-2 mb-10">Friends</h2>
        <div className="bg-dark-300 w-full rounded p-5 overflow-y-scroll">
          <h4 className="text-xl font-bold pb-3">Requests : </h4>
          <hr className="mb-10" />
          {friendRequests.length === 0 && (
            <div className="flex justify-center my-2 px-14 bg-dark-200 rounded text-lg p-5">
              No friend requests for you at the moment.
            </div>
          )}
          {friendRequests?.length > 0 &&
            friendRequests.map((request, index) => (
              <div
                key={index}
                className="flex justify-between my-2 px-14 bg-dark-200 rounded p-5"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="rounded-full w-16"
                    src={request.user.profileImage || defaultProfileImg}
                  />
                  <p>{request.user.username}</p>
                </div>
                <div className="flex items-center gap-9">
                  <button
                    className="border border-primary text-sm text-primary font-bold hover:text-black hover:bg-primary transition-colors p-2 rounded"
                    onClick={() => handleAcceptRequest(request.user.userId)}
                  >
                    Accept
                  </button>
                  <button
                    className="border border-red-600 text-sm text-red-600 font-bold hover:text-white hover:bg-red-600 transition-colors p-2 rounded"
                    onClick={() => handleRejectRequest(request.user.userId)}
                  >
                    Reject
                  </button>
                </div>
              </div>
            ))}
        </div>
        <div className="bg-dark-300 w-full rounded p-5 overflow-y-scroll">
          <h4 className="text-xl font-bold pb-3">Friends : </h4>
          <hr className="mb-10" />
          {friends.length === 0 && (
            <div className="flex justify-center my-2 px-14 bg-dark-200 rounded text-lg p-5">
              You have 0 Friends
            </div>
          )}
          {friends?.length > 0 &&
            friends.map((friend, index) => (
              <div
                key={index}
                className="flex justify-between my-2 px-14 bg-dark-200 rounded p-5"
              >
                <div className="flex items-center gap-4">
                  <img
                    className="rounded-full w-16"
                    src={friend.profileImage || defaultProfileImg}
                    referrerPolicy="no-referrer"
                  />
                  <p>{friend.username}</p>
                </div>
                <div className="flex items-center gap-9">
                  <button
                    className="border border-red-600 text-sm text-red-600 font-bold hover:text-white hover:bg-red-600 transition-colors p-2 rounded"
                    onClick={() => removeFriendClickHandler(friend.userId)}
                  >
                    Remove Friend
                  </button>
                </div>
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Friends;
