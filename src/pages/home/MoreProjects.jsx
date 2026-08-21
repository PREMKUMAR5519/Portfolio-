import React, { useEffect, useRef } from 'react'
import { ArrowUpRight } from 'lucide-react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

// Rows without a `live` URL render as plain rows (no link) until one exists.
const moreProjects = [
    { name: 'SMVEC School of Law', detail: 'Institutional website', domain: 'law.smvec.ac.in', live: 'https://law.smvec.ac.in' },
    { name: 'Heyram Infrastructure', detail: 'Corporate website', domain: null, live: null }, // TODO: add live URL
]

function MoreProjects() {
    const sectionRef = useRef(null)

    useEffect(() => {
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches

        const ctx = gsap.context(() => {
            if (reduceMotion) return

            gsap.from('.morework-heading', {
                opacity: 0,
                y: 26,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.morework-heading', start: 'top 88%' },
            })
            gsap.from('.morework-row', {
                opacity: 0,
                y: 34,
                duration: 0.8,
                stagger: 0.12,
                ease: 'power3.out',
                scrollTrigger: { trigger: '.morework-list', start: 'top 85%' },
            })
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className='morework-main' ref={sectionRef}>
            <h2 className='morework-heading'>More projects</h2>

            <div className='morework-list'>
                {moreProjects.map((item) => {
                    const inner = (
                        <>
                            <div className='morework-name'>
                                <h3>{item.name}</h3>
                                <p>{item.detail}</p>
                            </div>
                            <div className='morework-meta'>
                                {item.domain && <span className='morework-domain'>{item.domain}</span>}
                                {item.live && <ArrowUpRight className='morework-arrow' aria-hidden='true' />}
                            </div>
                        </>
                    )

                    return item.live ? (
                        <a
                            className='morework-row'
                            key={item.name}
                            href={item.live}
                            target='_blank'
                            rel='noreferrer'>
                            {inner}
                        </a>
                    ) : (
                        <div className='morework-row is-static' key={item.name}>
                            {inner}
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default MoreProjects
