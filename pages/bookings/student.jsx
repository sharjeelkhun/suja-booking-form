import { useEffect } from "react";
import * as Yup from "yup";
import { object, string, ref } from "yup";
import { Formik, Field, Form, ErrorMessage } from "formik";
import Cookies from "js-cookie";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
const Sidebar = dynamic(() => import("@/app/components/sidebar/sidebar"), {
  ssr: false
});
import Footnote from "@/app/components/Footnote";
import Formnav from "@/app/components/Formnav";
import OldUserLoader from "@/pages/bookings/OldUserLoader";
import "primereact/resources/themes/lara-light-cyan/theme.css";
import { InputMask } from "primereact/inputmask";
import Head from "next/head";
import { parsePhoneNumberFromString } from "libphonenumber-js";
import React, { useState } from "react";
import Switch from "@mui/material/Switch";
import axios from "axios";

const getCharacterValidationError = (str) => {
  return `Your password must have at least 1 ${str} character`;
};
const isValidPhoneNumber = (phoneNumber) => {
  const parsedPhoneNumber = parsePhoneNumberFromString(phoneNumber, "GB");
  return parsedPhoneNumber ? parsedPhoneNumber.isValid() : false;
};



const validationSchema = Yup.object().shape({
  phone_number: Yup.string()
    .required("Phone number is required")
    .test("phone-number", "Invalid UK phone number", (value) =>
      isValidPhoneNumber(value)
    ),
  terms: Yup.boolean()
    .oneOf([true], "You must accept the terms")
    .required("You must accept the terms"),
  title: Yup.string().required("Title is required"),
  firstName: Yup.string().required("First name is required"),
  surname: Yup.string().required("Last name is required"),
  email: Yup.string()
    .email("Invalid email address")
    .required("Email is required"),
  address: Yup.string().required("Address is required"),
  password: Yup.string()
    .required("Please enter a password")
    .min(8, "Password must have at least 8 characters")
    .matches(/[0-9]/, getCharacterValidationError("digit"))
    .matches(/[a-z]/, getCharacterValidationError("lowercase"))
    .matches(/[A-Z]/, getCharacterValidationError("uppercase")),
  confirm_password: Yup.string()
    .required("Please re-type your password")
    .oneOf([Yup.ref("password")], "Passwords do not match"),
  mondayStartTime: Yup.string().when(["monday", "fullWeek"], {
    is: (monday, fullWeek) => monday && !fullWeek,
    then: Yup.string().required("Monday start time is required")
  }),
  mondayEndTime: Yup.string().when(["monday", "fullWeek"], {
    is: (monday, fullWeek) => monday && !fullWeek,
    then: Yup.string().required("Monday end time is required")
  }),
  tuesdayStartTime: Yup.string().when(["tuesday", "fullWeek"], {
    is: (tuesday, fullWeek) => tuesday && !fullWeek,
    then: Yup.string().required("Tuesday start time is required")
  }),
  tuesdayEndTime: Yup.string().when(["tuesday", "fullWeek"], {
    is: (tuesday, fullWeek) => tuesday && !fullWeek,
    then: Yup.string().required("Tuesday end time is required")
  }),
  wednesdayStartTime: Yup.string().when(["wednesday", "fullWeek"], {
    is: (wednesday, fullWeek) => wednesday && !fullWeek,
    then: Yup.string().required("Wednesday start time is required")
  }),
  wednesdayEndTime: Yup.string().when(["wednesday", "fullWeek"], {
    is: (wednesday, fullWeek) => wednesday && !fullWeek,
    then: Yup.string().required("Wednesday end time is required")
  }),
  thursdayStartTime: Yup.string().when(["thursday", "fullWeek"], {
    is: (thursday, fullWeek) => thursday && !fullWeek,
    then: Yup.string().required("Thursday start time is required")
  }),
  thursdayEndTime: Yup.string().when(["thursday", "fullWeek"], {
    is: (thursday, fullWeek) => thursday && !fullWeek,
    then: Yup.string().required("Thursday end time is required")
  }),
  fridayStartTime: Yup.string().when(["friday", "fullWeek"], {
    is: (friday, fullWeek) => friday && !fullWeek,
    then: Yup.string().required("Friday start time is required")
  }),
  fridayEndTime: Yup.string().when(["friday", "fullWeek"], {
    is: (friday, fullWeek) => friday && !fullWeek,
    then: Yup.string().required("Friday end time is required")
  }),
  saturdayStartTime: Yup.string().when(["saturday", "fullWeek"], {
    is: (saturday, fullWeek) => saturday && !fullWeek,
    then: Yup.string().required("Saturday start time is required")
  }),
  saturdayEndTime: Yup.string().when(["saturday", "fullWeek"], {
    is: (saturday, fullWeek) => saturday && !fullWeek,
    then: Yup.string().required("Saturday end time is required")
  }),
  sundayStartTime: Yup.string().when(["sunday", "fullWeek"], {
    is: (sunday, fullWeek) => sunday && !fullWeek,
    then: Yup.string().required("Sunday start time is required")
  }),
  sundayEndTime: Yup.string().when(["sunday", "fullWeek"], {
    is: (sunday, fullWeek) => sunday && !fullWeek,
    then: Yup.string().required("Sunday end time is required")
  }),
  postalCode: Yup.string()
  .required("Postal code is required"),
  // Add a boolean field for single day selection for each day
  monday: Yup.boolean(),
  tuesday: Yup.boolean(),
  wednesday: Yup.boolean(),
  thursday: Yup.boolean(),
  friday: Yup.boolean(),
  saturday: Yup.boolean(),
  sunday: Yup.boolean()
});

const student = ({stepOnePostalCode}) => {
  console.log("StepOne",stepOnePostalCode);
  const [toogle, setToogle] = useState({
    Monday: false,
    Tuesday: false,
    Wednesday: false,
    Thursday: false,
    Friday: false,
    Saturday: false,
    Sunday: false
  });
  const [value, setValue] = useState();
  const [info, setInfo] = useState();
  const [isLoader, setLoader] = useState();
  const [valid, setValid] = useState();
  let formdata;

  if (typeof localStorage !== "undefined") {
    formdata = JSON.parse(localStorage.getItem("formData"));
  } else {
    formdata = "";
  }
  useEffect(() => {
    if (formdata == null) {
      router.replace("/bookings");
    }
    setInfo(formdata);
    const initialToggle = {
      Monday:
        formdata?.step4?.mondayStartTime && formdata?.step4?.mondayEndTime,
      Tuesday:
        formdata?.step4?.tuesdayStartTime && formdata?.step4?.tuesdayEndTime,
      Wednesday:
        formdata?.step4?.wednesdayStartTime &&
        formdata?.step4?.wednesdayEndTime,
      Thursday:
        formdata?.step4?.thursdayStartTime && formdata?.step4?.thursdayEndTime,
      Friday:
        formdata?.step4?.fridayStartTime && formdata?.step4?.fridayEndTime,
      Saturday:
        formdata?.step4?.saturdayStartTime && formdata?.step4?.saturdayEndTime,
      Sunday: formdata?.step4?.sundayStartTime && formdata?.step4?.sundayEndTime
    };

    setToogle(initialToggle);
  }, []);

  console.log("Form data", formdata);

  const router = useRouter();
  const [changedData, setChangedData] = useState(formdata);
  const step4 = formdata ? formdata.step4 : "";


  const checkAndSetLoader = (valid) => {
    const hasRequiredKeys =
      valid &&
      valid?.title &&
      valid?.surname &&
      valid?.firstName &&
      valid?.email &&
      valid?.password &&
      valid?.confirm_password &&
      valid?.phone_number &&
      valid?.address &&
      valid?.terms == true;
    const loader = hasRequiredKeys ? true : false;
    return loader;
  };

  const enableLoader = ({ formikProps }) => {
    if (formikProps?.isValid) {
      setLoader(true);
    } else {
      // Handle invalid form case here
      //   console.log("Form is invalid, cannot proceed.");
    }
  };
  const [apiAddress, setApiAddress] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);

  const fetchAddressSuggestions = async (postalCode) => {
    try {
      const response = await axios.get(
        `https://api.getaddress.io/autocomplete/${postalCode}?api-key=aYssNMkdXEGsdfGVZjiY0Q26381`
      );
      setApiAddress(response.data.suggestions.slice(0, 10));
      setShowSuggestions(true);
    } catch (e) {
      console.log(e);
    }
  };

  const handlePostalCodeChange = async (e) => {
    const postalCode = e.target.value;
    setFieldValue("postalCode", postalCode);

    // Check if postal code matches step one postal code
    if (postalCode === formdata?.step1?.postal_code) {
      await fetchAddressSuggestions(postalCode);
    } else {
      setApiAddress([]);
      setShowSuggestions(false);
    }
  };
  // const [stepOnePostalCode, setStepOnePostalCode] = useState(formdata?.step1?.postal_code);
  // console.log(stepOnePostalCode)

  return (
    <div>
      <Head>
        <title>Personal Details</title>
      </Head>
      <Formik
        initialValues={
          step4
            ? step4
            : {
                title: "",
                firstName: "",
                surname: "",
                email: "",
                password: "",
                confirm_password: "",
                phone_number: "",
                address: "",
                postalCode: "",
                terms: false,
                mondayStartTime: "",
                mondayEndTime: "",
                tuesdayStartTime: "",
                tuesdayEndTime: "",
                wednesdayStartTime: "",
                wednesdayEndTime: "",
                thursdayStartTime: "",
                thursdayEndTime: "",
                fridayStartTime: "",
                fridayEndTime: "",
                saturdayStartTime: "",
                saturdayEndTime: "",
                sundayStartTime: "",
                sundayEndTime: ""
                // monday:{enable:false,time:{to:"",from:""}}
              }
        }
        validationSchema={validationSchema}
        onSubmit={async (values) => {
          await new Promise((r) => setTimeout(r, 500));
          const formDatas = {
            ...formdata,
            ...{ step4: values }
          };
          localStorage.setItem("formData", JSON.stringify(formDatas));
          console.log("FULL DATA", formDatas);
          //Cookies.set('formData', JSON.stringify(stepFourData), { expires: 30 });
          //let formdata123 = Cookies.get('formData');
          router.push("/bookings/availability");
        }}
      >
        {({ values, setFieldValue, handleChange, handleBlur }) => (
          <Form>
            {setValid(values)}
            <Formnav />

            <div className="mt-[0px] lg:w-[calc(100vw-360px)] flex justify-center items-top md:px-7 px-5 md:py-8 py-5">
              <div className="w-full lg:max-w-[750px] md:pb-24 pb-5">
                <div className="mt-[10px] items-top md:py-5 py-3">
                  <div className="w-full lg:max-w-[750px]">
                    <div className="w-full mb-5 pr-4">
                      <h1 className="md:text-[26px] text-[24px] text-neutral-950 font-bold">
                        Let's get to know each other
                      </h1>
                      <p className="text-current font-regular text-[17px] mt-2">
                        We've helped over 50,000 people get on the road - fast.
                        We could get you passed in as little as 4 months!
                      </p>
                    </div>
                    <div className=" w-full">
                      <label className='uppercase text-xs tracking-wide font-bold text-opacity-70 text-dust "text-opacity-70" '>
                        Title
                      </label>
                      <div className="mt-2">
                        <div className="grid grid-cols-4 gap-3">
                          <div>
                            <Field
                              type="radio"
                              name="title"
                              className="sr-only title"
                              id="title_1"
                              value="Mr"
                            />
                            <label
                              htmlFor="title_1"
                              className="w-full cursor-pointer flex border items-center justify-center px-4 py-2 rounded-md font-semibold text-[15px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 hover:bg-pmfGraySecondary transition-all"
                            >
                              <span className="flex items-center">Mr.</span>
                            </label>
                          </div>
                          <div>
                            <Field
                              type="radio"
                              name="title"
                              className="sr-only title"
                              id="title_2"
                              value="Mrs"
                            />
                            <label
                              htmlFor="title_2"
                              className="w-full cursor-pointer flex border items-center justify-center px-4 py-2 rounded-md font-semibold text-[15px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 hover:bg-pmfGraySecondary transition-all"
                            >
                              <span className="flex items-center">Mrs</span>
                            </label>
                          </div>
                          <div>
                            <Field
                              type="radio"
                              name="title"
                              className="sr-only title"
                              id="title_3"
                              value="Miss"
                            />
                            <label
                              htmlFor="title_3"
                              className="w-full cursor-pointer flex border items-center justify-center px-4 py-2 rounded-md font-semibold text-[15px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 hover:bg-pmfGraySecondary transition-all"
                            >
                              <span className="flex items-center">Miss</span>
                            </label>
                          </div>
                          <div>
                            <Field
                              type="radio"
                              name="title"
                              className="sr-only title"
                              id="title_4"
                              value="Mx"
                            />
                            <label
                              htmlFor="title_4"
                              className="w-full cursor-pointer flex border items-center justify-center px-4 py-2 rounded-md font-semibold text-[15px] outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1 hover:bg-pmfGraySecondary transition-all"
                            >
                              <span className="flex items-center">Mx</span>
                            </label>
                          </div>
                        </div>
                        <ErrorMessage
                          name="title"
                          component="p"
                          className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                        />
                      </div>
                    </div>
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-sm  tracking-wide font-medium text-gray-800"
                        htmlFor="firstName"
                      >
                        First Name
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          <Field
                            type="text"
                            name="firstName"
                            className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-inset  transition-all "
                            id="firstName"
                            autoComplete="given-name"
                          />
                          <ErrorMessage
                            name="firstName"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-sm tracking-wide font-medium text-gray-800"
                        htmlFor="surname"
                      >
                        Last Name
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          <Field
                            type="text"
                            name="surname"
                            className="w-full rounded-md font-semibold text-base placeholder:text-dust 
                                        placeholder:text-opacity-50 px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 
                                        focus:ring-secondary focus:ring-offset-1 transition-all "
                            id="surname"
                          />
                          <ErrorMessage
                            name="surname"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-xs tracking-wide font-medium text-gray-800"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          <Field
                            type="email"
                            name="email"
                            className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 
                                        px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1
                                        transition-all "
                            id="email"
                          />
                          <ErrorMessage
                            name="email"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-xs tracking-wide font-medium text-gray-800"
                        htmlFor="phone_number"
                      >
                        Contact number
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          {/* <Field type="text" name="phone_number" className="w-full rounded-md font-semibold text-base 
                    placeholder:text-dust placeholder:text-opacity-50 px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none 
                    focus:ring-2 focus:ring-secondary focus:ring-offset-1 transition-all " id="phone_number"  /> */}
                          <InputMask
                            name="phone_number"
                            className="w-full rounded-md font-semibold text-base 
                    placeholder:text-dust placeholder:text-opacity-50 px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none 
                    focus:ring-2 focus:ring-secondary focus:ring-offset-1 transition-all "
                            id="phone_number"
                            value={values.phone_number}
                            mask="+99 99 9999 9999"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <ErrorMessage
                            name="phone_number"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-xs tracking-wide font-medium text-gray-800"
                        htmlFor="password"
                      >
                        Password
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          <Field
                            type="password"
                            name="password"
                            className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 
                        px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1
                        transition-all "
                            id="p"
                          />
                          <ErrorMessage
                            name="password"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-xs tracking-wide font-medium text-gray-800"
                        htmlFor="confirm_password"
                      >
                        Confirm Password
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          <Field
                            type="password"
                            name="confirm_password"
                            className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 
            px-5 py-4 border  border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-secondary focus:ring-offset-1
            transition-all "
                            id="p"
                          />
                          <ErrorMessage
                            name="confirm_password"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>

                    {/* full Address */}
                    <div className="mt-5 w-full flex justify-start gap-5">
                      {/* POSTAL CODE */}
                      <div>
                        <label
                          className="uppercase text-sm  tracking-wide font-medium text-gray-800"
                          htmlFor="postalCode"
                        >
                          Postal Code
                        </label>
                        <div className="mt-1">
                          <div className="relative w-36">
                            <Field
                              type="text"
                              name="postalCode"
                              className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 px-5 py-4 border border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-inset transition-all"
                              id="postalCode"
                              autoComplete="given-name"
                              value={changedData?.step1?.postal_code}
                              onClick={async (e) => {
                                setFieldValue("postalCode", e.target.value);
                                await fetchAddressSuggestions(e.target.value);
                              }}
                            />
                            <ErrorMessage
                              name="postalCode"
                              component="p"
                              className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                            />
                          </div>
                        </div>
                      </div>
                      {/* ADDRESS CODE */}
                      <div className="w-full">
                        <label
                          className="uppercase text-sm  tracking-wide font-medium text-gray-800"
                          htmlFor="address"
                        >
                          Address
                        </label>
                        <div className="mt-1">
                          <div className="relative w-full">
                            <Field
                              type="text"
                              name="address"
                              className="w-full rounded-md font-semibold text-base placeholder:text-dust placeholder:text-opacity-50 px-5 py-4 border border-[#BEBEBE] text-dust bg-white outline-none focus:ring-2 focus:ring-inset transition-all"
                              id="address"
                              autoComplete="given-name"
                              value={values.address}
                              onChange={handleChange}
                              onBlur={handleBlur}
                            />
                            <ErrorMessage
                              name="address"
                              component="p"
                              className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                            />
                            {showSuggestions && (
                              <div className="absolute z-10 bg-white border border-gray-300 mt-2 w-full rounded-md shadow-lg">
                                {apiAddress.map((address, index) => (
                                  <div
                                    key={index}
                                    className="cursor-pointer p-2 hover:bg-gray-200"
                                    onClick={() => {
                                      setFieldValue("address", address.address);
                                      setShowSuggestions(false);
                                    }}
                                  >
                                    {address.address}
                                  </div>
                                ))}
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    </div>

                    {/* Calendar */}
                    <div className="mt-5 w-full">
                      <label
                        className="uppercase text-xs tracking-wide font-medium text-gray-800"
                        htmlFor="calendar"
                      >
                        Select Availability (Monday to Sunday)
                      </label>
                      <div className="mt-1">
                        <div className="relative w-full">
                          {[
                            "Monday",
                            "Tuesday",
                            "Wednesday",
                            "Thursday",
                            "Friday",
                            "Saturday",
                            "Sunday"
                          ].map((day, index) => (
                            <div
                              className="flex items-center align-middle py-1 md:h-[60px] lg:md:h-[60px] xl:md:h-[60px] xl-max:md:h-[60px] md:flex-row lg:flex-row flex-col md:text-start lg:text-start xl:text-start text-center"
                              key={index}
                            >
                              <div className="first:w-[130px]">
                                <h3 className="uppercase text-sm tracking-wide font-medium text-gray-800">
                                  {day}
                                </h3>
                              </div>
                              <div className="mt-0 pt-0 w-[100px] text-center">
                                <Switch
                                  className="border-red-500"
                                  checked={toogle[day]}
                                  color="secondary"
                                  value={toogle[day]}
                                  onClick={() => {
                                    const newToggle = {
                                      ...toogle,
                                      [day]: !toogle[day]
                                    };
                                    setToogle(newToggle);
                                    if (!newToggle[day]) {
                                      setFieldValue(
                                        `${day.toLowerCase()}StartTime`,
                                        ""
                                      );
                                      setFieldValue(
                                        `${day.toLowerCase()}EndTime`,
                                        ""
                                      );
                                    }
                                    console.log("Toggle", newToggle);
                                  }}
                                />
                              </div>

                              {toogle[day] && (
                                <div className="overflow-hidden flex justify-around items-center align-middle md:w-[calc(100%-230px)] lg:w-[calc(100%-230px)] xl:w-[calc(100%-230px)] md:gap-0 lg:gap-0 xl:gap-0 gap-2">
                                  <Field
                                    type="time"
                                    min="08:00" max="20:00"
                                    id={`${day.toLowerCase()}StartTime`}
                                    name={`${day.toLowerCase()}StartTime`}
                                    value={
                                      values[`${day.toLowerCase()}StartTime`]
                                    }
                                    className="md:px-8 lg:px-8 xl:px-8 md:py-3 lg:py-3 xl:py-3 rounded-2xl text-xl px-2 py-2 my-4"
                                    onChange={handleChange}
                                  />
                                  <ErrorMessage
                                    name={`${day.toLowerCase()}StartTime`}
                                    component="p"
                                    className="text-red-500 text-sm "
                                  />

                                  {console.log("CHecking:", values)}
                                  <span className="">To</span>
                                  <Field
                                    type="time"
                                    min="08:00" max="20:00"
                                    id={`${day.toLowerCase()}EndTime`}
                                    name={`${day.toLowerCase()}EndTime`}
                                    value={
                                      values[`${day.toLowerCase()}EndTime`]
                                    }
                                    className="md:px-8 lg:px-8 xl:px-8 md:py-3 lg:py-3 xl:py-3 rounded-2xl my-2 text-xl px-2 py-2"
                                    onChange={handleChange}
                                  />
                                  <ErrorMessage
                                    name={`${day.toLowerCase()}EndTime`}
                                    component="div"
                                    className="text-red-500 text-sm"
                                  />
                                </div>
                              )}
                            </div>
                          ))}
                          <ErrorMessage
                            name="calendar"
                            component="p"
                            className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                          />
                        </div>
                      </div>
                    </div>

                    <div className="mt-5 w-full">
                      <div>
                        <Field
                          type="checkbox"
                          className="sr-only"
                          name="terms"
                          id="terms"
                          onChange={() => setFieldValue("terms", !values.terms)}
                        />

                        <label
                          htmlFor="terms"
                          className=" flex items-center cursor-pointer group"
                        >
                          <div className="rounded-full transition-all flex w-10 h-10 items-center justify-center mr-4 border-2 border-primaryOutline bg-primary">
                            <span className={`${values.terms ? "" : "hidden"}`}>
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                width="23"
                                height="23"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <polyline points="20 6 9 17 4 12"></polyline>
                              </svg>
                            </span>
                          </div>
                          <div className="font-semibold w-[calc(100%-40px)] text-[15px]">
                            Are you happy for us to contact you with more info
                            about learning to drive?
                          </div>
                        </label>
                        <ErrorMessage
                          name="terms"
                          component="p"
                          className="block mt-1 text-opacity-70 text-dust font-semibold text-sm text-red-500"
                        />
                      </div>
                    </div>
                  </div>
                </div>
                <div className="block items-center justify-content-center">
                  <button
                    type="submit"
                    onClick={enableLoader}
                    className="bg-theme-red-color hover:bg-red-900 w-full hover:text-white rounded-md mb-5 px-12 py-4 text-md font-semibold text-white shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ... focus-visible:outline-indigo-600"
                  >
                    <span className="flex items-center justify-center">
                      Continue
                      <span className="ml-4">
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
                          <path d="M5 12h13M12 5l7 7-7 7"></path>
                        </svg>
                      </span>
                    </span>
                  </button>
                  <p className="block w-full italic">
                    Personal data is processed in compliance with UK GDPR and
                    only for the purposes outlined in our Privacy Notice. No
                    personal data is ever sold to third parties.
                  </p>
                </div>
              </div>
              <Sidebar data={changedData} />
            </div>
          </Form>
        )}
      </Formik>
      <Footnote />
      {isLoader && <OldUserLoader />}
    </div>
  );
};
export default student;
