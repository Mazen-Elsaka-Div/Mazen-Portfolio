import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { skills, skillCategories, type Skill } from '../data/skills';
import { fadeInUp, staggerContainer, springReveal, viewportSettings } from '../lib/animations';

function SkillBar({ skill }: { skill: Skill }) {
  return (
    <motion.div
      variants={springReveal}
      whileHover={{ scale: 1.02, y: -2 }}
      style={{
        background: 'var(--bg-card)',
        border: '1px solid var(--border)',
        borderRadius: 12,
        padding: '1rem 1.25rem',
        transition: 'border-color 0.2s',
      }}
      onMouseEnter={e => (e.currentTarget.style.borderColor = `${skill.color}40`)}
      onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--border)')}
    >
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.6rem' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ fontSize: '1.1rem' }}>{skill.icon}</span>
          <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.88rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {skill.name}
          </span>
        </div>
        <span style={{
          fontFamily: 'var(--font-mono)', fontSize: '0.75rem',
          color: skill.color, fontWeight: 700,
        }}>
          {skill.level}%
        </span>
      </div>
      <p style={{ fontSize: '0.76rem', color: 'var(--text-muted)', marginBottom: '0.6rem', lineHeight: 1.5 }}>
        {skill.description}
      </p>
      {/* Progress bar */}
      <div style={{ height: 4, background: 'rgba(0,0,0,0.06)', borderRadius: 999, overflow: 'hidden' }}>
        <motion.div
          initial={{ width: 0 }}
          whileInView={{ width: `${skill.level}%` }}
          viewport={{ once: true }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1], delay: 0.2 }}
          style={{
            height: '100%',
            background: `linear-gradient(90deg, ${skill.color}, ${skill.color}aa)`,
            borderRadius: 999,
            boxShadow: `0 0 8px ${skill.color}60`,
          }}
        />
      </div>
    </motion.div>
  );
}

export default function SkillsSection() {
  const [activeCategory, setActiveCategory] = useState<string>('Frontend');

  const filtered = skills.filter(s => s.category === activeCategory);

  const categoryColors: Record<string, string> = {
    Frontend: '#61dafb',
    Backend: '#339933',
    'AI/ML': '#ee4c2c',
    Tools: '#f05032',
    Design: '#ec4899',
  };

  return (
    <section id="skills" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <div className="section-label">Expertise</div>
          <h2 className="section-title">
            Skills & <span className="gradient-text">Technologies</span>
          </h2>
          <p className="section-desc">
            From pixels to models — a full-spectrum developer with depth in both web and AI.
          </p>
        </motion.div>

        {/* Category tabs */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{ display: 'flex', gap: '0.5rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '2.5rem' }}
        >
          {skillCategories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              style={{
                padding: '0.5rem 1.25rem', borderRadius: 999, cursor: 'pointer',
                border: '1px solid',
                fontFamily: 'var(--font-mono)', fontSize: '0.82rem', fontWeight: 600,
                background: activeCategory === cat ? `${categoryColors[cat]}20` : 'transparent',
                color: activeCategory === cat ? categoryColors[cat] : 'var(--text-secondary)',
                borderColor: activeCategory === cat ? `${categoryColors[cat]}50` : 'var(--border)',
                transition: 'all 0.2s',
              }}
            >
              {cat}
            </button>
          ))}
        </motion.div>

        {/* Skills grid */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCategory}
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            exit={{ opacity: 0 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))',
              gap: '1rem',
              maxWidth: 900, margin: '0 auto',
            }}
          >
            {filtered.map(skill => (
              <SkillBar key={skill.id} skill={skill} />
            ))}
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
