import { useEffect, useRef, useState } from 'react'

export default function CaseStudyPlayer() {
  const videoRef = useRef(null)
  const manuallyPaused = useRef(false)
  const [playing, setPlaying] = useState(false)
  const [error, setError] = useState('')
  const source = `${import.meta.env.BASE_URL}assets/videos/final-fast-fullstack-dark.mp4?v=dark-20260923`

  useEffect(() => {
    const video = videoRef.current
    video.muted = true
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && entry.intersectionRatio >= 0.25 && !manuallyPaused.current) {
        video.play().catch(() => {})
      } else {
        video.pause()
        if (!entry.isIntersecting) manuallyPaused.current = false
      }
    }, { threshold: [0, 0.25] })
    observer.observe(video)
    return () => { observer.disconnect(); video.pause() }
  }, [])

  const toggle = async () => {
    const video = videoRef.current
    if (!video.paused) { manuallyPaused.current = true; video.pause(); return }
    manuallyPaused.current = false
    try { await video.play(); setError('') } catch { setError('Playback could not start. Open the video below.') }
  }

  return (
    <>
      <div className='project-video__frame'>
        <div className='project-video__titlebar' aria-hidden='true'>
          <span className='project-video__window-buttons'>
            <span />
            <span />
            <span />
          </span>
        </div>
        <video ref={videoRef} muted loop playsInline preload='metadata' tabIndex={0} role='button'
          poster={`${import.meta.env.BASE_URL}assets/videos/product-explorer-dark-poster.jpg?v=dark-20260923`}
          aria-label={`${playing ? 'Pause' : 'Play'} Product Explorer case study`}
          onClick={toggle}
          onKeyDown={event => {
            if (event.key === ' ' || event.key === 'Enter') { event.preventDefault(); toggle() }
          }}
          onPlay={() => setPlaying(true)} onPause={() => setPlaying(false)}
          onError={() => setError('Video unavailable. Try opening it below.')}>
          <source src={source} type='video/mp4' />
          <a href={source}>Watch the Product Explorer case study</a>
        </video>
      </div>
      {error && <p role='status' className='project-video__error'>{error} <a href={source}>Open video</a></p>}
    </>
  )
}
