import React from 'react'

function AboutMe() {
    return (
        <div className='aboutme-main'>
            <p>Mark Henry, Product Designer, based in German. That is where I come in. A lover of words, a wrangler of copy. Here to create copy that not only reflects who you are and what you stand for,
                <br />
                but words that truly land with those that read them, calling your audience in and making them want more.</p>

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
