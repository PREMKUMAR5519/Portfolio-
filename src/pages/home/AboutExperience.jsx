import React from 'react'

const experience = [
    {
        company: 'SMVEC, Pondicherry',
        role: 'Website Developer',
        period: '2025 – Present',
        description:
            'Building and maintaining the institution\'s web presence — designing responsive interfaces, developing internal tools, and keeping content and performance in good shape.',
    },
    {
        company: 'Heyram Infrastructure, Chennai',
        role: 'Full Stack Developer',
        period: 'Apr 2024 – Dec 2024',
        description:
            'Created fully functional MERN stack web applications with responsive behaviour, smooth touch UI, and API integration.',
    },
]

function AboutExperience() {
    return (
        <div className='workgrid'>
            <h3 className='workgrid-heading'>Experience</h3>

            <div className='workgrid-list'>
                {experience.map((item) => (
                    <article className='workcard' key={item.company}>
                        <h4 className='workcard-title'>{item.company}</h4>
                        <p className='workcard-period'>{item.period}</p>
                        <hr className='workcard-rule' />
                        <h5 className='workcard-role'>{item.role}</h5>
                        <p className='workcard-text'>{item.description}</p>
                    </article>
                ))}
            </div>
        </div>
    )
}

export default AboutExperience
