import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

const SLICES = 6;

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });

  // Photo: zoom + blur + slight rise on scroll
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.45]);
  const photoBlur = useTransform(scrollYProgress, [0, 0.8], ['blur(0px)', 'blur(14px)']);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.6, 0.95], [1, 1, 0]);

  // Signature drifts left and fades on scroll
  const firstX = useTransform(scrollYProgress, [0, 0.55], ['0%', '-30%']);
  const textOpacity = useTransform(scrollYProgress, [0, 0.45], [1, 0]);
  const overlineY = useTransform(scrollYProgress, [0, 0.4], [0, -40]);

  return (
    <section
      ref={sectionRef}
      id="hero"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        background: 'var(--bg-primary)',
      }}
    >
      {/* ========== FULL-SCREEN PHOTO — Ken Burns drift + scroll zoom ========== */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: heroOpacity,
        }}
      >
        <motion.div
          style={{ width: '100%', height: '100%', scale: photoScale, filter: photoBlur }}
        >
          <motion.img
            src="/me.png"
            alt="Mazen Elsaka"
            initial={{ scale: 1.12 }}
            animate={{ scale: [1.12, 1.04, 1.1, 1.12] }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.4, 0.75, 1],
            }}
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
              display: 'block',
              transformOrigin: '50% 35%',
            }}
          />
        </motion.div>
      </motion.div>

      {/* ========== CURTAIN SLICES — staggered reveal on load ========== */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 6,
          display: 'flex',
          pointerEvents: 'none',
        }}
      >
        {Array.from({ length: SLICES }).map((_, i) => (
          <motion.div
            key={i}
            initial={{ scaleY: 1 }}
            animate={{ scaleY: 0 }}
            transition={{
              duration: 1.1,
              delay: 0.15 + i * 0.09,
              ease: [0.76, 0, 0.24, 1],
            }}
            style={{
              flex: 1,
              background: 'var(--bg-primary, #060c1c)',
              transformOrigin: i % 2 === 0 ? 'top' : 'bottom',
            }}
          />
        ))}
      </div>

      {/* Film grain overlay */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          opacity: 0.5,
          mixBlendMode: 'overlay',
          backgroundImage:
            "url(\"data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='2' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)' opacity='0.32'/%3E%3C/svg%3E\")",
        }}
      />

      {/* Bottom gradient for legibility */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background:
            'linear-gradient(to top, rgba(6,12,28,0.78) 0%, rgba(6,12,28,0.28) 30%, transparent 58%)',
          pointerEvents: 'none',
          opacity: heroOpacity,
        }}
      />

      {/* ========== NAME — masked line reveals, splits apart on scroll ========== */}
      <motion.div
        style={{
          position: 'absolute',
          zIndex: 3,
          bottom: 0,
          left: 0,
          right: 0,
          padding: 'clamp(1.5rem, 4vw, 3.5rem)',
          pointerEvents: 'none',
          opacity: textOpacity,
        }}
      >
        {/* Location overline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.15 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem',
            y: overlineY,
          }}
        >
          <motion.span
            initial={{ scaleX: 0 }}
            animate={{ scaleX: 1 }}
            transition={{ duration: 0.8, delay: 1.3, ease: [0.22, 1, 0.36, 1] }}
            style={{
              width: '2.5rem',
              height: 1,
              background: 'rgba(255,255,255,0.55)',
              display: 'inline-block',
              transformOrigin: 'left',
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.7rem',
              color: 'rgba(255,255,255,0.85)',
              letterSpacing: '0.28em',
              textTransform: 'uppercase',
              fontWeight: 500,
            }}
          >
            Alexandria, Egypt &mdash; Mediterranean Sea
          </span>
        </motion.div>

        <h1 style={{ margin: 0, position: 'relative' }}>
          <span
            className="sr-only"
            style={{
              position: 'absolute',
              width: 1,
              height: 1,
              overflow: 'hidden',
              clip: 'rect(0 0 0 0)',
            }}
          >
            Mazen Elsaka
          </span>

          {/* Handwritten signature — live stroke draw, then ink fill */}
          <motion.div aria-hidden="true" style={{ x: firstX }}>
            <svg
              viewBox="0 0 720 200"
              style={{
                width: 'clamp(300px, 46vw, 640px)',
                height: 'auto',
                overflow: 'visible',
                display: 'block',
              }}
            >
              {/* Pen-writing mask — reveals the signature left to right */}
              <defs>
                <mask id="sig-reveal">
                  <motion.rect
                    x="0"
                    y="0"
                    height="200"
                    fill="#fff"
                    initial={{ width: 0 }}
                    animate={{ width: 720 }}
                    transition={{ duration: 2.8, delay: 1.15, ease: 'easeInOut' }}
                  />
                </mask>
              </defs>

              {/* Thin stroke signature — no fill, stays light */}
              <text
                x="10"
                y="140"
                fill="transparent"
                stroke="#fff"
                strokeWidth="1.1"
                strokeLinecap="round"
                strokeLinejoin="round"
                mask="url(#sig-reveal)"
                style={{
                  fontFamily: "'Great Vibes', cursive",
                  fontSize: '108px',
                }}
              >
                Mazen Elsaka
              </text>

              {/* Signature underline flourish */}
              <motion.path
                d="M 30 168 C 180 186, 420 158, 560 170"
                fill="none"
                stroke="rgba(255,255,255,0.65)"
                strokeWidth="1.4"
                strokeLinecap="round"
                initial={{ pathLength: 0 }}
                animate={{ pathLength: 1 }}
                transition={{ duration: 0.9, delay: 3.7, ease: [0.22, 1, 0.36, 1] }}
              />
            </svg>
          </motion.div>
        </h1>

        {/* Role line ��� typewriter-style mask sweep */}
        <motion.p
          initial={{ clipPath: 'inset(0 100% 0 0)', opacity: 1 }}
          animate={{ clipPath: 'inset(0 0% 0 0)' }}
          transition={{ duration: 1.4, delay: 3.6, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: 'clamp(0.9rem, 1.4vw, 1.05rem)',
            color: 'rgba(255,255,255,0.75)',
            letterSpacing: '0.04em',
            marginTop: '1.25rem',
            maxWidth: 480,
            lineHeight: 1.6,
          }}
        >
          Web Developer &amp; AI Engineer &mdash; computer vision, neural
          networks, fullstack architecture.
        </motion.p>
      </motion.div>

      {/* ========== SCROLL INDICATOR ========== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 4.4 }}
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '2rem',
          zIndex: 4,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
          opacity: textOpacity,
        }}
      >
        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.65rem',
            color: 'rgba(255,255,255,0.6)',
            letterSpacing: '0.15em',
            textTransform: 'uppercase',
            writingMode: 'vertical-rl',
          }}
        >
          Scroll
        </span>
        <motion.div
          animate={{ scaleY: [0, 1, 0], transformOrigin: ['top', 'top', 'bottom'] }}
          transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
          style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.6)' }}
        />
      </motion.div>
    </section>
  );
}
