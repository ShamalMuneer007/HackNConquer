import instance from "@/config/axiosConfig";
import { USER_SERVICE_URL } from "@/constants/service_urls";
import IUserData from "@/interfaces/IUserData";
import { logout } from "@/redux/reducers/userSlice";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { FaRegWindowClose } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import profileImage from "/profile-icon.png";
import Message from "./Message";
import { useChatContext } from "@/contexts/useChatContext";

function Chat() {
  const [selectedUser, setSelectedUser] = useState<IUserData | null>(null);
  const [friends, setFriends] = useState<IUserData[]>([]);
  const { user } = useSelector((state: RootState) => state.user);
  const { onlineUsers } = useChatContext();
  const dispatch = useDispatch();
  useEffect(() => {
    const fetchFriends = async () => {
      try {
        const response = await instance.get(
          `${USER_SERVICE_URL}/user/friends/get-friends`
        );
        console.log("Get friend request response : ", response);
        if (response.status === 200) {
          setFriends(response.data);
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
    fetchFriends();
  }, []);
  useEffect(() => {
    console.log("CHAT ONLINE :", onlineUsers);
  }, [onlineUsers]);
  return (
    <div className="bg-dark-300 border-primary border w-[20vw] text-white p-5 pt-5 h-[70vh]  rounded-md">
      {selectedUser ? (
        <Message
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      ) : (
        <>
          <h2 className="font-bold text-xl"> Messages</h2>
          <div className="mt-5 overflow-y-scroll">
            {friends.map((friend, index) => (
              <>
                <div
                  className="flex gap-5 items-center p-5 hover:bg-dark-200 cursor-pointer rounded-lg"
                  onClick={() => setSelectedUser(friend)}
                >
                  <img
                    src={friend.profileImage || profileImage}
                    className="w-10 h-10 rounded-full"
                    referrerPolicy="no-referrer"
                  ></img>
                  <p>{friend.username}</p>
                </div>
                <div className="flex flex-col">
                  {onlineUsers.includes(friend.userId) ? "Online" : "Offline"}
                </div>
              </>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

export default Chat;
