import React from 'react'

function Hero() {
    return (
        <>
            <div className='w-full flex items-center lg:flex-row-reverse flex-col'>
                <section className='lg:w-[50%]'>
                    <img className='object-cover w-full' src="assets/hero - bg.jpg" alt="" />
                </section>
                <section className='lg:w-[50%] lg:pl-24 lg:text-left text-center md:text-left'>
                    <h1 className='lg:text-6xl text-3xl my-6 font-bold lg:block md:flex'>
                        Outstanding Range of <p className='text-main lg:mx-0 md:mx-2'>activities</p> to enjoy
                    </h1>
                    <p className='lg:w-[50%] text-md text-[#222222]'>
                        Create Your Winning Bracket: Seamless Tournament Management for Every Game and Sport!
                    </p>
                    <div className='my-6 lg:text-left md:text-center'>
                        <button className='bg-main text-white px-12 py-2 rounded-md mr-4 shadow-lg focus:ring-2 ring-main ring-opacity-30'>Explore</button>
                        <button className='bg-white text-main px-12 py-2 rounded-md mr-4 shadow-lg focus:ring-4 ring-2 ring-main ring-opacity-30'>See More</button>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Hero