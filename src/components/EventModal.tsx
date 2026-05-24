import { useEffect } from 'react';
import { motion } from 'framer-motion';
import { type Event } from '../data/events';

interface EventModalProps {
  event: Event;
  onClose: () => void;
}

export default function EventModal({ event, onClose }: EventModalProps) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => e.key === 'Escape' && onClose();
    document.addEventListener('keydown', handleKey);
    document.body.style.overflow = 'hidden';
    return () => {
      document.removeEventListener('keydown', handleKey);
      document.body.style.overflow = '';
    };
  }, [onClose]);

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        style={{
          position: 'fixed', inset: 0, zIndex: 2000,
          background: 'rgba(0,0,0,0.8)',
          backdropFilter: 'blur(8px)',
        }}
      />

      {/* Modal */}
      <motion.div
        initial={{ opacity: 0, scale: 0.92, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 20 }}
        transition={{ type: 'spring', stiffness: 280, damping: 26 }}
        style={{
          position: 'fixed', inset: '1rem', zIndex: 2001,
          maxWidth: 680, maxHeight: '90vh',
          margin: 'auto',
          background: 'var(--bg-card)',
          border: '1px solid var(--border-hover)',
          borderRadius: 24,
          overflow: 'auto',
          boxShadow: '0 24px 80px rgba(0,0,0,0.6)',
        }}
      >
        {/* Header visual */}
        <div style={{
          height: 200,
          background: event.gradient,
          position: 'relative',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
        }}>
          <div style={{
            position: 'absolute', inset: 0,
            backgroundImage: 'linear-gradient(rgba(0,0,0,0) 40%, rgba(0,0,0,0.5) 100%)',
          }} />
          <div style={{ fontSize: '5rem', filter: 'drop-shadow(0 4px 16px rgba(0,0,0,0.4))' }}>
            {event.category === 'Conference' ? '🎤' :
             event.category === 'Workshop' ? '🛠️' :
             event.category === 'Hackathon' ? '⚡' :
             event.category === 'Bootcamp' ? '🎓' : '💬'}
          </div>
          {/* Close button */}
          <button
            onClick={onClose}
            style={{
              position: 'absolute', top: '1rem', right: '1rem',
              width: 36, height: 36, borderRadius: '50%',
              background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
              border: '1px solid rgba(0,0,0,0.15)',
              color: 'white', cursor: 'pointer',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '1.1rem', transition: 'background 0.2s',
            }}
            onMouseEnter={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.8)')}
            onMouseLeave={e => (e.currentTarget.style.background = 'rgba(0,0,0,0.5)')}
          >
            ✕
          </button>
        </div>

        {/* Content */}
        <div style={{ padding: '2rem' }}>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1rem' }}>
            <span style={{
              padding: '3px 12px', borderRadius: 999, fontSize: '0.78rem',
              fontFamily: 'var(--font-mono)',
              background: `${event.color}15`, color: event.color,
              border: `1px solid ${event.color}33`,
            }}>{event.category}</span>
            <span style={{ padding: '3px 12px', borderRadius: 999, fontSize: '0.78rem', color: 'var(--text-muted)', border: '1px solid var(--border)' }}>{event.year}</span>
          </div>

          <h2 style={{
            fontFamily: 'var(--font-mono)', fontSize: '1.5rem',
            fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.5rem',
          }}>
            {event.name}
          </h2>

          <div style={{ display: 'flex', gap: '1.5rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/></svg>
              {event.date}
            </span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/></svg>
              {event.location}
            </span>
            <span style={{ fontSize: '0.875rem', color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/></svg>
              {event.attendees}+ attendees
            </span>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--text-muted)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>About the Event</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>{event.description}</p>
            </div>

            <div style={{ background: 'rgba(99,102,241,0.06)', border: '1px solid rgba(99,102,241,0.15)', borderRadius: 12, padding: '1.25rem' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--indigo)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>My Role</h4>
              <p style={{ lineHeight: 1.8, fontSize: '0.95rem', fontWeight: 600, color: 'var(--text-primary)' }}>{event.role}</p>
            </div>

            <div style={{ background: 'rgba(16,185,129,0.06)', border: '1px solid rgba(16,185,129,0.15)', borderRadius: 12, padding: '1.25rem' }}>
              <h4 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.8rem', color: 'var(--code-green)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: '0.5rem' }}>Impact & Outcomes</h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: 1.8, fontSize: '0.95rem' }}>{event.impact}</p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
