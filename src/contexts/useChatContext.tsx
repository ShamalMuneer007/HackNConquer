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
import instance from "@/config/axiosConfig";
import { logout, setMessage } from "@/redux/reducers/userSlice";
import { useDispatch } from "react-redux";

export interface IChatData {
  messageId: number;
  senderId: number;
  receiverId: number;
  content: string;
  timestamp: string;
  read: boolean;
  replyFor?: number | null;
}
interface INewMessages {
  userId: number;
  count: number;
}
interface ChatContextData {
  messages: IChatData[];
  sendMessage: (message: IChatData) => void;
  setMessages: Dispatch<SetStateAction<IChatData[]>>;
  onlineUsers: number[];
  readMessages: (receiverId: number, senderId: number) => void;
  newMessages: INewMessages[];
  setNewMessages: Dispatch<SetStateAction<INewMessages[]>>;
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
  const [newMessages, setNewMessages] = useState<INewMessages[]>([]);
  const dispatch = useDispatch();
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
          `/user/${user.userId}/queue/messages`,
          onMessageReceived
        );
        stompClient.subscribe(
          `/queue/messages/read/${user?.userId}`,
          onMessageRead
        );
        stompClient.subscribe("/topic/onlineUsers", (message) => {
          console.log("ONLINE TOPIC USERS :", message);
          const data: string[] = JSON.parse(message.body);
          const onlineUsers: number[] = data.map((userId) =>
            Number.parseInt(userId)
          );
          console.log("Online users:", onlineUsers);
          setOnlineUsers(onlineUsers);
        });
        setStompClient(stompClient);
        stompClient.subscribe(
          `/user/${user.userId}/queue/onlineUsers`,
          (message) => {
            const data: string[] = JSON.parse(message.body);
            const onlineUsers: number[] = data.map((userId) =>
              Number.parseInt(userId)
            );
            console.log("Online users:", onlineUsers);
            setOnlineUsers(onlineUsers);
          }
        );
        instance
          .get("/chat/api/messages/online-users")
          .then((response) => {
            if (onlineUsers.length === 0) {
              const onlineUsers: number[] = response.data.map(
                (userId: string) => Number.parseInt(userId)
              );
              setOnlineUsers(onlineUsers);
            }
          })
          .catch((e) => {
            if (e.status === 401 || e.status === 403) {
              dispatch(logout());
            }
            toast.error("Something went wrong while fetching online users");
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
        setNewMessages([]);
      }
    };
  }, [user]);

  useEffect(() => {
    console.log("LIST ONLINE USERS: ", onlineUsers);
  }, [onlineUsers]);

  const onMessageReceived = (payload: any) => {
    console.log(
      ">>>>>>>>>>>>>>>>>>>> ONMESSAGERECIEVED: <<<<<<<<<<<<<<<<<<<<",
      payload
    );
    const message: IChatData = JSON.parse(payload.body);
    setMessages((prevMessages) => [
      ...prevMessages,
      {
        messageId: message.messageId,
        senderId: message.senderId,
        receiverId: message.receiverId,
        content: message.content,
        timestamp: message.timestamp,
        read: message.read,
        replyFor: message.replyFor,
      },
    ]);
    setNewMessages((prevNewMessages) => {
      const existingUserIndex = prevNewMessages.findIndex(
        (newMessage) => newMessage.userId === message.senderId
      );

      if (existingUserIndex !== -1) {
        const updatedNewMessages = [...prevNewMessages];
        updatedNewMessages[existingUserIndex].count++;
        return updatedNewMessages;
      } else {
        return [...prevNewMessages, { userId: message.senderId, count: 1 }];
      }
    });
  };
  const onMessageRead = (payload: any) => {
    console.log("Reading messages: ", payload);
    setMessages((prevMessages) =>
      prevMessages.map((message) => {
        message.read = true;
        return message;
      })
    );
  };

  const sendMessage = (message: IChatData) => {
    if (stompClient && stompClient.connected) {
      console.log("SENDING MESSAGE: ", message);
      stompClient.send(
        "/app/message",
        {},
        JSON.stringify({ ...message, timestamp: null })
      );
      // setMessages((existing) => [...existing, message]);
    }
  };
  const readMessages = (receiverId: number, senderId: number) => {
    if (stompClient && stompClient.connected) {
      console.log("Reading messages of : ", senderId, " by : ", receiverId);
      stompClient.send(`/app/message/${receiverId}/read/${senderId}`, {});
      setMessages((existing) =>
        existing.map((message) => {
          message.read = true;
          return message;
        })
      );
      setNewMessages((prevNewMessages) => {
        const existingUserIndex = prevNewMessages.findIndex(
          (newMessage) => newMessage.userId === senderId
        );

        if (existingUserIndex !== -1) {
          const updatedNewMessages = [...prevNewMessages];
          updatedNewMessages.splice(existingUserIndex, 1);
          return updatedNewMessages;
        } else {
          return prevNewMessages;
        }
      });
    }
  };

  const value: ChatContextData = {
    messages,
    sendMessage,
    setMessages,
    onlineUsers,
    readMessages,
    newMessages,
    setNewMessages,
  };

  return <ChatContext.Provider value={value}>{children}</ChatContext.Provider>;
};
