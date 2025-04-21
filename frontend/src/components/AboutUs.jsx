import React from 'react';
import { motion } from 'framer-motion';
import { FaSchool, FaChalkboardTeacher, FaUserGraduate, FaAward, FaUsers } from 'react-icons/fa';
import { GiTeacher } from 'react-icons/gi';
import { RiHistoryFill } from 'react-icons/ri';
import Navbar from './Navbar';

const AboutUs = () => {
  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.8 } }
  };

  return (
    <div>
      <Navbar />
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Hero Section */}
      <motion.section 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="relative py-20 bg-blue-700 text-white overflow-hidden"
      >
        <div className="absolute inset-0 bg-black opacity-30"></div>
        <div className="absolute top-0 right-0 w-48 h-48 bg-yellow-400 rounded-full transform translate-x-24 -translate-y-24 opacity-20"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-yellow-400 rounded-full transform -translate-x-32 translate-y-32 opacity-20"></div>
        
        <motion.div 
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center py-16"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-6">
            <FaSchool className="text-6xl text-yellow-400" />
          </motion.div>
          <motion.h1 variants={itemVariants} className="text-4xl md:text-6xl font-bold mb-6">
            About RPS School
          </motion.h1>
          <motion.p variants={itemVariants} className="text-xl md:text-2xl max-w-3xl mx-auto">
            Nurturing Excellence Since 1995
          </motion.p>
        </motion.div>
      </motion.section>

      {/* School Story */}
      <section className="py-20 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
          className="text-center mb-16"
        >
          <motion.div variants={itemVariants} className="flex justify-center mb-4">
            <RiHistoryFill className="text-4xl text-blue-600" />
          </motion.div>
          <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
            Our Story
          </motion.h2>
          <motion.div variants={itemVariants} className="w-24 h-1 bg-yellow-400 mx-auto mb-8"></motion.div>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="relative"
          >
            <div className="absolute -inset-4 bg-yellow-100 rounded-xl transform rotate-1"></div>
            <img 
              src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="School founding" 
              className="relative rounded-lg shadow-xl w-full h-auto"
            />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="text-gray-700"
          >
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Humble Beginnings</h3>
            <p className="mb-4">
              RPS School was founded in 1995 by visionary educator Dr. Rajesh Patel with just 35 students in a small rented building. 
              Driven by the belief that every child deserves quality education, our founder worked tirelessly to create an institution 
              that would stand the test of time.
            </p>
            <p className="mb-4">
              In our first decade, we grew from a neighborhood school to a recognized institution, earning our first state education award 
              in 2003. This period laid the foundation for our values of academic excellence, character building, and community service.
            </p>
            <p>
              Today, we stand as one of the region's premier educational institutions with over 2,000 students, yet we remain true to 
              our founding principles of personalized attention and holistic development.
            </p>
          </motion.div>
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center mt-20">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="text-gray-700 md:order-last"
          >
            <h3 className="text-2xl font-bold text-blue-800 mb-4">Modern Transformation</h3>
            <p className="mb-4">
              The 2010s marked a period of rapid growth and modernization for RPS School. We invested in state-of-the-art facilities 
              including smart classrooms, science labs, and a digital library while maintaining our commitment to traditional values.
            </p>
            <p className="mb-4">
              Our curriculum evolved to blend the best of national education standards with innovative teaching methodologies. 
              We introduced specialized programs in STEM, arts, and sports to cater to diverse student interests and talents.
            </p>
            <p>
              The school campus expanded to include a new auditorium, sports complex, and meditation center, creating a truly 
              holistic learning environment that nurtures mind, body, and spirit.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative md:order-first"
          >
            <div className="absolute -inset-4 bg-blue-100 rounded-xl transform -rotate-1"></div>
            <img 
              src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=800&q=80" 
              alt="Modern school" 
              className="relative rounded-lg shadow-xl w-full h-auto"
            />
          </motion.div>
        </div>
      </section>

      {/* Mission and Vision */}
      <section className="py-20 bg-blue-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
              Our Guiding Principles
            </motion.h2>
            <motion.div variants={itemVariants} className="w-24 h-1 bg-yellow-400 mx-auto"></motion.div>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-12">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="bg-blue-100 p-3 rounded-full mr-4">
                  <FaChalkboardTeacher className="text-blue-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Our Mission</h3>
              </div>
              <p className="text-gray-700">
                To provide a transformative educational experience that empowers students to achieve their fullest potential 
                academically, socially, and emotionally. We commit to fostering intellectual curiosity, ethical leadership, 
                and global citizenship through innovative teaching and meaningful community engagement.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-white p-8 rounded-xl shadow-md hover:shadow-lg transition-shadow"
            >
              <div className="flex items-center mb-6">
                <div className="bg-yellow-100 p-3 rounded-full mr-4">
                  <FaUserGraduate className="text-yellow-600 text-2xl" />
                </div>
                <h3 className="text-xl font-bold text-gray-800">Our Vision</h3>
              </div>
              <p className="text-gray-700">
                To be recognized as a premier educational institution that develops future-ready individuals who think critically, 
                act compassionately, and lead courageously. We envision a learning community where every member is inspired to 
                excel and make a positive difference in an interconnected world.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center"
          >
            <motion.div 
              variants={itemVariants}
              className="p-6 bg-blue-50 rounded-xl"
            >
              <FaSchool className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">28+</h3>
              <p className="text-gray-600">Years of Excellence</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="p-6 bg-yellow-50 rounded-xl"
            >
              <GiTeacher className="text-4xl text-yellow-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">85+</h3>
              <p className="text-gray-600">Qualified Faculty</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="p-6 bg-blue-50 rounded-xl"
            >
              <FaUserGraduate className="text-4xl text-blue-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">2000+</h3>
              <p className="text-gray-600">Current Students</p>
            </motion.div>

            <motion.div 
              variants={itemVariants}
              className="p-6 bg-yellow-50 rounded-xl"
            >
              <FaAward className="text-4xl text-yellow-600 mx-auto mb-4" />
              <h3 className="text-3xl font-bold text-gray-800 mb-2">150+</h3>
              <p className="text-gray-600">Awards Won</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-blue-700 text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={containerVariants}
            className="text-center mb-16"
          >
            <motion.h2 variants={itemVariants} className="text-3xl md:text-4xl font-bold mb-4">
              What Our Community Says
            </motion.h2>
            <motion.div variants={itemVariants} className="w-24 h-1 bg-yellow-400 mx-auto"></motion.div>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-blue-800 p-8 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Mrs. Sunita Mehta</h4>
                  <p className="text-blue-200">Parent (2015-2023)</p>
                </div>
              </div>
              <p className="text-blue-100">
                "RPS School provided my children with not just education but values that will last a lifetime. The teachers go 
                above and beyond to nurture each child's unique potential."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="bg-blue-800 p-8 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Rahul Verma</h4>
                  <p className="text-blue-200">Alumni (Batch of 2018)</p>
                </div>
              </div>
              <p className="text-blue-100">
                "The foundation I received at RPS School prepared me excellently for college and beyond. The emphasis on critical 
                thinking and leadership skills gives RPS graduates an edge."
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="bg-blue-800 p-8 rounded-xl"
            >
              <div className="flex items-center mb-4">
                <div className="w-12 h-12 bg-yellow-400 rounded-full mr-4"></div>
                <div>
                  <h4 className="font-bold">Dr. Anjali Kapoor</h4>
                  <p className="text-blue-200">Faculty Since 2007</p>
                </div>
              </div>
              <p className="text-blue-100">
                "Teaching at RPS has been incredibly rewarding. The school's commitment to professional development and innovative 
                teaching methods creates an ideal environment for both students and educators to thrive."
              </p>
            </motion.div>
          </div>
        </div>
      </section>
    </div>
    </div>
  );
};

export default AboutUs;