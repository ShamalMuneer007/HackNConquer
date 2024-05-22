import IUserData from "@/interfaces/IUserData";
import React, { Dispatch, SetStateAction, useEffect, useState } from "react";
import { BsBack } from "react-icons/bs";
import profileImage from "/profile-icon.png";
import { IoMdArrowRoundBack, IoMdSend } from "react-icons/io";
import SockJS from "sockjs-client";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import instance from "@/config/axiosConfig";
import { useChatContext, IChatData } from "@/contexts/useChatContext";

interface Props {
  selectedUser: IUserData;
  setSelectedUser: Dispatch<SetStateAction<IUserData | null>>;
}
function Message({ selectedUser, setSelectedUser }: Props) {
  const [message, setMessage] = useState("");
  const { messages, sendMessage, setMessages } = useChatContext();
  const { user } = useSelector((state: RootState) => state.user);
  const fetchMessages = async () => {
    try {
      const response = await instance.get(
        `/chat/api/messages/${selectedUser.userId}/${user?.userId}`
      );
      console.log("GET CHAT RESPONSE : {}", response);
      const message: IChatData[] = response.data;
      setMessages(message);
    } catch (e: any) {
      toast.error(e.message);
    }
  };
  useEffect(() => {
    console.log("MESSAGES : {}", messages);
  }, [messages]);
  useEffect(() => {
    setMessages([]);
    fetchMessages();
    return () => setMessages([]);
  }, []);

  return (
    <>
      <div className="flex gap-5 h-[10%]">
        <button
          onClick={() => setSelectedUser(null)}
          className="font-bold h-full hover:text-primary cursor-pointer transition-colors"
        >
          <IoMdArrowRoundBack />
        </button>
        <div className="flex items-center gap-5">
          <img
            src={selectedUser.profileImage || profileImage}
            className="w-10 h-10 rounded-full"
            referrerPolicy="no-referrer"
          ></img>
          <p>{selectedUser.username}</p>
        </div>
      </div>
      <hr className="my-2"></hr>
      <div className="h-[70%] w-full overflow-scroll">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`mb-4 w-full flex ${
              message.senderId === user?.userId
                ? "justify-end"
                : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs rounded-lg py-2 mx-2 ${
                message.senderId === user?.userId
                  ? "bg-green-900 text-white "
                  : "bg-dark-200"
              }`}
            >
              <p
                className={`min-w-[50px]  flex ${
                  message.senderId === user?.userId
                    ? "justify-end ps-10 pe-2"
                    : "justify-start ps-2 pe-10"
                }`}
              >
                {message.content}
              </p>
              <div
                className={`text-xs px-1 flex text-gray-500 ${
                  message.senderId === user?.userId
                    ? "justify-start"
                    : "justify-end"
                }`}
              >
                {new Date(message.timestamp!).toLocaleTimeString(undefined, {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: false,
                })}
              </div>
            </div>
          </div>
        ))}
      </div>
      <div className="absolute bottom-0 left-0 flex items-center p-4 w-[100%] justify-center">
        <input
          className="flex-1 px-4 py-2 rounded-l-md w-[90%] bg-transparent border text-white border-gray-700 focus:outline-none focus:ring-2 focus:ring-primary"
          type="text"
          placeholder="Type your message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button
          onClick={() => {
            if (user) {
              const payload: IChatData = {
                senderId: user.userId,
                receiverId: selectedUser.userId,
                content: message,
                timestamp: new Date().toString(),
              };
              console.log();
              sendMessage(payload);
              setMessage("");
            }
          }}
          className="px-4 py-2 text-primary border border-primary hover:text-white hover:bg-primary  transition-colors  font-bold rounded-r-md"
        >
          <IoMdSend className="text-2xl" />
        </button>
      </div>
    </>
  );
}
export default Message;
