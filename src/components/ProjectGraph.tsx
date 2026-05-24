import { useState, useRef, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Sphere, Line, Text, Stars } from '@react-three/drei';
import { motion } from 'framer-motion';
import * as THREE from 'three';
import { projects, techNodes, type Project, type TechNode } from '../data/projects';
import { fadeInUp, staggerContainer, springReveal, viewportSettings } from '../lib/animations';

// ---- 3D Graph ----
const nodePositions: Record<string, [number, number, number]> = {
  react:      [ 2,  1.5,  0],
  nextjs:     [ 2, -1,    0],
  typescript: [ 3.5, 0.5, 0.5],
  tailwind:   [ 4,  2,   -0.5],
  framer:     [ 4.5, -0.5, 0.5],
  python:     [-2,  1.5,  0],
  fastapi:    [-2, -1,    0.5],
  nodejs:     [-3.5, 0.5,-0.5],
  pytorch:    [-3, -2,   0.5],
  openai:     [-1.5, -2.5, -0.5],
  yolo:       [-4, -1,   -0.5],
  opencv:     [-4,  1,    0.5],
  langchain:  [-1, -3,    0],
  postgres:   [ 0,  3,    0],
  mongodb:    [ 1.5, 2.5, -0.5],
  pinecone:   [-0.5, -3.5, 0.5],
  d3:         [ 3.5, -2,  -0.5],
};

const edges = [
  ['react', 'nextjs'], ['react', 'typescript'], ['react', 'framer'],
  ['nextjs', 'typescript'], ['nextjs', 'tailwind'], ['nextjs', 'postgres'],
  ['python', 'fastapi'], ['python', 'pytorch'], ['python', 'opencv'],
  ['python', 'openai'], ['python', 'langchain'],
  ['fastapi', 'nodejs'], ['pytorch', 'yolo'], ['openai', 'langchain'],
  ['langchain', 'pinecone'], ['react', 'nodejs'], ['mongodb', 'nodejs'],
  ['react', 'd3'], ['postgres', 'python'],
];

interface NodeMeshProps {
  node: TechNode;
  position: [number, number, number];
  selected: boolean;
  onClick: () => void;
}

function NodeMesh({ node, position, selected, onClick }: NodeMeshProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((_, delta) => {
    if (!meshRef.current) return;
    meshRef.current.rotation.y += delta * 0.5;
    const target = hovered || selected ? node.size * 0.012 + 0.03 : node.size * 0.01;
    meshRef.current.scale.setScalar(
      THREE.MathUtils.lerp(meshRef.current.scale.x, target, 0.1)
    );
  });



  return (
    <group position={position}>
      <Sphere
        ref={meshRef}
        args={[node.size * 0.01, 16, 16]}
        onClick={onClick}
        onPointerOver={() => { setHovered(true); document.body.style.cursor = 'pointer'; }}
        onPointerOut={() => { setHovered(false); document.body.style.cursor = 'default'; }}
      >
        <meshStandardMaterial
          color={selected ? '#10b981' : '#111827'}
          emissive={selected ? '#10b981' : '#111827'}
          emissiveIntensity={selected ? 0.4 : 0.1}
          roughness={0.2}
          metalness={0.6}
        />
      </Sphere>
      {(hovered || selected) && (
        <Text
          position={[0, node.size * 0.012 + 0.12, 0]}
          fontSize={0.15}
          color="white"
          anchorX="center"
          anchorY="bottom"
          font="https://fonts.gstatic.com/s/inter/v13/UcCO3FwrK3iLTeHuS_fvQtMwCp50KnMw2boKoduKmMEVuLyfAZ9hiJ-Ek-_EeA.woff2"
        >
          {node.label}
        </Text>
      )}
    </group>
  );
}

function Graph3D({ selectedNode, onNodeClick }: { selectedNode: string | null; onNodeClick: (id: string) => void }) {
  return (
    <>
      <Stars radius={30} depth={50} count={2000} factor={2} saturation={0} fade speed={0.5} />
      <ambientLight intensity={0.8} />
      <pointLight position={[5, 5, 5]} intensity={1} />
      <pointLight position={[-5, -5, -5]} intensity={0.5} color="#8b5cf6" />

      {/* Edges */}
      {edges.map(([src, tgt], i) => {
        const a = nodePositions[src];
        const b = nodePositions[tgt];
        if (!a || !b) return null;
        return (
          <Line
            key={i}
            points={[a, b]}
            color="rgba(99,102,241,0.5)"
            lineWidth={0.8}
          />
        );
      })}

      {/* Nodes */}
      {techNodes.map(node => {
        const pos = nodePositions[node.id];
        if (!pos) return null;
        return (
          <NodeMesh
            key={node.id}
            node={node}
            position={pos}
            selected={selectedNode === node.id}
            onClick={() => onNodeClick(node.id)}
          />
        );
      })}

      <OrbitControls
        enablePan={false}
        minDistance={5}
        maxDistance={18}
        autoRotate
        autoRotateSpeed={0.5}
      />
    </>
  );
}

// ---- Project Card ----
function ProjectCard({ project, active }: { project: Project; active: boolean }) {
  const [flipped, setFlipped] = useState(false);

  return (
    <motion.div
      layout
      variants={springReveal}
      animate={{ opacity: active ? 1 : 0.4, scale: active ? 1 : 0.96 }}
      transition={{ duration: 0.3 }}
      style={{ perspective: 1000 }}
      onHoverStart={() => setFlipped(true)}
      onHoverEnd={() => setFlipped(false)}
    >
      <motion.div
        animate={{ rotateY: flipped ? 180 : 0 }}
        transition={{ type: 'spring', stiffness: 200, damping: 24 }}
        style={{
          position: 'relative',
          transformStyle: 'preserve-3d',
          minHeight: 240,
          borderRadius: 16,
          cursor: 'pointer',
        }}
      >
        {/* Front */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          borderRadius: 16,
          background: 'var(--bg-card)',
          border: '1px solid var(--border)',
          overflow: 'hidden',
          boxShadow: active ? 'var(--shadow-card-hover)' : 'none',
        }}>
          <div style={{ height: 100, background: project.gradient, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <div style={{
              fontFamily: 'var(--font-mono)', fontSize: '1.6rem', fontWeight: 800, color: 'white',
              textShadow: '0 2px 8px rgba(0,0,0,0.4)',
            }}>{project.name[0]}</div>
          </div>
          <div style={{ padding: '1.25rem' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
              <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.95rem', fontWeight: 700, color: 'var(--text-primary)' }}>
                {project.name}
              </h3>
              <span style={{
                fontSize: '0.7rem', padding: '2px 8px', borderRadius: 999,
                background: project.category === 'AI' ? 'rgba(16,185,129,0.15)' : project.category === 'Web' ? 'rgba(59,130,246,0.15)' : 'rgba(99,102,241,0.15)',
                color: project.category === 'AI' ? 'var(--code-green)' : project.category === 'Web' ? 'var(--ai-blue)' : 'var(--indigo)',
                border: `1px solid ${project.category === 'AI' ? 'rgba(16,185,129,0.3)' : project.category === 'Web' ? 'rgba(59,130,246,0.3)' : 'rgba(99,102,241,0.3)'}`,
                fontFamily: 'var(--font-mono)',
              }}>{project.category}</span>
            </div>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.82rem', lineHeight: 1.6, marginBottom: '0.75rem' }}>
              {project.description}
            </p>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.3rem' }}>
              {project.techs.slice(0, 4).map(t => (
                <span key={t} style={{
                  fontSize: '0.68rem', padding: '1px 8px', borderRadius: 999,
                  background: 'var(--bg-glass)', border: '1px solid var(--border)',
                  color: 'var(--text-muted)', fontFamily: 'var(--font-mono)',
                }}>{t}</span>
              ))}
              {project.techs.length > 4 && (
                <span style={{ fontSize: '0.68rem', color: 'var(--text-muted)', padding: '1px 4px' }}>+{project.techs.length - 4}</span>
              )}
            </div>
          </div>
        </div>

        {/* Back */}
        <div style={{
          position: 'absolute', inset: 0,
          backfaceVisibility: 'hidden',
          transform: 'rotateY(180deg)',
          borderRadius: 16,
          background: `linear-gradient(145deg, ${project.color}20, var(--bg-card))`,
          border: `1px solid ${project.color}30`,
          padding: '1.5rem',
          display: 'flex', flexDirection: 'column', gap: '0.75rem',
          overflow: 'hidden',
        }}>
          <h3 style={{ fontFamily: 'var(--font-mono)', fontSize: '0.9rem', fontWeight: 700, color: 'var(--text-primary)' }}>
            {project.name}
          </h3>
          <p style={{ color: 'var(--text-secondary)', fontSize: '0.8rem', lineHeight: 1.7, flex: 1 }}>
            {project.longDescription}
          </p>
          <div style={{ display: 'flex', gap: '0.5rem', marginTop: 'auto' }}>
            {project.liveUrl && (
              <a href={project.liveUrl} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  padding: '0.4rem 0.85rem', borderRadius: 8, fontSize: '0.78rem',
                  background: project.gradient, color: 'white', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600,
                }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/></svg>
                Live
              </a>
            )}
            {project.githubUrl && (
              <a href={project.githubUrl} target="_blank" rel="noopener noreferrer"
                onClick={e => e.stopPropagation()}
                style={{
                  padding: '0.4rem 0.85rem', borderRadius: 8, fontSize: '0.78rem',
                  background: 'rgba(255,255,255,0.08)', color: 'var(--text-primary)', textDecoration: 'none',
                  display: 'flex', alignItems: 'center', gap: '0.3rem', fontWeight: 600,
                  border: '1px solid var(--border)',
                }}>
                <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/></svg>
                GitHub
              </a>
            )}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

// ---- Main Section ----
export default function ProjectGraph() {
  const [selectedNode, setSelectedNode] = useState<string | null>(null);

  const handleNodeClick = (id: string) => {
    setSelectedNode(prev => prev === id ? null : id);
  };

  const filteredProjects = selectedNode
    ? projects.filter(p => {
        const node = techNodes.find(n => n.id === selectedNode);
        return node ? p.techs.some(t => t.toLowerCase().includes(node.label.toLowerCase()) || node.label.toLowerCase().includes(t.toLowerCase())) : true;
      })
    : projects;

  const activeIds = new Set(filteredProjects.map(p => p.id));

  return (
    <section id="projects" className="section" style={{ background: 'var(--bg-secondary)' }}>
      <div className="container">
        <motion.div
          className="section-header"
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
        >
          <div className="section-label">Work</div>
          <h2 className="section-title">
            Projects <span className="gradient-text">& Tech Graph</span>
          </h2>
          <p className="section-desc">
            Click a technology node to filter projects. Drag to rotate the 3D graph.
          </p>
        </motion.div>

        {/* 3D Canvas */}
        <motion.div
          variants={fadeInUp}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{
            height: 420, borderRadius: 20,
            border: '1px solid var(--border)',
            overflow: 'hidden',
            background: '#0f172a',
            marginBottom: '2rem',
            position: 'relative',
          }}
        >
          <Canvas camera={{ position: [0, 0, 12], fov: 60 }}>
            <Suspense fallback={null}>
              <Graph3D selectedNode={selectedNode} onNodeClick={handleNodeClick} />
            </Suspense>
          </Canvas>
          {selectedNode && (
            <button
              onClick={() => setSelectedNode(null)}
              style={{
                position: 'absolute', top: '1rem', right: '1rem',
                padding: '0.4rem 1rem', borderRadius: 8,
                background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(8px)',
                border: '1px solid var(--border)',
                color: 'var(--text-primary)', cursor: 'pointer', fontSize: '0.82rem',
                fontFamily: 'var(--font-mono)',
              }}
            >
              Clear filter ✕
            </button>
          )}
          <div style={{
            position: 'absolute', bottom: '1rem', left: '1rem',
            padding: '0.4rem 0.85rem',
            background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(8px)',
            border: '1px solid var(--border)',
            borderRadius: 8, fontSize: '0.75rem', color: 'var(--text-muted)',
            fontFamily: 'var(--font-mono)',
          }}>
            🖱 Drag to rotate · Click node to filter
          </div>
        </motion.div>

        {/* Filter indicator */}
        {selectedNode && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            style={{
              textAlign: 'center', marginBottom: '1.5rem',
              fontFamily: 'var(--font-mono)', fontSize: '0.85rem',
              color: 'var(--indigo)',
            }}
          >
            Filtering by: <strong>{techNodes.find(n => n.id === selectedNode)?.label}</strong> — {filteredProjects.length} project{filteredProjects.length !== 1 ? 's' : ''}
          </motion.div>
        )}

        {/* Project Cards */}
        <motion.div
          layout
          variants={staggerContainer}
          initial="hidden"
          whileInView="visible"
          viewport={viewportSettings}
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(290px, 1fr))',
            gap: '1.25rem',
          }}
        >
          {projects.map(project => (
            <ProjectCard key={project.id} project={project} active={activeIds.has(project.id)} />
          ))}
        </motion.div>
      </div>
    </section>
  );
}
