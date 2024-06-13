import IUserData from "@/interfaces/IUserData";
import { Dispatch, SetStateAction, useEffect, useState, useRef } from "react";

import profileImage from "/profile-icon.png";
import {
  IoMdArrowRoundBack,
  IoMdCloseCircleOutline,
  IoMdSend,
} from "react-icons/io";
import SockJS from "sockjs-client";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import instance from "@/config/axiosConfig";
import { useChatContext, IChatData } from "@/contexts/useChatContext";
import { FaReply } from "react-icons/fa6";

interface Props {
  selectedUser: IUserData;
  setSelectedUser: Dispatch<SetStateAction<IUserData | null>>;
}
type MessageRefs = {
  [key: string]: HTMLDivElement | null;
};
function Message({ selectedUser, setSelectedUser }: Props) {
  const [message, setMessage] = useState("");
  const messagesEndRef = useRef<HTMLDivElement | null>(null);
  const messageRefs = useRef<MessageRefs>({});
  const { messages, sendMessage, setMessages, onlineUsers, readMessages } =
    useChatContext();
  const { user } = useSelector((state: RootState) => state.user);
  const [replyTo, setReplyTo] = useState<number | null>(null);
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
    if (
      user &&
      messages.length > 0 &&
      messages.filter(
        (message) => message.receiverId === user?.userId && !message.read
      ).length > 0
    ) {
      console.log("READING MESSAGE");
      readMessages(user.userId, selectedUser.userId);
    }
    messagesEndRef.current?.scrollIntoView({ behavior: "instant" });
  }, [messages]);
  useEffect(() => {
    setMessages([]);
    fetchMessages();
    return () => setMessages([]);
  }, []);

  return (
    <>
      <div className="flex gap-5 h-[10%] px-5">
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
          <div className="">
            <p>{selectedUser.username}</p>
            <div className="flex gap-2 text-xs items-center">
              <div
                className={`h-1 rounded-full p-[0.3rem] ${
                  onlineUsers.includes(selectedUser.userId)
                    ? "bg-green-400"
                    : "bg-gray-300"
                }`}
              ></div>
              <span>
                {onlineUsers.includes(selectedUser.userId)
                  ? "Online"
                  : "Offline"}
              </span>
            </div>
          </div>
        </div>
      </div>
      <hr className="my-2"></hr>
      <div className="h-[70%] w-full overflow-scroll pe-3 ps-4">
        {messages.map((message: IChatData, index) => (
          <>
            <div
              className={`chat pt-2 ${
                message.senderId === user?.userId ? "chat-end" : "chat-start"
              }`}
              draggable
              ref={(el) => (messageRefs.current[message.messageId] = el)}
            >
              <div className="chat-image avatar">
                <div className="w-8 rounded-full">
                  <img
                    alt="chat bubble component"
                    src={
                      message.senderId == selectedUser.userId
                        ? selectedUser.profileImage || profileImage
                        : user?.profileImage || profileImage
                    }
                  />
                </div>
              </div>
              <div className="chat-header">
                <time className="text-xs opacity-50">
                  {new Date(message.timestamp).toLocaleTimeString(undefined, {
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </time>
              </div>

              <div
                className={`flex gap-2 ${
                  message.senderId === user?.userId && "flex-row-reverse"
                }`}
              >
                <div
                  className={`chat-bubble ${
                    message.senderId === user?.userId
                      ? "chat-bubble-success"
                      : "chat-bubble-accent"
                  } max-w-64 overflow-scroll p-0 pt-1 px-1 text-center cursor-pointer flex items-center flex-col`}
                  onClick={() => {
                    if (message.replyFor) {
                      messageRefs.current[message.replyFor]?.scrollIntoView({
                        behavior: "smooth",
                        block: "center",
                      });
                    }
                  }}
                >
                  {message.replyFor ? (
                    messages
                      .filter((reply) => message.replyFor === reply.messageId)
                      .map((ele) => (
                        <>
                          <div
                            className={`bg-dark-200 -outline-offset-2 outline ${
                              ele.senderId === user?.userId
                                ? "outline-success"
                                : "outline-info"
                            } text-white  p-2 rounded w-[100%]`}
                          >
                            {ele.content}
                          </div>
                        </>
                      ))
                  ) : (
                    <></>
                  )}
                  <div className="p-3 pt-1">{message.content}</div>
                </div>
                <button
                  className="rounded-full h-6 text-[8px] bg-black/20 p-1"
                  onClick={() => setReplyTo(index)}
                >
                  <FaReply />
                </button>
              </div>
              {message.senderId === user?.userId && (
                <div className="chat-footer opacity-50">
                  {message.read ? "Read" : ""}
                </div>
              )}
            </div>
          </>
        ))}
        <div ref={messagesEndRef} />
      </div>
      {replyTo !== null && messages.length > 0 && (
        <div className="bg-dark-100 relative rounded p-2 flex flex-col -mt-3 z-50">
          <div
            className="absolute right-2 top-2 text-[14px]"
            onClick={() => setReplyTo(null)}
          >
            <IoMdCloseCircleOutline />
          </div>
          <div className="text-xs">
            Reply to :{" "}
            {messages[replyTo].senderId === user?.userId
              ? user.username
              : selectedUser.username}
          </div>
          <div className="text-sm">
            <p>{messages[replyTo].content}</p>
          </div>
        </div>
      )}
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
                messageId: 0,
                senderId: user.userId,
                receiverId: selectedUser.userId,
                content: message,
                read: false,
                timestamp: new Date().toString(),
                replyFor:
                  replyTo != null && messages[replyTo]
                    ? messages[replyTo].messageId
                    : null,
              };
              console.log("Payload : ", payload);
              setReplyTo(null);
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
