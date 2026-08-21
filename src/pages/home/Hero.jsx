import React from 'react'
import { Background } from './Background'



function autoscroll() {
    if (window.lenis) {
        window.lenis.scrollTo(1350)
        return
    }
    window.scroll({
        top: 1350,
        left: 0,
        behavior: 'smooth'
    });
}
function Hero() {
    return (
        <div className='hero-main'>
            <Background />
            <div className='container'>
                <p className='hero-eyebrow'>Hi, I'm Premkumar</p>
                <h1 className='hero-title'>
                    I'm a <span className='hero-gradient'>full stack</span><br />
                    software developer.
                </h1>
                <p className='hero-subtitle'>
                    I design and build fast, accessible websites &mdash; from pixel-perfect
                    interfaces to the APIs behind them.
                </p>
                <div className='hero-button-container'>
                    <button className='mybutton button-primary' onClick={()=>{window.open('/assets/resume/resume.pdf','_blank')}}>
                        View Resume
                    </button>
                    <button className='mybutton button-secondary' onClick={autoscroll}>
                        View Projects
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero
