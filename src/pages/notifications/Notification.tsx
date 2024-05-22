import instance from "@/config/axiosConfig";
import { NOTIFICATION_SERVICE_URL } from "@/constants/service_urls";
import { logout } from "@/redux/reducers/userSlice";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface IUserNotification {
  notificationId: number;
  userId: number;
  fromUsername: string;
  title: string;
  body: string;
  seen: boolean;
  notificationSendAt: string;
}
function Notification() {
  const { user } = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch();
  const [userNotifications, setUserNotifications] = useState<
    IUserNotification[]
  >([]);
  const fetchNotification = async () => {
    try {
      const response = await instance.get(
        `${NOTIFICATION_SERVICE_URL}/user/notifications/${user?.userId}`
      );
      console.log(response);
      if (response.status === 200) {
        setUserNotifications(response.data);
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
  useEffect(() => {
    fetchNotification();
  }, [user]);
  return (
    <>
      <div className="page-padding dark:text-white">
        <h2 className="font-bold text-3xl py-2">Notifications</h2>
        <div className="bg-dark-300 rounded w-full p-5 mt-5">
          {" "}
          {userNotifications.length === 0 && (
            <div className="font-bold text-white justify-center">
              No new notifications at the moment
            </div>
          )}
          {userNotifications.length > 0 &&
            Object.entries(
              userNotifications.reduce(
                (acc: { [key: string]: IUserNotification[] }, notification) => {
                  const date: string = new Date(
                    notification.notificationSendAt
                  ).toDateString();
                  if (!acc[date]) {
                    acc[date] = [];
                  }
                  acc[date].push(notification);
                  return acc;
                },
                {}
              )
            ).map(([date, notifications]) => (
              <div key={date}>
                <h3 className="text-xl font-bold mb-4">{date}</h3>
                <hr></hr>
                {notifications.map((notification, index) => (
                  <div className="mt-5" key={index}>
                    {notification.body}
                  </div>
                ))}
              </div>
            ))}
        </div>
      </div>
    </>
  );
}

export default Notification;
