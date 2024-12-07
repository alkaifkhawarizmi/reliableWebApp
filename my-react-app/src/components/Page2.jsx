import React from 'react'
import { Link } from "react-router-dom";

function Page2() {
  return (
    <div className='relative'>
    <div className='mt-10 text-xl text-gray-500 font-medium md:pl-12 pl-4 w-full overflow-hidden leading-relaxed'>
      <h1 className='text-2xl font-medium text-blue-500'>Inspiring Young Minds, Shaping Bright Futures !</h1>
      <h1 className='text-5xl font-semibold text-gray-800 mt-4'>Reliable Public School , Suket</h1>
      <div className='md:pl-14 pl-6 pr-2'>
      <div className='relative'>
      <div className="absolute w-3 h-3  bg-gray-600 rounded-full top-16 left-[-24px]"></div>
      <p className='mt-8 relative'> <span className='text-2xl text-gray-800 mb-4 pb-4'>At Reliable Public School,</span> <br /> we are dedicated to creating a vibrant and nurturing environment where students can excel academically, socially, and creatively. <br /> Our mission is to provide a well-rounded education that prepares young minds for the challenges of tomorrow while fostering a lifelong love for learning.</p>
      </div>
      <div className='relative'>
      <div className="absolute w-3 h-3 bg-gray-600 rounded-full top-12 left-[-24px]"></div>
      <p className='mt-4'>
      Our school is equipped with a high-tech computer lab featuring the latest hardware and software, enabling students to explore the world of technology and coding from a young age. We believe in staying ahead of the curve by integrating modern educational tools and techniques to ensure our students receive a cutting-edge learning experience.
      </p>
      </div>
      <div className='relative'>
      <div className="absolute w-3 h-3  bg-gray-600 rounded-full top-8 left-[-24px]"></div>
      <p className='mt-4'>
      For our budding scientists, we have fully equipped science labs where curiosity meets innovation. Our spacious library is a treasure trove of knowledge, stocked with a wide range of books, e-resources, and study materials to encourage a habit of reading and research.
      </p>
      </div>
      <div className='relative'>
      <div className="absolute w-3 h-3  bg-gray-600 rounded-full top-12 left-[-24px]"></div>
      <p className='mt-4'>
      We understand the importance of physical activity and holistic development, which is why our campus includes a large playground, facilities for various sports, and a dedicated area for yoga and fitness activities. Our extracurricular programs include music, dance, art, and drama, allowing students to explore their talents and passions beyond the classroom.
      </p>
      </div>
      <div className='relative'>
      <div className="absolute w-3 h-3  bg-gray-600 rounded-full top-6 left-[-24px]"></div>
      <p className='mt-4'>
      To ensure our students grow in a safe and secure environment, we have implemented advanced safety measures, including CCTV surveillance and trained staff members who are always ready to assist. Our dedicated teachers are not just educators but mentors who work tirelessly to bring out the best in every child.
      </p>
      </div>
      <div className='relative'>
      <div className="absolute w-3 h-3  bg-gray-600 rounded-full top-12 left-[-24px]"></div>
      <p className='mt-4'>
      At Reliable Public School, we are committed to fostering a strong sense of community, respect, and responsibility among our students. Whether it's through innovative teaching methods, fun learning activities, or skill-building programs, we aim to create confident, compassionate, and capable individuals who are ready to make a positive impact on the world.
      </p>
      </div>
      </div>
    </div>
    <Link to="/addmissions">
    <button className="absolute bottom-[-150px] right-28 md:right-20 px-12 py-6 text-white bg-blue-500 rounded-md shadow-md overflow-hidden group">
  <span className="absolute inset-0 w-0 bg-blue-700 transition-all duration-300 ease-out group-hover:w-full"></span>
  <span className="relative z-10 text-2xl font-semibold">Contact Us</span>
</button>
</Link>
    </div>
  )
}

export default Page2