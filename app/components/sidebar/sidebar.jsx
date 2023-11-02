import Link from "next/link";
import Logo from "@/public/assets/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";

export default function Formnav() {
  const router = useRouter();

  const handleGoBack = () => {
    if (router.pathname === "/bookings") {
      // If the current route is "/bookings," navigate to your website URL
      window.location.href = 'https://sujadrivingschool.co.uk/';
    } else {
      // Use the router's back() method to navigate back to the previous page
      router.back();
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0.8, marginRight: -360 }}
      animate={{ opacity: 1, marginRight: 0 }}
      exit={{ opacity: 1, marginRight: -360 }}
      transition={{ delay: 0.1, duration: 0.4 }}
      className="fixed pt-28 top-0 right-0 z-10 w-[350px] bg-[#0c1936] text-white overflow-y-auto h-[calc(100vh-0px)] p-6"
    >
      <div className="flex flex-col w-full h-full">
        <div className="flex items-center space-x-4">
          <Image alt="Suja Logo" width={70} height={70} src={Logo} className="mb-4" />
          <h1 className="text-xl leading-snug font-semibold">Cart Summary</h1>
        </div>
        <div className="mt-5">
          <h4 className="text-white text-opacity-50 font-bold uppercase text-[13px] tracking-wide">
            Course
          </h4>
          <div className="mt-2 w-full font-semibold flex">
            <span className="w-full">15 Hours - Automatic</span>
            <div className="text-right">
              <span className="text-white text-opacity-60 ml-4">£730</span>
            </div>
          </div>
        </div>
        <div className="mt-5">
          <h4 className="text-white text-opacity-50 font-bold uppercase text-[13px] tracking-wide">
            Tests
          </h4>
          <div className="mt-2 w-full font-semibold flex">
            <span className="w-full">Practical Test</span>
            <div className="text-right">
              <span className="text-white text-opacity-60 ml-4">£110</span>
            </div>
          </div>
        </div>
        <div className="mt-14 flex justify-between items-center">
          <h4 className="text-white text-opacity-50 font-bold uppercase text-[13px] tracking-wide">
            Total
          </h4>
          <div>
            <span className="text-white font-semibold">£840</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
