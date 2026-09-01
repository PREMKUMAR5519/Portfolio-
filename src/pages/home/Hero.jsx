import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'
import { SplitText } from 'gsap/SplitText'

gsap.registerPlugin(SplitText)

function autoscroll() {
    if (window.lenis) {
        window.lenis.scrollTo(1350)
        return
    }
    window.scroll({
        top: 1350,
        left: 0,
        behavior: 'smooth'
    });
}

function Hero() {
    const rootRef = useRef(null)

    // useLayoutEffect so the initial hidden states are set before first
    // paint — no flash of unanimated content.
    useLayoutEffect(() => {
        const ctx = gsap.context(() => {
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            if (reduce) {
                // No intro at all: drop the curtain and show everything.
                gsap.set('.hero-curtain', { display: 'none' })
                return
            }

            // Split the title into lines, each inside an overflow-clip mask
            // so they can rise out of nothing. Lines (not chars) keep the
            // gradient span's background-clip rendering intact.
            const split = new SplitText('.hero-title', {
                type: 'lines',
                mask: 'lines',
                linesClass: 'hero-title-line',
            })

            gsap.set(split.lines, { yPercent: 118, rotate: 2.5 })
            gsap.set('.hero-eyebrow', { opacity: 0, letterSpacing: '0.9em' })
            gsap.set('.hero-subtitle', { opacity: 0, y: 28, filter: 'blur(10px)' })
            gsap.set('.hero-button-container .mybutton', { opacity: 0, y: 26, scale: 0.9 })
            gsap.set('.pill-nav', { opacity: 0, y: -18 })

            const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })

            tl
                // Curtain: the wordmark tracks open while a gradient hairline
                // draws underneath it.
                .to('.hero-curtain-name', {
                    opacity: 1,
                    letterSpacing: '0.5em',
                    duration: 0.75,
                    ease: 'power2.out',
                })
                .to('.hero-curtain-line', {
                    scaleX: 1,
                    duration: 0.75,
                    ease: 'power2.inOut',
                }, '<0.05')
                .to('.hero-curtain-name, .hero-curtain-line', {
                    opacity: 0,
                    duration: 0.3,
                    ease: 'power1.in',
                }, '+=0.15')
                // The curtain sweeps up and out.
                .to('.hero-curtain', {
                    yPercent: -100,
                    duration: 1,
                    ease: 'power4.inOut',
                }, '<0.1')
                .set('.hero-curtain', { display: 'none' })
                // Title lines rise from their masks while the curtain is
                // still clearing the top of the viewport.
                .to(split.lines, {
                    yPercent: 0,
                    rotate: 0,
                    duration: 1.25,
                    stagger: 0.14,
                }, '-=0.55')
                .to('.hero-eyebrow', {
                    opacity: 1,
                    letterSpacing: '2.4px',
                    duration: 1.1,
                    ease: 'power3.out',
                }, '-=1.05')
                .to('.hero-subtitle', {
                    opacity: 1,
                    y: 0,
                    filter: 'blur(0px)',
                    duration: 0.9,
                }, '-=0.8')
                .to('.hero-button-container .mybutton', {
                    opacity: 1,
                    y: 0,
                    scale: 1,
                    duration: 0.7,
                    ease: 'back.out(1.7)',
                    stagger: 0.09,
                }, '-=0.6')
                .to('.pill-nav', {
                    opacity: 1,
                    y: 0,
                    duration: 0.6,
                    ease: 'power3.out',
                }, '-=0.45')
                // Hand the DOM back untouched: un-split the title (so
                // responsive re-wrapping works) and clear inline styles.
                .add(() => {
                    split.revert()
                    gsap.set(
                        ['.hero-eyebrow', '.hero-subtitle', '.hero-button-container .mybutton', '.pill-nav'],
                        { clearProps: 'all' }
                    )
                })
        })

        return () => ctx.revert()
    }, [])

    return (
        <div className='hero-main' ref={rootRef}>
            {/* Intro curtain: covers the page from first paint, lifts away
                once the wordmark sequence finishes. */}
            <div className='hero-curtain' aria-hidden='true'>
                <span className='hero-curtain-name'>Premkumar</span>
                <span className='hero-curtain-line' />
            </div>

            <div className='container'>
                <p className='hero-eyebrow'>Hi, I'm Premkumar</p>
                <h1 className='hero-title'>
                    I'm a <span className='hero-gradient'>full stack</span><br />
                    software developer.
                </h1>
                <p className='hero-subtitle'>
                    I design and build fast, accessible websites &mdash; from pixel-perfect
                    interfaces to the APIs behind them.
                </p>
                <div className='hero-button-container'>
                    <button className='mybutton button-primary' onClick={() => { window.open('/assets/resume/resume.pdf', '_blank') }}>
                        View Resume
                    </button>
                    <button className='mybutton button-secondary' onClick={autoscroll}>
                        View Projects
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Hero
