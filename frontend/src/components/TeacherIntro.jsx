import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
// import zarif from "./assets/WhatsApp Image 2024-12-06 at 17.21.14_ed1a8712.jpg";

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

const teacherIntroductions = [
  {
    name: "Mr. Zarif Ahmed",
    img: "",
    subject: "Director",
    intro: "Leadership is not about being in charge; it's about taking care of those in your charge.",
  },
  {
    name: "Mr. Sharif Ahmed",
    img: "https://images.unsplash.com/photo-1560250097-0b93528c311a?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    subject: "Secretary",
    intro: "Education is the most powerful tool to shape minds, build character, and inspire a brighter future.",
  },
  {
    name: "Mr. Abdul Khalik",
    img: "https://images.unsplash.com/photo-1577880216142-8549e9488dad?ixlib=rb-1.2.1&auto=format&fit=crop&w=300&q=80",
    subject: "Teacher",
    intro: "A great teacher ignites a passion for learning and guides students toward their full potential.",
  },
];

export default function TeacherIntro() {
  const containerRef = useRef();
  const headingRef = useRef();
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Heading animation
      gsap.from(headingRef.current, {
        duration: 1.5,
        y: -50,
        opacity: 0,
        ease: "power3.out",
      });

      // Cards animation with ScrollTrigger
      cardsRef.current.forEach((card, index) => {
        gsap.from(card, {
          duration: 1,
          y: 100,
          opacity: 0,
          delay: index * 0.2,
          ease: "back.out(1.7)",
          scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none none",
          },
        });

        // Hover animation
        gsap.to(card, {
          scale: 1.05,
          duration: 0.3,
          paused: true,
          ease: "power1.out",
          onComplete: () => {
            gsap.to(card.querySelector(".teacher-img"), {
              y: -10,
              duration: 0.3,
            });
          },
        });

        card.addEventListener("mouseenter", () => {
          gsap.to(card, { scale: 1.05 }).play();
        });
        card.addEventListener("mouseleave", () => {
          gsap.to(card, { scale: 1 }).play();
          gsap.to(card.querySelector(".teacher-img"), { y: 0 });
        });
      });

      // Background elements animation
      const bgElements = gsap.utils.toArray(".bg-element");
      bgElements.forEach((el, i) => {
        gsap.from(el, {
          duration: 1.5,
          scale: 0,
          opacity: 0,
          delay: i * 0.3,
          ease: "elastic.out(1, 0.5)",
        });
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <div className="relative overflow-hidden bg-gradient-to-br from-blue-50 to-indigo-50 py-20" ref={containerRef}>
      {/* Decorative education-themed elements */}
      <div className="absolute top-10 left-10 w-16 h-16 bg-yellow-400 rounded-full bg-element opacity-20"></div>
      <div className="absolute bottom-20 right-10 w-24 h-24 bg-blue-400 rounded-lg bg-element opacity-20 rotate-45"></div>
      <div className="absolute top-1/3 right-1/4 w-12 h-12 bg-green-400 rounded-full bg-element opacity-20"></div>
      <div className="absolute bottom-1/4 left-1/4 w-20 h-20 bg-red-400 rounded-lg bg-element opacity-20 -rotate-12"></div>

      {/* Book icon decoration */}
      <svg 
        className="absolute top-1/4 left-1/6 w-12 h-12 text-blue-300 bg-element" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round"
      >
        <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"></path>
        <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"></path>
      </svg>

      <div className="container mx-auto px-4">
        {/* Section Heading */}
        <div className="text-center mb-16" ref={headingRef}>
          <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4 font-serif">
            Meet Our <span className="text-blue-600">Faculties</span>
          </h2>
          <div className="w-24 h-1 bg-blue-500 mx-auto mb-6"></div>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Our dedicated team of educators is committed to nurturing young minds and shaping the future.
          </p>
        </div>

        {/* Teacher Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 px-4">
          {teacherIntroductions.map((teacher, index) => (
            <div
              key={index}
              ref={el => cardsRef.current[index] = el}
              className="teacher-card bg-white rounded-xl shadow-xl overflow-hidden transform transition-all duration-300 hover:shadow-2xl"
            >
              <div className="p-6">
                <div className="flex justify-center mb-4">
                  <img
                    src={teacher.img}
                    alt={teacher.name}
                    className="teacher-img w-32 h-32 object-cover rounded-full border-4 border-blue-100 shadow-md transition-all duration-300"
                  />
                </div>
                <div className="text-center">
                  <h3 className="text-2xl font-bold text-gray-800 mb-1">{teacher.name}</h3>
                  <span className="inline-block px-3 py-1 text-sm font-semibold text-blue-600 bg-blue-100 rounded-full mb-4">
                    {teacher.subject}
                  </span>
                  <p className="text-gray-600 mb-4">{teacher.intro}</p>
                </div>
              </div>
              <div className="px-6 py-4 bg-gray-50 border-t border-gray-100">
                <button className="w-full py-2 px-4 bg-blue-500 hover:bg-blue-600 text-white font-medium rounded-lg transition-colors duration-300">
                  View Profile
                </button>
              </div>
            </div>
          ))}
        </div>

        {/* Decorative graduation cap */}
        <svg 
          className="absolute bottom-10 right-1/6 w-16 h-16 text-indigo-300 bg-element" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round"
        >
          <path d="M22 10v6M2 10l10-5 10 5-10 5z"></path>
          <path d="M6 12v5c3 3 9 3 12 0v-5"></path>
        </svg>
      </div>
    </div>
  );
}