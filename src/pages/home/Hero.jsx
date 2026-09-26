import React from 'react'

function autoscroll() {
    if (window.lenis) {
        window.lenis.scrollTo(1350)
        return
    }

    window.scroll({
        top: 1350,
        left: 0,
        behavior: 'smooth',
    })
}

function Hero() {
    return (
        <div className='hero-main'>
            <div className='container'>
                <p className='hero-eyebrow' data-page-reveal>Hi, I'm Premkumar</p>
                <h1 className='hero-title'>
                    <span className='hero-title-mask'>
                        <span data-page-reveal>I'm a <span className='hero-gradient'>full stack</span></span>
                    </span>
                    <span className='hero-title-mask'>
                        <span data-page-reveal>software developer.</span>
                    </span>
                </h1>
                <p className='hero-subtitle' data-page-reveal>
                    I design and build fast, accessible websites - from pixel-perfect
                    interfaces to the APIs behind them.
                </p>
                <div className='hero-button-container'>
                    <button
                        className='mybutton button-primary'
                        data-page-reveal
                        onClick={() => { window.open('/assets/resume/resume.pdf', '_blank') }}>
                        View Resume
                    </button>
                    <button className='mybutton button-secondary' data-page-reveal onClick={autoscroll}>
                        View Projects
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero
