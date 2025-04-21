import { useEffect, useRef } from "react";
import { gsap } from "gsap";

const studentFeedback = [
  {
    name: "Rahul Sharma",
    img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    feedback: "The teachers are incredibly supportive and the curriculum is well-structured. I've grown so much academically!",
    role: "Class 12 Science"
  },
  {
    name: "Ananya Gupta",
    img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    feedback: "The extracurricular activities complement our studies perfectly. Best school environment!",
    role: "Class 10"
  },
  {
    name: "Aarav Mehta",
    img: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    feedback: "The practical learning approach helped me understand concepts much better than just textbook learning.",
    role: "Class 8"
  },
  {
    name: "Priya Patel",
    img: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    feedback: "I love how the school encourages creative thinking and problem-solving skills in every subject.",
    role: "Class 11 Commerce"
  },
  {
    name: "Rohan Verma",
    img: "https://images.unsplash.com/photo-1552058544-f2b08422138a?ixlib=rb-4.0.3&auto=format&fit=crop&w=200&h=200&q=80",
    feedback: "The sports facilities and coaching have helped me excel in basketball while maintaining good grades.",
    role: "Class 9"
  }
];

export default function FeedbackCarousel() {
  const containerRef = useRef();
  const wrapperRef = useRef();
  const cardsRef = useRef([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Initial animation
      gsap.from(cardsRef.current, {
        y: 50,
        opacity: 0,
        stagger: 0.1,
        duration: 1,
        ease: "power2.out"
      });

      // Infinite scroll animation
      const cards = gsap.utils.toArray(".feedback-card");
      const totalWidth = cards[0].offsetWidth * cards.length;
      const duration = cards.length * 5; // Adjust speed here
      
      gsap.to(wrapperRef.current, {
        x: -totalWidth / 2, // Halfway through duplicates
        duration: duration,
        ease: "none",
        repeat: -1
      });

    }, containerRef);

    return () => ctx.revert();
  }, []);

  // Duplicate the cards for seamless looping
  const duplicatedFeedback = [...studentFeedback, ...studentFeedback];

  return (
    <div className="relative py-20 bg-gradient-to-b from-blue-50 to-white overflow-hidden">
      {/* Title Section */}
      <div className="text-center mb-16 px-4">
        <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
          <span className="text-blue-600">Student</span> Voices
        </h2>
        <p className="text-xl text-gray-600 max-w-2xl mx-auto">
          Hear what our students say about their learning journey
        </p>
      </div>

      {/* Carousel Container */}
      <div ref={containerRef} className="relative h-[420px] w-full overflow-hidden">
        {/* Cards Wrapper */}
        <div 
          ref={wrapperRef}
          className="absolute flex gap-8 h-full items-center px-4 md:px-8"
        >
          {duplicatedFeedback.map((student, index) => (
            <div
              key={`${student.name}-${index}`}
              ref={el => cardsRef.current[index] = el}
              className="feedback-card flex-shrink-0 w-[280px] md:w-[350px] p-6 bg-white rounded-xl shadow-lg hover:shadow-xl transition-all duration-300"
            >
              <div className="flex items-center mb-4">
                <img
                  src={student.img}
                  alt={student.name}
                  className="w-14 h-14 rounded-full object-cover mr-4 border-4 border-blue-100"
                />
                <div>
                  <h3 className="text-lg font-bold text-gray-800">{student.name}</h3>
                  <p className="text-sm text-blue-500">{student.role}</p>
                </div>
              </div>
              <p className="text-gray-600 italic mb-4">
                "{student.feedback}"
              </p>
              <div className="flex justify-end">
                <div className="text-yellow-400">
                  {[...Array(5)].map((_, i) => (
                    <span key={i} className="text-lg">★</span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Gradient Fades */}
      <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-blue-50 to-transparent z-10"></div>
      <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-blue-50 to-transparent z-10"></div>
    </div>
  );
}