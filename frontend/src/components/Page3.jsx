import React from "react";
import { Link } from "react-router-dom";
import { GoChevronRight } from "react-icons/go";
import { MdKeyboardDoubleArrowRight } from "react-icons/md";
import { BiSolidSchool } from "react-icons/bi";
import { FaPeopleGroup, FaAward } from "react-icons/fa6";
import { BsPersonCheckFill } from "react-icons/bs";
import { motion } from 'framer-motion'

// Animation variants
const cardVariants = {
  offscreen: {
    y: 50,
    opacity: 0
  },
  onscreen: {
    y: 0,
    opacity: 1,
    transition: {
      type: "spring",
      bounce: 0.4,
      duration: 0.8
    }
  }
};

const statsVariants = {
  hidden: { opacity: 0 },
  visible: (i) => ({
    opacity: 1,
    transition: {
      delay: i * 0.2,
      duration: 0.8
    }
  })
};

function Page3() {
  const stats = [
    { icon: <BiSolidSchool className="text-5xl" />, value: "10+", label: "Classrooms" },
    { icon: <FaPeopleGroup className="text-5xl" />, value: "200+", label: "Students" },
    { icon: <BsPersonCheckFill className="text-5xl" />, value: "20+", label: "Qualified Teachers" },
    { icon: <FaAward className="text-5xl" />, value: "25+", label: "Awards" }
  ];

  const features = [
    { 
      title: "Hall Of Excellence", 
      description: "Celebrating our students' outstanding achievements and academic success",
      image: "https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/hall-of-excellence"
    },
    { 
      title: "Gallery", 
      description: "Explore moments from our vibrant school life and activities",
      image: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/gallery"
    },
    { 
      title: "News", 
      description: "Stay updated with the latest happenings and events at our school",
      image: "https://images.unsplash.com/photo-1585829365295-ab7cd400c167?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      link: "/news"
    }
  ];

  return (
    <div className="relative">
      {/* Hero Section */}
      <div className="md:px-12 px-4 pt-32 md:pt-40">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          <h1 className="text-4xl md:text-6xl font-bold text-gray-800 mb-6">
            <span className="text-blue-600">Explore The Academics</span>
            <span className="block">Of Reliable Public School</span>
          </h1>
          <p className="mt-6 text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
            Discover our comprehensive educational programs and learning environment designed to inspire young minds.
          </p>
        </motion.div>

        {/* Features Grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              initial="offscreen"
              whileInView="onscreen"
              viewport={{ once: true, amount: 0.2 }}
              className="bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 overflow-hidden group"
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={feature.image}
                  alt={feature.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent"></div>
              </div>
              <div className="p-6">
                <h2 className="text-2xl font-bold text-gray-800 mb-3">{feature.title}</h2>
                <p className="text-gray-600 mb-6">{feature.description}</p>
                <Link to={feature.link} className="flex items-center text-blue-600 font-medium hover:text-blue-800 transition-colors">
                  Learn more <MdKeyboardDoubleArrowRight className="ml-2" />
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-gradient-to-r from-blue-800 to-indigo-900 py-20 mt-24 relative overflow-hidden">
        {/* Background pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/always-grey.png')]"></div>
        </div>
        
        <div className="relative z-10">
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-4xl md:text-5xl font-bold text-white text-center mb-16"
          >
            We nurture bright futures every day.
          </motion.h1>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 px-4 max-w-6xl mx-auto">
            {stats.map((stat, index) => (
              <motion.div
                key={index}
                custom={index}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                variants={statsVariants}
                className="text-center p-6 bg-white/10 backdrop-blur-sm rounded-xl hover:bg-white/20 transition-all duration-300"
              >
                <div className="text-blue-300 mb-4">{stat.icon}</div>
                <h3 className="text-4xl font-bold text-white mb-2">{stat.value}</h3>
                <p className="text-lg text-blue-100">{stat.label}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page3;