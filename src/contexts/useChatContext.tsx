import React, {
  useState,
  useEffect,
  useContext,
  createContext,
  Dispatch,
  SetStateAction,
  ReactNode,
} from "react";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import { toast } from "react-toastify";
import IUserData from "@/interfaces/IUserData";

export interface IChatData {
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
}

interface ChatContextData {
  messages: IChatData[];
  sendMessage: (message: IChatData) => void;
  setMessages: Dispatch<SetStateAction<IChatData[]>>;
  onlineUsers: number[];
}

const ChatContext = createContext<ChatContextData | null>(null);

export const useChatContext = () => {
  const context = useContext(ChatContext);
  if (!context) {
    throw new Error("useChatContext must be used within a ChatProvider");
  }
  return context;
};

export const ChatProvider: React.FC<{
  user?: IUserData | null;
  children: ReactNode;
}> = ({ children, user }) => {
  const [messages, setMessages] = useState<IChatData[]>([]);
  const [stompClient, setStompClient] = useState<any>(null);
  const [onlineUsers, setOnlineUsers] = useState<number[]>([]);

  useEffect(() => {
    if (!user) {
      return;
    }
    const socket = new SockJS("http://localhost:9800/chat/ws");
    const stompClient = Stomp.over(socket);
    stompClient.connect(
      { "user-id": user.userId.toString() },
      () => {
        stompClient.subscribe(
          `/queue/messages/${user?.userId}`,
          onMessageReceived
        );
        stompClient.subscribe("/topic/onlineUsers", (message) => {
          const data: string[] = JSON.parse(message.body);
          const onlineUsers: number[] = data.map((userId) =>
            Number.parseInt(userId)
          );
          console.log("Online users:", onlineUsers);
          setOnlineUsers(onlineUsers);
        });
        setStompClient(stompClient);
      },
      (error: any) => {
        toast.error("Something went wrong while making connection to socket");
        console.error(error);
      }
    );
    return () => {
      if (stompClient && stompClient.connected) {
        console.log("<<<<<<<< DISCONNECTING FROM SOCKET >>>>>>>");
        stompClient.disconnect(() => {
          console.log("Disconnected from socket");
        });
      }
    };
  }, [user]);

  useEffect(() => {
    console.log("LIST ONLINE USERS: ", onlineUsers);
  }, [onlineUsers]);

  const onMessageReceived = (payload: any) => {
    const message: IChatData = JSON.parse(payload.body);
    console.log("ONMESSAGERECIEVED: ", payload);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        senderId: message.senderId,
        receiverId: message.receiverId,
        content: message.content,
        timestamp: message.timestamp,
      },
    ]);
  };

  const sendMessage = (message: IChatData) => {
    if (stompClient && stompClient.connected) {
      console.log("SENDING MESSAGE: ", message);
      stompClient.send(
        "/app/message",
        {},
        JSON.stringify({ ...message, timestamp: null })
      );
      setMessages((existing) => [...existing, message]);
    }
  };

  const value: ChatContextData = {
    messages,
    sendMessage,
    setMessages,
    onlineUsers,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
