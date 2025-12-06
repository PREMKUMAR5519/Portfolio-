import React, { useState } from 'react'
import { ArrowUpRight } from 'lucide-react'
import AboutMe from './AboutMe'
import AboutExperience from './AboutExperience'
import AboutSkills from './AboutSkills'
import AboutEducation from './AboutEducation'

function About() {
    const [currentAbout, setCurrentAbout] = useState(0)

    function handleChangestate(val) {
        setCurrentAbout(val)
    }

    return (
        <div className='about-main'>
            <div className='about-container desktop'>
                <div className='left'>
                    <div className='headings-main'>
                        <h5>About Me</h5>
                        <h6>All over my details find here</h6>
                    </div>
                    <section className={`${currentAbout === 0 ? 'active' : ''}`} onClick={() => { handleChangestate(0) }}>About Me <ArrowUpRight /></section>
                    <section className={`${currentAbout === 1 ? 'active' : ''}`} onClick={() => { handleChangestate(1) }}>Experience <ArrowUpRight /></section>
                    <section className={`${currentAbout === 2 ? 'active' : ''}`} onClick={() => { handleChangestate(2) }}>Education <ArrowUpRight /></section>
                    <section className={`${currentAbout === 3 ? 'active' : ''}`} onClick={() => { handleChangestate(3) }}>Skill <ArrowUpRight /></section>
                </div>
                <div className='right'>
                    {currentAbout === 0 && <AboutMe />}
                    {currentAbout === 1 && <AboutExperience />}
                    {currentAbout === 2 && <AboutEducation />}
                    {currentAbout === 3 && <AboutSkills />}
                </div>
            </div>
           


           {/* ///mobile container */}

            <div className='about-container mobile'>
                <div className='left'>
                    <div className='headings-main'>
                        <h5>About Me</h5>
                        <h6>All over my details find here</h6>
                    </div>
                </div>
                <div className='right'>
                    <AboutMe />
                    <AboutExperience />
                    <AboutEducation />
                    
                    <AboutSkills />
                </div>
            </div>
        </div>
    )
}

export default About
