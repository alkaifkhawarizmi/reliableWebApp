import React, { useState } from 'react'
import Navbar from './Navbar'
import Footer from './Footer'
import { FaLocationDot } from 'react-icons/fa6'
import { MdCall, MdEmail } from 'react-icons/md'
import { submitContactForm } from '../api/upload' // Adjust the import path as needed

function ContactUs() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: ''
  });
  
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState({
    success: null,
    message: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus({ success: null, message: '' });

    try {
      const result = await submitContactForm(formData);
      
      if (result.success) {
        setSubmitStatus({
          success: true,
          message: 'Thank you for contacting us! We will get back to you soon.'
        });
        // Reset form
        setFormData({ 
          name: '', 
          email: '', 
          phone: '', 
          subject: '', 
          message: '' 
        });
      } else {
        setSubmitStatus({
          success: false,
          message: result.message || 'Submission failed. Please try again later.'
        });
      }
    } catch (error) {
      setSubmitStatus({
        success: false,
        message: 'An error occurred. Please try again.'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className='min-h-screen flex flex-col'>
      <Navbar />
      <div className='flex-1 mt-8'>
        <div className='max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16'>
          <div className='text-center mb-16'>
            <h1 className='text-4xl md:text-5xl font-bold text-blue-600 mb-4'>Contact Us</h1>
            <p className='text-lg text-gray-600 max-w-2xl mx-auto'>
              We're here to help and answer any questions you might have.
            </p>
          </div>

          <div className='flex flex-col lg:flex-row gap-12'>
            {/* Contact Information */}
            <div className='lg:w-1/2 bg-gradient-to-br from-blue-50 to-indigo-50 p-8 rounded-xl shadow-sm'>
              <h2 className='text-2xl font-semibold text-gray-800 mb-6'>Get in Touch</h2>
              <p className='text-gray-600 mb-8'>
                We value open communication and welcome your inquiries. Whether you're a parent, student, 
                prospective family, or community member, we're here to assist you.
              </p>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="mt-1 text-blue-600">
                    <FaLocationDot className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Our Address</h3>
                    <a
                      href="https://www.google.com/maps?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      Opp.ward. no. 10 Opp. Hp Gas agency office, Kota road, suket
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 text-blue-600">
                    <MdCall className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Phone Number</h3>
                    <a
                      href="tel:+919351239366"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      +91 93512-39366
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="mt-1 text-blue-600">
                    <MdEmail className="text-xl" />
                  </div>
                  <div>
                    <h3 className="text-lg font-medium text-gray-800">Email Address</h3>
                    <a
                      href="mailto:rpssuket@gmail.com"
                      className="text-gray-600 hover:text-blue-600 transition-colors"
                    >
                      rpssuket@gmail.com
                    </a>
                  </div>
                </div>
              </div>
            </div>

            {/* Contact Form */}
            <div className='lg:w-1/2'>
              <div className="bg-white p-8 rounded-xl shadow-md">
                <h2 className="text-2xl font-semibold text-gray-800 mb-6 text-center">
                  Contact Form
                </h2>
                
                {submitStatus.message && (
                  <div className={`mb-4 p-3 rounded-lg ${submitStatus.success ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                    {submitStatus.message}
                  </div>
                )}
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Your full name"
                    />
                  </div>
                  
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                        Email Address
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="your.email@example.com"
                      />
                    </div>
                    
                    <div>
                      <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                        Phone Number
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                        placeholder="+91 9876543210"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                      Subject
                    </label>
                    <input
                      type="text"
                      id="subject"
                      name="subject"
                      value={formData.subject}
                      onChange={handleChange}
                      required
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="What's this about?"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                      Your Message
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      value={formData.message}
                      onChange={handleChange}
                      required
                      rows="4"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition"
                      placeholder="Write your message here..."
                    ></textarea>
                  </div>
                  
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className={`w-full bg-blue-600 text-white font-semibold py-3 rounded-lg hover:bg-blue-700 transition duration-300 shadow-md hover:shadow-lg ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                  >
                    {isSubmitting ? 'Sending...' : 'Send Message'}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default ContactUs