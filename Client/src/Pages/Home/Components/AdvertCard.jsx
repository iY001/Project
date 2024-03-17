import React from 'react'
import { Link } from 'react-router-dom'

function AdvertCard() {
    return (
        <>
            <div className='w-full bg-[#DE4232] bg-opacity-10 flex justify-center items-center py-12 '>
                <div className='lg:w-[50%] w-[80%] flex py-24 flex-col items-center text-center bg-main bg-opacity-80 rounded-xl'>
                    <h1 className='text-white text-3xl font-bold'>Elevate Your Tournaments</h1>
                    <p className='my-4 text-white text-opacity-80'>with Win-it: A Comprehensive Solution for Seamless Event Creation and Management.</p>
                    <Link to={"/signup"} className='bg-white text-main px-12 py-2 rounded-md mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>Explore</Link>
                </div>
            </div>
        </>
    )
}

export default AdvertCard