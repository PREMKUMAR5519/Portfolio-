import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import AboutMe from './AboutMe'
import AboutExperience from './AboutExperience'

gsap.registerPlugin(ScrollTrigger)

function About() {
    const rootRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add(
                {
                    reduce: '(prefers-reduced-motion: reduce)',
                    any: '(min-width: 0px)',
                },
                (context) => {
                    if (context.conditions.reduce) return

                    // Title and subtitle sharpen out of a blur as they enter.
                    gsap.fromTo(
                        '.headings-main > *',
                        { opacity: 0, y: 40, filter: 'blur(12px)' },
                        {
                            opacity: 1,
                            y: 0,
                            filter: 'blur(0px)',
                            duration: 1,
                            stagger: 0.18,
                            ease: 'power3.out',
                            scrollTrigger: {
                                trigger: '.headings-main',
                                start: 'top 85%',
                            },
                        }
                    )
                }
            )
        }, rootRef)

        return () => ctx.revert()
    }, [])

    return (
        <div className='about-main' ref={rootRef}>
            <div className='about-stack'>
                <div className='headings-main'>
                    <h5>About Me</h5>
                    <h6>Full-stack software Developer</h6>
                </div>

                <AboutMe />
                <AboutExperience />
            </div>
        </div>
    )
}

export default About
