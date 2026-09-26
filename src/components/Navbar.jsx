import React from 'react'

const LINKEDIN_URL = 'https://www.linkedin.com/in/premkumar-ananthan'

function Navbar() {
    return (
        <nav className='pill-nav' aria-label='Primary'>
            <a href='/assets/resume/resume.pdf' target='_blank' rel='noreferrer' data-page-reveal>
                Resume
            </a>
            <a href={LINKEDIN_URL} target='_blank' rel='noreferrer' data-page-reveal>
                LinkedIn
            </a>
        </nav>
    )
}

export default Navbar
