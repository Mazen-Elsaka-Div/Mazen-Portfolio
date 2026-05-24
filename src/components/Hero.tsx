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
  const heroOpacity = useTransform(scrollYProgress, [0, 0.4], [1, 0]);

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
      {/* ========== BACKGROUND TEXT — sits behind the photo ========== */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.2, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          zIndex: 1,
          textAlign: 'center',
          pointerEvents: 'none',
          x: textX,
          y: textY,
          opacity: heroOpacity,
        }}
      >
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 15vw, 14rem)',
          fontWeight: 900,
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(0,0,0,0.06)',
          userSelect: 'none',
        }}>
          MAZEN
        </div>
        <div style={{
          fontFamily: 'var(--font-display)',
          fontSize: 'clamp(5rem, 15vw, 14rem)',
          fontWeight: 900,
          lineHeight: 0.85,
          letterSpacing: '-0.04em',
          color: 'transparent',
          WebkitTextStroke: '1.5px rgba(0,0,0,0.06)',
          userSelect: 'none',
        }}>
          ELSAKA
        </div>
      </motion.div>

      {/* ========== BASE PHOTO — the main center image ========== */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.4, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          opacity: heroOpacity,
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

      {/* ========== FOREGROUND TEXT & UI — sits in front ========== */}
      <div style={{
        position: 'absolute',
        zIndex: 5,
        bottom: 0,
        left: 0,
        right: 0,
        padding: '2rem 3rem 3rem',
        background: 'linear-gradient(to top, rgba(252,252,252,0.95) 0%, rgba(252,252,252,0.6) 50%, transparent 100%)',
        pointerEvents: 'none',
      }}>
        <div style={{ maxWidth: 'var(--container-max)', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem' }}>
              <span style={{ position: 'relative', display: 'flex', width: 8, height: 8 }}>
                <span style={{
                  position: 'absolute', width: '100%', height: '100%', borderRadius: '50%',
                  background: 'var(--emerald)', opacity: 0.6,
                  animation: 'ping 2s cubic-bezier(0, 0, 0.2, 1) infinite',
                }} />
                <span style={{ position: 'relative', width: 8, height: 8, borderRadius: '50%', background: 'var(--emerald)' }} />
              </span>
              <span style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--emerald)',
                letterSpacing: '0.15em', textTransform: 'uppercase', fontWeight: 600,
              }}>
                Available for opportunities
              </span>
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            style={{
              fontFamily: 'var(--font-display)',
              fontSize: 'clamp(2rem, 4vw, 3.5rem)',
              fontWeight: 800,
              lineHeight: 1.05,
              color: 'var(--text-primary)',
              letterSpacing: '-0.03em',
              marginBottom: '0.5rem',
            }}
          >
            MAZEN <span className="gradient-text">ELSAKA</span>
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8 }}
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '1rem',
              color: 'var(--text-secondary)',
              maxWidth: 500,
              lineHeight: 1.6,
              marginBottom: '1.5rem',
            }}
          >
            Web Developer & AI Engineer specializing in computer vision, neural networks, and fullstack architecture.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            style={{ display: 'flex', gap: '1rem', pointerEvents: 'all' }}
          >
            <a href="#projects" className="btn btn-primary" style={{ cursor: 'pointer' }}>
              View My Work
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 5v14"/><path d="m19 12-7 7-7-7"/></svg>
            </a>
            <a href="#contact" className="btn btn-outline" style={{ cursor: 'pointer' }}>
              Get in Touch
            </a>
          </motion.div>
        </div>
      </div>

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
