import React, { useEffect, useRef, useState } from 'react'
import { TfiWorld } from "react-icons/tfi";

function Project() {
    const ProjectData = [
        {
            name: "GEN - AI HACKATHON",
            desc: "I developed the complete digital ecosystem for AI IGNITE, a national-level AI hackathon with multi-stage participation. The platform includes secure authentication, dynamic team creation, invite links, mentor booking, and admin dashboards. I also designed all event visuals — banners, standees, UI layouts, and AI-driven creative assets. The system is fully scalable, performance-optimized, and supports participants from across India. This project showcases my ability to build end-to-end, production-ready event management platforms.",
            tags: ["Frontend", "Supabase", "React", "UI/UX"],
            image: "/assets/images/projects/aiignite.png"
        },
        {
            name: "SMV Super Speciality",
            desc: "I created a modern, clean, and trust-driven website for SMV Super Speciality Hospital, focusing on clarity, accessibility, and patient experience. The site features structured pages for departments, doctors, treatments, and service workflows. The UI follows a calm medical theme with responsive layouts across all devices. Backend architecture was planned for future integrations like appointment booking and digital records. This project highlights my capability in developing professional healthcare web platforms.",
            tags: ["Frontend", "Supabase", "React", "UI/UX"],
            image: "/assets/images/projects/smvhospitals.png"
        },
        {
            name: "Takshashila Medical college",
            desc: "I built the complete web presence for Takshashila Medical College, crafting a premium academic interface that reflects credibility and medical excellence. The website includes admissions details, program structure, faculty listings, laboratories, and infrastructure highlights. The design maintains a modern medical aesthetic with smooth navigation and optimized performance. The site is structured for future CMS expansion and content scalability. This project demonstrates my skill in academic branding, UI design, and full-stack web execution.",
            tags: ["Frontend", "Supabase", "React", "UI/UX"],
            image: "/assets/images/projects/takshashila.png"
        },
    ]

    const moreProjects = [
        {
            name: "Portfolio Revamp",
            desc: "Fresh take on personal branding with smoother navigation, stronger copy, and component-driven layouts built for speed.",
            tags: ["React", "Vite", "SCSS"],
            image: "/assets/images/projects/arts.png",
            url: "arts.smvec.ac.in",
            repo: "#",
            live: "#"
        },
        {
            name: "E-Commerce Concepts",
            desc: "Modular storefront concepts with cart flows, hero experiments, and product feature tiles focused on clarity and trust.",
            tags: ["UI/UX", "Wireframes", "Animations"],
            image: "/assets/images/projects/law.png",
            url: "law.smvec.ac.in",
            repo: "#",
            live: "#"
        },
        {
            name: "Analytics Dashboard",
            desc: "Responsive dashboard starter with focused widgets, clean typography, and quick-glance data cards for founders.",
            tags: ["Dashboard", "Tailwind", "Charts"],
            image: "/assets/images/projects/media.png",
            url: "media.smvec.ac.in",
            repo: "#",
            live: "#"
        },
        {
            name: "Landing Page Lab",
            desc: "A/B tested hero patterns, social proof layouts, and CTA experiments packaged into reusable sections.",
            tags: ["Copywriting", "Figma", "Marketing"],
            image: "/assets/images/projects/agri.png",
            url: "agri.smvec.ac.in",
            repo: "#",
            live: "#"
        },

    ]
    const [showMore, setShowMore] = useState(false)
    const cardRefs = useRef([])
    const moreRef = useRef(null)

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                entries.forEach((entry) => {
                    if (entry.isIntersecting) {
                        entry.target.classList.add('is-visible')
                        observer.unobserve(entry.target)
                    }
                })
            },
            { threshold: 0.75, rootMargin: '0px 0px -50px 0px' }
        )

        cardRefs.current.forEach((card) => {
            if (card) observer.observe(card)
        })

        return () => observer.disconnect()
    }, [])

    useEffect(() => {
        if (showMore && moreRef.current) {
            const el = moreRef.current
            const scrollTop = el.getBoundingClientRect().top + window.scrollY - 30
            window.requestAnimationFrame(() => {
                window.scrollTo({ top: scrollTop, behavior: 'smooth' })
            })
        }
    }, [showMore])

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('more-container')) {
            setShowMore(false)
        }
    }
    return (
        <div className='home-project-main'>

            <div className='headings-main'>
                <h5>Projects</h5>
                <h6>All over my details find here</h6>
            </div>
            {ProjectData.map((project, i) => (
                <div className='projects-card' ref={(el) => (cardRefs.current[i] = el)}>
                    <div className='left'>
                        <h3>{project.name}</h3>
                        <p>{project.desc}</p>
                        <div className='tags'>
                            {project.tags.map((tag, i) => (
                                <span key={i}>{tag}</span>
                            ))}

                        </div>
                    </div>
                    <div className='right'>
                        <img src={project.image} alt="" />
                    </div>
                </div>
            ))}

            <div className={`more-container ${showMore ? 'active' : ''}`} onClick={handleOverlayClick} ref={moreRef}>
                <div className='more-content' onClick={(e) => e.stopPropagation()}>
                    <div className='more-header'>
                        <div>
                            <p className='eyebrow'>More Projects</p>
                            <h4>Explore additional work samples</h4>
                            <span>Quick snapshots of experiments, concepts, and in-progress builds.</span>
                        </div>
                    </div>
                    <div className='more-grid'>
                        {moreProjects.map((item, i) => (
                            <div className='more-card' key={i}>
                                <div className='card-icons'>
                                    <a href={item.repo} target='_blank' rel='noreferrer' aria-label={`${item.name} GitHub`} className='icon-btn github'>
                                        <svg viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M12 .5C5.65.5.5 5.65.5 12a11.5 11.5 0 0 0 7.86 10.9c.58.11.79-.25.79-.55 0-.27-.01-1.16-.02-2.11-3.2.7-3.87-1.39-3.87-1.39-.52-1.31-1.28-1.66-1.28-1.66-1.05-.72.08-.7.08-.7 1.16.08 1.77 1.2 1.77 1.2 1.03 1.77 2.7 1.26 3.35.97.1-.75.4-1.26.72-1.55-2.55-.29-5.23-1.28-5.23-5.7 0-1.26.45-2.3 1.2-3.11-.12-.29-.52-1.45.11-3.02 0 0 .97-.31 3.18 1.19a11.07 11.07 0 0 1 5.8 0c2.2-1.5 3.17-1.19 3.17-1.19.64 1.57.24 2.73.12 3.02.75.81 1.2 1.85 1.2 3.11 0 4.43-2.69 5.4-5.25 5.68.41.36.77 1.08.77 2.18 0 1.58-.02 2.85-.02 3.24 0 .3.21.67.8.55A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z" />
                                        </svg>
                                    </a>
                                    <a href={item.live} target='_blank' rel='noreferrer' aria-label={`${item.name} Live Preview`} className='icon-btn external'>
                                        <svg viewBox="0 0 24 24" aria-hidden="true">
                                            <path d="M5 5.75A.75.75 0 0 1 5.75 5h5.5a.75.75 0 0 1 0 1.5h-3.69l9.22 9.22a.75.75 0 1 1-1.06 1.06L6.5 7.56v3.69a.75.75 0 0 1-1.5 0v-5.5Z" />
                                        </svg>
                                    </a>
                                </div>
                                <div className='more-card-head'>
                                    <div className='url-pill'>
                                        <span className='url-icon'>
                                            <TfiWorld />
                                        </span>
                                        <span className='url-text'>
                                            <span className='prefix'>HTTPS://</span>
                                            <span className='domain'>{item.url || 'example.com'}</span>
                                        </span>
                                    </div>
                                    {/* <h5>{item.name}</h5> */}
                                </div>
                                <div className='more-card-media-wrapper'>
                                    <div className='more-card-media'>
                                        <div className='browser-bar'>
                                            <span className='dot red'></span>
                                            <span className='dot amber'></span>
                                            <span className='dot green'></span>
                                        </div>
                                        <div className='screen-body'>
                                            <img src={item.image} alt={item.name} />
                                        </div>
                                    </div>
                                </div>

                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className='btn-container'>
                <button className='mybutton button-secondary' onClick={() => { setShowMore(!showMore) }}>{showMore ? 'View Less' : 'View More'}</button>
                <p>All over my projects find here</p>
            </div>
        </div>
    )
}

export default Project
