import React from "react";
import { FaLocationDot } from "react-icons/fa6";
import { MdCall } from "react-icons/md";
import { MdEmail } from "react-icons/md";
import { GiCrossedAirFlows } from "react-icons/gi";
function Footer() {
  return (
    <div className="bg-[#181D38] relative h-full p-10 md:p-20 flex md:flex-row flex-col md:items-center justify-between gap-12 md:gap-0">
      <div className="text-white md:font-mono">
        <h1 className="text-3xl font-medium">Quick Links</h1>
        <div className="text-xl md:leading-loose cursor-pointer font-normal">
          <h2 className="hover:scale-110 hover:text-yellow-200"> > About us</h2>
          <h2 className="hover:scale-110 hover:text-yellow-200">
            {" "}
            > Contact us
          </h2>
          <h2 className="hover:scale-110 hover:text-yellow-200">
            {" "}
            > Privacy & Policy
          </h2>
          <h2 className="hover:scale-110 hover:text-yellow-200">
            {" "}
            > Terms & Condition
          </h2>
          <h2 className="hover:scale-110 hover:text-yellow-200">
            {" "}
            > FAQs & Help
          </h2>
        </div>
      </div>
      <div className="text-white md:font-mono">
        <h1 className="text-3xl font-medium">Contact us</h1>
        <div className="text-xl md:leading-loose font-normal">
          <a
            href="https://www.google.com/maps?q=1600+Amphitheatre+Parkway,+Mountain+View,+CA"
            target="_blank"
          >
            <h2 className="flex items-center gap-2 hover:scale-110 hover:text-yellow-200">
              {" "}
              <FaLocationDot /> NH-52, Kota Road, Suket, 326530
            </h2>{" "}
          </a>
          <a href="tel:+919351239366">
            <h2 className="flex items-center gap-2 hover:scale-110 hover:text-yellow-200">
              {" "}
              <MdCall /> +91 93512-39366
            </h2>{" "}
          </a>
          <a href="mailto:rpssuket@gmail.com">
            <h2 className="flex items-center gap-2 hover:scale-110 hover:text-yellow-200">
              {" "}
              <MdEmail /> rpssuket@gmail.com
            </h2>{" "}
          </a>
          <div className="flex space-x-4 fixed bottom-4 right-4 z-10">
            {/* Instagram */}
            <a
              href="https://www.instagram.com/khanzarif2009/profilecard/?igsh=MW5mdTZvcWdmNWZ1cg=="
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 bg-blue-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/a/a5/Instagram_icon.png"
                  alt="Instagram"
                  className="w-6 h-6"
                />
              </div>
            </a>

            {/* YouTube */}
            <a
              href="https://youtube.com/@reliablesuket?si=FNU_1PmZ1zqszgXT"
              target="_blank"
              rel="noopener noreferrer"
            >
              <div className="w-12 h-12 bg-red-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all">
                <img
                  src="https://upload.wikimedia.org/wikipedia/commons/4/42/YouTube_icon_%282013-2017%29.png"
                  alt="YouTube"
                  className="w-6 h-6"
                />
              </div>
            </a>

            {/* WhatsApp */}
            <a href="https://wa.me/9351239366" target="_blank" rel="noopener noreferrer">
              <div className="w-12 h-12 bg-green-500 rounded-full flex items-center justify-center shadow-lg hover:shadow-2xl transition-all">
                <img
                  src="https://imgs.search.brave.com/gATjGUzjNx5LO1NE_BV5DUcuKt9q9Y0I5b6q6vyzHJY/rs:fit:500:0:0:0/g:ce/aHR0cHM6Ly9hc3Nl/dHMuc3RpY2twbmcu/Y29tL2ltYWdlcy81/ODBiNTdmY2Q5OTk2/ZTI0YmM0M2M1NDMu/cG5n"
                  alt="WhatsApp"
                  className="w-6 h-6"
                />
              </div>
            </a>
          </div>
        </div>
      </div>
      <div className="text-white text-center md:font-mono">
        <h1 className="text-2xl font-medium">Location</h1>
        <div className="text-xl font-normal">
          <div className="md:p-4 p-1 bg-white shadow-lg z-10">
            <iframe
              width="300"
              height="200"
              frameBorder="0"
              style={{ border: "0" }}
              src="https://www.openstreetmap.org/export/embed.html?bbox=-0.4817466735839844%2C51.28726334253792%2C0.23651123046874997%2C51.69187401533057&layer=mapnik"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
      <div className="text-white text-center mb-40 md:mb-0 md:font-mono">
        <h1 className="text-2xl font-medium">Sign up Using Email</h1>
        <div className="text-xl font-normal">
          <div className="flex justify-center items-center ">
            <div className="bg-white p-6 shadow-lg w-80">
              <h2 className="text-2xl text-black font-semibold text-center mb-4">
                Sign Up
              </h2>
              <form>
                <div className="mb-4">
                  <label htmlFor="email" className="block text-gray-700 mb-2">
                    Enter your email:
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    required
                    className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="your-email@example.com"
                  />
                </div>
                <button
                  type="submit"
                  className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition-all"
                >
                  Sign Up
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <h1 className="absolute text-white text-white md:text-xl text-2xl z-20 md:mb-0 mb-10 bottom-10 left-2">
        © , All Right Reserved. Designed & Developed by 
        <a href="https://wa.me/6378211202">
        <span className="animate-text-gradient"> Alkaif (Software Engg.)</span> </a>
      </h1>
    </div>
  );
}

export default Footer;
