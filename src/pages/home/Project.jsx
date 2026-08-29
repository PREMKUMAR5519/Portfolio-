import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const projects = [
    { name: 'AI Ignite', client: 'SMVEC — National AI Hackathon', image: '/assets/images/projects/aiignite.png', live: 'https://aiignite.smvec.ac.in' },
    { name: 'Parks & Beyond', client: 'SMVEC Agriculture', image: '/assets/images/projects/agri.png', live: 'https://agri.smvec.ac.in' },
    { name: 'Takshashila', client: 'Takshashila Medical College', image: '/assets/images/projects/takshashila.png', live: 'https://takshashilamedicalcollege.com' },
    { name: 'SMV Super Speciality', client: 'SMV Hospitals', image: '/assets/images/projects/smvhospitals.png', live: 'https://smvhospitals.com' },
    { name: 'MediaHub', client: 'SMVEC Media', image: '/assets/images/projects/media.png', live: 'https://media.smvec.ac.in' },
    { name: 'Arts & Science', client: 'SMVEC Arts', image: '/assets/images/projects/arts.png', live: 'https://arts.smvec.ac.in' },
]

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
                        // Reveal: frame rises first, the text follows a beat later.
                        const reveal = gsap.timeline({
                            scrollTrigger: {
                                trigger: item,
                                start: 'top 88%',
                            },
                        })
                        reveal
                            .from(item.querySelector('.work-media'), {
                                opacity: 0,
                                y: 80,
                                duration: 1,
                                ease: 'power3.out',
                            })
                            .from(
                                item.querySelector('.work-meta'),
                                {
                                    opacity: 0,
                                    y: 24,
                                    duration: 0.7,
                                    ease: 'power3.out',
                                },
                                '-=0.6'
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
                {projects.map((project) => (
                    <a
                        className='work-item'
                        key={project.name}
                        href={project.live}
                        target='_blank'
                        rel='noreferrer'>
                        <div className='work-media'>
                            <img
                                className='work-img'
                                src={project.image}
                                alt={project.name}
                                loading='lazy' />
                        </div>
                        <div className='work-meta'>
                            <h3 className='work-title'>{project.name}</h3>
                            <p className='work-client'>{project.client}</p>
                        </div>
                    </a>
                ))}
            </div>
        </section>
    )
}

export default Project
