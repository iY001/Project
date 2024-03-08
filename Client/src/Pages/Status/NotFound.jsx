import React from 'react'
import { Link } from 'react-router-dom'

function NotFound() {
  return (
    <>
      <div className='w-full min-h-screen bg-gray-200 flex justify-center items-center text-center pb-36'>
        <section className='flex flex-col items-center text-center justify-center'>
          <h1 className='text-9xl text-main font-bold font-[Poppins] mx-12'> 404</h1>
          <h1 className='text-2xl text-main font-bold font-[Poppins] mx-12 my-4'> Page Not Found</h1>
          <h1 className='text-2xl text-gray-400 font-base font-[Poppins] mx-12'> The Page you're looking for does not seem to exist</h1>

          <Link to={'/'} className='text-white font-bold font-[Poppins] mx-12 my-4 py-2 px-6 bg-main hover:bg-opacity-85 '>Back to Home</Link>
        </section>
      </div>
    </>
  )
}

export default NotFound