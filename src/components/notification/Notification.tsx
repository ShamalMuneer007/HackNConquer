import instance from "@/config/axiosConfig";
import {
  messaging,
  onMessageListener,
  requestPermission,
} from "@/config/firebaseConfig";
import { USER_SERVICE_URL } from "@/constants/service_urls";
import { RootState } from "@/redux/store/store";
import { getToken } from "firebase/messaging";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { ToastContainer, toast } from "react-toastify";

interface SetDeviceTokenSubmissionData {
  userId: number | undefined;
  deviceToken: string;
}
const Notifications = () => {
  const [notification, setNotification] = useState<{
    title: string;
    body: string;
  }>({
    title: "",
    body: "",
  });
  const { user } = useSelector((state: RootState) => state.user);
  const setUserDeviceToken = async (
    deviceTokenSubmissionData: SetDeviceTokenSubmissionData
  ) => {
    try {
      console.log("TOKEN SETTING UP DATA : ", deviceTokenSubmissionData);
      const response = await instance.post(
        `${USER_SERVICE_URL}/user/set-device-token`,
        deviceTokenSubmissionData
      );
      console.log("SETTING UP TOKEN RESPONSE : ", response);
      if (response.status === 200) {
        console.log("User device token is updated");
      }
    } catch (error: any) {
      if (error.status === 401 || error.status === 403)
        console.error("Invalid User Token");
      if (error.response) {
        console.error("Something went wrong!");
        console.error(error.response.data.message);
      }
    }
  };
  useEffect(() => {
    console.log("Ferching data");
    const fetchData = async () => {
      try {
        const deviceToken = await requestPermission();
        console.log(deviceToken);
        if (deviceToken && user?.role === "ROLE_USER") {
          console.log("DEVICE TOKEN :", deviceToken);
          setUserDeviceToken({ userId: user.userId, deviceToken });
        }

        const payload = await onMessageListener();

        if (payload) {
          setNotification({
            title: payload.notification.title || "",
            body: payload.notification.body || "",
          });

          toast.info(
            `${payload.notification.title} \n, ${payload.notification.body}`,
            {
              position: "top-right",
            }
          );
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    if (user) fetchData();

    const handleTokenRefresh = async () => {
      try {
        const refreshedToken = await getToken(messaging);
        console.log("Token refreshed:", refreshedToken);
        setUserDeviceToken({
          userId: user?.userId,
          deviceToken: refreshedToken,
        });
      } catch (error) {
        console.error("Error refreshing token:", error);
      }
    };

    const intervalId = setInterval(() => {
      if (user) handleTokenRefresh();
    }, 24 * 60 * 60 * 1000);

    return () => clearInterval(intervalId);
  }, [user]);

  return <div></div>;
};

export default Notifications;
