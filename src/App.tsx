import { useState, useEffect } from 'react';
import { AnimatePresence } from 'framer-motion';
import Navigation from './components/Navigation';
import Hero from './components/Hero';
import SeaSection from './components/SeaSection';
import Timeline from './components/Timeline';
import EventsGrid from './components/EventsGrid';
import ProjectGraph from './components/ProjectGraph';
import CodeEditor from './components/CodeEditor';
import SkillsSection from './components/SkillsSection';
import Education from './components/Education';
import Contact from './components/Contact';
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
            <Navigation />
            <main>
              <Hero />
              <SeaSection />
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
