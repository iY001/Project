import React from 'react'
import Navbar from '../../Components/Navbar'
import Hero from './Components/Hero'
import Guides from './Components/Guides'
import AdvertCard from './Components/AdvertCard'
import Footer from './Components/Footer'


function Home() {
  return (
    <>
      <Navbar />
      <Hero />
      <Guides />
      <AdvertCard />
      <Footer />
    </>
  )
}

export default Home