import React, { useState, useEffect } from "react";
import image1 from "./assets/WhatsApp Image 2024-12-05 at 17.35.47_69067ddb.jpg";
import image2 from "./assets/WhatsApp Image 2024-12-06 at 17.00.22_f653325e.jpg";
import image3 from "./assets/IMG-20241205-WA0036.jpg";
import image4 from "./assets/IMG-20241205-WA0037.jpg";
import image5 from "./assets/WhatsApp Image 2024-12-06 at 16.39.54_daac0d2c.jpg"
import bottomBanner from "./assets/IMG-20241205-WA0031.jpg"

const ImageCarousel = () => {
  const images = [
    image1,
    image2,
    image3,
    image4,
    image5,
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  // Automatically move to the next image
  useEffect(() => {
    const interval = setInterval(() => {
      handleNext();
    }, 3000); // Change image every 3 seconds
    return () => clearInterval(interval);
  }, [currentIndex]);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) =>
      prevIndex === 0 ? images.length - 1 : prevIndex - 1
    );
  };

  return (
    <div className="relative w-full pt-24 bg-gray-100">
    {/* Image Wrapper */}
    <div className=" h-auto overflow-hidden">
      <div
        className="flex transition-transform duration-700 ease-in-out"
        style={{
          transform: `translateX(-${currentIndex * 100}%)`,
        }}
      >
        {images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`Slide ${index + 1}`}
            className="min-w-full object-fill  max-h-[600px] object-cover"
          />
        ))}
      </div>
    </div>

    {/* Navigation Buttons */}
    <div className="absolute top-[-10%] inset-0 flex items-center justify-between px-4">
      <button
        className="bg-blue-500 text-2xl text-white px-5 p-3 hover:bg-black/70"
        onClick={handlePrevious}
      >
        ❮
      </button>
      <button
        className="bg-blue-500 text-2xl text-white px-5 p-3 hover:bg-black/70"
        onClick={handleNext}
      >
        ❯
      </button>
    </div>
    <div className="w-full py-4 bg-gray-200">
    <img className="object-cover" src={bottomBanner} alt="" />
    </div>
  </div>
  );
};

export default ImageCarousel;
