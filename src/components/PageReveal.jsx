import React, { useLayoutEffect, useRef } from 'react'
import gsap from 'gsap'

const DOT_SPACING = 14
const MAX_DOT_RADIUS = 15.5
const RING_WIDTH = 120
const OVERLAY_COLOR = '#f4f2ec'
const REVEAL_DURATION = 0.7

const clamp01 = (value) => Math.max(0, Math.min(1, value))
const smooth = (value) => {
    const t = clamp01(value)
    return t * t * (3 - 2 * t)
}

function PageReveal({ children }) {
    const rootRef = useRef(null)
    const canvasRef = useRef(null)

    useLayoutEffect(() => {
        const root = rootRef.current
        const canvas = canvasRef.current
        if (!root) return

        let cleanupResize = () => {}

        const ctx = gsap.context(() => {
            const reduce = window.matchMedia('(prefers-reduced-motion: reduce)').matches
            const shell = root.querySelector('.page-reveal-shell')
            const loader = root.querySelector('.page-reveal-loader')
            const bar = root.querySelector('.page-reveal-loader__bar')
            const track = root.querySelector('.page-reveal-loader__track')
            const items = root.querySelectorAll('[data-page-reveal]')
            const headline = root.querySelector('.hero-title')
            const canvasContext = canvas?.getContext('2d')
            const state = { progress: 0 }
            let dots = []
            let maxRadius = 0

            const resize = () => {
                if (!canvas || !canvasContext) return

                const dpr = Math.min(window.devicePixelRatio || 1, 2)
                canvas.width = Math.ceil(window.innerWidth * dpr)
                canvas.height = Math.ceil(window.innerHeight * dpr)
                canvas.style.width = `${window.innerWidth}px`
                canvas.style.height = `${window.innerHeight}px`
                canvasContext.setTransform(dpr, 0, 0, dpr, 0, 0)

                const width = window.innerWidth
                const height = window.innerHeight
                const centerX = width / 2
                const centerY = height / 2
                const bleed = DOT_SPACING * 2

                maxRadius = Math.hypot(centerX, centerY) + RING_WIDTH
                dots = []

                for (let y = -bleed; y <= height + bleed; y += DOT_SPACING) {
                    for (let x = -bleed; x <= width + bleed; x += DOT_SPACING) {
                        const jitterX = Math.sin(x * 12.9898 + y * 78.233) * 1.4
                        const jitterY = Math.sin(x * 39.3467 + y * 11.135) * 1.4
                        const dotX = x + jitterX
                        const dotY = y + jitterY

                        dots.push({
                            x: dotX,
                            y: dotY,
                            distance: Math.hypot(dotX - centerX, dotY - centerY),
                            variance: 0.88 + ((Math.sin(x * 0.071 + y * 0.037) + 1) * 0.08),
                        })
                    }
                }

                draw()
            }

            const draw = () => {
                if (!canvas || !canvasContext) return

                const width = window.innerWidth
                const height = window.innerHeight

                canvasContext.clearRect(0, 0, width, height)
                canvasContext.globalCompositeOperation = 'source-over'
                canvasContext.fillStyle = OVERLAY_COLOR
                canvasContext.fillRect(0, 0, width, height)
                canvasContext.globalCompositeOperation = 'destination-out'

                if (state.progress <= 0) {
                    canvasContext.globalCompositeOperation = 'source-over'
                    return
                }

                const radius = maxRadius * state.progress

                for (const dot of dots) {
                    if (dot.distance > radius) continue

                    // Grow each opening once along a single continuous particle edge.
                    const strength = smooth((radius - dot.distance) / RING_WIDTH)
                    const dotRadius = MAX_DOT_RADIUS * strength * dot.variance

                    if (dotRadius < 0.18) continue

                    canvasContext.beginPath()
                    canvasContext.arc(dot.x, dot.y, dotRadius, 0, Math.PI * 2)
                    canvasContext.fill()
                }

                canvasContext.globalCompositeOperation = 'source-over'
            }

            if (reduce) {
                gsap.set(loader, { display: 'none' })
                gsap.set(shell, { visibility: 'visible' })
                gsap.set(items, { clearProps: 'all' })
                return
            }

            gsap.set(shell, { visibility: 'visible' })
            gsap.set(items, { opacity: 1, y: 0 })
            if (headline) {
                gsap.set(headline, {
                    transformPerspective: 1000,
                    transformOrigin: '50% 50%',
                    z: -120,
                    scale: 0.94,
                    rotationX: 4,
                    opacity: 0.35,
                    willChange: 'transform, opacity',
                })
            }
            gsap.set(bar, { width: '0%' })
            resize()
            window.addEventListener('resize', resize)
            cleanupResize = () => window.removeEventListener('resize', resize)

            const tl = gsap.timeline({
                defaults: { ease: 'power3.out' },
                onComplete: cleanupResize,
            })

            tl
                .to(bar, { width: '100%', duration: 0.42, ease: 'power2.out' })
                .to(track, { opacity: 0, duration: 0.14, ease: 'power2.out' }, '+=0.04')
                .set(track, { display: 'none' })
                .addLabel('reveal', '+=0.02')
                .to(state, {
                    progress: 1,
                    duration: REVEAL_DURATION,
                    ease: 'none',
                    onUpdate: draw,
                }, 'reveal')
                .set(loader, { display: 'none' })

            if (headline) {
                tl.to(headline, {
                    z: 0,
                    scale: 1,
                    rotationX: 0,
                    opacity: 1,
                    duration: REVEAL_DURATION,
                    ease: 'power2.inOut',
                    clearProps: 'transform,transformOrigin,opacity,willChange',
                }, 'reveal')
            }
        }, root)

        return () => {
            cleanupResize()
            ctx.revert()
        }
    }, [])

    return (
        <div className='page-reveal' ref={rootRef}>
            <div className='page-reveal-loader' aria-hidden='true'>
                <canvas className='page-reveal-loader__canvas' ref={canvasRef} />
                <div className='page-reveal-loader__track'>
                    <span className='page-reveal-loader__bar' />
                </div>
            </div>
            <div className='page-reveal-shell'>
                {children}
            </div>
        </div>
    )
}

export default PageReveal
