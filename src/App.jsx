import { useEffect } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Lenis from 'lenis'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import Home from './pages/home/Index'

gsap.registerPlugin(ScrollTrigger)

// Site-wide smooth (inertial) scrolling. Lenis animates the scroll position
// itself, so it must share a clock with ScrollTrigger or the scroll-linked
// animations (parallax, reveals) would lag a frame behind.
function useSmoothScroll() {
  useEffect(() => {
    // Native scrolling for users who opted out of motion, and for touch
    // devices, where synthetic scrolling fights the platform's physics.
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return

    const lenis = new Lenis({
      duration: 1.35,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smoothWheel: true,
      wheelMultiplier: 0.85,
    })

    lenis.on('scroll', ScrollTrigger.update)
    // Let imperative code (e.g. the hero's "View Projects" button) scroll
    // through Lenis instead of fighting it with native smooth scrolling.
    window.lenis = lenis

    const raf = (time) => lenis.raf(time * 1000)
    gsap.ticker.add(raf)
    // Lenis drives scroll every frame; GSAP's lag smoothing would fight it.
    gsap.ticker.lagSmoothing(0)

    return () => {
      gsap.ticker.remove(raf)
      lenis.destroy()
      delete window.lenis
    }
  }, [])
}

export default function AppRouter() {
  useSmoothScroll()

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  )
}
