import { motion } from 'framer-motion';
import { fadeInUp, staggerContainer, springReveal, viewportSettings } from '../lib/animations';

const contactLinks = [
  {
    label: 'GitHub',
    value: 'github.com/4kair0',
    href: 'https://github.com/4kair0',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
      </svg>
    ),
    color: '#ffffff',
  },
  {
    label: 'LinkedIn',
    value: 'linkedin.com/in/mazenelsakka',
    href: 'https://linkedin.com/in/mazenelsakka',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="currentColor">
        <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
      </svg>
    ),
    color: '#0077b5',
  },
  {
    label: 'Email',
    value: 'mazen@example.com',
    href: 'mailto:mazen@example.com',
    icon: (
      <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z"/><polyline points="22,6 12,13 2,6"/>
      </svg>
    ),
    color: '#10b981',
  },
];

export default function Contact() {
  return (
    <section id="contact" className="section" style={{
      background: 'radial-gradient(ellipse 80% 60% at 50% 100%, rgba(99,102,241,0.12) 0%, transparent 70%), var(--bg-secondary)',
    }}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <div className="section-label">Connect</div>
          <h2 className="section-title">
            Let's <span className="gradient-text">Work Together</span>
          </h2>
          <p className="section-desc">
            Open to interesting projects, collaborations, and opportunities. Let's build something great.
          </p>
        </motion.div>

        {/* Contact cards */}
        <motion.div
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
            gap: '1.25rem',
            maxWidth: 860, margin: '0 auto 3rem',
          }}
        >
          {contactLinks.map(link => (
            <motion.a
              key={link.label}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              variants={springReveal}
              whileHover={{ scale: 1.04, y: -4 }}
              transition={{ type: 'spring', stiffness: 350, damping: 22 }}
              style={{
                display: 'flex', alignItems: 'center', gap: '1rem',
                padding: '1.5rem',
                background: 'var(--bg-card)',
                border: '1px solid var(--border)',
                borderRadius: 16,
                textDecoration: 'none',
                color: 'var(--text-primary)',
                transition: 'border-color 0.2s, box-shadow 0.2s',
              }}
              onMouseEnter={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = `${link.color}40`;
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = `0 8px 32px ${link.color}15`;
              }}
              onMouseLeave={e => {
                (e.currentTarget as HTMLAnchorElement).style.borderColor = 'var(--border)';
                (e.currentTarget as HTMLAnchorElement).style.boxShadow = 'none';
              }}
            >
              <div style={{
                width: 48, height: 48, borderRadius: 12, flexShrink: 0,
                background: `${link.color}15`,
                border: `1px solid ${link.color}30`,
                display: 'flex', alignItems: 'center', justifyContent: 'center',
                color: link.color,
              }}>
                {link.icon}
              </div>
              <div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.78rem', color: 'var(--text-muted)', marginBottom: '0.2rem' }}>
                  {link.label}
                </div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  {link.value}
                </div>
              </div>
            </motion.a>
          ))}
        </motion.div>

        {/* CV download */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{ textAlign: 'center', marginBottom: '5rem' }}
        >
          <a href="/cv.pdf" download className="btn btn-primary" style={{ fontSize: '1.05rem', padding: '1rem 2.5rem' }}>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
            Download My CV
          </a>
        </motion.div>

        {/* Footer */}
        <div style={{
          borderTop: '1px solid var(--border)',
          paddingTop: '2rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '1rem',
        }}>
          <div style={{ fontFamily: 'var(--font-mono)', fontSize: '0.85rem', color: 'var(--text-muted)' }}>
            <span style={{ color: 'var(--indigo)' }}>©</span> 2026 Mazen Elsaka. Built with React + Framer Motion.
          </div>
          <div style={{ display: 'flex', gap: '1.5rem' }}>
            {['#about', '#projects', '#skills', '#education'].map(href => (
              <a key={href} href={href} style={{
                fontFamily: 'var(--font-mono)', fontSize: '0.82rem',
                color: 'var(--text-muted)', textDecoration: 'none',
                transition: 'color 0.2s',
                textTransform: 'capitalize',
              }}
              onMouseEnter={e => (e.currentTarget.style.color = 'var(--text-secondary)')}
              onMouseLeave={e => (e.currentTarget.style.color = 'var(--text-muted)')}
              >
                {href.slice(1)}
              </a>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
