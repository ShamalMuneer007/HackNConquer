import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import confettiAnimation from "@/assets/animated/Animation - 1715498851175.json";
import Lottie from "react-lottie";

const PaymentSuccess = () => {
  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: confettiAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.2 }}
      className="payment-success"
    >
      <motion.div
        className="confetti-container absolute"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.5 }}
      >
        <Lottie options={defaultOptions} height={600} width={600} />
      </motion.div>
      <div className="success-container absolute z-40">
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="success-icon p-5"
        >
          <FaCheckCircle size={100} color="#28a745" />
        </motion.div>
        <motion.h2
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="text-white"
        >
          Payment Successful!
        </motion.h2>
        <motion.p
          initial={{ y: 50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.5, delay: 1 }}
          className="text-primary"
        >
          Your payment has been processed successfully.
        </motion.p>
      </div>
    </motion.div>
  );
};

export default PaymentSuccess;
