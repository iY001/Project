import React from 'react'
import FeatureCard from './FeatureCard'

function Guides() {
  return (
    <>
      <div id='features' className="lg:w-full md:w-full bg-gray-50 flex flex-col lg:flex-nowrap flex-wrap text-center py-10 px-6">
        <section className="text-center">
          <h1 className="text-3xl mb-4 font-bold text-main">
            Features
          </h1>
          <p className="lg:w-[60%] text-lg mx-auto">
            The Tournament and Event Management Web Application is a comprehensive platform designed to facilitate the seamless organization, management, and analysis of tournaments and events for various sports and gaming activities.
          </p>
        </section>

        <section className="lg:w-[90%] w-full mx-auto flex lg:flex-row flex-col justify-center">
          <FeatureCard />
        </section>
      </div>
    </>
  )
}

export default Guides