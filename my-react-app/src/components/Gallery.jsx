import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import Navbar from "./Navbar";
import Footer from "./Footer";
import image1 from "./assets/reliable-gallery/IMG-20241205-WA0020.jpg"
import image2 from "./assets/reliable-gallery/IMG-20241206-WA0021.jpg"
import image3 from "./assets/reliable-gallery/IMG-20241206-WA0022.jpg"
import image4 from "./assets/reliable-gallery/IMG-20241206-WA0023.jpg"
import image5 from "./assets/reliable-gallery/IMG-20241206-WA0024.jpg"
import image6 from "./assets/reliable-gallery/IMG-20241206-WA0025.jpg"
import image7 from "./assets/reliable-gallery/IMG-20241206-WA0026.jpg"
import image8 from "./assets/reliable-gallery/IMG-20241206-WA0027.jpg"
import image9 from "./assets/reliable-gallery/IMG-20241206-WA0028.jpg"
import image10 from "./assets/reliable-gallery/IMG-20241206-WA0029.jpg"
import image11 from "./assets/reliable-gallery/IMG-20241206-WA0030.jpg"
import image12 from "./assets/reliable-gallery/IMG-20241206-WA0031.jpg"
import image13 from "./assets/reliable-gallery/IMG-20241206-WA0032.jpg"
import image14 from "./assets/reliable-gallery/IMG-20241206-WA0033.jpg"
import image15 from "./assets/reliable-gallery/IMG-20241206-WA0034.jpg"
import image16 from "./assets/reliable-gallery/IMG-20241206-WA0035.jpg"



const imageUrls = [
  image1,
  image2,
  image3,
  image4,
  image5,
  image6,
  image7,
  image8,
  image9,
  image10,
  image11,
  image12,
  image13,
  image14,
  image15,
];

export default function Gallery() {
  const galleryRef = useRef(null);

  useEffect(() => {
    const images = galleryRef.current.querySelectorAll(".gallery-item");
    gsap.fromTo(
      images,
      { opacity: 0, y: 50 },
      {
        opacity: 1,
        y: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power2.out",
        scrollTrigger: {
          trigger: galleryRef.current,
          start: "top 80%",
          end: "bottom 20%",
          toggleActions: "play none none reverse",
        },
      }
    );
  }, []);

  return (
    <div>
      <Navbar />
    <div
      ref={galleryRef}
     className="grid pt-32 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 p-4 md:p-6 bg-gray-100 auto-rows-auto"
    >
      {imageUrls.map((url, index) => (
        <div
          key={index}
          className="gallery-item  w-fit h-fit relative overflow-hidden rounded-lg shadow-md"
        >
          <img
            src={url}
            alt={`Gallery ${index + 1}`}
            className="h-[400px] min-w-[360px] md:min-w-[350px] object-cover transform transition-transform duration-500 hover:scale-110"
          />
        </div>
      ))}
    </div>
    <Footer />
    </div>
  );
}
