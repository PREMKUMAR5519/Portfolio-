import React, { useState } from 'react'

function Project() {
    const ProjectData = ["", "", ""]
    const [showMore, setShowMore] = useState(false)
    return (
        <div className='home-project-main'>
            {showMore && (
                <div className='more-container'>

                </div>
            )}
            <div className='headings-main'>
                <h5>Projects</h5>
                <h6>All over my details find here</h6>
            </div>
            {ProjectData.map((project, i) => (
                <div className='projects-card'>
                    <div className='left'>
                        <h3>Hospitality projects</h3>
                        <p>It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web</p>
                        <div className='tags'>
                            <span>Frontend</span>
                            <span>Supabase</span>
                            <span>React</span>
                            <span>UI/UX</span>
                        </div>
                    </div>
                    <div className='right'>
                        <img src="/assets/images/projects/aiignite.png" alt="" />
                    </div>
                </div>
            ))}
            <div className='btn-container'>
                <button className='mybutton button-secondary' onClick={() => { setShowMore(true) }}>View More</button>
                <p>All over my projects find here</p>
            </div>
        </div>
    )
}

export default Project
