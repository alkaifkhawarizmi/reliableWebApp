import React, { useState } from "react";
import Navbar from "./Navbar";
import { MdMedicalInformation, MdSchool, MdLocationOn, MdPhone, MdEmail } from "react-icons/md";
import { RiParentFill, RiContactsBookFill } from "react-icons/ri";
import { GiCancel } from "react-icons/gi";
import Footer from "./Footer";
import { FaChild, FaUserGraduate } from "react-icons/fa";

function Admission() {
  const [visibility, setVisibility] = useState(true);
  const [formData, setFormData] = useState({
    academicYear: "",
    studentClass: "",
    studentName: "",
    fatherName: "",
    fatherMobile: "",
    motherName: "",
    address: "",
    primaryMobile: "",
    email: ""
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
    console.log(formData);
    alert("Admission enquiry submitted successfully!");
    setVisibility(true);
  };

  return (
    <div>
    <Navbar />
    <div className="min-h-screen pt-28 bg-gradient-to-b from-gray-50 to-blue-50">
      {/* Hero Section */}
      <div className={visibility ? "block" : "hidden"}>
        <div className="pt-24  bg-gray-900 relative h-[400px] overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/90 to-purple-900/90 z-10"></div>
          <img
            className="object-cover w-full h-full"
            src="https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-1.2.1&auto=format&fit=crop&w=1350&q=80"
            alt="School Campus"
          />
          <div className="absolute inset-0 z-20 flex flex-col items-center justify-center text-center px-4">
            <h1 className="md:text-5xl text-4xl font-bold text-white mb-4">
              Admission <span className="text-yellow-300">Enquiry</span>
            </h1>
            <p className="text-xl text-gray-200 max-w-2xl mb-8">
              Begin your child's educational journey with us
            </p>
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center text-white bg-blue-600/30 px-4 py-2 rounded-full backdrop-blur-sm">
                <MdSchool className="mr-2" />
                <span>Quality Education</span>
              </div>
              <div className="flex items-center text-white bg-purple-600/30 px-4 py-2 rounded-full backdrop-blur-sm">
                <FaUserGraduate className="mr-2" />
                <span>Experienced Faculty</span>
              </div>
              <div className="flex items-center text-white bg-green-600/30 px-4 py-2 rounded-full backdrop-blur-sm">
                <FaChild className="mr-2" />
                <span>Child-Centric Approach</span>
              </div>
            </div>
            <button 
              onClick={() => setVisibility(false)}
              className="px-8 py-3 bg-gradient-to-r from-yellow-400 to-yellow-500 text-gray-900 font-semibold rounded-full hover:from-yellow-500 hover:to-yellow-600 shadow-lg transition-all duration-300 transform hover:scale-105 flex items-center"
            >
              <RiContactsBookFill className="mr-2" />
              Fill Enquiry Form
            </button>
            <p className="text-gray-300 mt-6 text-sm max-w-lg">
              Note: Submitting the enquiry form does not guarantee admission. 
              Our team will review your information and contact you shortly.
            </p>
          </div>
        </div>

        {/* Additional Info Section */}
        <div className="py-16 px-4 md:px-8 max-w-6xl mx-auto">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-blue-600 text-3xl mb-4">
                <MdSchool />
              </div>
              <h3 className="text-xl font-semibold mb-2">Admission Process</h3>
              <p className="text-gray-600">
                Learn about our simple 3-step admission process designed to make enrollment easy for parents.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-purple-600 text-3xl mb-4">
                <RiParentFill />
              </div>
              <h3 className="text-xl font-semibold mb-2">Parent Testimonials</h3>
              <p className="text-gray-600">
                Hear from other parents about their experiences with our school community.
              </p>
            </div>
            <div className="bg-white p-6 rounded-xl shadow-md hover:shadow-lg transition-shadow">
              <div className="text-green-600 text-3xl mb-4">
                <MdMedicalInformation />
              </div>
              <h3 className="text-xl font-semibold mb-2">Important Dates</h3>
              <p className="text-gray-600">
                View our academic calendar and important admission deadlines.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Enquiry Form */}
      <div className={visibility ? "hidden" : "block"}>
        <div className="max-w-4xl mx-auto px-4 py-12">
          <div className="bg-white rounded-xl shadow-xl overflow-hidden">
            <div className="bg-gradient-to-r from-blue-600 to-purple-600 p-6 text-white">
              <div className="flex justify-between items-center">
                <h1 className="text-2xl md:text-3xl font-bold flex items-center">
                  <RiContactsBookFill className="mr-3" />
                  Admission Enquiry Form
                </h1>
                <button 
                  onClick={() => setVisibility(true)}
                  className="p-2 rounded-full hover:bg-white/20 transition-colors"
                  aria-label="Close form"
                >
                  <GiCancel className="text-2xl" />
                </button>
              </div>
              <p className="mt-2 text-blue-100">
                Please fill in all required details accurately
              </p>
            </div>

            <form onSubmit={handleSubmit} className="p-6 md:p-8">
              {/* Student Information */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-8 bg-blue-500 mr-3"></div>
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <FaChild className="text-blue-500 mr-2" />
                    Student Information
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Academic Year*</label>
                    <input
                      name="academicYear"
                      value={formData.academicYear}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Class Applying For*</label>
                    <input
                      name="studentClass"
                      value={formData.studentClass}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Student Full Name*</label>
                    <input
                      name="studentName"
                      value={formData.studentName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Date of Birth</label>
                    <input
                      type="date"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Parent Information */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-8 bg-purple-500 mr-3"></div>
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <RiParentFill className="text-purple-500 mr-2" />
                    Parent Information
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-gray-700 mb-2">Father's Name*</label>
                    <input
                      name="fatherName"
                      value={formData.fatherName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Father's Mobile*</label>
                    <input
                      name="fatherMobile"
                      value={formData.fatherMobile}
                      onChange={handleChange}
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Mother's Name</label>
                    <input
                      name="motherName"
                      value={formData.motherName}
                      onChange={handleChange}
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Mother's Mobile</label>
                    <input
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                    />
                  </div>
                </div>
              </div>

              {/* Contact Information */}
              <div className="mb-8">
                <div className="flex items-center mb-4">
                  <div className="w-1 h-8 bg-green-500 mr-3"></div>
                  <h2 className="text-xl font-semibold text-gray-800 flex items-center">
                    <MdLocationOn className="text-green-500 mr-2" />
                    Contact Information
                  </h2>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="md:col-span-2">
                    <label className="block text-gray-700 mb-2">Address*</label>
                    <textarea
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      rows="3"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    ></textarea>
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Primary Mobile*</label>
                    <input
                      name="primaryMobile"
                      value={formData.primaryMobile}
                      onChange={handleChange}
                      type="tel"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>
                  <div>
                    <label className="block text-gray-700 mb-2">Email Address*</label>
                    <input
                      name="email"
                      value={formData.email}
                      onChange={handleChange}
                      type="email"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition"
                      required
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col md:flex-row justify-between items-center mt-10">
                <p className="text-gray-500 text-sm mb-4 md:mb-0">
                  * indicates required field
                </p>
                <button
                  type="submit"
                  className="px-8 py-3 bg-gradient-to-r from-blue-600 to-purple-600 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-purple-700 shadow-md transition-all duration-300 transform hover:scale-105"
                >
                  Submit Enquiry
                </button>
              </div>
            </form>
          </div>

          {/* Contact Info Box */}
          <div className="bg-white rounded-xl shadow-md p-6 mt-8">
            <h3 className="text-xl font-semibold mb-4 text-gray-800 flex items-center">
              <MdPhone className="text-blue-500 mr-2" />
              Need Help?
            </h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="flex items-center">
                <MdPhone className="text-green-500 text-xl mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Admission Helpline</p>
                  <a className="font-medium">+91 9351239366</a>
                </div>
              </div>
              <div className="flex items-center">
                <MdEmail className="text-blue-500 text-xl mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Email</p>
                  <p className="font-medium">rpssuket@gmail.com</p>
                </div>
              </div>
              <div className="flex items-center">
                <MdLocationOn className="text-red-500 text-xl mr-3" />
                <div>
                  <p className="text-gray-500 text-sm">Visit Us</p>
                  <p className="font-medium">NH-52 , Kota Road , Suket , 326530</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
    </div>
  );
}

export default Admission;