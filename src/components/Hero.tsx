import { useRef, useEffect, useState } from 'react';
import { motion, useMotionValue, useSpring, useTransform, useScroll, useMotionTemplate } from 'framer-motion';
import GhostCursor from './GhostCursor';

export default function Hero() {
  const sectionRef = useRef<HTMLElement>(null);
  const [windowSize, setWindowSize] = useState({ w: 0, h: 0 });

  // Mouse tracking for parallax
  const mouseX = useMotionValue(0.5);
  const mouseY = useMotionValue(0.5);

  // Mouse tracking for the spotlight (absolute pixels)
  const spotlightX = useMotionValue(-1000);
  const spotlightY = useMotionValue(-1000);
  const smoothSpotlightX = useSpring(spotlightX, { damping: 30, stiffness: 200 });
  const smoothSpotlightY = useSpring(spotlightY, { damping: 30, stiffness: 200 });

  const maskImage = useMotionTemplate`radial-gradient(circle at ${smoothSpotlightX}px ${smoothSpotlightY}px, black 0%, transparent 350px)`;

  const smoothX = useSpring(mouseX, { damping: 25, stiffness: 150 });
  const smoothY = useSpring(mouseY, { damping: 25, stiffness: 150 });

  // Text parallax layers
  const textX = useTransform(smoothX, [0, 1], [15, -15]);
  const textY = useTransform(smoothY, [0, 1], [10, -10]);

  // Scroll-based mask exit: as user scrolls, mask slides up and fades
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end start'],
  });
  const heroOpacity = useTransform(scrollYProgress, [0, 0.55], [1, 0]);
  // Zoom-in as the user scrolls down
  const heroScale = useTransform(scrollYProgress, [0, 1], [1, 1.35]);

  useEffect(() => {
    const update = () => setWindowSize({ w: window.innerWidth, h: window.innerHeight });
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!windowSize.w) return;
    
    // Normalized for parallax
    mouseX.set(e.clientX / windowSize.w);
    mouseY.set(e.clientY / windowSize.h);

    // Absolute for spotlight
    spotlightX.set(e.clientX);
    spotlightY.set(e.clientY);
  };

  const handleMouseLeave = () => {
    // Hide spotlight when mouse leaves
    spotlightX.set(-1000);
    spotlightY.set(-1000);
  };

  return (
    <section
      ref={sectionRef}
      id="hero"
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--bg-primary)',
        cursor: 'none', // Hide cursor to emphasize the ghost effect
      }}
    >
      {/* ========== BASE PHOTO — full screen, zooms in on scroll ========== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          opacity: heroOpacity,
          scale: heroScale,
        }}
      >
        <img
          src="/me.png"
          alt="Mazen Elsaka"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </motion.div>

      {/* ========== MASK OVERLAY — The ghost spotlight reveal ========== */}
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 3,
          WebkitMaskImage: maskImage,
          maskImage: maskImage,
          opacity: heroOpacity,
          scale: heroScale,
          pointerEvents: 'none',
        }}
      >
        <img
          src="/mask.png"
          alt=""
          aria-hidden="true"
          style={{
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            display: 'block',
          }}
        />
      </motion.div>

      {/* ========== GHOST CURSOR EFFECT ========== */}
      <GhostCursor
        color="#10b981" // Match the emerald theme
        trailLength={60}
        inertia={0.6}
        brightness={1.5}
        bloomStrength={0.2}
        zIndex={4}
      />

      {/* ========== NAME — editorial type, bottom-left ========== */}
      <motion.div
        style={{
          position: 'absolute',
          zIndex: 5,
          bottom: '3rem',
          left: 'clamp(1.5rem, 4vw, 4rem)',
          pointerEvents: 'none',
          x: textX,
          y: textY,
          opacity: heroOpacity,
        }}
      >
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}
        >
          <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
            <span style={{
              position: 'absolute', width: '100%', height: '100%', borderRadius: '50%',
              background: 'var(--emerald)', opacity: 0.6,
              animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
            }} />
            <span style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald)' }} />
          </span>
          <span style={{
            fontFamily: 'var(--font-mono)', fontSize: '0.7rem', color: 'var(--text-secondary)',
            letterSpacing: '0.25em', textTransform: 'uppercase', fontWeight: 600,
          }}>
            Web Developer &middot; AI Engineer
          </span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.65, ease: [0.22, 1, 0.36, 1] }}
          style={{
            fontFamily: 'var(--font-display)',
            fontSize: 'clamp(3.5rem, 9vw, 8.5rem)',
            fontWeight: 800,
            lineHeight: 0.92,
            letterSpacing: '-0.045em',
            color: 'var(--text-primary)',
            textTransform: 'uppercase',
            margin: 0,
          }}
        >
          <span style={{ display: 'block' }}>Mazen</span>
          <span
            aria-hidden="true"
            style={{
              display: 'block',
              color: 'transparent',
              WebkitTextStroke: '2px var(--text-primary)',
            }}
          >
            Elsaka
          </span>
          <span className="sr-only">Elsaka</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.75rem',
            color: 'var(--text-secondary)',
            letterSpacing: '0.2em',
            textTransform: 'uppercase',
            marginTop: '1.25rem',
          }}
        >
          {'31.2001\u00B0 N, 29.9187\u00B0 E \u2014 Alexandria, Egypt'}
        </motion.p>
      </motion.div>

      {/* ========== SCROLL INDICATOR ========== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        style={{
          position: 'absolute',
          bottom: '1.5rem',
          right: '2rem',
          zIndex: 10,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          gap: '0.5rem',
        }}
      >
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.65rem', color: 'var(--text-muted)',
          letterSpacing: '0.15em', textTransform: 'uppercase', writingMode: 'vertical-rl',
        }}>
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity }}
          style={{ width: 1, height: 40, background: 'var(--text-muted)', opacity: 0.3 }}
        />
      </motion.div>

      <style>{`
        @keyframes ping {
          75%, 100% { transform: scale(2); opacity: 0; }
        }
      `}</style>
    </section>
  );
}
