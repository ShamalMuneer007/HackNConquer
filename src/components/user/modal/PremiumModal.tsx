import { SetStateAction, Dispatch, useRef, useEffect, useState } from "react";
import { IoIosClose } from "react-icons/io";
import ICON from "@/assets/animated/wired-lineal-955-demand.json";
import AnimatedIcon from "@/components/animated/icon/AnimatedIcon";
import { toast } from "react-toastify";
import { PAYMENT_SERVICE_URL } from "@/constants/service_urls";
import instance from "@/config/axiosConfig";
import { RootState } from "@/redux/store/store";
import { useSelector } from "react-redux";

interface Props {
  setModal: Dispatch<SetStateAction<boolean>>;
}
function PremiumModal({ setModal }: Props) {
  const { user } = useSelector((state: RootState) => state.user);
  const createSubscription = async () => {
    try {
      const createPaymentIntentData = {
        name: user?.username,
        email: user?.email,
        priceId: "price_1PE5eiSHddWUdogxgDAmNIrA",
        userId: user?.userId,
      };
      const response: any = await instance.post(
        `${PAYMENT_SERVICE_URL}/user/payment/payment-intent/setup`,
        createPaymentIntentData
      );
      console.log("Response: ", response);

      if (response.data.redirectUrl) {
        window.location.href = response.data.redirectUrl;
      }
      setModal(false);
    } catch (error: any) {
      if (error.response && error.response.data) {
        if (error.response.status === 401) {
          toast.error("Token expired");
        } else if (
          error.response.status >= 400 &&
          error.response.status < 500
        ) {
          toast.error(error.response.data.message);
        }
        if (error.response.status >= 500) {
          toast.error("Something went wrong on our side !!!");
          console.error("INTERNAL SERVER ERROR : ", error.response);
        }
      }
      !error.response && toast.error(error.message);
      console.log(error);
    }
  };
  const subscribeClickHandler = () => {
    createSubscription();
  };
  return (
    <>
      {
        <div className="h-screen w-screen absolute z-50 inset-0 bg-black/20 backdrop-blur-sm flex justify-center items-center">
          <div className="w-[50%] relative h-[50%] bg-dark-200 rounded-md shadow-lg">
            <button
              className="absolute right-4 hover:text-red-700 top-2 text-3xl"
              onClick={() => setModal(false)}
            >
              <IoIosClose />
            </button>
            <div className="flex justify-center h-full fontbold flex-col items-center">
              <AnimatedIcon icon={ICON} />
              <p className="w-[70%] text-center text-4xl">
                Get our premium membership to create a clan
              </p>
              <div className="flex justify-center">
                <button
                  onClick={subscribeClickHandler}
                  className="bg-yellow-800 mt-10 hover:bg-yellow-900 transition-colors text-white font-bold rounded-md p-2"
                >
                  Subscribe
                </button>
              </div>
            </div>
          </div>
        </div>
      }
    </>
  );
}

export default PremiumModal;
