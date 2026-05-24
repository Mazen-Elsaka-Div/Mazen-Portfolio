import { useEffect, useState } from 'react';
import { motion, useScroll } from 'framer-motion';

const navLinks = [
  { label: 'About', href: '#about' },
  { label: 'Events', href: '#events' },
  { label: 'Projects', href: '#projects' },
  { label: 'Skills', href: '#skills' },
  { label: 'Education', href: '#education' },
  { label: 'Contact', href: '#contact' },
];

export default function Navigation() {
  const [activeSection, setActiveSection] = useState('');
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();

  useEffect(() => {
    const unsub = scrollY.on('change', (y) => setScrolled(y > 60));
    return unsub;
  }, [scrollY]);

  useEffect(() => {
    const sections = navLinks.map(l => document.querySelector(l.href));
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(entry => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { threshold: 0.4 }
    );
    sections.forEach(s => s && observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <motion.nav
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.5, duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '0.6rem 2rem' : '1.2rem 2rem',
        background: scrolled ? 'rgba(255,255,255,0.85)' : 'transparent',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(0,0,0,0.06)' : '1px solid transparent',
        transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
      }}
    >
      {/* Logo */}
      <a href="#" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
        <div style={{
          width: 36, height: 36, borderRadius: 10,
          background: 'linear-gradient(135deg, #6366f1, #8b5cf6)',
          display: 'flex', alignItems: 'center', justifyContent: 'center',
          fontFamily: 'var(--font-mono)', fontWeight: 800, fontSize: '1rem', color: 'white',
        }}>M</div>
        <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 700, fontSize: '1rem', color: 'var(--text-primary)' }}>
          mazen<span style={{ color: 'var(--indigo)' }}>.dev</span>
        </span>
      </a>

      {/* Links */}
      <ul style={{ display: 'flex', gap: '0.25rem', listStyle: 'none', alignItems: 'center' }}>
        {navLinks.map(link => (
          <li key={link.href}>
            <a
              href={link.href}
              style={{
                textDecoration: 'none',
                padding: '0.4rem 0.85rem',
                borderRadius: 8,
                fontSize: '0.875rem',
                fontWeight: 500,
                color: activeSection === link.href.slice(1) ? 'var(--text-primary)' : 'var(--text-secondary)',
                background: activeSection === link.href.slice(1) ? 'rgba(99,102,241,0.15)' : 'transparent',
                border: activeSection === link.href.slice(1) ? '1px solid rgba(99,102,241,0.3)' : '1px solid transparent',
                transition: 'all 0.2s ease',
                display: 'block',
              }}
              onMouseEnter={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                el.style.color = 'var(--text-primary)';
                el.style.background = 'rgba(0,0,0,0.05)';
              }}
              onMouseLeave={e => {
                const el = e.currentTarget as HTMLAnchorElement;
                const isActive = activeSection === link.href.slice(1);
                el.style.color = isActive ? 'var(--text-primary)' : 'var(--text-secondary)';
                el.style.background = isActive ? 'rgba(16,185,129,0.1)' : 'transparent';
              }}
            >
              {link.label}
            </a>
          </li>
        ))}
      </ul>

      {/* CV Button */}
      <a
        href="/cv.pdf"
        download
        className="btn btn-outline"
        style={{ padding: '0.45rem 1.1rem', fontSize: '0.875rem' }}
      >
        <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/>
        </svg>
        Resume
      </a>
    </motion.nav>
  );
}
