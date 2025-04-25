import React, { useState, useEffect } from "react";
import schoollogo from "./assets/schoollogo.jpg";
import { IoHome, IoSchoolSharp } from "react-icons/io5";
import { IoMdCall } from "react-icons/io";
import { FaSchoolFlag } from "react-icons/fa6";
import { Link, useLocation } from "react-router-dom";
import { RiMenu3Fill } from "react-icons/ri";
import { RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";
import { RiAdminFill } from "react-icons/ri";
import { RiMoneyDollarCircleFill } from "react-icons/ri";
import { IoNewspaperOutline } from "react-icons/io5";
import { FcAbout } from "react-icons/fc";

function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  const [isAuthenticated , setIsAuthenticated] = useState(false)

  useEffect(() => {
     const data = localStorage.getItem("principalAuth")
     if(data){
      setIsAuthenticated(true)
     }
  },[])

  const nav = [
    { name: "Home", icon: <IoHome />, path: "/" },
    { name: "Addmissions", icon: <IoSchoolSharp />, path: "/addmissions" },
    { name: "School Life", icon: <FaSchoolFlag />, path: "/gallery" },
    { name: "Contact Us", icon: <IoMdCall />, path: "/contact-us" },
    { name: "Results", icon: <IoNewspaperOutline /> , path: "/results" },
    {name : "Admin Login" , icon : <RiAdminFill /> , path: isAuthenticated ? '/admin/home' : '/admin/login'},
    { name: "About us", icon : <FcAbout /> , path: "/about-us" },
  ];

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 10);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Optional: prevent background scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "auto";
  }, [menuOpen]);

  return (
    <motion.div
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.5 }}
      className={`fixed top-0 left-0 w-full z-[60] ${
        scrolled ? "bg-white shadow-lg" : "bg-white/90 backdrop-blur-sm"
      } transition-all duration-300`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <nav className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link to="/" className="flex-shrink-0">
            <motion.img
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="h-16 w-auto cursor-pointer"
              src={schoollogo}
              alt="School Logo"
            />
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {nav.map((item, index) => (
              <Link key={index} to={item.path}>
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className={`flex items-center gap-2 px-3 py-2 rounded-lg text-lg font-medium transition-colors ${
                    location.pathname === item.path
                      ? "text-blue-600 bg-blue-50"
                      : "text-gray-700 hover:text-blue-500 hover:bg-blue-50"
                  }`}
                >
                  <span className="text-xl">{item.icon}</span>
                  <span>{item.name}</span>
                </motion.div>
              </Link>
            ))}

          </div>

          {/* Mobile Menu Button */}
          <motion.button
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            onClick={() => setMenuOpen(true)}
            className="md:hidden p-2 rounded-lg text-gray-700 hover:bg-gray-100 focus:outline-none"
          >
            <RiMenu3Fill className="h-8 w-8" />
          </motion.button>
        </nav>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ type: "spring", damping: 25 }}
            className="fixed inset-0 h-screen w-screen bg-white z-[100] overflow-y-auto"
          >
            <div className="flex flex-col h-full p-6">
              <div className="flex justify-between items-center mb-8">
                <Link to="/" onClick={() => setMenuOpen(false)}>
                  <img
                    className="h-14 w-auto"
                    src={schoollogo}
                    alt="School Logo"
                  />
                </Link>
                <motion.button
                  whileHover={{ rotate: 90 }}
                  onClick={() => setMenuOpen(false)}
                  className="p-2 rounded-full text-gray-700 hover:bg-gray-100"
                >
                  <RxCross2 className="h-8 w-8" />
                </motion.button>
              </div>

              <nav className="flex flex-col space-y-4 flex-grow">
                {nav.map((item, index) => (
                  <Link
                    key={index}
                    to={item.path}
                    onClick={() => setMenuOpen(false)}
                  >
                    <motion.div
                      whileTap={{ scale: 0.95 }}
                      className={`flex items-center gap-4 px-4 py-3 rounded-xl text-xl font-medium ${
                        location.pathname === item.path
                          ? "bg-blue-100 text-blue-600"
                          : "text-gray-700 hover:bg-gray-100"
                      }`}
                    >
                      <span className="text-2xl">{item.icon}</span>
                      <span>{item.name}</span>
                    </motion.div>
                  </Link>
                ))}
              </nav>

              <div className="mt-auto pt-8 pb-4 text-center text-gray-500">
                <p>Affiliated No. 529/2011</p>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default Navbar;
