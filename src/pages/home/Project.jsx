import React, { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    {
        name: 'AI Ignite',
        client: 'SMVEC - National AI Hackathon',
        image: '/assets/images/projects/aiignite.png',
        mobile: null,
        live: 'https://aiignite.smvec.ac.in',
        year: '2026',
        type: 'Event platform',
        accent: '#00d7c5',
    },
    {
        name: 'Parks & Beyond',
        client: 'SMVEC Agriculture',
        image: '/assets/images/projects/agri.png',
        mobile: null,
        live: 'https://agri.smvec.ac.in',
        year: '2026',
        type: 'Institution site',
        accent: '#089e90',
    },
    {
        name: 'Takshashila',
        client: 'Takshashila Medical College',
        image: '/assets/images/projects/takshashila.png',
        mobile: null,
        live: 'https://takshashilamedicalcollege.com',
        year: '2025',
        type: 'College website',
        accent: '#37429c',
    },
    {
        name: 'SMV Super Speciality',
        client: 'SMV Hospitals',
        image: '/assets/images/projects/smvhospitals.png',
        mobile: null,
        live: 'https://smvhospitals.com',
        year: '2025',
        type: 'Healthcare web',
        accent: '#c43e6b',
    },
    {
        name: 'MediaHub',
        client: 'SMVEC Media',
        image: '/assets/images/projects/media.png',
        mobile: null,
        live: 'https://media.smvec.ac.in',
        year: '2025',
        type: 'Media portal',
        accent: '#e7a221',
    },
    {
        name: 'Arts & Science',
        client: 'SMVEC Arts',
        image: '/assets/images/projects/arts.png',
        mobile: null,
        live: 'https://arts.smvec.ac.in',
        year: '2025',
        type: 'Academic site',
        accent: '#37429c',
    },
]

const domainOf = (url) => {
    try {
        return new URL(url).host.replace(/^www\./, '')
    } catch {
        return url
    }
}

function Project() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add(
                {
                    reduce: '(prefers-reduced-motion: reduce)',
                    small: '(max-width: 900px)',
                    large: '(min-width: 901px)',
                },
                (context) => {
                    const { reduce, small } = context.conditions

                    if (reduce) return

                    gsap.fromTo(
                        '.work-heading',
                        { yPercent: 18 },
                        {
                            yPercent: -14,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 0.8,
                            },
                        }
                    )

                    gsap.from('.work-pin-kicker, .work-pin-count', {
                        opacity: 0,
                        y: 18,
                        duration: 0.8,
                        stagger: 0.08,
                        ease: 'power3.out',
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 72%',
                        },
                    })

                    gsap.utils.toArray('.work-item').forEach((item, i) => {
                        const reveal = gsap.timeline({
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 85%',
                            },
                        })

                        reveal
                            .from(item.querySelector('.work-media'), {
                                opacity: 0,
                                y: 26,
                                scale: 0.96,
                                filter: 'blur(18px)',
                                duration: 1.15,
                                ease: 'power3.out',
                                clearProps: 'filter',
                            })
                            .from(
                                item.querySelector('.work-meta'),
                                {
                                    opacity: 0,
                                    y: 24,
                                    duration: 0.7,
                                    ease: 'power3.out',
                                },
                                '-=0.68'
                            )

                        const depth = (i % 2 === 0 ? 48 : 84) * (small ? 0.4 : 1)
                        gsap.fromTo(
                            item.querySelector('.work-media'),
                            { y: depth },
                            {
                                y: -depth,
                                ease: 'none',
                                scrollTrigger: {
                                    trigger: item,
                                    start: 'top bottom',
                                    end: 'bottom top',
                                    scrub: 0.6,
                                },
                            }
                        )
                    })
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className='work-main' ref={sectionRef} id='work'>
            <div className='work-pin'>
                <span className='work-pin-kicker'>Selected case studies</span>
                <h2 className='work-heading'>Recent works</h2>
                <span className='work-pin-count'>{projects.length} live builds</span>
            </div>

            <div className='work-list'>
                {projects.map((project, i) => {
                    const domain = domainOf(project.live)

                    return (
                        <a
                            className='work-item'
                            key={project.name}
                            href={project.live}
                            target='_blank'
                            rel='noreferrer'
                            style={{ '--work-accent': project.accent }}
                            aria-label={`${project.name} - ${project.client} (opens ${domain})`}>
                            <div className='work-media'>
                                <div className='work-browser' aria-hidden='true'>
                                    <div className='work-browser-bar'>
                                        <span className='work-browser-dots'>
                                            <i />
                                            <i />
                                            <i />
                                        </span>
                                        <span className='work-browser-url'>
                                            <i className='work-browser-lock' />
                                            {domain}
                                        </span>
                                        <span className='work-browser-actions'>
                                            <i />
                                            <i />
                                        </span>
                                    </div>
                                    <div className='work-browser-screen'>
                                        <img
                                            className='work-img'
                                            src={project.image}
                                            alt=''
                                            loading='lazy' />
                                    </div>
                                </div>

                                <div className={`work-phone${project.mobile ? '' : ' is-placeholder'}`} aria-hidden='true'>
                                    <span className='work-phone-punch' />
                                    <div className='work-phone-screen'>
                                        <img
                                            src={project.mobile || project.image}
                                            alt=''
                                            loading='lazy' />
                                    </div>
                                </div>
                            </div>

                            <div className='work-meta'>
                                <span className='work-index'>{String(i + 1).padStart(2, '0')}</span>
                                <div className='work-meta-text'>
                                    <span className='work-eyebrow'>{project.type} / {project.year}</span>
                                    <h3 className='work-title'>{project.name}</h3>
                                    <p className='work-client'>{project.client}</p>
                                </div>
                                <span className='work-visit'>
                                    View
                                    <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden='true' />
                                </span>
                            </div>
                        </a>
                    )
                })}
            </div>
        </section>
    )
}

export default Project
