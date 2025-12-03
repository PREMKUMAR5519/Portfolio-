import React from 'react'
import { Background } from './Background'



function autoscroll(){
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
                <h3>Hi I'm <span className='highlight'>Premkumar</span><br />Website Developer <br />with Full Stack Expertise.</h3>
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
