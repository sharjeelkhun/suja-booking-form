"use client"
import Link from "next/link";
import Logo from "@/public/assets/logo.png";
import Image from "next/image";
import { useRouter } from "next/router";
import { motion } from "framer-motion";


export default function Formnav() {

  const router = useRouter();

  const handleGoBack = () => {
    if (router.pathname === "/bookings") {
      // If the current route is "/booking," navigate to your website URL
      window.location.href = 'https://sujadrivingschool.co.uk/';
    } else {
      // Use the router's back() method to navigate back to the previous page
      router.back();
    }
  };

  return (
   <div className={`bg-theme-red-color flex items-center text-white text-center w-100 sticky top-0 z-10 ${router.pathname === "/bookings" ? "justify-center" : ""} ${router.pathname !== "/bookings" ? "justify-start" : ""}`}>
      <p className="absolute left-0 ps-3 text-white cursor-pointer z-20" style={{ opacity: 1 }} onClick={handleGoBack}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width={21}
          height={21}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M19 12H6M12 5l-7 7 7 7" />
        </svg>
      </p>
      {/* <Link href="/bookings"> */}
      {/* {router.pathname === "/bookings" && ( */}



      {/* )} */}
 
        <div  className={`"w-full h-[80px] flex justify-center items-center ${router.pathname !== "/bookings" ? "lg:w-[calc(100vw-350px)]" : ""} "`}  style={{ opacity: 1, transform: "none" }}
>


          {router.pathname === "/bookings" && (
            <motion.div
              initial={{ opacity: router.pathname === "/bookings" ? 0 : 1, marginRight: router.pathname === "/bookings" ? -150 : 0 }}
              animate={{ opacity: router.pathname !== "/bookings" ? 0 : 1, marginRight: router.pathname !== "/bookings" ? 0 : 0 }}
              exit={{ opacity: router.pathname === "/bookings" ? 0 : 1, marginRight: router.pathname === "/bookings" ? -150 : 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              <Image alt="" src={Logo} className="mx-auto p-2 w-100% h-100%" />
          </motion.div>
          )}
        

        {router.pathname !== "/bookings" && (
                  <motion.div
                  initial={{ opacity: router.pathname === "/bookings" ? 0 : 1, marginRight: router.pathname === "/bookings" ? 0 : -360 }}
                  animate={{ opacity: router.pathname !== "/bookings" ? 1 : 0, marginRight: router.pathname !== "/bookings" ? 0 : 0 }}
                  exit={{ opacity: router.pathname === "/bookings" ? 0 : 1, marginRight: router.pathname === "/bookings" ? 0 : -360 }}
                  transition={{ delay: 0.1, duration: 0.5 }}
                  className="h-50 w-full flex justify-center items-center"
                  >
        <div className="flex flex-col py-5 text-white w-full max-w-[260px]">
              <div className="text-center mb-2 font-bold">Course Details</div>
              <div className="flex space-x-[6px]">
                <div className="bg-white bg-opacity-50 first:rounded-l-md w-full h-[8px] last:rounded-r-md overflow-hidden">
                  <div
                    className="w-full h-full bg-white "
                    style={{ width: "100%", opacity: 1 }}
                  />
                </div>
                <div className="bg-white bg-opacity-50 first:rounded-l-md w-full h-[8px] last:rounded-r-md overflow-hidden">
                  <div
                    className="w-full h-full bg-white "
                    style={{ width: "0%", opacity: 0 }}
                  />
                </div>
                <div className="bg-white bg-opacity-50 first:rounded-l-md w-full h-[8px] last:rounded-r-md overflow-hidden">
                  <div
                    className="w-full h-full bg-white "
                    style={{ width: "0%", opacity: 0 }}
                  />
                </div>
                <div className="bg-white bg-opacity-50 first:rounded-l-md w-full h-[8px] last:rounded-r-md overflow-hidden">
                  <div
                    className="w-full h-full bg-white "
                    style={{ width: "0%", opacity: 0 }}
                  />
                </div>
                <div className="bg-white bg-opacity-50 first:rounded-l-md w-full h-[8px] last:rounded-r-md overflow-hidden">
                  <div
                    className="w-full h-full bg-white "
                    style={{ width: "0%", opacity: 0 }}
                  />
                </div>
                <div className="bg-white bg-opacity-50 first:rounded-l-md w-full h-[8px] last:rounded-r-md overflow-hidden">
                  <div
                    className="w-full h-full bg-white "
                    style={{ width: "0%", opacity: 0 }}
                  />
                </div>
              </div>
        </div>
        </motion.div>
        )}
        
</div>


      {/* </Link> */}
    </div>
  );
}
