import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import zarif from "./assets/WhatsApp Image 2024-12-06 at 17.21.14_ed1a8712.jpg"

const teacherIntroductions = [
  {
    name: "Mr. Zarif Ahmed",
    img: zarif,
    subject: "Director",
    intro: "Leadership is not about being in charge; it's about taking care of those in your charge.",
  },
  {
    name: "Mr. Sharif Ahmed",
    img: "https://via.placeholder.com/150",
    subject: "Secratory",
    intro: "Education is the most powerful tool to shape minds, build character, and inspire a brighter future.",
  },
  {
    name: "Mr. Abdul Khalik",
    img: "https://via.placeholder.com/150",
    subject: "Teacher",
    intro: "A great teacher ignites a passion for learning and guides students toward their full potential.",
  },
];

export default function TeacherIntro() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const teacherCards = gsap.utils.toArray(".teacher-card");

      gsap.to(teacherCards, {
        scale: 1.2,
        opacity: 1,
        xPercent: -20 * (teacherCards.length - 1),
        stagger: 1.5,
        duration: 3,
        repeat: -1,
        ease: "power1.inOut",
      });
    }, containerRef);

    return () => ctx.revert(); // Clean up GSAP animations on unmount
  }, []);

  return (
    <div className="relative">
    <div
      className="overflow-hidden relative flex items-center justify-center md:h-[600px] h-[1300px]"
      ref={containerRef}
    >
      <div className="flex md:flex-row flex-col md:ml-52 ml-64 md:gap-20 gap-28 justify-between items-center  md:space-x-12">
        {teacherIntroductions.map((teacher, index) => (
          <div
            key={index}
            className="teacher-card flex-shrink-0 w-80 p-6 bg-white shadow-lg rounded-lg text-center transform opacity-0"
          >
            <img
              src={teacher.img}
              alt={teacher.name}
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold">{teacher.name}</h2>
            <h3 className="text-lg text-blue-600 mb-2">{teacher.subject}</h3>
            <p className="text-gray-700">{teacher.intro}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="text-3xl ml-[16%] md:ml-[28%] pt-10 absolute top-0 mx-auto md:w-[550px] font-bold text-gray-700">
        <span className="block w-[12ch] whitespace-nowrap overflow-hidden border-r-2 md:text-5xl text-center font-serif mb-20 border-black animate-typing">
        Meet Our Faculties !!!
        </span>
      </div>
    </div>
  );
}
