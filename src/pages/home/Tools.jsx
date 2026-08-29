import React, { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

const tools = [
    { name: 'HTML', icon: '/assets/images/skills/html.png' },
    { name: 'CSS', icon: '/assets/images/skills/css.png' },
    { name: 'JavaScript', icon: '/assets/images/skills/javascript.png' },
    { name: 'ReactJS', icon: '/assets/images/skills/reactjs.png' },
    { name: 'Next.js', icon: '/assets/images/skills/nextjs.png' },
    { name: 'Sass', icon: '/assets/images/skills/sass.png' },
    { name: 'Bootstrap', icon: '/assets/images/skills/bootstrap.png' },
    { name: 'Node.js', icon: '/assets/images/skills/nodejs.png' },
    { name: 'ExpressJS', icon: '/assets/images/skills/expressjs.png' },
    { name: 'MongoDB', icon: '/assets/images/skills/mongodb.png' },
    { name: 'MySQL', icon: '/assets/images/skills/mysql.png' },
    { name: 'Supabase', icon: '/assets/images/skills/supabase.png' },
    { name: 'Figma', icon: '/assets/images/skills/figma.png' },
    { name: 'GitHub', icon: '/assets/images/skills/github.png' },
    { name: 'Postman', icon: '/assets/images/skills/postman.png' },
    { name: 'Vercel', icon: '/assets/images/skills/vercel.png' },
    { name: 'Hostinger', icon: '/assets/images/skills/hostinger.png' },
    { name: 'GoDaddy', icon: '/assets/images/skills/godaddy.png' },
]

function Tools() {
    const sectionRef = useRef(null)

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

                    const tl = gsap.timeline({
                        scrollTrigger: {
                            trigger: sectionRef.current,
                            start: 'top 75%',
                        },
                    })

                    tl.from('.tools-line', {
                        opacity: 0,
                        y: 50,
                        duration: 0.9,
                        stagger: 0.15,
                        ease: 'power3.out',
                    })
                        // Icons pop in one after another between the two lines.
                        .from(
                            '.tools-tile',
                            {
                                opacity: 0,
                                scale: 0.4,
                                y: 24,
                                duration: 0.5,
                                stagger: 0.045,
                                ease: 'back.out(1.8)',
                            },
                            '-=0.7'
                        )
                }
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])

    return (
        <section className='tools-main' ref={sectionRef}>
            <h2 className='tools-heading'>
                <span className='tools-line tools-line-1'>Tools &amp; tech</span>

                <span className='tools-icons'>
                    {tools.map((tool) => (
                        <span className='tools-tile' key={tool.name} title={tool.name}>
                            <img src={tool.icon} alt={tool.name} loading='lazy' />
                        </span>
                    ))}
                </span>

                <span className='tools-line tools-line-2'>I use.</span>
            </h2>
        </section>
    )
}

export default Tools
