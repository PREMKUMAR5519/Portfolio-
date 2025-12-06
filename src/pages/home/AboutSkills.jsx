import React, { useState } from 'react'

const topSkills = ["Frontend", "Backend", "DevOps", "Database", "Tools"]
const SkillList = [
    { name: "Bootstrap", category: "Frontend", icon: "/assets/images/skills/bootstrap.png" },
    { name: "CSS", category: "Frontend", icon: "/assets/images/skills/css.png" },
    { name: "ExpressJS", category: "Backend", icon: "/assets/images/skills/expressjs.png" },
    { name: "Figma", category: "Frontend", icon: "/assets/images/skills/figma.png" },
    { name: "GitHub", category: "Tools", icon: "/assets/images/skills/github.png" },
    { name: "GoDaddy", category: "DevOps", icon: "/assets/images/skills/godaddy.png" },
    { name: "Hostinger", category: "DevOps", icon: "/assets/images/skills/hostinger.png" },
    { name: "HTML", category: "Frontend", icon: "/assets/images/skills/html.png" },
    { name: "JavaScript", category: "Frontend", icon: "/assets/images/skills/javascript.png" },
    { name: "MongoDB", category: "Database", icon: "/assets/images/skills/mongodb.png" },
    { name: "MySQL", category: "Database", icon: "/assets/images/skills/mysql.png" },
    { name: "Next.js", category: "Frontend", icon: "/assets/images/skills/nextjs.png" },
    { name: "Node.js", category: "Backend", icon: "/assets/images/skills/nodejs.png" },
    { name: "Postman", category: "Tools", icon: "/assets/images/skills/postman.png" },
    { name: "ReactJS", category: "Frontend", icon: "/assets/images/skills/reactjs.png" },
    { name: "Sass", category: "Frontend", icon: "/assets/images/skills/sass.png" },
    { name: "Supabase", category: "Backend", icon: "/assets/images/skills/supabase.png" },
    { name: "Vercel", category: "DevOps", icon: "/assets/images/skills/vercel.png" }



]
function AboutSkills() {
    const [currentValue, setCurrentValue] = useState('')
    return (
        <div className='About-skills'>
            <h3 className="about-skills-heading">My Skills</h3>

            <div className='top-skills'>
                {topSkills?.map((skill, i) => <div onMouseEnter={() => { setCurrentValue(skill) }} onMouseLeave={() => setCurrentValue("")} key={i} className='skills'>{skill}</div>)}
            </div>
            <div className='container-skills'>
                {SkillList?.map((skill, i) => <div key={i} className={`skills ${skill.category === currentValue ? "active" : ""}`}><img src={skill.icon} alt="" />{skill.name}</div>)}
            </div>
        </div>
    )
}

export default AboutSkills
