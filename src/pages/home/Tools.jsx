import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const icon = (file) => `/assets/images/skills/${file}.png`

// One entry per scroll "phase". The heading's first line swaps to `title`
// while the tiles swap to `items`; the trailing "I use" line stays put.
const phases = [
    {
        key: 'build',
        title: 'Tools & Tech',
        items: [
            { name: 'HTML', icon: icon('html') },
            { name: 'CSS', icon: icon('css') },
            { name: 'JavaScript', icon: icon('javascript') },
            { name: 'React', icon: icon('react') },
            { name: 'Next.js', icon: icon('nextjs') },
            { name: 'Vite', icon: icon('vite') },
            { name: 'Bootstrap', icon: icon('bootstrap') },
            { name: 'Node.js', icon: icon('nodejs') },
            { name: 'ExpressJS', icon: icon('expressjs') },
            { name: 'Python', icon: icon('python') },
            { name: 'MongoDB', icon: icon('mongodb') },
            { name: 'MySQL', icon: icon('mysql') },
            { name: 'Supabase', icon: icon('supabase') },
            { name: 'Docker', icon: icon('docker') },
            { name: 'Git', icon: icon('git') },
            { name: 'GitHub', icon: icon('github') },
            { name: 'Postman', icon: icon('postman') },
            { name: 'Figma', icon: icon('figma') },
        ],
    },
    {
        key: 'deploy',
        title: 'Deployment',
        items: [
            { name: 'Vercel', icon: icon('vercel') },
            { name: 'Netlify', icon: icon('netlify') },
            { name: 'Render', icon: icon('render') },
            { name: 'Cloudflare', icon: icon('cloudflare') },
            { name: 'AWS', icon: icon('aws') },
            { name: 'Google Cloud', icon: icon('gcloud') },
        ],
    },
    {
        key: 'ai',
        title: 'AI',
        items: [
            { name: 'ChatGPT', icon: icon('chatgpt') },
            { name: 'Claude', icon: icon('claude') },
            { name: 'Gemini', icon: icon('gemini') },
            { name: 'Antigravity', icon: icon('antigravity') },
            { name: 'Hugging Face', icon: icon('huggingface') },
        ],
    },
]

function Tools() {
    const rootRef = useRef(null)
    const contentRef = useRef(null)

    useEffect(() => {
        const ctx = gsap.context(() => {
            const mm = gsap.matchMedia()

            mm.add(
                {
                    reduce: '(prefers-reduced-motion: reduce)',
                    any: '(min-width: 0px)',
                },
                (context) => {
                    const { reduce } = context.conditions
                    const content = contentRef.current

                    // The entrance and the phase timeline must never animate
                    // the same element: a scrubbed tween rewinds to whatever
                    // values it first captured, so sharing targets lets one
                    // timeline's hidden state leak into the other's.
                    //   entrance → .tools-line-1 / .tools-line-2 / .tools-tile-face
                    //   phases   → .tools-title / .tools-tile
                    const titles = gsap.utils.toArray('.tools-title')
                    const groups = gsap.utils.toArray('.tools-icons')
                    const tiles = groups.map((group) => gsap.utils.toArray('.tools-tile', group))
                    const faces0 = gsap.utils.toArray('.tools-tile-face', groups[0])

                    // Plain `opacity` only — never `autoAlpha`. ScrollTrigger
                    // refreshes can render/revert these tweens, and a stray
                    // `visibility: hidden` would survive the entrance fade.
                    const HIDDEN_OUT = { opacity: 0, y: -18, scale: 0.96, filter: 'blur(6px)' }
                    const HIDDEN_IN = { opacity: 0, y: 20, scale: 0.96, filter: 'blur(6px)' }
                    const SHOWN = { opacity: 1, y: 0, scale: 1, filter: 'blur(0px)' }

                    // Only the first phase exists until the user scrolls.
                    titles.slice(1).forEach((t) => gsap.set(t, HIDDEN_IN))
                    tiles.slice(1).forEach((group) => gsap.set(group, HIDDEN_IN))

                    // ---- 1. Entrance: tied to the block travelling from the
                    // bottom of the screen up to the centre. The title and
                    // "I use" are readable almost immediately; the tiles
                    // sharpen out of a blur, one after another, on the way up.
                    if (!reduce) {
                        gsap
                            .timeline({
                                defaults: { ease: 'power2.out' },
                                scrollTrigger: {
                                    trigger: content,
                                    start: 'top bottom',
                                    end: 'center center',
                                    scrub: 0.9,
                                },
                            })
                            .fromTo(
                                ['.tools-line-1', '.tools-line-2'],
                                { opacity: 0, y: 16, filter: 'blur(6px)' },
                                { opacity: 1, y: 0, filter: 'blur(0px)', duration: 0.5 },
                                0
                            )
                            .fromTo(
                                faces0,
                                { opacity: 0, y: 18, scale: 0.96, filter: 'blur(6px)' },
                                {
                                    opacity: 1,
                                    y: 0,
                                    scale: 1,
                                    filter: 'blur(0px)',
                                    duration: 0.65,
                                    stagger: { each: 0.42 / faces0.length, from: 'start' },
                                },
                                0.1
                            )
                    }

                    // ---- 2. Phases: the block holds at the centre of the
                    // screen while a scrubbed timeline swaps title + tiles.
                    // Timeline units map onto scroll distance (see `end`).
                    const tl = gsap.timeline({ defaults: { ease: 'power1.inOut' } })
                    const HOLD = 0.38

                    const swap = (from, to) => {
                        const at = tl.duration()

                        if (reduce) {
                            tl.to([titles[from], ...tiles[from]], { opacity: 0, duration: 0.6 }, at)
                            tl.to([titles[to], ...tiles[to]], { opacity: 1, duration: 0.6 }, at + 0.5)
                            return
                        }

                        // Out: current set drifts up and dissolves into a blur.
                        tl.fromTo(
                            titles[from],
                            SHOWN,
                            { ...HIDDEN_OUT, duration: 1.05, immediateRender: false },
                            at
                        )
                        tl.fromTo(
                            tiles[from],
                            SHOWN,
                            {
                                ...HIDDEN_OUT,
                                duration: 0.95,
                                stagger: { each: 0.32 / tiles[from].length, from: 'start' },
                                immediateRender: false,
                            },
                            at
                        )
                        // In: next set rises and sharpens into place.
                        tl.fromTo(
                            titles[to],
                            HIDDEN_IN,
                            { ...SHOWN, duration: 1.1, ease: 'power2.out', immediateRender: false },
                            at + 0.72
                        )
                        tl.fromTo(
                            tiles[to],
                            HIDDEN_IN,
                            {
                                ...SHOWN,
                                duration: 1,
                                ease: 'power2.out',
                                stagger: { each: 0.36 / tiles[to].length, from: 'start' },
                                immediateRender: false,
                            },
                            at + 0.78
                        )
                    }

                    tl.addLabel('phase-0')
                    for (let i = 1; i < phases.length; i++) {
                        tl.to({}, { duration: HOLD }) // rest on the current phase
                        swap(i - 1, i)
                        tl.addLabel(`phase-${i}`)
                    }
                    tl.to({}, { duration: HOLD * 0.3 }) // brief linger on the last phase before releasing

                    // Snap to a fully-formed phase (or the very end) so the
                    // block never rests half-blurred. Scrolling 42% of the way
                    // towards the next phase commits to it; less settles back.
                    const total = tl.duration()
                    const snapPoints = [...Object.values(tl.labels).map((t) => t / total), 1]
                    const COMMIT = 0.42
                    const snapToPhase = (value, self) => {
                        let lo = 0
                        let hi = 1
                        snapPoints.forEach((p) => {
                            if (p <= value && p > lo) lo = p
                            if (p >= value && p < hi) hi = p
                        })
                        if (hi === lo) return value
                        const t = (value - lo) / (hi - lo)
                        return self.direction > 0 ? (t > COMMIT ? hi : lo) : t < 1 - COMMIT ? lo : hi
                    }

                    ScrollTrigger.create({
                        animation: tl,
                        trigger: content,
                        // Hold the content block itself at screen centre; once
                        // the last phase is shown it releases and scrolls on
                        // up and out like any other content.
                        start: 'center center',
                        end: `+=${(phases.length - 1) * 62}%`,
                        pin: content,
                        anticipatePin: 0.6,
                        scrub: 1.15,
                        snap: {
                            snapTo: snapToPhase,
                            duration: { min: 0.22, max: 0.48 },
                            delay: 0.05,
                            ease: 'power3.out',
                        },
                    })

                    // ---- 3. Exit: after the pin releases, the whole block
                    // dissolves upward instead of scrolling off as a hard
                    // rectangle of text — this is what hands the viewport over
                    // to the Recent-works section.
                    //
                    // Targets the <h2>, never `content` itself: content is the
                    // pinned element, and GSAP owns its transform for the
                    // duration of the pin — animating y on it fights the pin.
                    // The h2 is also untouched by both timelines above, which
                    // only reach the .tools-title / .tools-tile descendants.
                    if (!reduce) {
                        gsap.fromTo(
                            content.querySelector('.tools-heading'),
                            { opacity: 1, y: 0, filter: 'blur(0px)' },
                            {
                                opacity: 0,
                                y: -70,
                                filter: 'blur(10px)',
                                ease: 'power2.in',
                                immediateRender: false,
                                scrollTrigger: {
                                    trigger: content,
                                    // Begins once the block has cleared the
                                    // pin and is on its way out of frame.
                                    start: 'center 34%',
                                    end: 'center -18%',
                                    scrub: 0.8,
                                },
                            }
                        )
                    }
                }
            )
        }, rootRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className='tools-main' aria-labelledby='tools-heading' ref={rootRef}>
            <div className='tools-inner' ref={contentRef}>
                <h2 id='tools-heading' className='tools-heading'>
                    <span className='tools-line tools-line-1'>
                        {phases.map((phase, i) => (
                            <span className='tools-title' key={phase.key} data-phase={i}>
                                {phase.title}
                            </span>
                        ))}
                    </span>

                    <span className='tools-stage'>
                        {phases.map((phase, i) => (
                            <span className='tools-icons' key={phase.key} data-phase={i}>
                                {phase.items.map((tool) => (
                                    <span className='tools-tile' key={tool.name}>
                                        <span className='tools-tile-face'>
                                            <img src={tool.icon} alt={tool.name} loading='lazy' />
                                        </span>
                                    </span>
                                ))}
                            </span>
                        ))}
                    </span>

                    <span className='tools-line tools-line-2'>I use</span>
                </h2>
            </div>
        </section>
    )
}

export default Tools
