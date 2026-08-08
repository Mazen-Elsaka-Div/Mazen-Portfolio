import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Hero from './components/Hero';
import Preloader from './components/Preloader';

export default function App() {
  const [loading, setLoading] = useState(true);

  // Prevent scrolling while loading
  useEffect(() => {
    if (loading) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [loading]);

  return (
    <div style={{ minHeight: '100vh', position: 'relative' }}>
      {/* Background patterns */}
      <div className="vertical-lines" aria-hidden="true">
        <div /> <div /> <div /> <div /> <div />
      </div>
      <div className="bg-pattern" />

      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        ) : (
          <div key="main-content">
            <main>
              <Hero />
            </main>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
