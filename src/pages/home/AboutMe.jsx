import React from 'react'

function AboutMe() {
    return (
        <div className='aboutme-main'>
            <p> Prem Kumar, MERN Stack Developer.

                <br />
                A builder of digital experiences, a shaper of seamless interfaces, and an architect of scalable backend systems. I craft products that reflect your vision, solve real problems, and deliver performance that truly matters. My code speaks clarity, my designs speak purpose, and my work is built to make people want to stay, explore, and return.</p>

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
