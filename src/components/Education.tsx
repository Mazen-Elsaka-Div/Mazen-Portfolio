import { motion } from 'framer-motion';
import { degrees, certifications } from '../data/education';
import { fadeInUp, staggerContainer, springReveal, viewportSettings } from '../lib/animations';

export default function Education() {
  return (
    <section id="education" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <div className="section-label">Background</div>
          <h2 className="section-title">
            Education & <span className="gradient-text">Credentials</span>
          </h2>
          <p className="section-desc">
            Formal education backed by continuous learning and verified certifications.
          </p>
        </motion.div>

        {/* Degrees */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{ maxWidth: 800, margin: '0 auto 4rem' }}
        >
          {degrees.map(degree => (
            <motion.div
              key={degree.id}
              variants={springReveal}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                padding: '2rem',
                position: 'relative',
                overflow: 'hidden',
              }}
            >
              <div style={{
                position: 'absolute', top: 0, left: 0,
                width: 4, height: '100%',
                background: `linear-gradient(to bottom, ${degree.color}, ${degree.color}44)`,
              }} />
              <div style={{ paddingLeft: '0.75rem' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', flexWrap: 'wrap', gap: '0.5rem', marginBottom: '0.75rem' }}>
                  <div>
                    <div style={{
                      fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
                      color: degree.color, marginBottom: '0.4rem',
                      background: `${degree.color}15`, border: `1px solid ${degree.color}30`,
                      display: 'inline-block', padding: '2px 10px', borderRadius: 999,
                    }}>
                      🎓 Education
                    </div>
                    <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                      {degree.degree}
                    </h3>
                    <div style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', marginBottom: '0.25rem' }}>
                      {degree.institution}
                    </div>
                    <div style={{ fontSize: '0.82rem', color: 'var(--text-muted)', display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                      <span>📍 {degree.location}</span>
                      <span>📅 {degree.year}</span>
                    </div>
                  </div>
                </div>
                <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.8 }}>
                  {degree.description}
                </p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Certifications */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{ textAlign: 'center', marginBottom: '2rem' }}
        >
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            Certifications
          </h3>
        </motion.div>

        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
            gap: '1rem',
            maxWidth: 900, margin: '0 auto',
          }}
        >
          {certifications.map(cert => (
            <motion.div
              key={cert.id}
              variants={springReveal}
              whileHover={{ scale: 1.03, y: -3 }}
              transition={{ type: 'spring', stiffness: 400, damping: 25 }}
              style={{
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 14,
                padding: '1.25rem',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = `${cert.color}40`;
                (e.currentTarget as HTMLDivElement).style.boxShadow = `0 4px 24px ${cert.color}15`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLDivElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLDivElement).style.boxShadow = 'none';
              }}
            >
              <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'flex-start' }}>
                <div style={{
                  width: 44, height: 44, borderRadius: 10, flexShrink: 0,
                  background: `${cert.color}20`,
                  border: `1px solid ${cert.color}30`,
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  fontSize: '1.3rem',
                }}>
                  {cert.icon}
                </div>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h4 style={{
                    fontFamily: 'var(--font-mono)', fontSize: '0.88rem',
                    fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.25rem',
                    lineHeight: 1.3,
                  }}>
                    {cert.name}
                  </h4>
                  <div style={{ fontSize: '0.78rem', color: 'var(--text-secondary)', marginBottom: '0.4rem' }}>
                    {cert.organization}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '0.5rem' }}>
                    <span style={{ fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                      {cert.date}
                    </span>
                    {cert.verifyUrl && (
                      <a
                        href={cert.verifyUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          fontSize: '0.7rem', color: cert.color,
                          textDecoration: 'none', fontFamily: 'var(--font-mono)',
                          padding: '2px 8px', borderRadius: 999,
                          background: `${cert.color}15`,
                          border: `1px solid ${cert.color}30`,
                          transition: 'opacity 0.2s',
                        }}
                        onMouseEnter={e => (e.currentTarget.style.opacity = '0.7')}
                        onMouseLeave={e => (e.currentTarget.style.opacity = '1')}
                      >
                        Verify ↗
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}
