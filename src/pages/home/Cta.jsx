import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function Cta() {
    const sectionRef = useRef(null)
    const wrapRef = useRef(null)
    const btnRef = useRef(null)

    useEffect(() => {
        const section = sectionRef.current
        const wrap = wrapRef.current
        const btn = btnRef.current
        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const noHover = window.matchMedia('(hover: none)').matches

        let move = null
        let leave = null
        let visibility = null

        const ctx = gsap.context(() => {
            if (!reduceMotion) {
                gsap.from('.cta-heading', {
                    opacity: 0,
                    y: 40,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: '.cta-heading', start: 'top 85%' },
                })
                gsap.from(wrap, {
                    opacity: 0,
                    y: 24,
                    duration: 0.8,
                    ease: 'power3.out',
                    scrollTrigger: { trigger: wrap, start: 'top 92%' },
                })
            }

            // Magnetic button: the dashed outline marks the button's home;
            // the button drifts toward the cursor anywhere on the page (as
            // long as the section is on screen) and returns home when the
            // cursor leaves the window. Pointer devices only.
            if (reduceMotion || noHover) return

            // One tween source for both following and returning, always with
            // overwrite, so no two tweens ever fight over the button.
            const glide = (x, y) => {
                gsap.to(btn, {
                    x,
                    y,
                    duration: 0.35,
                    ease: 'power3.out',
                    overwrite: true,
                })
            }

            // Soft saturation: near home the pull tracks the cursor almost
            // 1:1 (so centring the cursor centres the button), and it eases
            // toward a max travel as the cursor gets far, instead of the
            // button flying across the page.
            const pull = (d, max) => max * Math.tanh(d / (max * 1.8))

            const home = wrap.querySelector('.cta-btn-home')

            // Only compute while the section is on screen; when it scrolls
            // out, park the button back in its outline.
            let active = false
            visibility = new IntersectionObserver(([entry]) => {
                active = entry.isIntersecting
                if (!active) {
                    gsap.to(btn, { x: 0, y: 0, duration: 0.5, ease: 'power3.out', overwrite: true })
                }
            })
            visibility.observe(section)

            move = (e) => {
                if (!active) return

                // Over the home box itself, the button seats into the dashed
                // outline instead of chasing the cursor.
                const hr = home.getBoundingClientRect()
                if (
                    e.clientX >= hr.left - 6 && e.clientX <= hr.right + 6 &&
                    e.clientY >= hr.top - 6 && e.clientY <= hr.bottom + 6
                ) {
                    glide(0, 0)
                    return
                }

                // The wrap's box is the button's home (transforms never move
                // layout), so measure offsets from its centre.
                const rect = wrap.getBoundingClientRect()
                const dx = e.clientX - (rect.left + rect.width / 2)
                const dy = e.clientY - (rect.top + rect.height / 2)
                glide(pull(dx, 130), pull(dy, 80))
            }
            leave = () => {
                gsap.to(btn, {
                    x: 0,
                    y: 0,
                    duration: 0.8,
                    ease: 'elastic.out(1, 0.45)',
                    overwrite: true,
                })
            }

            window.addEventListener('mousemove', move, { passive: true })
            // The cursor leaving the window, or tabbing away, is the only
            // real "gone" now that the whole page feeds the magnet.
            document.documentElement.addEventListener('mouseleave', leave)
            window.addEventListener('blur', leave)
        }, sectionRef)

        return () => {
            if (move) window.removeEventListener('mousemove', move)
            if (leave) {
                document.documentElement.removeEventListener('mouseleave', leave)
                window.removeEventListener('blur', leave)
            }
            if (visibility) visibility.disconnect()
            ctx.revert()
        }
    }, [])

    return (
        <section className='cta-main' ref={sectionRef}>
            <h2 className='cta-heading'>and I&rsquo;d like to<br />work with you.</h2>

            <div className='cta-btn-wrap' ref={wrapRef}>
                <span className='cta-btn-home'>
                    <button
                        className='cta-btn'
                        ref={btnRef}
                        onClick={() => { window.open('/assets/resume/resume.pdf', '_blank') }}>
                        View my resume
                    </button>
                </span>
            </div>
        </section>
    )
}

export default Cta
