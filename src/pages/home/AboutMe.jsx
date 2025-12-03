import React from 'react'

function AboutMe() {
    return (
        <div className='aboutme-main'>
            <p> Prem Kumar, Full-stack Website Developer

                <br />

                Specializing in building fast, modern, and user-centric web applications. With strong expertise in ReactJS, FastAPI, and cloud deployments, I create seamless digital experiences that are clean, scalable, and performance-driven. I combine technical development with creative problem-solving, working end-to-end across UI/UX, backend architecture, and deployment workflows to deliver reliable, production-ready solutions. Passionate about technology, design, and innovation, I focus on turning ideas into polished, impactful digital products.
            </p>

            <div className='personal-details'>
                <div className='rows'>
                    <span>Name</span>
                    <p>Premkumar Ananthan</p>
                </div>
                <div className='rows'>
                    <span>Phone</span>
                    <p>+91 6382688488</p>
                </div>
                <div className='rows'>
                    <span>Email</span>
                    <p>premkumarananthan1@gmail.com</p>
                </div>
            </div>
        </div>
    )
}

export default AboutMe
