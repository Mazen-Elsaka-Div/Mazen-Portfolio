import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { events, eventYears, eventCategories, type Event } from '../data/events';
import { fadeInUp, staggerContainer, springReveal, viewportSettings } from '../lib/animations';
import EventModal from './EventModal';

export default function EventsGrid() {
  const [selectedYear, setSelectedYear] = useState<number | null>(null);
  const [selectedCat, setSelectedCat] = useState<string | null>(null);
  const [activeEvent, setActiveEvent] = useState<Event | null>(null);

  const filtered = events.filter(e => {
    if (selectedYear && e.year !== selectedYear) return false;
    if (selectedCat && e.category !== selectedCat) return false;
    return true;
  });

  return (
    <section id="events" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <div className="section-label">Community</div>
          <h2 className="section-title">
            NASS Academy <span className="gradient-text">Events</span>
          </h2>
          <p className="section-desc">
            Tech conferences, workshops, hackathons, and bootcamps — building communities and shaping the next generation of developers.
          </p>
        </motion.div>

        {/* Filters */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}
        >
          <button
            onClick={() => { setSelectedYear(null); setSelectedCat(null); }}
            style={{
              padding: '0.4rem 1rem', borderRadius: 999, cursor: 'pointer',
              border: '1px solid', fontSize: '0.82rem', fontFamily: 'var(--font-mono)',
              background: !selectedYear && !selectedCat ? 'rgba(99,102,241,0.15)' : 'transparent',
              color: !selectedYear && !selectedCat ? 'var(--indigo)' : 'var(--text-secondary)',
              borderColor: !selectedYear && !selectedCat ? 'rgba(99,102,241,0.4)' : 'var(--border)',
              transition: 'all 0.2s',
            }}
          >
            All
          </button>
          {eventYears.map(year => (
            <button
              key={year}
              onClick={() => setSelectedYear(selectedYear === year ? null : year)}
              style={{
                padding: '0.4rem 1rem', borderRadius: 999, cursor: 'pointer',
                border: '1px solid', fontSize: '0.82rem', fontFamily: 'var(--font-mono)',
                background: selectedYear === year ? 'rgba(99,102,241,0.15)' : 'transparent',
                color: selectedYear === year ? 'var(--indigo)' : 'var(--text-secondary)',
                borderColor: selectedYear === year ? 'rgba(99,102,241,0.4)' : 'var(--border)',
                transition: 'all 0.2s',
              }}
            >
              {year}
            </button>
          ))}
          {eventCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCat(selectedCat === cat ? null : cat)}
              style={{
                padding: '0.4rem 1rem', borderRadius: 999, cursor: 'pointer',
                border: '1px solid', fontSize: '0.82rem',
                background: selectedCat === cat ? 'rgba(139,92,246,0.15)' : 'transparent',
                color: selectedCat === cat ? 'var(--violet)' : 'var(--text-secondary)',
                borderColor: selectedCat === cat ? 'rgba(139,92,246,0.4)' : 'var(--border)',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Grid */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))',
            gap: '1.5rem',
          }}
        >
          <AnimatePresence>
            {filtered.map(event => (
              <motion.div
                key={event.id}
                layout
                variants={springReveal}
                exit={{ opacity: 0, scale: 0.9 }}
                whileHover={{ y: -6, scale: 1.01 }}
                transition={{ type: 'spring', stiffness: 350, damping: 25 }}
                onClick={() => setActiveEvent(event)}
                style={{
                  borderRadius: 16,
                  overflow: 'hidden',
                  cursor: 'pointer',
                  background: 'var(--bg-card)',
                  border: '1px solid var(--border)',
                  boxShadow: 'var(--shadow-card)',
                  transition: 'border-color 0.2s, box-shadow 0.2s',
                }}
                onMouseEnter={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-hover)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card-hover)';
                }}
                onMouseLeave={e => {
                  (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                  (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card)';
                }}
              >
                {/* Visual header */}
                <div style={{
                  height: 160,
                  background: event.gradient,
                  position: 'relative',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <div style={{
                    position: 'absolute', inset: 0,
                    backgroundImage: 'linear-gradient(rgba(0,0,0,0) 40%, rgba(0,0,0,0.4) 100%)',
                  }} />
                  <div style={{ fontSize: '3.5rem', filter: 'drop-shadow(0 4px 8px rgba(0,0,0,0.3))' }}>
                    {event.category === 'Conference' ? '🎤' :
                     event.category === 'Workshop' ? '🛠️' :
                     event.category === 'Hackathon' ? '⚡' :
                     event.category === 'Bootcamp' ? '🎓' : '💬'}
                  </div>
                  <div style={{
                    position: 'absolute', top: '1rem', right: '1rem',
                    padding: '0.25rem 0.75rem',
                    background: 'rgba(0,0,0,0.5)',
                    backdropFilter: 'blur(8px)',
                    borderRadius: 999, fontSize: '0.72rem', color: 'white',
                    fontFamily: 'var(--font-mono)', border: '1px solid rgba(0,0,0,0.1)',
                  }}>
                    {event.category}
                  </div>
                </div>

                {/* Info */}
                <div style={{ padding: '1.25rem' }}>
                  <h3 style={{
                    fontFamily: 'var(--font-mono)',
                    fontSize: '1rem', fontWeight: 700,
                    color: 'var(--text-primary)', marginBottom: '0.5rem',
                  }}>
                    {event.name}
                  </h3>
                  <div style={{ display: 'flex', gap: '1rem', marginBottom: '0.75rem', flexWrap: 'wrap' }}>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
                      {event.date}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
                      {event.location}
                    </span>
                  </div>
                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.875rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                    {event.description.slice(0, 100)}...
                  </p>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <span style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: event.color,
                      background: `${event.color}15`, border: `1px solid ${event.color}33`,
                      padding: '2px 10px', borderRadius: 999,
                    }}>
                      {event.attendees}+ attendees
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--indigo)', fontWeight: 500 }}>
                      View details →
                    </span>
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      </div>

      <AnimatePresence>
        {activeEvent && (
          <EventModal event={activeEvent} onClose={() => setActiveEvent(null)} />
        )}
      </AnimatePresence>
    </section>
  );
}
