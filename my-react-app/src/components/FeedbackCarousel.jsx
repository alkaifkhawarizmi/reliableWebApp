import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const studentFeedback = [
  {
    name: "Rahul Sharma",
    img: "https://via.placeholder.com/150",
    feedback: "The course was amazing! I learned so many new concepts and gained hands-on experience.",
  },
  {
    name: "Ananya Gupta",
    img: "https://via.placeholder.com/150",
    feedback: "The teaching style was excellent, and the projects helped me understand real-world applications.",
  },
  {
    name: "Aarav Mehta",
    img: "https://via.placeholder.com/150",
    feedback: "I loved the interactive sessions and the support provided throughout the course.",
  },
];

export default function FeedbackCarousel() {
  const containerRef = useRef();

  useEffect(() => {
    const ctx = gsap.context(() => {
      const feedbackCards = gsap.utils.toArray(".feedback-card");

      gsap.to(feedbackCards, {
        scale: 1.2, // Larger cards in the center
        opacity: 1,
        duration: 1.5,
        xPercent: -10 * (feedbackCards.length - 1),
        stagger: {
          amount: 4, // Controls the animation stagger effect
        },
        repeat: -1,
        ease: "power1.inOut",
        repeatDelay: 1,
      });
    }, containerRef);

    return () => ctx.revert(); // Clean up on unmount
  }, []);

  return (
    <div className="relative">
    <div
      className="overflow-hidden relative px-4 flex items-center justify-center h-[1300px] md:h-[600px] bg-gray-100"
      ref={containerRef}
    >
      <div className="flex md:gap-6 gap-24 md:flex-row flex-col items-center md:space-x-16">
        {studentFeedback.map((student, index) => (
          <div
            key={index}
            className="feedback-card ml-32 md:ml-20 flex-shrink-0 w-80 p-6 bg-white shadow-lg rounded-lg text-center transform scale-0 opacity-0"
          >
            <img
              src={student.img}
              alt={student.name}
              className="w-24 h-24 mx-auto rounded-full mb-4"
            />
            <h2 className="text-2xl font-bold">{student.name}</h2>
            <p className="text-lg text-blue-600">{student.feedback}</p>
          </div>
        ))}
      </div>
    </div>
    <div className="text-3xl md:ml-[28%] ml-[8%] pt-10 absolute top-0 mx-auto md:w-[600px]  font-bold text-gray-700">
        <span className="block w-[12ch] whitespace-nowrap overflow-hidden border-r-2 md:text-5xl text-center font-serif mb-20 border-black animate-typing">
        Student Testimonials !!!
        </span>
      </div>
    </div>
  );
}
