import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

type Photo = {
  src: string;
  alt: string;
  label: string;
};

const photos: Photo[] = [
  { src: '/me.png', alt: 'Mazen Elsaka at an event', label: 'Organizer' },
];

export default function IntroAnimation() {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start start', 'end end'],
  });
  const titleOpacity = useTransform(scrollYProgress, [0, 0.18, 0.38], [1, 1, 0]);
  const titleY = useTransform(scrollYProgress, [0, 0.38], ['0vh', '-12vh']);
  const galleryScale = useTransform(scrollYProgress, [0.1, 0.52, 1], [0.68, 1, 1.02]);
  const galleryRadius = useTransform(scrollYProgress, [0.1, 0.52], ['28px', '0px']);
  const galleryY = useTransform(scrollYProgress, [0.1, 0.52], ['8vh', '0vh']);
  const photoOpacity = useTransform(scrollYProgress, [0.2, 0.45], [0, 1]);
  const photoScale = useTransform(scrollYProgress, [0.2, 0.45], [0.92, 1]);

  return (
    <section ref={sectionRef} className="scroll-morph" aria-label="Mazen Elsaka event portfolio">
      <div className="scroll-morph-sticky">
        <motion.div className="scroll-morph-intro" style={{ opacity: titleOpacity, y: titleY }}>
          <p className="scroll-morph-kicker">Events / Community / Stories</p>
          <h1>Mazen Elsaka</h1>
          <p className="scroll-morph-hint">Scroll to explore the moments I organized.</p>
        </motion.div>

        <motion.div
          className="scroll-morph-gallery"
          style={{ scale: galleryScale, y: galleryY, borderRadius: galleryRadius }}
        >
          {photos.map((photo, index) => (
            <motion.figure
              className="scroll-morph-photo"
              key={photo.src}
              style={{
                opacity: photoOpacity,
                scale: photoScale,
              }}
            >
              <img src={photo.src} alt={photo.alt} />
              <figcaption>
                <span>{photo.label}</span>
                <span>{String(index + 1).padStart(2, '0')}</span>
              </figcaption>
            </motion.figure>
          ))}
          <div className="scroll-morph-progress" aria-hidden="true">
            <motion.span style={{ scaleX: scrollYProgress }} />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
