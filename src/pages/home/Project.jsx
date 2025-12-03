import React, { useEffect, useRef, useState } from 'react'
import { TfiWorld } from "react-icons/tfi";

function CardParticleField({ active, targetRect }) {
    const canvasRef = useRef(null)
    const particlesRef = useRef([])
    const animationRef = useRef(null)
    const sizeRef = useRef({ w: 0, h: 0 })

    useEffect(() => {
        const canvas = canvasRef.current
        if (!canvas || !canvas.parentElement) return
        const ctx = canvas.getContext('2d')

        const NUM = 200
        const SPEED = 0.08

        const resize = () => {
            const rect = canvas.parentElement.getBoundingClientRect()
            canvas.width = rect.width
            canvas.height = rect.height
            sizeRef.current = { w: rect.width, h: rect.height }
            initParticles()
            applyTargetRing()
        }

        const initParticles = () => {
            const { w, h } = sizeRef.current
            particlesRef.current = Array.from({ length: NUM }, () => {
                const x = Math.random() * w
                const y = Math.random() * h
                return {
                    x,
                    y,
                    baseX: x,
                    baseY: y,
                    tx: x,
                    ty: y
                }
            })
        }

        const applyTargetRing = () => {
            if (!targetRect) return
            const { x, y, width, height } = targetRect
            const margin = 24
            const ringCount = Math.min(90, particlesRef.current.length)

            for (let i = 0; i < ringCount; i++) {
                const p = particlesRef.current[i]
                const side = Math.floor(Math.random() * 4)
                let tx = p.baseX
                let ty = p.baseY

                if (side === 0) {
                    tx = x + Math.random() * width
                    ty = y - margin - Math.random() * 12
                } else if (side === 1) {
                    tx = x + width + margin + Math.random() * 12
                    ty = y + Math.random() * height
                } else if (side === 2) {
                    tx = x + Math.random() * width
                    ty = y + height + margin + Math.random() * 12
                } else {
                    tx = x - margin - Math.random() * 12
                    ty = y + Math.random() * height
                }

                p.tx = tx
                p.ty = ty
            }
        }

        const tick = () => {
            const { w, h } = sizeRef.current
            ctx.clearRect(0, 0, w, h)
            particlesRef.current.forEach((p, idx) => {
                const targetX = active && idx < 90 && targetRect ? p.tx : p.baseX
                const targetY = active && idx < 90 && targetRect ? p.ty : p.baseY
                p.x += (targetX - p.x) * SPEED
                p.y += (targetY - p.y) * SPEED

                ctx.beginPath()
                ctx.arc(p.x, p.y, 1.1, 0, Math.PI * 2)
                ctx.fillStyle = active ? 'rgba(0,0,0,0.38)' : 'rgba(0,0,0,0.18)'
                ctx.fill()
            })
            animationRef.current = requestAnimationFrame(tick)
        }

        resize()
        tick()
        const resizeObserver = new ResizeObserver(resize)
        resizeObserver.observe(canvas.parentElement)

        return () => {
            cancelAnimationFrame(animationRef.current)
            resizeObserver.disconnect()
        }
    }, [active, targetRect])

    useEffect(() => {
        if (!targetRect || !particlesRef.current.length) return
        const { x, y, width, height } = targetRect
        const margin = 24
        const ringCount = Math.min(90, particlesRef.current.length)

        for (let i = 0; i < ringCount; i++) {
            const p = particlesRef.current[i]
            const side = Math.floor(Math.random() * 4)
            let tx = p.baseX
            let ty = p.baseY

            if (side === 0) {
                tx = x + Math.random() * width
                ty = y - margin - Math.random() * 12
            } else if (side === 1) {
                tx = x + width + margin + Math.random() * 12
                ty = y + Math.random() * height
            } else if (side === 2) {
                tx = x + Math.random() * width
                ty = y + height + margin + Math.random() * 12
            } else {
                tx = x - margin - Math.random() * 12
                ty = y + Math.random() * height
            }

            p.tx = tx
            p.ty = ty
        }
    }, [targetRect])

    return <canvas ref={canvasRef} className='project-particles' />
}

function Project() {
    const ProjectData = [
        {
            name: "GEN - AI HACKATHON",
            desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web",
            tags: ["Frontend", "Supabase", "React", "UI/UX"],
            image: "/assets/images/projects/aiignite.png"
        },
        {
            name: "SMV Super Speciality",
            desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web",
            tags: ["Frontend", "Supabase", "React", "UI/UX"],
            image: "/assets/images/projects/smvhospitals.png"
        },
        {
            name: "Takshashila Medical college",
            desc: "It is a long established fact that a reader will be distracted by the readable content of a page when looking at its layout. The point of using Lorem Ipsum is that it has a more-or-less normal distribution of letters, as opposed to using 'Content here, content here', making it look like readable English. Many desktop publishing packages and web",
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
    const [hoverIndex, setHoverIndex] = useState(-1)
    const [hoverRect, setHoverRect] = useState(null)
    const cardRefs = useRef([])
    const imageRefs = useRef([])

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

    const handleOverlayClick = (e) => {
        if (e.target.classList.contains('more-container')) {
            setShowMore(false)
        }
    }
    return (
        <div className='home-project-main'>
            {showMore && (
                <div className={`more-container ${showMore ? 'active' : ''}`} onClick={handleOverlayClick}>
                    <div className='more-content' onClick={(e) => e.stopPropagation()}>
                        <div className='more-header'>
                            <div>
                                <p className='eyebrow'>More Projects</p>
                                <h4>Explore additional work samples</h4>
                                <span>Quick snapshots of experiments, concepts, and in-progress builds.</span>
                            </div>
                            <button className='mybutton button-secondary' onClick={() => { setShowMore(false) }}>X</button>
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
                                                <TfiWorld/>
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
            )}
            <div className='headings-main'>
                <h5>Projects</h5>
                <h6>All over my details find here</h6>
            </div>
            {ProjectData.map((project, i) => (
                <div
                    className='projects-card'
                    ref={(el) => (cardRefs.current[i] = el)}
                    onMouseEnter={() => {
                        setHoverIndex(i)
                        const imgEl = imageRefs.current[i]
                        const cardEl = cardRefs.current[i]
                        if (imgEl && cardEl) {
                            const imgRect = imgEl.getBoundingClientRect()
                            const cardRect = cardEl.getBoundingClientRect()
                            setHoverRect({
                                x: imgRect.left - cardRect.left,
                                y: imgRect.top - cardRect.top,
                                width: imgRect.width,
                                height: imgRect.height
                            })
                        }
                    }}
                    onMouseLeave={() => {
                        setHoverIndex(-1)
                        setHoverRect(null)
                    }}
                    key={project.name}
                >
                    <CardParticleField active={hoverIndex === i} targetRect={hoverRect} />
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
                        <div className='project-media' ref={(el) => (imageRefs.current[i] = el)}>
                            <img src={project.image} alt={project.name} />
                        </div>
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
