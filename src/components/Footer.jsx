import React from 'react'
import { FiLinkedin, FiInstagram } from 'react-icons/fi'

// TODO: replace with the real profile URLs.
const LINKEDIN_URL = 'https://www.linkedin.com/in/premkumar-ananthan'
const INSTAGRAM_URL = 'https://www.instagram.com/premkumar'

function Footer() {
    return (
        <footer className='site-footer'>
            <div className='site-footer-inner'>
                <p className='site-footer-copy'>
                    &copy; {new Date().getFullYear()} Premkumar Ananthan
                </p>
                <div className='site-footer-socials'>
                    <a href={LINKEDIN_URL} target='_blank' rel='noreferrer' aria-label='LinkedIn'>
                        <FiLinkedin />
                    </a>
                    <a href={INSTAGRAM_URL} target='_blank' rel='noreferrer' aria-label='Instagram'>
                        <FiInstagram />
                    </a>
                </div>
            </div>
        </footer>
    )
}

export default Footer
