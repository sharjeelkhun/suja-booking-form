
import { forgotPassword } from "@/app/service/mailService";
import Head from 'next/head'
import { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import Logo from "@/public/assets/logo-black.png";
import Image from "next/image";
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';
import Router from 'next/router';
import Link from 'next/link';
import jwt_decode from "jwt-decode";


export default function Home() {
  const [formData, setFormData] = useState({ email: ""});


  const handleSubmit = async (e) => {
    e.preventDefault();
    const res = await forgotPassword(formData);
    // if (res.success) {
    //   toast.success(res.message);
    //   const user = jwt_decode(res.token);
    //   Cookies.set("token", res.token);
    //   // setTimeout(() => {
    //     Router.push("/"+user.role);
    //   // }, 1000);
    // } else {
    //   toast.error(res.message);
    // }
  };

  return (
    <>
      <Head>
        <title>Login System</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <section className="bg-[#f8f8f8] text-center text-navy-700">
        <div className="flex flex-col h-screen items-center justify-center px-6 py-8 mx-auto lg:py-0">
        <Image alt="" src={Logo} className="mx-auto mb-5 w-100% h-100%" />
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-red-800 dark:border-red-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-red-600 md:text-2xl dark:text-white">
                FORGOT PASSWORD
              </h1>
              <form onSubmit={handleSubmit} className=" space-y-4 md:space-y-6" action="#">
                <div className='text-left'>
                  <label htmlFor="email" className="block mb-2 text-sm font-medium text-black dark:text-white">Your email</label>
                  <input onChange={(e) => setFormData({ ...formData, email: e.target.value })} type="email" name="email" id="email" className="bg-indigo-50 border border-indigo-300 text-indigo-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-indigo-700 dark:border-indigo-600 dark:placeholder-indigo-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required="" />
                </div>
                <button type="submit" className="w-full text-white bg-red-600 hover:bg-primary-700 focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800">Submit</button>
                <div class="flex flex-row items-center justify-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="21" height="21" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M19 12H6M12 5l-7 7 7 7"></path></svg>
                <Link href="/login" className="text-sm px-2 font-medium text-primary-600 hover:underline dark:text-primary-500">Back to login</Link>
                </div>  

              </form>
            </div>
          </div>
        </div>
      </section>
      <ToastContainer />
    </>
  )
}



export async function getServerSideProps(context) {
  const token = context.req.cookies.token

  if (token) {
    return {
      redirect: {
        destination: '/home',
        permanent: false,
      },
    }
  }

  return {
    props: {},
  }
}