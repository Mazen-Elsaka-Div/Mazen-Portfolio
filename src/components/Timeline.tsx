import { motion } from 'framer-motion';
import { timeline } from '../data/timeline';
import { fadeInUp, fadeInLeft, fadeInRight, staggerContainer, viewportSettings } from '../lib/animations';

const tagColors: Record<string, { color: string; bg: string; border: string }> = {
  Education:   { color: '#3b82f6', bg: 'rgba(59,130,246,0.1)',  border: 'rgba(59,130,246,0.3)' },
  Work:        { color: '#10b981', bg: 'rgba(16,185,129,0.1)', border: 'rgba(16,185,129,0.3)' },
  Achievement: { color: '#8b5cf6', bg: 'rgba(139,92,246,0.1)',  border: 'rgba(139,92,246,0.3)' },
  Future:      { color: '#ec4899', bg: 'rgba(236,72,153,0.1)',  border: 'rgba(236,72,153,0.3)' },
};

export default function Timeline() {
  return (
    <section id="about" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <div className="section-label">Journey</div>
          <h2 className="section-title">
            Life <span className="gradient-text">Timeline</span>
          </h2>
          <p className="section-desc">
            From curiosity to craft — the milestones that shaped who I am as a developer and engineer.
          </p>
        </motion.div>

        {/* Timeline */}
        <div style={{ position: 'relative', maxWidth: 800, margin: '0 auto' }}>
          {/* Center line */}
          <motion.div
            initial={{ scaleY: 0, originY: 0 }}
            whileInView={{ scaleY: 1 }}
            viewport={viewportSettings}
            transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }}
            style={{
              position: 'absolute',
              left: '50%',
              top: 0, bottom: 0,
              width: 2,
              background: 'linear-gradient(to bottom, var(--indigo), var(--violet), var(--pink))',
              transform: 'translateX(-50%)',
              transformOrigin: 'top',
            }}
          />

          <motion.div
            variants={staggerContainer}
            initial="hidden"
            whileInView="visible"
            viewport={viewportSettings}
          >
            {timeline.map((item, index) => {
              const isLeft = index % 2 === 0;
              const tagStyle = tagColors[item.tag];
              return (
                <motion.div
                  key={item.id}
                  variants={isLeft ? fadeInLeft : fadeInRight}
                  style={{
                    display: 'flex',
                    justifyContent: isLeft ? 'flex-end' : 'flex-start',
                    paddingBottom: '3rem',
                    position: 'relative',
                  }}
                >
                  {/* Card */}
                  <motion.div
                    whileHover={{ scale: 1.02, y: -2 }}
                    transition={{ type: 'spring', stiffness: 400, damping: 25 }}
                    style={{
                      width: 'calc(50% - 2.5rem)',
                      background: 'var(--bg-card)',
                      border: '1px solid var(--border)',
                      borderRadius: 16,
                      padding: '1.5rem',
                      position: 'relative',
                      boxShadow: 'var(--shadow-card)',
                    }}
                    onMouseEnter={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border-accent)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card-hover)';
                    }}
                    onMouseLeave={e => {
                      (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                      (e.currentTarget as HTMLDivElement).style.boxShadow = 'var(--shadow-card)';
                    }}
                  >
                    {/* Connector arrow */}
                    <div style={{
                      position: 'absolute',
                      top: '1.8rem',
                      [isLeft ? 'right' : 'left']: -9,
                      width: 0, height: 0,
                      borderTop: '8px solid transparent',
                      borderBottom: '8px solid transparent',
                      [isLeft ? 'borderLeft' : 'borderRight']: '9px solid var(--border)',
                    }} />

                    {/* Header */}
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '0.75rem' }}>
                      <span style={{ fontSize: '1.5rem' }}>{item.icon}</span>
                      <div style={{ flex: 1 }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.25rem', flexWrap: 'wrap' }}>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: tagStyle.color,
                            background: tagStyle.bg,
                            border: `1px solid ${tagStyle.border}`,
                            padding: '1px 8px',
                            borderRadius: 999,
                          }}>
                            {item.tag}
                          </span>
                          <span style={{
                            fontFamily: 'var(--font-mono)',
                            fontSize: '0.75rem',
                            color: 'var(--text-muted)',
                          }}>
                            {item.date}
                          </span>
                        </div>
                        <h3 style={{
                          fontFamily: 'var(--font-mono)',
                          fontSize: '1rem',
                          fontWeight: 700,
                          color: 'var(--text-primary)',
                        }}>
                          {item.title}
                        </h3>
                      </div>
                    </div>

                    <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.7 }}>
                      {item.description}
                    </p>
                  </motion.div>

                  {/* Center dot */}
                  <div style={{
                    position: 'absolute',
                    left: '50%',
                    top: '1.75rem',
                    transform: 'translateX(-50%)',
                    width: 14, height: 14,
                    borderRadius: '50%',
                    background: 'var(--gradient-primary)',
                    border: '3px solid var(--bg-secondary)',
                    zIndex: 1,
                    boxShadow: '0 0 12px rgba(99,102,241,0.6)',
                  }} />
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
