import React from 'react'
import AboutMe from './AboutMe'
import AboutExperience from './AboutExperience'

function About() {
    return (
        <div className='about-main'>
            <div className='about-stack'>
                <div className='headings-main'>
                    <h5>About Me</h5>
                    <h6>All over my details find here</h6>
                </div>

                <AboutMe />
                <AboutExperience />
            </div>
        </div>
    )
}

export default About
