import React, { useEffect, useState } from "react";
import { FaX } from "react-icons/fa6";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";

interface props {
  setOtpModal: Function;
  userData: any;
  registerSubmit: Function;
}

function OtpModal({ setOtpModal, userData, registerSubmit }: props) {
  const [otp, setOtp] = useState(["", "", "", ""]);
  const { loading } = useSelector((state: any) => state.user);
  const [retryTimer, setRetryTimer] = useState(30);

  useEffect(() => {
    const intervalId = setInterval(() => {
      if (retryTimer > 0) {
        setRetryTimer((prevTime) => prevTime - 1);
      }
    }, 1000);

    return () => clearInterval(intervalId); // Clean up the interval on component unmount
  }, [retryTimer]);

  const handleChange = (e: any, index: number) => {
    const value = e.target.value;
    const updatedOtp = [...otp];
    if (isNaN(value)) {
      return;
    }
    if (value === "") {
      if (index === 0) {
        updatedOtp[index] = "";
      }
      if (index > 0) {
        updatedOtp[index] = "";
        const prevInput = document.querySelectorAll("input")[index - 1];
        prevInput.focus();
      }
    } else {
      updatedOtp[index] = e.target.value;
      if (e.target.value && index < 3) {
        const nextInput = document.querySelectorAll("input")[index + 1];
        nextInput.focus();
      }
    }
    setOtp(updatedOtp);
  };

  const handleSubmit = (e: any) => {
    e.preventDefault();
    const otpValue = otp.join("");
    if (otpValue.length !== 4) {
      toast.error("Please enter a valid 4-digit OTP", {
        position: "top-center",
      });
      return;
    }
    registerSubmit({ ...userData, otp: otpValue });
    setOtp(["", "", "", ""]);
  };
  return (
    <div className="fixed inset-0 flex justify-center items-center z-30 w-screen h-screen bg-black/80">
      <div className="bg-gray-800 w-[30%] h-[40%] px-8 py-6">
        {loading && (
          <div className="flex w-full h-full justify-center items-center">
            <span className="animate-spin w-11 h-11 border-2 border-primary rounded-full border-t-transparent"></span>
          </div>
        )}
        <div className={`w-full h-full ${loading && "hidden"}`}>
          <div className="flex w-full justify-end">
            <button
              onClick={() => {
                setOtpModal(false);
              }}
              className="text-white hover:text-red-500 transition-colors"
            >
              <FaX />
            </button>
          </div>
          <div className="text-white font-bold text-xl text-center mt-10">
            Enter the OTP sent in email
          </div>
          <div className="flex justify-center mt-8">
            <div className="grid grid-cols-4 gap-4">
              {otp.map((digit, index) => (
                <input
                  key={index}
                  value={digit}
                  maxLength={1}
                  onChange={(e) => handleChange(e, index)}
                  className="w-12 h-12 text-center border-primary border bg-transparent text-white"
                />
              ))}
            </div>
          </div>
          <button
            onClick={handleSubmit}
            className="w-full flex justify-center mt-5 text-lg text-primary font-bold"
          >
            Submit
          </button>
          <button
            disabled={retryTimer > 0}
            onClick={() => {
              registerSubmit(userData);
              setRetryTimer(60);
            }}
            className="w-full mt-5 text-white font-semibold text-center"
          >
            {retryTimer == 0
              ? "Resend OTP"
              : "Resend OTP after : " + retryTimer + " seconds"}
          </button>
        </div>
      </div>
    </div>
  );
}

export default OtpModal;
