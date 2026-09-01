import React, { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// `mobile` is the phone-mockup screenshot. Until one exists for a project it
// is null and the desktop screenshot is shown cropped in the phone instead —
// drop a portrait screenshot in and set the path to swap it.
const projects = [
    { name: 'AI Ignite', client: 'SMVEC — National AI Hackathon', image: '/assets/images/projects/aiignite.png', mobile: null, live: 'https://aiignite.smvec.ac.in' },
    { name: 'Parks & Beyond', client: 'SMVEC Agriculture', image: '/assets/images/projects/agri.png', mobile: null, live: 'https://agri.smvec.ac.in' },
    { name: 'Takshashila', client: 'Takshashila Medical College', image: '/assets/images/projects/takshashila.png', mobile: null, live: 'https://takshashilamedicalcollege.com' },
    { name: 'SMV Super Speciality', client: 'SMV Hospitals', image: '/assets/images/projects/smvhospitals.png', mobile: null, live: 'https://smvhospitals.com' },
    { name: 'MediaHub', client: 'SMVEC Media', image: '/assets/images/projects/media.png', mobile: null, live: 'https://media.smvec.ac.in' },
    { name: 'Arts & Science', client: 'SMVEC Arts', image: '/assets/images/projects/arts.png', mobile: null, live: 'https://arts.smvec.ac.in' },
]

const domainOf = (url) => {
    try {
        return new URL(url).host
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

                    // Reduced motion: no animation, content simply shows.
                    if (reduce) return

                    // The giant pinned heading drifts slowly upward while the
                    // cards stream over it, so the two layers read as depths.
                    gsap.fromTo(
                        '.work-heading',
                        { yPercent: 18, opacity: 0.6 },
                        {
                            yPercent: -14,
                            opacity: 1,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: sectionRef.current,
                                start: 'top bottom',
                                end: 'bottom top',
                                scrub: 0.8,
                            },
                        }
                    )

                    gsap.utils.toArray('.work-item').forEach((item, i) => {
                        // Reveal: the whole mockup (panel + devices) sharpens
                        // out of a blur as it fades in, then the text follows.
                        // No per-device motion; `y` stays owned by the
                        // parallax tween below, and the blur is cleared once
                        // done so the panel isn't left with a filter applied.
                        const reveal = gsap.timeline({
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 85%',
                            },
                        })
                        reveal
                            .from(item.querySelector('.work-media'), {
                                opacity: 0,
                                filter: 'blur(18px)',
                                duration: 1.2,
                                ease: 'power2.out',
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
                                '-=0.7'
                            )

                        // Parallax: scrubbed drift tied to scroll position, so
                        // each card glides past the pinned heading at its own
                        // pace. Alternating depths keep the stream from moving
                        // as one rigid block.
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
        <section className='work-main' ref={sectionRef}>
            {/* Sticky full-viewport layer: the heading stays put while the
                card list (pulled up over it with a -100vh margin) scrolls by. */}
            <div className='work-pin'>
                <h2 className='work-heading'>Recent works</h2>
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
                            aria-label={`${project.name} — ${project.client} (opens ${domain})`}>
                            <div className='work-media'>
                                {/* Desktop: browser window */}
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

                                {/* Mobile: phone. Falls back to the desktop
                                    screenshot (cropped) until a mobile one exists. */}
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
                                    <h3 className='work-title'>{project.name}</h3>
                                    <p className='work-client'>{project.client}</p>
                                </div>
                                <span className='work-visit'>
                                    Visit site
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
