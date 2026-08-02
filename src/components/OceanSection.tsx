import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ============================================================
   OCEAN SECTION — Alexandria sunset beach (two design variants)
   - Apple-style liquid glass frame
   - Full pixel-art beach scene per panel:
     sunset sky, sun, clouds, city lights, seagulls,
     turquoise water w/ tide + swash, peach sand,
     LEGO-block leaning palm tree
   - Rain droplets behind the glass
   ============================================================ */

type Variant = 'golden' | 'dusk';

interface Palette {
  sky: string[];
  sun: { core: string; mid: string; glow: string };
  water: string[];
  crest: string;
  foam: string[];
  sand: string[];
  wetSand: string;
  cityLights: string[];
  stars: boolean;
  gull: string;
}

const PALETTES: Record<Variant, Palette> = {
  golden: {
    sky: ['#12294a', '#1d4560', '#2f6d7d', '#c98a52', '#e8744c', '#f2955c'],
    sun: { core: '#ffe9c0', mid: '#ffc276', glow: '#ff9d5c' },
    water: ['#176d80', '#1f8797', '#2aa0ab', '#3cb8bd', '#55cbc9'],
    crest: '#7fdcd6',
    foam: ['#f6fcfc', '#d9f2f0', '#b2e2de'],
    sand: ['#e5c193', '#d9b284', '#caa273'],
    wetSand: '#b08a5e',
    cityLights: ['#ffd98a', '#ffb27a', '#ffe9b0', '#ff9d6e'],
    stars: false,
    gull: '#243040',
  },
  dusk: {
    sky: ['#0a1630', '#10294a', '#174060', '#2a5f72', '#7a5a4a', '#c97f4e'],
    sun: { core: '#ffddad', mid: '#f2a668', glow: '#d98a52' },
    water: ['#0d4a5a', '#11616f', '#187a85', '#249097', '#33a5a8'],
    crest: '#4fc0bd',
    foam: ['#e8f6f6', '#c3e6e4', '#96cfcc'],
    sand: ['#c7a67e', '#b8946c', '#a8845e'],
    wetSand: '#84683f',
    cityLights: ['#ffd98a', '#8fd0ff', '#ffb27a', '#ffe9b0', '#a4ffcf'],
    stars: true,
    gull: '#0d1626',
  },
};

/* deterministic pseudo-random */
function hash(n: number) {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

/* ---------- Full pixel beach scene ---------- */
function PixelBeach({ variant }: { variant: Variant }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const pal = PALETTES[variant];
    const P = 6; // pixel size
    let raf = 0;
    let lastFrame = 0;
    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;

    type Gull = { x: number; y: number; v: number; size: number };
    let gulls: Gull[] = [];
    let nextGull = 2 + Math.random() * 3;

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.floor(rect.width);
      H = Math.floor(rect.height);
      canvas.width = W;
      canvas.height = H;
      cols = Math.ceil(W / P);
      rows = Math.ceil(H / P);
    };
    resize();
    window.addEventListener('resize', resize);

    /* ---- LEGO palm tree — hand-authored pixel sprite ---- */
    // legend: t=trunk dark, T=trunk light, g=leaf dark, G=leaf mid, L=leaf light, c=coconut
    const PALM_SPRITE = [
      '..........gGG............',
      '......gGGLLLLGg...gGGg...',
      '....gGLLLLLLLLGGgGLLLGg..',
      '...gLLLGgggLLLLLLLGgLLLg.',
      '..gLLGg..gGLLLLLLGg..gLLg',
      '.gLGg...gGLLLGgLLLGg...gL',
      '.gG....gLLGg.c.gLLGg....g',
      '.......gGg..cTc..gGg.....',
      '..........c.TT.c.........',
      '............TT...........',
      '............TT...........',
      '...........TTt...........',
      '...........TT............',
      '..........TTt............',
      '..........TT.............',
      '.........TTt.............',
      '.........TT..............',
      '........TTt..............',
      '........TT...............',
      '.......TTt...............',
      '.......TT................',
      '......TTt................',
      '......TT.................',
      '.....TTt.................',
      '.....TT..................',
      '....TTt..................',
      '....TTT..................',
      '...TTTt..................',
      '...TTT...................',
      '..TTTt...................',
      '..TTTT...................',
      '.TTTTt...................',
    ];
    const PALM_COLORS: Record<string, string> = {
      t: '#5c3f28',
      T: '#7d5838',
      g: '#186234',
      G: '#2a9450',
      L: '#3fb063',
      c: '#4a2f1c',
    };

    const drawPalm = (t: number) => {
      const B = Math.max(10, Math.floor(H / 42)); // LEGO block size
      const spriteH = PALM_SPRITE.length;
      const baseY = H - spriteH * B; // bottom of sprite sits at panel bottom
      const baseX = -B; // tucked into the left corner

      for (let ry = 0; ry < spriteH; ry++) {
        const row = PALM_SPRITE[ry];
        // fronds (rows 0-8) sway gently; trunk stays put
        const swayBlocks =
          ry < 9 ? Math.round(Math.sin(t * 0.8) * (1.4 * (9 - ry)) / 9) : 0;
        for (let rx = 0; rx < row.length; rx++) {
          const ch = row[rx];
          if (ch === '.') continue;
          const px = baseX + (rx + swayBlocks) * B;
          const py = baseY + ry * B;
          ctx.fillStyle = PALM_COLORS[ch];
          ctx.fillRect(px, py, B - 1, B - 1);
          // LEGO stud highlight
          ctx.fillStyle = 'rgba(255,255,255,0.16)';
          const stud = Math.max(3, Math.floor(B * 0.3));
          ctx.fillRect(px + Math.floor(B * 0.22), py + Math.floor(B * 0.18), stud, stud);
        }
      }
    };

    const draw = (now: number) => {
      // throttle to ~30fps — two full pixel scenes are heavy at 60
      if (now - lastFrame < 33) {
        raf = requestAnimationFrame(draw);
        return;
      }
      lastFrame = now;
      const t = now / 1000;
      ctx.clearRect(0, 0, W, H);

      const horizonRow = rows * 0.44;
      const tide = Math.sin(t * 0.25) * rows * 0.04;
      const swashPhase = t * 0.65;
      const swash = (Math.sin(swashPhase) * 0.5 + 0.5) ** 1.6 * rows * 0.16;

      const sunX = Math.floor(cols * 0.72);
      const sunY = variant === 'golden' ? horizonRow - rows * 0.10 : horizonRow - rows * 0.035;
      const sunR = rows * (variant === 'golden' ? 0.075 : 0.06);

      for (let cx = 0; cx < cols; cx++) {
        const x = cx * P;

        const sandRow =
          rows * 0.78 + Math.sin(cx * 0.09) * 1.8 + Math.sin(cx * 0.031 + 2) * 2.6;

        const surfRow =
          horizonRow +
          Math.sin(cx * 0.10 - t * 1.6) * 1.6 +
          Math.sin(cx * 0.045 - t * 0.9) * 2.0 +
          tide;

        const swashRow =
          sandRow -
          swash * (0.75 + 0.25 * Math.sin(cx * 0.05 - swashPhase * 1.4)) +
          Math.sin(cx * 0.3 + t * 2) * 0.7;

        for (let cy = 0; cy < rows; cy++) {
          const y = cy * P;
          let color: string;

          if (cy < horizonRow) {
            /* ---- SKY ---- */
            const su = cy / horizonRow;
            const dith = (hash(cx * 13.3 + cy * 7.7) - 0.5) * 0.028;
            const bi = Math.min(
              pal.sky.length - 1,
              Math.max(0, Math.floor((su + dith) * pal.sky.length))
            );
            color = pal.sky[bi];

            // sun disc
            const dx = cx - sunX;
            const dy = (cy - sunY) * 1.15;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < sunR * 0.55) color = pal.sun.core;
            else if (dist < sunR * 0.8) color = pal.sun.mid;
            else if (dist < sunR) color = pal.sun.glow;

            // stars (dusk only, upper sky)
            if (pal.stars && su < 0.5 && hash(cx * 91.7 + cy * 41.3) > 0.9965) {
              color = hash(cx + cy) > 0.5 ? '#fdf6e0' : '#cfe4ff';
            }

            // drifting pixel clouds — soft elliptical blobs
            if (su > 0.1 && su < 0.6) {
              const cloudColor = variant === 'golden' ? '#e8a878' : '#2f4a63';
              for (let ci = 0; ci < 3; ci++) {
                const ccx = ((0.18 + ci * 0.33) * cols + t * (1.5 + ci * 0.5)) % (cols + 20) - 10;
                const ccy = (0.16 + ci * 0.11) * horizonRow;
                const cwid = (0.075 + ci * 0.02) * cols;
                const chgt = 2.4 + ci * 0.6;
                const ddx = (cx - ccx) / cwid;
                const ddy = (cy - ccy) / chgt;
                const d2 = ddx * ddx + ddy * ddy;
                if (d2 < 1 && hash(cx * 3.1 + cy * 9.7 + ci * 31) > d2 * 0.55) {
                  color = cloudColor;
                  break;
                }
              }
            }
          } else if (cy < surfRow) {
            /* ---- horizon strip + city lights ---- */
            color = pal.water[0];
            if (cy < horizonRow + 1.5) {
              const lightSeed = hash(cx * 17.9);
              if (lightSeed > 0.55) {
                const twinkle = hash(cx * 7.3 + Math.floor(t * 2.5)) > 0.25;
                if (twinkle) {
                  color = pal.cityLights[Math.floor(lightSeed * 10) % pal.cityLights.length];
                }
              }
            }
          } else if (cy < surfRow + 1.4) {
            color = pal.foam[0];
          } else if (cy < sandRow) {
            /* ---- WATER ---- */
            const depth = (cy - surfRow) / Math.max(1, sandRow - surfRow);
            const band = Math.sin(cx * 0.08 - t * 2.2 + cy * 0.45);
            if (band > 0.92) {
              color = pal.crest;
            } else {
              const wi = Math.min(
                pal.water.length - 1,
                Math.floor(depth * pal.water.length)
              );
              color = pal.water[wi];
            }
            // sun reflection — narrow shimmering path, fades with depth
            const rdx = Math.abs(cx - sunX + Math.round(Math.sin(cy * 0.5 + t * 1.5)));
            if (
              rdx < 2 &&
              depth < 0.7 &&
              hash(cy * 5.1 + Math.floor(t * 5)) > 0.35 + depth * 0.6
            ) {
              color = variant === 'golden' ? '#ffd9a0' : '#f2c088';
            }
            // sparkle glints
            if (
              Math.sin(cx * 1.7 + Math.floor(t * 3)) * Math.cos(cy * 2.3 - Math.floor(t * 2)) >
              0.985
            ) {
              color = pal.foam[2];
            }
          } else {
            /* ---- BEACH ---- */
            if (cy < swashRow) {
              const s = pal.sand[(cx * 7 + cy * 13) % 3 === 0 ? 2 : cx % 2];
              color = cy - sandRow < 1.5 ? pal.wetSand : s;
            } else if (cy < swashRow + 2) {
              color = pal.foam[cy - swashRow < 1 ? 0 : 1];
            } else if (cy < swashRow + 5) {
              color = pal.water[Math.min(pal.water.length - 1, 3)];
            } else {
              const s = pal.sand[(cx * 7 + cy * 13) % 3 === 0 ? 2 : cx % 2];
              color = cy < sandRow + swash * 0.4 + 5 ? pal.wetSand : s;
            }
          }

          ctx.fillStyle = color;
          ctx.fillRect(x, y, P, P);
        }
      }

      /* ---- seagulls ---- */
      nextGull -= 1 / 60;
      if (nextGull <= 0 && gulls.length < 3) {
        gulls.push({
          x: -30,
          y: H * (0.08 + Math.random() * 0.2),
          v: 28 + Math.random() * 22,
          size: 2 + Math.random() * 1.5,
        });
        nextGull = 5 + Math.random() * 6;
      }
      gulls = gulls.filter((g) => g.x < W + 40);
      for (const g of gulls) {
        g.x += g.v / 60;
        const flap = Math.floor(t * 7 + g.x * 0.05) % 2;
        const s = g.size;
        ctx.fillStyle = pal.gull;
        // simple 2-frame wing sprite
        if (flap === 0) {
          ctx.fillRect(g.x - s * 3, g.y - s, s * 2, s);
          ctx.fillRect(g.x + s, g.y - s, s * 2, s);
          ctx.fillRect(g.x - s, g.y, s * 2, s);
        } else {
          ctx.fillRect(g.x - s * 3, g.y + s, s * 2, s);
          ctx.fillRect(g.x + s, g.y + s, s * 2, s);
          ctx.fillRect(g.x - s, g.y, s * 2, s);
        }
      }

      /* ---- LEGO palm on top of everything ---- */
      drawPalm(t);

      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, [variant]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        imageRendering: 'pixelated',
      }}
    />
  );
}

/* ---------- Rain droplets (behind the glass) ---------- */
function RainOnGlass() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let W = 0;
    let H = 0;

    type Drop = { x: number; y: number; r: number; vy: number; wobble: number };
    let drops: Drop[] = [];

    const spawn = (): Drop => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.5,
      r: 1.5 + Math.random() * 3,
      vy: 0.12 + Math.random() * 0.45,
      wobble: Math.random() * Math.PI * 2,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.floor(rect.width);
      H = Math.floor(rect.height);
      canvas.width = W;
      canvas.height = H;
      drops = Array.from({ length: Math.floor(W / 30) }, () => {
        const d = spawn();
        d.y = Math.random() * H;
        return d;
      });
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, W, H);
      for (const d of drops) {
        d.wobble += 0.02;
        d.y += d.vy * (d.r / 2.5);
        d.x += Math.sin(d.wobble) * 0.12;
        if (d.y > H + 10) Object.assign(d, spawn(), { y: -5 });

        const grad = ctx.createLinearGradient(d.x, d.y - d.r * 6, d.x, d.y);
        grad.addColorStop(0, 'rgba(255,245,235,0)');
        grad.addColorStop(1, 'rgba(255,245,235,0.10)');
        ctx.fillStyle = grad;
        ctx.fillRect(d.x - d.r * 0.35, d.y - d.r * 6, d.r * 0.7, d.r * 6);

        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,250,240,0.16)';
        ctx.fill();

        ctx.beginPath();
        ctx.arc(d.x - d.r * 0.3, d.y - d.r * 0.3, d.r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.32)';
        ctx.fill();
      }
      raf = requestAnimationFrame(draw);
    };
    raf = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        display: 'block',
        zIndex: 3,
        pointerEvents: 'none',
      }}
    />
  );
}

/* ---------- Liquid glass panel (Apple style) ---------- */
function GlassPanel({
  variant,
  label,
}: {
  variant: Variant;
  label: string;
}) {
  return (
    <div
      style={{
        position: 'relative',
        flex: 1,
        minWidth: 320,
        borderRadius: 28,
        overflow: 'hidden',
        // Apple liquid glass: translucent, bright edge, inner specular
        background: 'rgba(255,255,255,0.045)',
        backdropFilter: 'blur(18px) saturate(1.6)',
        WebkitBackdropFilter: 'blur(18px) saturate(1.6)',
        border: '1px solid rgba(255,255,255,0.18)',
        boxShadow:
          'inset 0 1px 1px rgba(255,255,255,0.25), inset 0 -1px 1px rgba(255,255,255,0.06), 0 18px 50px rgba(0,0,0,0.45)',
      }}
    >
      <PixelBeach variant={variant} />

      {/* specular streak over the scene — the glass feel */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          pointerEvents: 'none',
          background:
            'linear-gradient(118deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0.035) 22%, transparent 40%, transparent 68%, rgba(255,255,255,0.08) 100%)',
        }}
      />

      {/* label chip */}
      <div
        style={{
          position: 'absolute',
          top: 18,
          left: 18,
          zIndex: 4,
          padding: '8px 16px',
          borderRadius: 999,
          fontSize: 13,
          fontWeight: 600,
          letterSpacing: '0.08em',
          color: 'rgba(255,255,255,0.92)',
          background: 'rgba(10,15,30,0.45)',
          backdropFilter: 'blur(10px)',
          WebkitBackdropFilter: 'blur(10px)',
          border: '1px solid rgba(255,255,255,0.22)',
        }}
      >
        {label}
      </div>
    </div>
  );
}

/* ---------- Section ---------- */
export default function OceanSection() {
  const sectionRef = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start end', 'start 0.15'],
  });
  const scale = useTransform(scrollYProgress, [0, 1], [0.92, 1]);
  const radius = useTransform(scrollYProgress, [0, 1], [40, 0]);
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0.4, 1]);

  return (
    <section
      ref={sectionRef}
      id="sea"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        zIndex: 5,
      }}
    >
      <motion.div
        style={{
          position: 'absolute',
          inset: 0,
          overflow: 'hidden',
          scale,
          borderRadius: radius,
          opacity,
          background:
            'linear-gradient(to bottom, rgba(12,18,38,0.55) 0%, rgba(14,24,48,0.65) 100%)',
          backdropFilter: 'blur(12px) saturate(1.3)',
          WebkitBackdropFilter: 'blur(12px) saturate(1.3)',
          border: '1px solid rgba(255,255,255,0.10)',
        }}
      >
        {/* the two design panels */}
        <div
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 1,
            display: 'flex',
            flexWrap: 'wrap',
            gap: 20,
            padding: 24,
          }}
        >
          <GlassPanel variant="golden" label="A — GOLDEN HOUR" />
          <GlassPanel variant="dusk" label="B — BLUE DUSK" />
        </div>

        {/* rain droplets over the whole glass */}
        <RainOnGlass />
      </motion.div>
    </section>
  );
}
