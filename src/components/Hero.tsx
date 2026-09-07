import { motion } from 'framer-motion';
import type { CSSProperties } from 'react';

export default function Hero() {
  return (
    <section className="intro" aria-labelledby="intro-title">
      <motion.div
        className="intro-image-wrap"
        initial={{ opacity: 0, scale: 1.04 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
      >
        <img className="intro-image" src="/me.png" alt="Mazen Elsaka" />
      </motion.div>

      <div className="intro-overlay" aria-hidden="true" />

      <motion.div
        className="intro-content"
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.9, delay: 0.35, ease: [0.22, 1, 0.36, 1] }}
      >
        <h1 id="intro-title" aria-label="Mazen Elsaka">
          {'Mazen Elsaka'.split('').map((letter, index) => (
            <span className="intro-letter" style={{ '--letter-index': index } as CSSProperties} key={`${letter}-${index}`}>
              {letter === ' ' ? '\u00a0' : letter}
            </span>
          ))}
        </h1>
      </motion.div>
    </section>
  );
}
