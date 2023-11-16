import React, { useState, useEffect } from "react";
import * as Yup from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import ThreeBoxes from "@/app/components/3boxes";
import Footnote from "@/app/components/Footnote";
import Formnav from "@/app/components/Formnav";

let formdata = Cookies.get("formData");
const data = formdata ? JSON.parse(formdata) : { postal_code: "" };

const validationSchema = Yup.object().shape({
  postal_code: Yup.string()
    .required("Postal code is required")
    .matches(/^[A-Z]{1,2}\d[A-Z\d]? \d[A-Z]{2}$/, "Invalid UK postal code")
});

const index = () => {
  const router = useRouter();

  //ALL LEADS DATA START

  const [leads, setLeads] = useState([]);

  const leadData = async () => {
    try {
      let response = await fetch("http://localhost:3000/api/leads/get");
      let data = await response.json();
      setLeads(data);
      console.log("Leads Data", data);
    } catch (error) {
      console.error("Error fetching leads:", error);
    }
  };

  useEffect(() => {
    leadData();
  }, []);

  // ALL LEADS DATA END
  return (
    <div>
      <Formik
        initialValues={data}
        validationSchema={validationSchema}
        onSubmit={async values => {
          await new Promise(r => setTimeout(r, 500));
          Cookies.set("formData", JSON.stringify({ 'step1': { values } }), { expires: null });
          //let formdata = Cookies.get("formData");
          router.push("/bookings/course/");
        }}
      >
        {formikProps =>
          <Form>
            <Formnav />
            <div className="space-y-12 mx-auto w-full lg:max-w-[48%] px-4 lg:px-0 pt-36 pb-10 py-24">
              <div>
                <h2 className="font-semibold text-2xl text-gray-900 text-start">
                  Let's pass you fast. Where would you like your lessons to
                  start?
                </h2>
                <div className="mt-7 grid">
                  <div className="sm:col-span-3">
                    <div className="mt-2">
                      <Field
                        type="text"
                        name="postal_code"
                        placeholder="Postal code"
                        id="postal_code"
                        className={`text-lg block w-full rounded-md border-0 px-5 py-4 text-gray-900 shadow-sm placeholder:text-gray-400 ${formikProps
                          .errors.postal_code
                          ? "ring-1 ring-inset ring-red-600"
                          : "ring-1 ring-inset ring-gray-300"}`}
                      />
                      <ErrorMessage
                        name="postal_code"
                        component="p"
                        className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="flex items-center justify-content-center">
                <button
                  type="submit"
                  className="bg-theme-red-color hover:bg-red-900 w-full hover:text-white rounded-md mb-5 px-12 py-4 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ... focus-visible:outline-indigo-600"
                >
                  <span className="flex items-center justify-center">
                    Continue<span className="ml-4">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="19"
                        height="19"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M5 12h13M12 5l7 7-7 7" />
                      </svg>
                    </span>
                  </span>
                </button>
              </div>
            </div>
          </Form>}
      </Formik>
      <ThreeBoxes />
      <Footnote />
    </div>
  );
};
export default index;