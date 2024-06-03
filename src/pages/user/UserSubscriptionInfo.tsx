import instance from "@/config/axiosConfig";
import { PAYMENT_SERVICE_URL } from "@/constants/service_urls";
import { logout } from "@/redux/reducers/userSlice";
import { RootState } from "@/redux/store/store";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";

interface IUserSubscription {
  amount: number | null;
  currency: string | null;
  subscribedAt: string | null;
  subscriptionCancelled: boolean;
  subscriptionCancelledAt: string | null;
}
function UserSubscriptionInfo() {
  const { user } = useSelector((state: RootState) => state.user);
  const [userSubscriptions, setUserSubscriptions] = useState<
    IUserSubscription[]
  >([]);
  const dispatch = useDispatch();
  const fetchUserSubscription = async () => {
    try {
      const response = await instance.get(
        `${PAYMENT_SERVICE_URL}/user/payment/subscriptions`
      );
      console.log("Response : {}", response);
      response.status === 200 && setUserSubscriptions(response.data);
    } catch (error: any) {
      if (!error.response || !error.response.data) {
        toast.error("Network error!");
        return;
      }
      if (error.status === 401 || error.status === 403) {
        dispatch(logout());
      } else if (error.status >= 400 && error.status < 500) {
        toast.error(error.response.data.message);
      } else if (error.status >= 500) {
        toast.error("Something went wrong on our side..");
      }
    }
  };
  useEffect(() => {
    fetchUserSubscription();
  }, []);
  return (
    <>
      <div className="page-padding text-white">
        <h2 className="font-bold text-3xl p-2">Subscriptions</h2>
        {userSubscriptions.length == 0 && (
          <div className="text-center mt-2 font-bold text-xl">
            No subscriptions are done.
          </div>
        )}
        {userSubscriptions?.length > 0 && (
          <table className="w-full rounded-lg mt-10">
            <thead>
              <tr className="bg-dark-200 ">
                <th className="px-4 py-2">Subscribed at</th>
                <th className="px-4 py-2">Type</th>
                <th className="px-4 py-2">Amount</th>
                <th className="px-4 py-2">Status</th>
                <th className="px-4 py-2">Cancelled At</th>
              </tr>
            </thead>
            <tbody>
              {userSubscriptions.map((subscription, index) => (
                <tr
                  key={index}
                  className="bg-dark text-center hover:bg-gray-900 cursor-pointer transition-colors"
                >
                  <td className="px-4 py-2">
                    {new Date(subscription.subscribedAt!).toLocaleDateString()}
                  </td>
                  <td className="px-4 py-2">Premium membership</td>
                  <td className="px-4 py-2">
                    {subscription.currency === "INR"
                      ? "₹"
                      : subscription.currency}{" "}
                    {subscription.amount}
                  </td>
                  <td className="px-4 py-2">
                    {subscription.subscriptionCancelled ? (
                      <div className="bg-red-600 text-white p-2 rounded font-bold">
                        Cancelled
                      </div>
                    ) : (
                      <div className="bg-green-600 text-white p-2 font-bold rounded">
                        Active
                      </div>
                    )}
                  </td>
                  <td className="px-4 py-2">
                    {subscription.subscriptionCancelledAt ? (
                      new Date(
                        subscription.subscriptionCancelledAt!
                      ).toLocaleDateString()
                    ) : (
                      <p>--</p>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </>
  );
}

export default UserSubscriptionInfo;
