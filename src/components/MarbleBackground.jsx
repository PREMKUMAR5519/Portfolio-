import React, { useEffect, useRef } from 'react'

// Animated marble backdrop: domain-warped fbm noise rendered in a fragment
// shader. Renders at reduced resolution (the texture is soft by design) and
// ~30fps, pauses off-screen, and draws a single static frame under
// prefers-reduced-motion. If WebGL is unavailable the canvas stays blank and
// the section's cream background-color shows instead.

const VERT = `
attribute vec2 a_pos;
void main() {
    gl_Position = vec4(a_pos, 0.0, 1.0);
}
`

const FRAG = `
precision mediump float;
uniform vec2 u_res;
uniform float u_time;

float hash(vec2 p) {
    p = fract(p * vec2(123.34, 456.21));
    p += dot(p, p + 45.32);
    return fract(p.x * p.y);
}

float noise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
    float v = 0.0;
    float amp = 0.5;
    mat2 rot = mat2(0.8, 0.6, -0.6, 0.8);
    for (int i = 0; i < 5; i++) {
        v += amp * noise(p);
        p = rot * p * 2.0;
        amp *= 0.55;
    }
    return v;
}

void main() {
    vec2 uv = gl_FragCoord.xy / u_res.y;
    float t = u_time * 0.07;

    // Two levels of domain warping give the flowing, vein-like structure.
    vec2 p = uv * 3.4;
    vec2 q = vec2(
        fbm(p + vec2(0.0, t)),
        fbm(p + vec2(5.2, t * 0.8))
    );
    vec2 r = vec2(
        fbm(p + 3.0 * q + vec2(1.7, 9.2) + t * 0.6),
        fbm(p + 3.0 * q + vec2(8.3, 2.8) - t * 0.4)
    );
    float f = fbm(p + 3.0 * r);

    // Cream marble palette with clearly readable veining.
    vec3 base = vec3(0.980, 0.973, 0.950);
    vec3 mid  = vec3(0.914, 0.898, 0.852);
    vec3 deep = vec3(0.812, 0.789, 0.726);

    vec3 col = mix(base, mid, smoothstep(0.30, 0.70, f));
    col = mix(col, deep, smoothstep(0.55, 0.88, f) * 0.85);
    // fine secondary ripple so small-scale detail reads as texture
    col -= 0.035 * fbm(p * 3.0 + r * 2.0 + t);

    gl_FragColor = vec4(col, 1.0);
}
`

function MarbleBackground({ className }) {
    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const gl = canvas.getContext('webgl', {
            alpha: false,
            depth: false,
            stencil: false,
            antialias: false,
            powerPreference: 'low-power',
        })
        if (!gl) return

        const compile = (type, src) => {
            const shader = gl.createShader(type)
            gl.shaderSource(shader, src)
            gl.compileShader(shader)
            return shader
        }
        const program = gl.createProgram()
        gl.attachShader(program, compile(gl.VERTEX_SHADER, VERT))
        gl.attachShader(program, compile(gl.FRAGMENT_SHADER, FRAG))
        gl.linkProgram(program)
        if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return
        gl.useProgram(program)

        // One triangle covering the viewport.
        gl.bindBuffer(gl.ARRAY_BUFFER, gl.createBuffer())
        gl.bufferData(gl.ARRAY_BUFFER, new Float32Array([-1, -1, 3, -1, -1, 3]), gl.STATIC_DRAW)
        const aPos = gl.getAttribLocation(program, 'a_pos')
        gl.enableVertexAttribArray(aPos)
        gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

        const uRes = gl.getUniformLocation(program, 'u_res')
        const uTime = gl.getUniformLocation(program, 'u_time')

        // The texture is soft, so render at a fraction of CSS size and let
        // the browser upscale — a large perf win at zero visual cost.
        const RES_SCALE = 0.55

        const resize = () => {
            const w = Math.max(1, Math.round(canvas.clientWidth * RES_SCALE))
            const h = Math.max(1, Math.round(canvas.clientHeight * RES_SCALE))
            if (canvas.width !== w || canvas.height !== h) {
                canvas.width = w
                canvas.height = h
                gl.viewport(0, 0, w, h)
            }
            gl.uniform2f(uRes, canvas.width, canvas.height)
        }

        const draw = (seconds) => {
            gl.uniform1f(uTime, seconds)
            gl.drawArrays(gl.TRIANGLES, 0, 3)
        }

        const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
        const start = performance.now()
        let raf = 0
        let last = 0
        let visible = false
        let contextLost = false

        const frame = (now) => {
            raf = requestAnimationFrame(frame)
            // The flow is slow; ~30fps is indistinguishable and halves GPU work.
            if (now - last < 33) return
            last = now
            resize()
            draw((now - start) / 1000)
        }

        const startLoop = () => {
            if (!raf && !contextLost) raf = requestAnimationFrame(frame)
        }
        const stopLoop = () => {
            if (raf) {
                cancelAnimationFrame(raf)
                raf = 0
            }
        }

        const observer = new IntersectionObserver(([entry]) => {
            visible = entry.isIntersecting
            if (reduceMotion) return
            if (visible && !document.hidden) startLoop()
            else stopLoop()
        }, { rootMargin: '100px 0px' })
        observer.observe(canvas)

        const onVisibility = () => {
            if (reduceMotion) return
            if (!document.hidden && visible) startLoop()
            else stopLoop()
        }
        document.addEventListener('visibilitychange', onVisibility)

        const onLost = (e) => {
            e.preventDefault()
            contextLost = true
            stopLoop()
        }
        canvas.addEventListener('webglcontextlost', onLost)

        // Static render for reduced motion (and the first paint either way).
        resize()
        draw(0)

        return () => {
            stopLoop()
            observer.disconnect()
            document.removeEventListener('visibilitychange', onVisibility)
            canvas.removeEventListener('webglcontextlost', onLost)
        }
    }, [])

    return <canvas ref={canvasRef} className={className} aria-hidden='true' />
}

export default MarbleBackground
