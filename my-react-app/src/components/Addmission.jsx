import React, { useState } from "react";
import Navbar from "./Navbar";
import { MdMedicalInformation } from "react-icons/md";
import { RiParentFill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import Footer from "./Footer";

function Addmission() {

  const [visiblity , setVisiblity] = useState(true)

  return (
    <div>
      <div className={visiblity ? "block" : "hidden"}>
      <Navbar />
      <div className="pt-24 bg-gray-900 relative h-[300px]">
        <img
          className="object-fit shadow-inner opacity-80 h-full w-screen"
          src="https://www.rpsjhalawar.com/img/carousel-1.jpg"
          alt=""
        />
        <h1 className="md:text-7xl text-5xl font-semibold md:pl-[30%] pl-[12%] text-yellow-400 text-center absolute bottom-10">
          Addmission Query
        </h1>
        <h1 className="text-3xl text-center pt-10 font-semibold">
          Click the button below to complete the enquiry form
        </h1>
        <h2 className="text-xl font-medium text-gray-400 text-center pt-6">
          Note:- Submitting the enquiry form does not guarantee admission.{" "}
          <br /> Our team will review your form and contact you shortly.
        </h2>
        <div className="flex items-center justify-center pt-10">
        <button 
          onClick={() => setVisiblity(false)}
          className="px-8 py-4 bg-blue-500 text-white rounded-full hover:bg-blue-600 shadow-lg transition-all duration-300"
        >
          Enquiry Form
        </button>
        </div>
      </div>
      </div>
      <div className={visiblity ? "hidden" : "block px-4 md:px-20 relative pt-2 md:w-[1000px] mx-auto"}>
      <GiCancel onClick={() => setVisiblity(true)} className="absolute text-3xl right-4 md:top-6 cursor-pointer top-16 text-gray-400" />
        <h1 className="text-center mb-4 font-semibold text-gray-600 text-5xl">
          Enquiry Form
        </h1>
        <div className="border-2 mt-20 md:mt-0 rounded-xl px-10 py-2 border-gray-300">
          <h1 className="text-xl text-blue-600 flex items-center gap-2 font-medium">
            <MdMedicalInformation /> Basic Information :
          </h1>
          <div className="border-t-2 mt-4 mb-2 flex items-center justify-between flex-wrap">
            <input
              className="border-2 mt-6 rounded px-10 py-1 text-xl"
              type="text"
              placeholder="Enter Academic Year"
            />
            <input
              className="border-2 mt-6 rounded px-10 py-1 text-xl"
              type="text"
              placeholder="Enter Class"
            />
            <input
              className="border-2 mt-6 rounded px-10 py-1 text-xl"
              type="text"
              placeholder="Enter Student Name "
            />
          </div>
        </div>
        <div className="border-2 mt-4 rounded-xl px-10 py-2 border-gray-300">
          <h1 className="text-xl text-green-600 flex items-center gap-2 font-medium">
            <RiParentFill />
            Parents Details :
          </h1>
          <div className="border-t-2 mt-4 mb-2 flex items-center justify-between flex-wrap">
            <input
              className="border-2 mt-6 rounded px-10 py-1 text-xl"
              type="text"
              placeholder="Father Name"
            />
            <input
              className="border-2 mt-6 rounded px-10 py-1 text-xl"
              type="text"
              placeholder="Father Mobile Number"
            />
            <input
              className="border-2 mt-6 rounded px-10 py-1 text-xl"
              type="text"
              placeholder="Mother Name"
            />
          </div>
        </div>
        <div className="border-2 mt-4 rounded-xl px-10 py-2 border-gray-300">
          <h1 className="text-xl text-yellow-600 flex items-center  gap-2 font-medium">
            <MdMedicalInformation /> Basic Information :
          </h1>
          <div className="border-t-2 mt-4 mb-2 flex items-center flex-wrap gap-10">
            <input
              className="border-2 mt-6 rounded px-10 py-1 text-xl"
              type="text"
              placeholder="Enter Your Address"
            />
            <input
              className="border-2 mt-6 rounded px-10 py-1 text-xl"
              type="text"
              placeholder="Primary Mobile Number"
            />
          </div>
        </div>
        <div className="flex items-center justify-center mt-10">
        <button
          type="submit"
          className="px-10 py-4 bg-green-500 text-white rounded-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300 shadow-md transition-all duration-300"
        >
          Submit
        </button>
        </div>
      </div>
      <div className="md:mt-80 mt-96">
        <Footer />
      </div>
      
    </div>
  );
}

export default Addmission;
