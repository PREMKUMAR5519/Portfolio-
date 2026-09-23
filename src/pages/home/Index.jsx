import React from 'react'
import Hero from './Hero'
import About from './About'
import Tools from './Tools'
import Project from './Project'
import MoreProjects from './MoreProjects'
import CaseStudyPlayer from './CaseStudyPlayer'
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
      <section className='project-video' aria-labelledby='case-study-title'>
        <div className='project-video__heading'>
          <div>
            <p className='project-video__eyebrow'>Behind the build</p>
            <h2 id='case-study-title'>How I approach a problem.</h2>
          </div>
        </div>
        <CaseStudyPlayer />
      </section>
      <div className='footer-glow-wrap'>
        <Cta />
        <Footer />
      </div>
    </>
  )
}

export default Index
