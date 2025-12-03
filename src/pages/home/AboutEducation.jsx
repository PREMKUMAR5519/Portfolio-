import React from 'react'
import { HiOutlineAcademicCap } from 'react-icons/hi'
import { CiCalendar } from 'react-icons/ci'

function AboutEducation() {
    const education = [
        {
            school: 'Sri venkateshwaraa college of engineering and technologys, Puducherry',
            degree: 'B.Tech in Mechanical Engineering',
            period: '2019 - 2023',
            notes: '7.71 CGPA'
        },
     
    ]

    return (
        <div className='myeducation'>
            <h3 className='myeducation-heading'>Education</h3>
            <div className='myeducation-list'>
                {education.map((item) => (
                    <div className='myeducation-card' key={item.school}>
                        <div className='myeducation-icon'>
                            <HiOutlineAcademicCap />
                        </div>
                        <div className='myeducation-body'>
                            <div className='myeducation-top'>
                                <h4>{item.degree}</h4>
                                <div className='myeducation-period'>
                                    <CiCalendar />
                                    <span>{item.period}</span>
                                </div>
                            </div>
                            <h5>{item.school}</h5>
                            <p>{item.notes}</p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default AboutEducation
