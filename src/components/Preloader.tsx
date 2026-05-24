import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

export default function Preloader({ onComplete }: { onComplete: () => void }) {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const duration = 2000; // 2 seconds
    const intervalTime = 20;
    const steps = duration / intervalTime;
    let currentStep = 0;

    const timer = setInterval(() => {
      currentStep++;
      setProgress(Math.min((currentStep / steps) * 100, 100));

      if (currentStep >= steps) {
        clearInterval(timer);
        setTimeout(onComplete, 400); // Wait a beat at 100% before finishing
      }
    }, intervalTime);

    return () => clearInterval(timer);
  }, [onComplete]);

  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0, y: -40, filter: 'blur(10px)' }}
      transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 9999,
        background: 'var(--bg-primary)',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <div style={{ width: 240, position: 'relative' }}>
        {/* Loading text */}
        <div style={{
          display: 'flex',
          justifyContent: 'space-between',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          color: 'var(--text-secondary)',
          marginBottom: '1rem',
          letterSpacing: '0.1em',
          textTransform: 'uppercase',
        }}>
          <span>Initializing</span>
          <span>{Math.round(progress)}%</span>
        </div>

        {/* Progress bar background */}
        <div style={{
          width: '100%',
          height: 2,
          background: 'var(--border)',
          overflow: 'hidden',
          position: 'relative',
        }}>
          {/* Progress bar fill */}
          <motion.div
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              height: '100%',
              background: 'var(--text-primary)',
              width: `${progress}%`,
            }}
          />
        </div>
      </div>
    </motion.div>
  );
}
