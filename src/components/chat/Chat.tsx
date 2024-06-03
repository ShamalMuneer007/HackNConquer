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
  const { onlineUsers, newMessages, setNewMessages } = useChatContext();
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
    const fetchNewMessages = async () => {
      if (friends && friends.length > 0) {
        try {
          const friendsId: number[] = friends.map((friend) => friend.userId);
          const response = await instance.post(
            `/chat/api/messages/new/${user?.userId}`,
            friendsId
          );
          console.log("Find Message Response : ", response);
          if (newMessages.length === 0) {
            setNewMessages(response.data);
          }
        } catch (e: any) {
          if (e.status === 401 || e.status === 403) {
            dispatch(logout());
          }
          toast.error("Something went wrong while fetching online users");
        }
      }
    };
    fetchNewMessages();
  }, [friends]);
  useEffect(() => {
    console.log("NEW MESSAGES : ", newMessages);
  }, [newMessages]);
  useEffect(() => {
    console.log("CHAT ONLINE :", onlineUsers);
  }, [onlineUsers]);

  return (
    <div className="bg-dark-300 border-primary border w-[30vw] text-white py-5 px-0 h-[70vh]  rounded-md">
      {selectedUser ? (
        <Message
          selectedUser={selectedUser}
          setSelectedUser={setSelectedUser}
        />
      ) : (
        <div className="px-6 pt-2">
          <h2 className="font-bold text-xl"> Messages</h2>
          <div className="mt-5 overflow-y-scroll">
            {friends.length === 0 && (
              <div className="text-center text-white text-lg font-bold">
                Make some friends to chat!
              </div>
            )}
            {friends.map((friend, index) => (
              <div key={friend.userId}>
                <div
                  className="flex gap-5 items-center p-5 hover:bg-dark-200 cursor-pointer rounded-lg"
                  onClick={() => setSelectedUser(friend)}
                >
                  <div className="flex relative">
                    <img
                      src={friend.profileImage || profileImage}
                      className="w-10 h-10 rounded-full border border-gray-600"
                      referrerPolicy="no-referrer"
                    ></img>
                    <div
                      className={`rounded-full absolute bottom-0 right-0.5 p-[0.3rem] ${
                        onlineUsers.includes(friend.userId)
                          ? "bg-green-400"
                          : "bg-gray-300"
                      }`}
                    ></div>
                  </div>
                  <p>{friend.username}</p>
                  {newMessages.map(
                    (newMessage, index) =>
                      newMessage.userId === friend.userId && (
                        <>
                          <div className="rounded-full h-[20px] w-[20px] text-center flex items-center justify-center bg-red-500 text-xs">
                            <div>{newMessage.count}</div>
                          </div>
                        </>
                      )
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}

export default Chat;
