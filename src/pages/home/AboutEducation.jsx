import React from 'react'

const education = [
    {
        school: 'Sri Venkateshwaraa College of Engineering and Technology, Puducherry',
        degree: 'B.Tech in Mechanical Engineering',
        period: '2019 – 2023',
        notes: 'Graduated with 7.71 CGPA.',
        tint: 'sky',
    },
]

function AboutEducation() {
    return (
        <div className='workgrid'>
            <h3 className='workgrid-heading'>Education</h3>

            <div className='workgrid-row'>
                {education.map((item) => (
                    <article
                        className={`workcard workcard--${item.tint}`}
                        key={item.school}>
                        <h4 className='workcard-title'>{item.degree}</h4>
                        <p className='workcard-period'>{item.period}</p>
                        <hr className='workcard-rule' />
                        <h5 className='workcard-role'>{item.school}</h5>
                        <p className='workcard-text'>{item.notes}</p>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default AboutEducation
