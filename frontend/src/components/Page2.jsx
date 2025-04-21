import React from 'react';
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { FaFlask, FaBook, FaRunning, FaShieldAlt, FaUsers, FaLaptop, FaGraduationCap } from 'react-icons/fa';

function Page2() {
  // Image URLs (replace with your preferred URLs)
  const schoolBuilding = "https://images.unsplash.com/photo-1546410531-bb4caa6b424d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1471&q=80";
  const studentsLearning = "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80";
  const scienceLab = "https://images.unsplash.com/photo-1575505586569-646b2ca898fc?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1453&q=80";

  const features = [
    {
      icon: <FaFlask className="text-4xl text-blue-600" />,
      title: "Science Labs",
      content: "Fully equipped science labs where curiosity meets innovation, with hands-on experiments and modern equipment.",
      bgImage: scienceLab
    },
    {
      icon: <FaLaptop className="text-4xl text-blue-600" />,
      title: "Tech Education",
      content: "High-tech computer lab featuring the latest hardware and software for coding and digital literacy."
    },
    {
      icon: <FaBook className="text-4xl text-blue-600" />,
      title: "Library Resources",
      content: "Spacious library with a wide range of books, e-resources, and study materials to encourage reading and research."
    },
    {
      icon: <FaRunning className="text-4xl text-blue-600" />,
      title: "Sports & Fitness",
      content: "Large playground and facilities for various sports, plus dedicated areas for yoga and physical activities."
    },
    {
      icon: <FaShieldAlt className="text-4xl text-blue-600" />,
      title: "Safe Environment",
      content: "Advanced safety measures including CCTV surveillance and trained staff for student security."
    },
    {
      icon: <FaUsers className="text-4xl text-blue-600" />,
      title: "Community Focus",
      content: "Programs fostering respect, responsibility, and confidence to make positive impacts."
    }
  ];

  return (
    <div className="relative bg-gradient-to-b from-blue-50 to-indigo-50 overflow-hidden">
      {/* Hero Section with School Building Background */}
      <div 
        className="relative pt-32 pb-40 px-4 sm:px-6 lg:px-8 bg-blue-900 bg-opacity-90"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.9)), url(${schoolBuilding})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto text-center">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <FaGraduationCap className="mx-auto h-16 w-16 text-yellow-400" />
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 mt-4">
              <span className="block text-yellow-400">Inspiring Young Minds</span>
              <span className="block">Shaping Bright Futures</span>
            </h1>
            <p className="mt-6 text-xl text-blue-100 max-w-3xl mx-auto leading-relaxed">
              At Reliable Public School, Suket, we're dedicated to creating a vibrant and nurturing environment where students excel academically, socially, and creatively.
            </p>
          </motion.div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        {/* About School Section */}
        <div className="mb-20 bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="grid md:grid-cols-2">
            <div className="p-8 sm:p-12">
              <h2 className="text-3xl font-extrabold text-gray-900">
                <span className="block">Welcome to</span>
                <span className="block text-blue-600">Reliable Public School</span>
              </h2>
              <p className="mt-6 text-lg text-gray-600 leading-relaxed">
                Our mission is to provide a well-rounded education that prepares young minds for the challenges of tomorrow while fostering a lifelong love for learning. We integrate modern educational tools and techniques to ensure our students receive a cutting-edge learning experience.
              </p>
              <div className="mt-8 bg-blue-50 p-6 rounded-lg border-l-4 border-blue-600">
                <p className="text-blue-800 italic">
                  "Education is the most powerful weapon which you can use to change the world." - Zarif Ahmed
                </p>
              </div>
            </div>
            <div 
              className="hidden md:block bg-cover bg-center min-h-[400px]"
              style={{ backgroundImage: `url(${studentsLearning})` }}
            ></div>
          </div>
        </div>

        {/* Features Grid */}
        <div className="text-center mb-16">
          <h2 className="text-3xl font-extrabold text-gray-900 sm:text-4xl">
            <span className="block">Our World-Class</span>
            <span className="block text-blue-600">Facilities</span>
          </h2>
          <p className="mt-4 max-w-2xl text-xl text-gray-600 mx-auto">
            We provide exceptional learning environments to nurture every student's potential
          </p>
        </div>

        <div className="mt-10">
          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {features.map((feature, index) => (
              <motion.div
                key={index}
                whileHover={{ y: -5 }}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden group min-h-[300px]"
              >
                {feature.bgImage && (
                  <div 
                    className="absolute inset-0 bg-cover bg-center opacity-10 group-hover:opacity-20 transition-opacity duration-300"
                    style={{ backgroundImage: `url(${feature.bgImage})` }}
                  ></div>
                )}
                <div className="relative z-10">
                  <div className="flex items-center justify-center h-12 w-12 rounded-md bg-blue-100 mb-6">
                    {feature.icon}
                  </div>
                  <h3 className="text-xl font-semibold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600">{feature.content}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* Mission Statement */}
        <div className="mt-20 bg-gradient-to-r from-blue-600 to-indigo-700 rounded-2xl shadow-xl overflow-hidden">
          <div className="px-6 py-12 sm:px-12 sm:py-16 lg:py-20 text-center">
            <div className="max-w-3xl mx-auto">
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">
                <span className="block">Our Educational</span>
                <span className="block text-yellow-300">Philosophy</span>
              </h2>
              <p className="mt-6 text-xl text-blue-100">
                We believe in holistic development that balances academic excellence with character building. Our dedicated teachers are mentors who work tirelessly to bring out the best in every child through innovative teaching methods and personalized attention.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div 
        className="bg-blue-800 bg-opacity-90"
        style={{
          backgroundImage: `linear-gradient(rgba(30, 58, 138, 0.9), rgba(30, 58, 138, 0.9)), url(${studentsLearning})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center'
        }}
      >
        <div className="max-w-7xl mx-auto py-16 px-4 sm:px-6 lg:py-20 lg:px-8 text-center">
          <h2 className="text-3xl font-extrabold tracking-tight text-white sm:text-4xl">
            <span className="block">Ready to begin your</span>
            <span className="block text-yellow-300">educational journey?</span>
          </h2>
          <p className="mt-4 text-xl text-blue-100 max-w-3xl mx-auto">
            Join our community of learners and discover how we can help your child reach their full potential.
          </p>
          <div className="mt-8 flex justify-center">
            <motion.div
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="inline-flex rounded-md shadow"
            >
              <Link
                to="/admissions"
                className="inline-flex items-center justify-center px-8 py-4 border border-transparent text-xl font-medium rounded-md text-blue-800 bg-yellow-400 hover:bg-yellow-300 transition-colors duration-300"
              >
                Contact Us Today
                <svg className="ml-3 -mr-1 h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </Link>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Page2;