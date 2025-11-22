import React from 'react'
import { Background } from './Background'

function Hero() {
    return (
        <div className='hero-main'>
            <Background />
            <div className='container'>
                <h3>Hi I'm <span className='highlight'>Premkumar</span><br />Website Developer <br />with Full Stack Expertise.</h3>
                <div className='hero-button-container'>
                    <button className='mybutton button-primary'>
                        View Projects
                    </button>
                    <button className='mybutton button-secondary'>
                        View Projects
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero
