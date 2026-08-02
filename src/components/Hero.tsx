import { useRef } from 'react';
import { motion, useTransform, useScroll } from 'framer-motion';

const NAME_FIRST = 'MAZEN';
const NAME_LAST = 'ELSAKA';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);

  // Scroll-based zoom-in: as user scrolls, the photo zooms in and fades
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const photoScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55, 0.9], [1, 1, 0]);
  const textY = useTransform(scrollYProgress, [0, 0.6], [0, 60]);
  const textOpacity = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

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
      {/* ========== FULL-SCREEN PHOTO with scroll zoom ========== */}
      <motion.div
        initial={{ opacity: 0, scale: 1.06 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.6, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 1,
          opacity: heroOpacity,
        }}
      >
        <motion.img
          src="/me.png"
          alt="Mazen Elsaka"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
            scale: photoScale,
          }}
        />
      </motion.div>

      {/* Subtle bottom gradient for legibility */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background:
            'linear-gradient(to top, rgba(6,12,28,0.72) 0%, rgba(6,12,28,0.25) 28%, transparent 55%)',
          pointerEvents: 'none',
          opacity: heroOpacity,
        }}
      />

      {/* ========== NAME — editorial, bottom-left ========== */}
      <motion.div
        style={{
          position: 'absolute',
          zIndex: 3,
          bottom: 0,
          left: 0,
          right: 0,
          padding: 'clamp(1.5rem, 4vw, 3.5rem)',
          pointerEvents: 'none',
          y: textY,
          opacity: textOpacity,
        }}
      >
        {/* Location overline */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.25rem',
          }}
        >
          <span
            style={{
              width: '2.5rem',
              height: 1,
              background: 'rgba(255,255,255,0.55)',
              display: 'inline-block',
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

        {/* Name: staggered letters, thin + bold contrast */}
        <h1
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(2.75rem, 8vw, 7rem)',
            lineHeight: 0.95,
            letterSpacing: '-0.02em',
            color: '#fff',
            margin: 0,
            display: 'flex',
            flexWrap: 'wrap',
            alignItems: 'baseline',
            gap: '0 1.5rem',
          }}
        >
          <span aria-hidden="true" style={{ display: 'inline-flex' }}>
            {NAME_FIRST.split('').map((ch, i) => (
              <motion.span
                key={`f-${i}`}
                initial={{ opacity: 0, y: '0.6em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 0.7 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: 'inline-block', fontWeight: 300 }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
          <span aria-hidden="true" style={{ display: 'inline-flex' }}>
            {NAME_LAST.split('').map((ch, i) => (
              <motion.span
                key={`l-${i}`}
                initial={{ opacity: 0, y: '0.6em' }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.8,
                  delay: 1.0 + i * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                style={{ display: 'inline-block', fontWeight: 800 }}
              >
                {ch}
              </motion.span>
            ))}
          </span>
          <span className="sr-only" style={{ position: 'absolute', width: 1, height: 1, overflow: 'hidden', clip: 'rect(0 0 0 0)' }}>
            Mazen Elsaka
          </span>
        </h1>

        {/* Role line */}
        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 1.5 }}
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
        transition={{ delay: 2 }}
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
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: 1, height: 40, background: 'rgba(255,255,255,0.5)' }}
        />
      </motion.div>
    </section>
  );
}
