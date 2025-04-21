import React, { useEffect, useRef } from "react";
import { FaLocationDot, FaGraduationCap, FaBookOpen } from "react-icons/fa6";
import { MdCall, MdEmail } from "react-icons/md";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

function Footer() {
  const footerRef = useRef();
  const sectionRefs = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      sectionRefs.current.forEach((section, index) => {
        gsap.from(section, {
          y: 50,
          opacity: 0,
          duration: 0.8,
          delay: index * 0.15,
          ease: "power2.out",
          scrollTrigger: {
            trigger: footerRef.current,
            start: "top 80%",
            toggleActions: "play none none none",
          }
        });
      });

      gsap.from(".footer-icon", {
        scale: 0,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "elastic.out(1, 0.5)",
        scrollTrigger: {
          trigger: footerRef.current,
          start: "top 90%",
        }
      });

      gsap.utils.toArray(".footer-link").forEach(link => {
        link.addEventListener("mouseenter", () => {
          gsap.to(link, { 
            x: 5,
            color: "#fef08a",
            duration: 0.3 
          });
        });
        link.addEventListener("mouseleave", () => {
          gsap.to(link, { 
            x: 0,
            color: "#ffffff",
            duration: 0.3 
          });
        });
      });

    }, footerRef);

    return () => ctx.revert();
  }, []);

  const addToRefs = (el) => {
    if (el && !sectionRefs.current.includes(el)) {
      sectionRefs.current.push(el);
    }
  };

  return (
    <div 
      className="bg-[#181D38] relative pt-16 pb-32 px-6 md:px-16" 
      ref={footerRef}
    >
      <FaGraduationCap className="footer-icon absolute top-10 left-10 text-blue-400 opacity-20 text-4xl" />
      <FaBookOpen className="footer-icon absolute bottom-20 right-16 text-yellow-400 opacity-20 text-5xl" />

      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-4 gap-10">
        <div className="text-white" ref={addToRefs}>
          <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <FaBookOpen className="mr-2 text-blue-300" /> Quick Links
          </h1>
          <div className="space-y-4 text-lg">
            <a href="#" className="footer-link block hover:text-yellow-200 transition-colors">About us</a>
            <a href="#" className="footer-link block hover:text-yellow-200 transition-colors">Contact us</a>
            <a href="#" className="footer-link block hover:text-yellow-200 transition-colors">Privacy & Policy</a>
            <a href="#" className="footer-link block hover:text-yellow-200 transition-colors">Terms & Condition</a>
            <a href="#" className="footer-link block hover:text-yellow-200 transition-colors">FAQs & Help</a>
          </div>
        </div>

        <div className="text-white" ref={addToRefs}>
          <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <MdCall className="mr-2 text-blue-300" /> Contact us
          </h1>
          <div className="space-y-4 text-lg">
            <a
              href="https://www.google.com/maps?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA"
              target="_blank"
              rel="noopener noreferrer"
              className="footer-link flex items-center hover:text-yellow-200 transition-colors"
            >
              <FaLocationDot className="mr-2" /> NH-52, Kota Road, Suket, 326530
            </a>
            <a
              href="tel:+919351239366"
              className="footer-link flex items-center hover:text-yellow-200 transition-colors"
            >
              <MdCall className="mr-2" /> +91 93512-39366
            </a>
            <a
              href="mailto:rpssuket@gmail.com"
              className="footer-link flex items-center hover:text-yellow-200 transition-colors"
            >
              <MdEmail className="mr-2" /> rpssuket@gmail.com
            </a>
          </div>
        </div>

        <div className="text-white" ref={addToRefs}>
          <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <FaLocationDot className="mr-2 text-blue-300" /> Location
          </h1>
          <div className="rounded-lg overflow-hidden shadow-xl transform hover:scale-[1.02] transition-transform duration-300">
            <iframe
              width="100%"
              height="200"
              frameBorder="0"
              style={{ border: "0" }}
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.4817466735839844%2C51.28726334253792%2C0.23651123046874997%2C51.69187401533057&layer=mapnik"
              allowFullScreen
              className="rounded-lg"
            ></iframe>
          </div>
        </div>

        <div className="text-white" ref={addToRefs}>
          <h1 className="text-2xl md:text-3xl font-bold mb-6 flex items-center">
            <MdEmail className="mr-2 text-blue-300" /> Newsletter
          </h1>
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-xl text-gray-800 font-semibold text-center mb-4">
              Stay Updated
            </h2>
            <form className="space-y-4">
              <div>
                <input
                  type="email"
                  placeholder="your-email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-800"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg transition-colors duration-300 font-medium flex items-center justify-center"
              >
                Subscribe
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5 ml-2"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                >
                  <path
                    fillRule="evenodd"
                    d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </form>
          </div>
        </div>
      </div>

      <div className="flex justify-center space-x-6 mt-16">
        <a
          href="https://www.instagram.com/khanzarif2009/profilecard/?igsh=MW5mdTZvcWdmNWZ1cg=="
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon bg-gradient-to-br from-pink-500 to-purple-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
        >
          <FaInstagram className="text-xl" />
        </a>
        <a
          href="https://youtube.com/@reliablesuket?si=FNU_1PmZ1zqszgXT"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon bg-red-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
        >
          <FaYoutube className="text-xl" />
        </a>
        <a
          href="https://wa.me/9351239366"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon bg-green-500 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
        >
          <FaWhatsapp className="text-xl" />
        </a>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="social-icon bg-blue-600 text-white w-12 h-12 rounded-full flex items-center justify-center shadow-lg hover:shadow-xl transition-all transform hover:scale-110"
        >
          <FaFacebookF className="text-xl" />
        </a>
      </div>

      <div className="text-center mt-16 text-gray-400 text-lg">
        <p>
          © {new Date().getFullYear()} All Rights Reserved. Designed & Developed by{" "}
          <a
            href="https://wa.me/6378211202"
            className="text-yellow-300 hover:text-yellow-200 font-medium transition-colors"
          >
            Alkaif 
          </a>
        </p>
      </div>
    </div>
  );
}

export default Footer;