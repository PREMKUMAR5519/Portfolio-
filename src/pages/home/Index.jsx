import React from 'react'
import Hero from './Hero'
import About from './About'
import Tools from './Tools'
import Project from './Project'
import MoreProjects from './MoreProjects'
import Cta from './Cta'
import Footer from '../../components/Footer'
import Navbar from '../../components/Navbar'

function Index() {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
      <Tools />
      <Project />
      <MoreProjects />
      <div className='footer-glow-wrap'>
        <Cta />
        <Footer />
      </div>
    </>
  )
}

export default Index
