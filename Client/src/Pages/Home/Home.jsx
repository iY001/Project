import React from 'react'
import Navbar from '../../Components/Navbar'
import Hero from './Components/Hero'
import Guides from './Components/Guides'
import AdvertCard from './Components/AdvertCard'


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Guides />
      <AdvertCard />
    </>
  )
}

export default Home