import { useState, useEffect, Suspense } from 'react';
import { AnimatePresence } from 'framer-motion';
import { Canvas } from '@react-three/fiber';
import { Environment } from '@react-three/drei';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import Timeline from './components/Timeline';
import EventsGrid from './components/EventsGrid';
import ProjectGraph from './components/ProjectGraph';
import CodeEditor from './components/CodeEditor';
import SkillsSection from './components/SkillsSection';
import Education from './components/Education';
import Contact from './components/Contact';
import Preloader from './components/Preloader';
import ScrollModel from './components/ScrollModel';

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

      {/* Global 3D Canvas Overlay */}
      {!loading && (
        <div style={{
          position: 'fixed',
          inset: 0,
          zIndex: 50,
          pointerEvents: 'none', // Critical so it doesn't block clicks
        }}>
          <Canvas camera={{ position: [0, 0, 8], fov: 45 }}>
            <ambientLight intensity={0.8} />
            <directionalLight position={[10, 10, 5]} intensity={1.5} />
            <Environment preset="city" />
            <Suspense fallback={null}>
              <ScrollModel />
            </Suspense>
          </Canvas>
        </div>
      )}

      <AnimatePresence mode="wait">
        {loading ? (
          <Preloader key="preloader" onComplete={() => setLoading(false)} />
        ) : (
          <div key="main-content">
            <Navigation />
            <main>
              <Hero />
              <Timeline />
              <EventsGrid />
              <ProjectGraph />
              <CodeEditor />
              <SkillsSection />
              <Education />
              <Contact />
            </main>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
