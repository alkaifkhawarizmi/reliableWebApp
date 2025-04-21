import React, { useState, useEffect } from "react";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'

const ImageCarousel = ({ banner }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [bannerMedia, setBannerMedia] = useState([]);

  // Filter banner media on component mount
  useEffect(() => {
    const media = banner.filter((item) => item.mediaType === "banner");
    if (media.length) {
      setBannerMedia(media);
    }
  }, [banner]);

  // Auto-advance carousel
  useEffect(() => {
    if (bannerMedia.length <= 1) return;
    
    const interval = setInterval(() => {
      handleNext();
    }, 7000); // 7 second interval
    
    return () => clearInterval(interval);
  }, [currentIndex, bannerMedia]);

  const handleNext = () => {
    if (bannerMedia.length <= 1) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % bannerMedia.length);
      setIsTransitioning(false);
    }, 500);
  };

  const handlePrevious = () => {
    if (bannerMedia.length <= 1) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? bannerMedia.length - 1 : prevIndex - 1
      );
      setIsTransitioning(false);
    }, 500);
  };

  const goToSlide = (index) => {
    if (index === currentIndex) return;
    
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentIndex(index);
      setIsTransitioning(false);
    }, 500);
  };

  // Sample education-themed banner if none provided
  const defaultBanners = [
    {
      imageUrl: "https://images.unsplash.com/photo-1523050854058-8df90110c9f1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80",
      title: "Quality Education for Bright Futures",
      description: "Our state-of-the-art facilities empower students to excel"
    }
  ];

  const displayBanners = bannerMedia.length > 0 ? bannerMedia : defaultBanners;

  return (
    <div className="relative w-full pt-24 bg-gradient-to-b from-blue-50 to-white">
      {/* Main Carousel */}
      <div className="relative overflow-hidden rounded-xl shadow-2xl mx-auto max-w-7xl h-[70vh] min-h-[500px]">
        {/* Slides */}
        <div
          className={`flex h-full transition-transform duration-700 ease-in-out ${
            isTransitioning ? "opacity-90" : "opacity-100"
          }`}
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
          }}
        >
          {displayBanners.map((item, index) => (
            <div key={index} className="min-w-full relative">
              <img
                src={item.imageUrl}
                alt={`Slide ${index + 1}`}
                className="w-full h-full object-cover"
                loading="lazy"
              />
              
              {/* Text Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent flex flex-col justify-end p-8 md:p-12">
                <div className="max-w-3xl mx-auto text-center">
                  <motion.h2 
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-3xl md:text-5xl font-bold text-white mb-4"
                  >
                    {item.title || "Welcome to Our School"}
                  </motion.h2>
                  <motion.p
                    initial={{ y: 20, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: 0.5 }}
                    className="text-lg md:text-xl text-white/90 mb-6"
                  >
                    {item.description || "Discover excellence in education"}
                  </motion.p>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.7 }}
                    className="flex justify-center gap-4"
                  >
                    <Link to={'/about-us'} className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-all">
                      Learn More
                    </Link>
                    <Link to={'/contact-us'} className="px-6 py-3 bg-white/90 hover:bg-white text-blue-800 rounded-lg font-medium transition-all">
                      Contact Us
                    </Link>
                  </motion.div>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        {displayBanners.length > 1 && (
          <>
            <button
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-800 p-3 rounded-full shadow-lg transition-all z-10"
              onClick={handlePrevious}
              aria-label="Previous slide"
            >
              <FaChevronLeft className="text-xl" />
            </button>
            <button
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/80 hover:bg-white text-blue-800 p-3 rounded-full shadow-lg transition-all z-10"
              onClick={handleNext}
              aria-label="Next slide"
            >
              <FaChevronRight className="text-xl" />
            </button>
          </>
        )}

        {/* Slide Indicators */}
        {displayBanners.length > 1 && (
          <div className="absolute bottom-6 left-0 right-0 flex justify-center gap-2 z-10">
            {displayBanners.map((_, index) => (
              <button
                key={index}
                onClick={() => goToSlide(index)}
                className={`h-2 w-8 rounded-full transition-all ${
                  index === currentIndex
                    ? "bg-white w-12 scale-110"
                    : "bg-white/50 hover:bg-white/70 w-8"
                }`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        )}
      </div>

      {/* Bottom Banner */}
      <div className="max-w-7xl mx-auto mb-12 mt-12 px-4">
        <div className="relative rounded-xl overflow-hidden shadow-lg h-48 md:h-64 w-full">
          <img
            className="w-full h-full object-cover"
            src="https://images.unsplash.com/photo-1588072432836-e10032774350?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"
            alt="School community"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-blue-800/70 flex items-center justify-center">
            <div className="text-center p-6">
              <h3 className="text-2xl md:text-3xl font-bold text-white mb-3">
                Join Our Vibrant Community
              </h3>
              <p className="text-white/90 mb-4 max-w-2xl mx-auto">
                Discover how our school can help your child reach their full potential
              </p>
              <button className="px-6 py-2 bg-yellow-400 hover:bg-yellow-300 text-blue-900 font-medium rounded-lg transition-all">
                Schedule a Visit
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ImageCarousel;