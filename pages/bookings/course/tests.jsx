import { React, useState, useEffect } from 'react';
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import dynamic from 'next/dynamic'
// import Sidebar from '@/app/components/sidebar/sidebar';
const Sidebar = dynamic(() => import('@/app/components/sidebar/sidebar'), { ssr: false })
import Footnote from '@/app/components/Footnote';
import Formnav from '@/app/components/Formnav';

let formdata = Cookies.get('formData');
const data = formdata ? JSON.parse(formdata) : {  };

console.log(data)

const validationSchema = Yup.object().shape({
  // auto_manual: Yup.string()
  //   .required("Auto Manual is required")
});


const tests = () => {
  const router = useRouter();
  const [changedData, setChangedData] = useState(data);
  const step3 = data.step3;


  return (
    <div>
      <Formik
        initialValues={step3 ? step3 : { fast_track_practical: '', fast_track_theory: '' }}
        //validationSchema={validationSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          const formDatas = {
            ...data,
            ...{'step3': values}
          };
         Cookies.set("formData", JSON.stringify(formDatas), { expires: null });
         router.push("/bookings/student");
         //console.log(formDatas)
        }}
      >
        {({ values, setFieldValue, handleChange }) => (
          <Form>
            <Formnav />
            <div className="mt-[0px] lg:w-[calc(100vw-360px)] flex justify-center items-top px-7 py-8">

              <div className='w-full lg:max-w-[750px] pb-24'>
                <div className=" mt-[80px] items-top py-8">
                  <div className="w-full lg:max-w-[750px]">
                    <div className="w-full mb-5 pr-4"><h1 className="text-[26px] text-neutral-950	 pb-3 font-bold">
                      Which tests would you like us to fast-track for you? </h1>
                      <p className="text-current	font-regular text-[17px] mt-2">
                        We'll fast-track your theory and practical tests so you can pass up to 2x faster than if you book yourself,
                        and we'll do all the admin! Your last lesson will be directly before your practical test.</p>
                      <p className="text-neutral-400	 font-medium text-[17px] mt-2">
                        All courses include a fast-track practical test, but you can remove it below if you've booked your own.</p>
                    </div>
                  </div>
                </div>


        <div className=" mb-10">

                  <Field
                    type="checkbox"
                    name="fast_track_practical"
                    className="sr-only fast_track"
                    id="fast_track_practical"
                    onChange={(e) => {
                      // setFieldValue('fast_track_practical', !values.fast_track_practical);
                      handleChange(e);
                      setChangedData((changedData) => {
                        return {
                          ...changedData,
                          [e.target.name]: e.target.value,
                        };
                      });
                    }}
                  />

        <label htmlFor="fast_track_practical" className="border cursor-pointer flex focus-visible:ring-2 font-semibold hover:bg-opacity-50 hover:bg-pmfLightGreen items-center outline-none pl-5 pr-3.5 rounded-lg text-left text-secondary transition-all w-full">
          <div className=" w-full flex items-center py-4 items-center">
            <div className="pr-5">
              <svg width="30" height="30" viewBox="0 0 52 73" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path fillRule="evenodd" clipRule="evenodd" d="M51 36.5C51 50.307 39.807 61.5 26 61.5C12.193 61.5 1 50.307 1 36.5C1 22.693 12.193 11.5 26 11.5C39.807 11.5 51 22.693 51 36.5Z" stroke="currentColor" strokeWidth="2"></path><path d="M16 71.5H36" stroke="currentColor" strokeWidth="2"></path><path d="M26 26.5V16.5" stroke="currentColor" strokeWidth="2"></path><path d="M31 1.5H21" stroke="currentColor" strokeWidth="2"></path><path d="M26 11.5V1.5" stroke="currentColor" strokeWidth="2"></path><path d="M26 56.5V46.5" stroke="currentColor" strokeWidth="2"></path><path d="M36 36.5H46" stroke="currentColor" strokeWidth="2"></path><path d="M6 36.5H16" stroke="currentColor" strokeWidth="2"></path><path d="M18.9289 29.4289L11.8579 22.3579" stroke="currentColor" strokeWidth="2"></path><path d="M40.1421 50.6421L33.0711 43.5711" stroke="currentColor" strokeWidth="2"></path><path d="M33.0711 29.4289L40.1421 22.3579" stroke="currentColor" strokeWidth="2"></path><path d="M11.8579 50.6421L18.9289 43.5711" stroke="currentColor" strokeWidth="2"></path></svg>
            </div>                      
            <div className={values.fast_track_practical ? "true" : "false"}>
              <p>Fast-Track Practical</p>                        
              <div className="mt-1 bg-gray-900 text-white  w-max py-1 px-3 font-semibold  text-xs rounded-full">
              {/* {values.fast_track_practical ? 'Remove' : 'Add'} */}
              </div>
            </div>
          </div>
          <div className="pl-7 w-auto"><span className="text-sm flex">£110</span>
          </div>
        </label>


                  {/* <div className=" overflow-y-hidden"><div className="mt-4 p-5 bg-white w-full rounded-lg border-2 border-primary">
 <p className="font-semibold text-[18px]">Timeline to Pass</p>
 <p className="font-regulartext-[16px] mt-2">
 Despite extremely high demand for practical tests and driving instructors in your area, we can still get you passed within 4 months!</p>
 <p className="font-regular text-[16px] mt-2">
 Don't want to pass ASAP? Let us know your preferred practical test date below. </p>
 <button className="w-full bg-pmfGray border-gray-300 text-secondary hover:bg-pmfGraySecondary focus:bg-pmfGraySecondary flex border
  items-center justify-center px-3 py-1.5 mt-5 rounded-md font-semibold text-[12px] outline-none focus:ring-2 focus:ring-secondary
   focus:ring-offset-1 transition-all">
 <span className="flex items-center">Set your preferred date</span>
 </button>
 </div>
 </div> */}
                </div>

                <div className="w-full mb-5 pr-4"><h1 className=" text-[21px] leading-snug font-semibold">Theory Test</h1>
                  <p className=" text-secondary leading-snug text-opacity-70 font-medium text-[15px] mt-2">At the start of your journey? Get off to
                    a flying start and pass ASAP with a fast-tracked theory test.</p></div>
                <div className=" mb-10">
                  <div className="mb-5">
                    <Field type="checkbox" name="fast_track_theory" className="sr-only fast_track" id="fast_track_theory" onChange={() => setFieldValue('fast_track_theory', !values.fast_track_theory)} />                    
                    <label htmlFor="fast_track_theory" className="border cursor-pointer flex focus-visible:ring-2 py-5 font-semibold hover:bg-opacity-50 hover:bg-pmfLightGreen items-center outline-none pl-5 pr-3.5 rounded-lg text-left text-secondary transition-all w-full justify-between">
                      <div className="flex items-center">
                        <div className="pr-5 false">
                          <svg width="30" height="30" viewBox="0 0 52 62" fill="none" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" clipRule="evenodd" d="M43 31.25L28 20V42.5L43 31.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path><path fillRule="evenodd" clipRule="evenodd" d="M28 31.25L13 20V42.5L28 31.25Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"></path><path d="M1 11.5H51" stroke="currentColor" strokeWidth="2"></path><path d="M1 51.5H51" stroke="currentColor" strokeWidth="2"></path><path fillRule="evenodd" clipRule="evenodd" d="M1 61H51V1H1V61Z" stroke="currentColor" strokeWidth="2"></path></svg>
                        </div>
                        <div className="">
                          <div className=" false">
                            <div>
                              <p>Fast-Track Theory</p>
                              <div className="mt-1 bg-gray-900 text-white  w-max py-1 px-3 font-semibold  text-xs rounded-full">
                              {/* {values.fast_track_theory ? 'Remove' : 'Add'} */}
                              </div>
                            </div>
                          </div>
                        </div>
                        </div>
                        <div className="pl-7 w-auto">
                          <span className="text-sm text-black flex">£40</span>
                        </div>
                    </label>

                  </div>

                  {values.fast_track_theory === true && (
                  <div className="mb-5">
                    <div>

                      <div className="mb-3">
                        <Field type="checkbox" name="i_have_already_booked" className="sr-only fast_track" id="i_have_already_booked" />
                        <label htmlFor="i_have_already_booked" className="border cursor-pointer flex focus-visible:ring-2 py-5 font-semibold hover:bg-opacity-50 hover:bg-pmfLightGreen items-center outline-none pl-5 pr-3.5 rounded-lg text-left text-secondary transition-all w-full justify-between">
                          <div className="flex items-center">
                            <div className="pr-5 false"><svg width="19" height="19" viewBox="0 0 22 22" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M17 8.75L17.259 7.715C17.4073 7.12147 17.7142 6.57941 18.1468 6.14681C18.5794 5.71421 19.1215 5.40733 19.715 5.259L20.75 5L19.715 4.741C19.1215 4.59267 18.5794 4.28579 18.1468 3.85319C17.7142 3.42059 17.4073 2.87854 17.259 2.285L17 1.25L16.741 2.285C16.5927 2.87841 16.286 3.42038 15.8536 3.85297C15.4212 4.28556 14.8794 4.59251 14.286 4.741L13.25 5L14.286 5.259C14.8794 5.40749 15.4212 5.71444 15.8536 6.14703C16.286 6.57962 16.5927 7.12159 16.741 7.715L17 8.75Z" fill="#DCA4FF" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path><path d="M8 17.75L8.813 14.904L8.814 14.903C9.02413 14.1679 9.4181 13.4984 9.95874 12.9577C10.4994 12.4171 11.1689 12.0231 11.904 11.813L14.75 11L11.903 10.186C11.1679 9.97587 10.4984 9.5819 9.95774 9.04126C9.4171 8.50062 9.02313 7.83114 8.813 7.096L8 4.25L7.186 7.097C6.97587 7.83214 6.5819 8.50162 6.04126 9.04226C5.50062 9.5829 4.83114 9.97687 4.096 10.187L1.25 11L4.097 11.814C4.83214 12.0241 5.50162 12.4181 6.04226 12.9587C6.5829 13.4994 6.97687 14.1689 7.187 14.904L8 17.75Z" fill="#7B66FF" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M15.894 19.567L15.5 20.75L15.106 19.567C14.9955 19.2356 14.8094 18.9345 14.5625 18.6875C14.3155 18.4406 14.0144 18.2545 13.683 18.144L12.5 17.75L13.683 17.356C14.0144 17.2455 14.3155 17.0594 14.5625 16.8125C14.8094 16.5655 14.9955 16.2644 15.106 15.933L15.5 14.75L15.894 15.933C16.0045 16.2644 16.1906 16.5655 16.4375 16.8125C16.6845 17.0594 16.9856 17.2455 17.317 17.356L18.5 17.75L17.317 18.144C16.9856 18.2545 16.6845 18.4406 16.4375 18.6875C16.1906 18.9345 16.0045 19.2356 15.894 19.567Z" fill="#EBCAFF" stroke="black" strokeLinecap="round" strokeLinejoin="round"></path></svg>
                            </div>
                            <div className="">
                              <div className=" false"> I've already booked/am booking myself</div></div>
                          </div>
                        </label>
                      </div>

                      <div className="py-4">
                        <Field type="checkbox" name="i_have_already_passed" className="sr-only fast_track" id="i_have_already_passed" />
                        <label htmlFor="i_have_already_passed" className="border cursor-pointer flex focus-visible:ring-2 py-5 font-semibold hover:bg-opacity-50 hover:bg-pmfLightGreen items-center outline-none pl-5 pr-3.5 rounded-lg text-left text-secondary transition-all w-full justify-between">
                          <div className="flex items-center">
                            <div className="pr-5 false"><svg width="19" height="19" viewBox="0 0 18 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                              <path d="M12.362 4.214C14.0869 4.98477 15.495 6.32406 16.3512 8.00814C17.2074 9.69222 17.4599 11.6191 17.0663 13.4669C16.6728 15.3147 15.6571 16.9715 14.189 18.1606C12.7209 19.3496 10.8892 19.9989 9 20C7.38401 19.9999 5.80363 19.5253 4.45502 18.6349C3.10642 17.7446 2.04898 16.4778 1.41398 14.9918C0.778983 13.5058 0.59438 11.8661 0.88309 10.2761C1.1718 8.68608 1.92111 7.21589 3.038 6.048C3.80766 7.12273 4.82326 7.99775 6 8.6C6.02061 7.27863 6.33252 5.97808 6.91348 4.79109C7.49444 3.6041 8.33015 2.55992 9.361 1.733C10.1477 2.78819 11.1767 3.63876 12.361 4.213L12.362 4.214Z" fill="#FFB800" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path><path d="M9 17C9.95138 16.9996 10.8671 16.6377 11.5616 15.9875C12.2561 15.3372 12.6775 14.4473 12.7404 13.498C12.8033 12.5488 12.5031 11.611 11.9005 10.8748C11.2979 10.1386 10.438 9.65894 9.495 9.533C8.46257 10.4568 7.78229 11.71 7.57 13.079C6.79967 12.8905 6.07458 12.5506 5.437 12.079C5.25185 12.6423 5.20291 13.2414 5.29418 13.8273C5.38545 14.4131 5.61434 14.969 5.96206 15.4492C6.30978 15.9295 6.76642 16.3204 7.29451 16.59C7.8226 16.8596 8.40708 17.0001 9 17V17Z" fill="#F15937" stroke="black" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"></path></svg></div>
                            <div className=""><div className=" false">I've already passed</div></div>
                          </div>
                        </label>
                      </div>
                    </div>
                  </div>
                  )}
                </div>










                <div className="flex items-center justify-content-center">
                  <button type="submit" className="bg-theme-red-color hover:bg-red-900 w-full hover:text-white rounded-md mb-5 px-12 
    py-4 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ... focus-visible:outline-indigo-600">
                    <span className="flex items-center justify-center">Continue<span className="ml-4">
                      <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h13M12 5l7 7-7 7"></path></svg></span></span>
                  </button>
                </div>
              </div>
              {/* <Sidebar data={changedData} /> */}
            </div>
          </Form>
        )}
      </Formik>
      <Footnote />
    </div>
  );
}
export default tests;