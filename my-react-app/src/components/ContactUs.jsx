import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { FaLocationDot } from 'react-icons/fa6'
import { MdCall, MdEmail } from 'react-icons/md'

function ContactUs() {


  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    alert(`Request received. We will contact ${formData.name} soon!`);
    setFormData({ name: '', email: '', phone: '' });
  };


  return (
    <div className=''>
      <Navbar />
      <div className='flex md:flex-row flex-col items-center justify-center'>
      <div className='pt-32 md:px-36 px-4 '>
        <h1 className='text-5xl text-center font-semibold text-blue-500'>Contact us</h1>
        <h2 className='text-2xl pt-10 font-semibold text-gray-600'>Get in Touch</h2>
        <p className='text-xl font-normal text-gray-400'>We value open communication and welcome your inquiries. <br />Whether you are a parent, student, prospective family, <br /> or community member,  we are here to assist you. <br /> Feel free to reach out to us through any of the following channels:</p>
        <div className="text-gray-800 w-fit pt-20">
        <div className="text-xl leading-loose font-normal">
          <a
            href="https://www.google.com/maps?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA"
            target="_blank"
          >
            <h2 className="flex items-center gap-2 hover:scale-110 hover:text-yellow-600">
              {" "}
              <FaLocationDot /> NH-52, Kota Road, Suket, 326530
            </h2>{" "}
          </a>
          <a href="tel:+919351239366">
            <h2 className="flex items-center gap-2 hover:scale-110 hover:text-yellow-600">
              {" "}
              <MdCall /> +91 93512-39366
            </h2>{" "}
          </a>
          <a href="mailto:rpssuket@gmail.com">
            <h2 className="flex items-center gap-2 hover:scale-110 hover:text-yellow-600">
              {" "}
              <MdEmail /> rpssuket@gmail.com
            </h2>{" "}
          </a>
        </div>
      </div>
      </div>
      <div className="flex w-80 mt-32 mx-36 justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-white p-10 rounded-lg shadow-md w-full max-w-md"
      >
        <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
          Request a Callback
        </h2>
        <div className="mb-4">
          <label
            htmlFor="name"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your name"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your email"
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="phone"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Phone Number
          </label>
          <input
            type="tel"
            id="phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
            className="w-full border border-gray-300 rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500"
            placeholder="Enter your phone number"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-500 text-white font-semibold py-2 rounded-lg hover:bg-blue-600 transition duration-300"
        >
          Request Callback
        </button>
      </form>
    </div>
    </div>
      <div className='md:pt-80 pt-20'></div>
      <Footer />
    </div>
  )
}

export default ContactUs