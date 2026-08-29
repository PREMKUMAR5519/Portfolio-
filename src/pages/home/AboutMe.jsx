import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const ABOUT_TEXT = `Specializing in building fast, modern, and user-centric web applications.
With strong expertise in ReactJS, FastAPI, and cloud deployments, I create
seamless digital experiences that are clean, scalable, and performance-driven.
I combine technical development with creative problem-solving, working
end-to-end across UI/UX, backend architecture, and deployment workflows to
deliver reliable, production-ready solutions. Passionate about technology,
design, and innovation, I focus on turning ideas into polished, impactful
digital products.`

const words = ABOUT_TEXT.split(/\s+/)

function AboutMe() {
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
                    // Reduced motion: words stay sharp and fully visible.
                    if (context.conditions.reduce) return

                    // Each word sharpens from a blurred ghost as the paragraph
                    // moves through the viewport, scrubbed to scroll position.
                    gsap.fromTo(
                        '.aboutme-word',
                        { opacity: 0.12, filter: 'blur(7px)' },
                        {
                            opacity: 1,
                            filter: 'blur(0px)',
                            stagger: 0.05,
                            ease: 'none',
                            scrollTrigger: {
                                trigger: '.aboutme-text',
                                start: 'top 85%',
                                end: 'bottom 45%',
                                scrub: 0.4,
                            },
                        }
                    )
                }
            )
        }, rootRef)

        return () => ctx.revert()
    }, [])

    return (
        <div className='aboutme-main' ref={rootRef}>
            <p className='aboutme-text'>
                {words.map((word, i) => (
                    <React.Fragment key={i}>
                        <span className='aboutme-word'>{word}</span>{' '}
                    </React.Fragment>
                ))}
            </p>
        </div>
    )
}

export default AboutMe
