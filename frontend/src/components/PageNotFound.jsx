import React from 'react'
import { Link } from 'react-router-dom'

function PageNotFound() {
  return (
    <div className='flex items-center flex-col justify-center bg-[#F7F9FB] h-screen'>
      <img className='' src="https://cdn.dribbble.com/users/718859/screenshots/3267029/media/288dca6a18950d67040138304ba3837d.gif" alt="" />
      <Link to={"/"}>
      <button
      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-700"
    >
      Go Back
    </button>
    </Link>
    </div>
  )
}

export default PageNotFound