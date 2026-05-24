import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Highlight, themes } from 'prism-react-renderer';
import { fadeInUp, viewportSettings } from '../lib/animations';

const FILES = [
  {
    name: 'about.json',
    icon: '{}',
    language: 'json',
    content: `{
  "name": "Mazen Elsaka",
  "title": "Web Developer & AI Engineer",
  "location": "Cairo, Egypt",
  "email": "mazen@example.com",
  "github": "github.com/4kair0",
  "linkedin": "linkedin.com/in/mazenelsakka",
  "focus": "Computer Vision",
  "available": true,
  "languages": ["Arabic", "English"],
  "interests": [
    "Computer Vision",
    "Generative AI",
    "Web Performance",
    "Open Source"
  ],
  "currentlyLearning": [
    "PyTorch advanced techniques",
    "3D Gaussian Splatting",
    "WebGPU & WASM"
  ]
}`,
  },
  {
    name: 'skills.ts',
    icon: 'TS',
    language: 'typescript',
    content: `// Technical Skills — Mazen Elsaka

interface SkillLevel {
  name: string;
  level: 'Expert' | 'Advanced' | 'Proficient';
  years: number;
}

const frontend: SkillLevel[] = [
  { name: 'React',         level: 'Expert',     years: 4 },
  { name: 'Next.js',       level: 'Expert',     years: 3 },
  { name: 'TypeScript',    level: 'Expert',     years: 3 },
  { name: 'Tailwind CSS',  level: 'Expert',     years: 3 },
  { name: 'Framer Motion', level: 'Advanced',   years: 2 },
];

const aiMl: SkillLevel[] = [
  { name: 'Python',     level: 'Expert',     years: 5 },
  { name: 'PyTorch',    level: 'Proficient', years: 2 },
  { name: 'OpenCV',     level: 'Proficient', years: 1 },
  { name: 'LangChain',  level: 'Advanced',   years: 2 },
  { name: 'OpenAI API', level: 'Expert',     years: 2 },
];

export { frontend, aiMl };`,
  },
  {
    name: 'system_report.md',
    icon: 'MD',
    language: 'markdown',
    content: `# System Integrity Report
## Developer: Mazen Elsaka
## Date: 2026-05-24

---

### Core Modules Status

| Module            | Status  | Version  |
|-------------------|---------|----------|
| Problem Solving   | ✅ ONLINE | v9.2.1  |
| Frontend Engine   | ✅ ONLINE | v4.1.0  |
| AI Integration    | ✅ ONLINE | v2.3.0  |
| CV Research Mode  | 🔵 ACTIVE | v0.8.0  |
| Sleep Schedule    | ⚠️ WARNING | v1.0.x  |

---

### Performance Metrics

- **Code Quality:** 94/100
- **Bug Fix Rate:** 98%
- **Coffee Dependency:** HIGH
- **Stack Overflow Visits:** Decreasing ✅
- **Stack Overflow Answers:** Increasing ✅

---

### Current Objectives

1. Master computer vision fundamentals
2. Deploy vision model at scale (Q2 2026)
3. Open-source contribution to PyTorch
4. Build something that matters

> "Programs must be written for people to read,
>  and only incidentally for machines to execute."
>  — Harold Abelson`,
  },
  {
    name: 'challenges.log',
    icon: '⚡',
    language: 'bash',
    content: `# Challenges & Solutions Log
# Format: [DATE] CHALLENGE -> SOLUTION

[2022-10-15] RTL animations in Framer Motion
  CHALLENGE: No native RTL support in animation direction
  SOLUTION:  Custom hook that flips x values based on dir="rtl"
  RESULT:    Seamless RTL transitions in Itqan platform ✓

[2023-03-22] YOLOv8 real-time on CPU (no GPU)
  CHALLENGE: 3fps inference — completely unusable
  SOLUTION:  ONNX export + INT8 quantization + frame skip
  RESULT:    28fps achieved on CPU-only server ✓

[2023-08-10] RAG context window overflow
  CHALLENGE: Documents exceeding LLM context limits
  SOLUTION:  Semantic chunking + sliding window overlap
  RESULT:    99% context preservation, 0 truncation errors ✓

[2024-02-18] 3000 simultaneous check-ins at event
  CHALLENGE: Server crash under spike load
  SOLUTION:  Offline PWA + IndexedDB + batch sync
  RESULT:    Zero downtime, 100% check-in success rate ✓

[2024-11-05] Hydration mismatch in Next.js App Router
  CHALLENGE: Client/server state divergence in auth flows
  SOLUTION:  Proper Suspense boundaries + useLayoutEffect
  RESULT:    Clean hydration, no console errors ✓

# STATUS: All systems nominal. New challenges welcomed.`,
  },
];

export default function CodeEditor() {
  const [activeTab, setActiveTab] = useState(0);
  const [displayedCode, setDisplayedCode] = useState('');
  const typingRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const file = FILES[activeTab];

  useEffect(() => {
    setDisplayedCode('');
    let i = 0;
    const target = file.content;

    const type = () => {
      if (i >= target.length) return;
      i += Math.floor(Math.random() * 3) + 3;
      setDisplayedCode(target.slice(0, i));
      typingRef.current = setTimeout(type, 8);
    };

    typingRef.current = setTimeout(type, 80);
    return () => {
      if (typingRef.current) clearTimeout(typingRef.current);
    };
  }, [activeTab]);

  const lineCount = displayedCode.split('\n').length;

  return (
    <section id="ide" className="section" style={{ background: 'var(--bg-primary)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <div className="section-label">Terminal</div>
          <h2 className="section-title">
            The <span className="gradient-text">IDE View</span>
          </h2>
          <p className="section-desc">
            A developer's perspective — peek behind the code.
          </p>
        </motion.div>

        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{
            borderRadius: 16,
            overflow: 'hidden',
            border: '1px solid var(--border)',
            boxShadow: '0 24px 80px rgba(0,0,0,0.5)',
            maxWidth: 900, margin: '0 auto',
          }}
        >
          {/* Window chrome */}
          <div style={{
            background: '#1a1a2e', padding: '0.75rem 1rem',
            display: 'flex', alignItems: 'center', gap: '0.75rem',
            borderBottom: '1px solid rgba(255,255,255,0.06)',
          }}>
            <div style={{ display: 'flex', gap: '0.4rem' }}>
              {['#ff5f57', '#febc2e', '#28c840'].map(c => (
                <div key={c} style={{ width: 12, height: 12, borderRadius: '50%', background: c }} />
              ))}
            </div>
            <div style={{
              flex: 1, textAlign: 'center',
              fontFamily: 'var(--font-mono)', fontSize: '0.8rem',
              color: 'var(--text-muted)',
            }}>
              mazen-portfolio — VS Code
            </div>
            <div style={{ width: 60 }} />
          </div>

          {/* Editor area */}
          <div style={{ display: 'flex', background: '#11111e', minHeight: 420 }}>
            {/* File tree */}
            <div style={{
              width: 180, padding: '1rem 0',
              borderRight: '1px solid rgba(255,255,255,0.05)',
              background: '#0f0f1c',
              flexShrink: 0,
            }}>
              <div style={{ padding: '0 0.75rem 0.5rem', fontSize: '0.7rem', color: 'var(--text-muted)', letterSpacing: '0.08em', textTransform: 'uppercase', fontFamily: 'var(--font-mono)' }}>
                Explorer
              </div>
              <div style={{ padding: '0 0.5rem 0.25rem', fontSize: '0.72rem', color: 'var(--text-muted)', fontFamily: 'var(--font-mono)' }}>
                📁 portfolio/
              </div>
              {FILES.map((f, i) => (
                <button
                  key={f.name}
                  onClick={() => setActiveTab(i)}
                  style={{
                    width: '100%', padding: '0.35rem 0.75rem 0.35rem 1.25rem',
                    display: 'flex', alignItems: 'center', gap: '0.5rem',
                    background: activeTab === i ? 'rgba(99,102,241,0.15)' : 'transparent',
                    border: 'none', cursor: 'pointer',
                    color: activeTab === i ? 'var(--text-primary)' : 'var(--text-muted)',
                    fontSize: '0.78rem', fontFamily: 'var(--font-mono)',
                    textAlign: 'left', transition: 'all 0.15s',
                    borderLeft: activeTab === i ? '2px solid var(--indigo)' : '2px solid transparent',
                  }}
                  onMouseEnter={e => { if (activeTab !== i) (e.currentTarget.style.color = 'var(--text-secondary)'); }}
                  onMouseLeave={e => { if (activeTab !== i) (e.currentTarget.style.color = 'var(--text-muted)'); }}
                >
                  <span style={{ fontSize: '0.65rem', opacity: 0.7 }}>{f.icon}</span>
                  {f.name}
                </button>
              ))}
            </div>

            {/* Editor */}
            <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
              {/* Tabs */}
              <div style={{ display: 'flex', background: '#0f0f1c', borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                {FILES.map((f, i) => (
                  <button
                    key={f.name}
                    onClick={() => setActiveTab(i)}
                    style={{
                      padding: '0.5rem 1.25rem',
                      background: activeTab === i ? '#11111e' : 'transparent',
                      border: 'none', cursor: 'pointer',
                      color: activeTab === i ? 'var(--text-primary)' : 'var(--text-muted)',
                      fontSize: '0.8rem', fontFamily: 'var(--font-mono)',
                      borderBottom: activeTab === i ? '1px solid var(--indigo)' : '1px solid transparent',
                      transition: 'all 0.15s',
                    }}
                  >
                    {f.name}
                  </button>
                ))}
              </div>

              {/* Code area */}
              <div style={{ flex: 1, overflow: 'auto', padding: '1rem 0', position: 'relative' }}>
                <AnimatePresence mode="wait">
                  <motion.div
                    key={activeTab}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -10 }}
                    transition={{ duration: 0.2 }}
                    style={{ display: 'flex', minHeight: '100%' }}
                  >
                    {/* Line numbers */}
                    <div style={{
                      padding: '0 0.75rem',
                      minWidth: 48,
                      textAlign: 'right',
                      color: 'rgba(255,255,255,0.2)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.78rem',
                      lineHeight: '1.6em',
                      userSelect: 'none',
                      flexShrink: 0,
                    }}>
                      {Array.from({ length: lineCount }, (_, i) => (
                        <div key={i}>{i + 1}</div>
                      ))}
                    </div>

                    {/* Highlighted code */}
                    <div style={{ flex: 1, paddingRight: '1rem' }}>
                      <Highlight
                        theme={themes.vsDark}
                        code={displayedCode}
                        language={file.language as any}
                      >
                        {({ className, style, tokens, getLineProps, getTokenProps }) => (
                          <pre
                            className={className}
                            style={{
                              ...style,
                              background: 'transparent',
                              margin: 0,
                              padding: 0,
                              fontFamily: 'var(--font-mono)',
                              fontSize: '0.82rem',
                              lineHeight: '1.6em',
                              whiteSpace: 'pre-wrap',
                              wordBreak: 'break-word',
                            }}
                          >
                            {tokens.map((line, i) => (
                              <div key={i} {...getLineProps({ line })}>
                                {line.map((token, key) => (
                                  <span key={key} {...getTokenProps({ token })} />
                                ))}
                              </div>
                            ))}
                          </pre>
                        )}
                      </Highlight>
                      {/* Blinking cursor */}
                      <span style={{
                        display: 'inline-block', width: 2, height: '1em',
                        background: 'var(--indigo)', marginLeft: 1,
                        verticalAlign: 'middle',
                        animation: 'blink 1.1s step-end infinite',
                      }} />
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </div>
          </div>

          {/* Status bar */}
          <div style={{
            background: 'var(--indigo)', padding: '0.25rem 1rem',
            display: 'flex', gap: '1.5rem', alignItems: 'center',
            fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'rgba(255,255,255,0.85)',
          }}>
            <span>⎇ main</span>
            <span>Ln {lineCount}, Col 1</span>
            <span>{file.language.toUpperCase()}</span>
            <span style={{ marginLeft: 'auto' }}>UTF-8</span>
            <span>Spaces: 2</span>
          </div>
        </motion.div>
      </div>

      <style>{`
        @keyframes blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
