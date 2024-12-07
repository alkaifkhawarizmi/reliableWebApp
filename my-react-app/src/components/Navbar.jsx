import React, { useState } from "react";
import schoollogo from "./assets/schoollogo.jpg";
import { IoHome } from "react-icons/io5";
import { IoSchoolSharp } from "react-icons/io5";
import { FaSchoolFlag } from "react-icons/fa6";
import { IoMdCall } from "react-icons/io";
import { Link } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { RxCrossCircled } from "react-icons/rx";


function Navbar() {

  const nav = [
    { name: "Home" , icon: <IoHome /> , path : "/"},
    { name: "Admissions" , icon : <IoSchoolSharp /> ,path : "/addmissions"},
    { name: "School Life" , icon : <FaSchoolFlag /> , path : "/gallery" },
    { name: "Contact Us" , icon : <IoMdCall /> , path : "/contact-us" },
    { name: "Results" , path : "/results" },
    { name: "About us" , path : "/about-us" },
  ];

  const [menuOpen , setMenuOpen] = useState(false)

  return (
    <div className="fixed z-40 bg-white w-screen md:w-full">
    <div className="border border-b-2 shadow-xl">
      <nav className="flex items-center justify-between md:mx-52 mx-4 my-3">
        <h1 className="absolute md:block hidden text-gray-300 right-4 bottom-2 ">Affiliated No. 529/2011</h1>
        <Link to={"/"}>
        <img className="w-20 cursor-pointer transition-all duration-200 hover:scale-110" src={schoollogo} alt="School Logo" /> </Link>
        <div className="flex gap-8">
          {nav.map((item, index) => (
            <Link to={item.path}>
            <div className="md:flex hidden   items-center gap-2 text-2xl font-medium text-gray-600 cursor-pointer hover:text-blue-500 transition-all duration-200 hover:scale-110">
            <h1
              key={index} // Add key prop
              className="text-xl "
            >
              {item.name}
            </h1>
            <h1>{item.icon}</h1>
            </div>
            </Link>
          ))}
        </div>
        <RiMenu3Fill onClick={() => setMenuOpen(true)} className="text-5xl md:hidden 
        block text-gray-600" />
      </nav>
    </div>
    <div className={ menuOpen ? "fixed bg-white p-4 right-0 w-screen h-screen" : "hidden"}>
      {
        nav.map((item, index) => (
          <Link to={item.path}>
          <div key={index} className="flex items-center gap-2 text-2xl mt-4 font-medium text-gray-600 cursor-pointer hover:text-blue-500 border-b-2 pb-2">
            <h1
              key={index} // Add key prop
              className=""
            >
              {item.name}
            </h1>
          </div>
          </Link>
        ))
      }
    <div className="flex items-center justify-center mt-20">
    <RxCrossCircled onClick={() => setMenuOpen(false)} className="text-5xl text-gray-600" />
    </div>

    </div>
    </div>
  );
}

export default Navbar;
