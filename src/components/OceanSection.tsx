import { useRef, useEffect } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';

/* ============================================================
   OCEAN SECTION — Alexandria night sea
   - Liquid glass translucent background
   - Pixel-art waves at the bottom (tide + swash, moving L→R)
   - Rain droplets behind the glass
   ============================================================ */

/* ---------- Pixel Ocean Canvas ---------- */
function PixelOcean() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const P = 6; // pixel (cube) size
    let raf = 0;
    let W = 0;
    let H = 0;
    let cols = 0;
    let rows = 0;

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

    // Night sea palette (inspired by pixel-art Alexandria night)
    const DEEP = ['#0a1630', '#0d1c3e', '#11254e', '#16305f'];
    const CREST = '#2a4d8f';
    const FOAM = ['#dce9f7', '#b9d2ec', '#93b4d9'];
    const WET_SAND = '#2e2620';
    const SAND = ['#463a2d', '#4f4233', '#3d332a'];

    const draw = (now: number) => {
      const t = now / 1000;
      ctx.clearRect(0, 0, W, H);

      // Slow tide (shad w gazr) — the whole waterline breathes up/down
      const tide = Math.sin(t * 0.25) * rows * 0.05;
      // Swash: the wave that runs up the shore and falls back (gif-like loop)
      const swashPhase = t * 0.7;
      const swash =
        (Math.sin(swashPhase) * 0.5 + 0.5) ** 1.6 * rows * 0.22;

      for (let cx = 0; cx < cols; cx++) {
        const x = cx * P;

        // Shore line shape (static dunes)
        const sandRow =
          rows * 0.62 +
          Math.sin(cx * 0.09) * 2.2 +
          Math.sin(cx * 0.031 + 2) * 3.5;

        // Water edge: base surface + traveling waves L→R + tide
        const surfRow =
          rows * 0.18 +
          Math.sin(cx * 0.10 - t * 1.6) * 2.4 + // main wave travels L→R
          Math.sin(cx * 0.045 - t * 0.9) * 3.2 +
          Math.sin(cx * 0.22 - t * 2.6) * 1.1 +
          tide;

        // Where the foam reaches on the sand (swash edge)
        const swashRow =
          sandRow -
          swash *
            (0.75 + 0.25 * Math.sin(cx * 0.05 - swashPhase * 1.4)) +
          Math.sin(cx * 0.3 + t * 2) * 0.8;

        for (let cy = 0; cy < rows; cy++) {
          const y = cy * P;
          let color: string | null = null;

          if (cy < surfRow) {
            // above water surface — transparent (glass bg shows through)
            continue;
          } else if (cy < surfRow + 1.6) {
            // surface foam line
            color = FOAM[cy - surfRow < 0.8 ? 0 : 1];
          } else if (cy < sandRow) {
            // open water — depth shading + moving crest highlights
            const depth = (cy - surfRow) / Math.max(1, sandRow - surfRow);
            const band = Math.sin(cx * 0.08 - t * 2.2 + cy * 0.45);
            if (band > 0.93) {
              color = CREST;
            } else {
              const di = Math.min(
                DEEP.length - 1,
                Math.floor((1 - depth) * DEEP.length)
              );
              color = DEEP[di];
            }
            // sparkle glints drifting L→R
            if (
              Math.sin(cx * 1.7 + Math.floor(t * 3)) *
                Math.cos(cy * 2.3 - Math.floor(t * 2)) >
              0.985
            ) {
              color = FOAM[2];
            }
          } else {
            // beach zone
            if (cy < swashRow) {
              // sand not reached by this swash — but recently wet near edge
              const s = SAND[(cx * 7 + cy * 13) % 3 === 0 ? 2 : cx % 2];
              color = cy - sandRow < 1.5 ? WET_SAND : s;
            } else if (cy < swashRow + 2.2) {
              // the foam edge of the swash
              color = FOAM[cy - swashRow < 1 ? 0 : 1];
            } else if (cy < swashRow + 6) {
              // thin water sheet over the sand
              color = '#20365e';
            } else {
              // sand under deeper swash water / dry sand below
              const s = SAND[(cx * 7 + cy * 13) % 3 === 0 ? 2 : cx % 2];
              color = cy < sandRow + swash * 0.4 + 6 ? WET_SAND : s;
            }
          }

          if (color) {
            ctx.fillStyle = color;
            ctx.fillRect(x, y, P, P);
          }
        }
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
        bottom: 0,
        left: 0,
        width: '100%',
        height: '46%',
        display: 'block',
        imageRendering: 'pixelated',
        zIndex: 3,
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

    type Drop = {
      x: number;
      y: number;
      r: number;
      vy: number;
      wobble: number;
      life: number;
    };
    let drops: Drop[] = [];

    const spawn = (): Drop => ({
      x: Math.random() * W,
      y: Math.random() * H * 0.5,
      r: 1.5 + Math.random() * 3.5,
      vy: 0.15 + Math.random() * 0.55,
      wobble: Math.random() * Math.PI * 2,
      life: 0,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      W = Math.floor(rect.width);
      H = Math.floor(rect.height);
      canvas.width = W;
      canvas.height = H;
      drops = Array.from({ length: Math.floor(W / 22) }, () => {
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
        d.life += 0.016;
        d.wobble += 0.02;
        // bigger drops slide faster, with slight wiggle
        d.y += d.vy * (d.r / 2.5);
        d.x += Math.sin(d.wobble) * 0.15;

        if (d.y > H + 10) {
          Object.assign(d, spawn(), { y: -5 });
        }

        // trail
        const grad = ctx.createLinearGradient(d.x, d.y - d.r * 7, d.x, d.y);
        grad.addColorStop(0, 'rgba(190,215,245,0)');
        grad.addColorStop(1, 'rgba(190,215,245,0.14)');
        ctx.fillStyle = grad;
        ctx.fillRect(d.x - d.r * 0.35, d.y - d.r * 7, d.r * 0.7, d.r * 7);

        // droplet body
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(200,225,250,0.22)';
        ctx.fill();

        // highlight
        ctx.beginPath();
        ctx.arc(d.x - d.r * 0.3, d.y - d.r * 0.3, d.r * 0.35, 0, Math.PI * 2);
        ctx.fillStyle = 'rgba(255,255,255,0.35)';
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
        zIndex: 1,
      }}
    />
  );
}

/* ---------- Section ---------- */
export default function OceanSection() {
  const sectionRef = useRef<HTMLElement>(null);

  // Entrance animation: the glass page scales/rounds in as it enters view
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
          // Liquid glass: translucent night-sea tint over the page
          background:
            'linear-gradient(to bottom, rgba(8,14,32,0.78) 0%, rgba(10,20,45,0.85) 55%, rgba(9,18,40,0.92) 100%)',
          backdropFilter: 'blur(10px) saturate(1.2)',
          WebkitBackdropFilter: 'blur(10px) saturate(1.2)',
          border: '1px solid rgba(180,210,245,0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.06)',
        }}
      >
        {/* faint stars */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 0,
            backgroundImage:
              'radial-gradient(1px 1px at 12% 18%, rgba(255,255,255,0.7) 50%, transparent 50%),' +
              'radial-gradient(1px 1px at 34% 9%, rgba(255,255,255,0.5) 50%, transparent 50%),' +
              'radial-gradient(2px 2px at 58% 22%, rgba(210,230,255,0.6) 50%, transparent 50%),' +
              'radial-gradient(1px 1px at 76% 12%, rgba(255,255,255,0.55) 50%, transparent 50%),' +
              'radial-gradient(1px 1px at 89% 28%, rgba(255,255,255,0.4) 50%, transparent 50%),' +
              'radial-gradient(2px 2px at 22% 32%, rgba(190,220,255,0.35) 50%, transparent 50%),' +
              'radial-gradient(1px 1px at 47% 15%, rgba(255,255,255,0.45) 50%, transparent 50%),' +
              'radial-gradient(1px 1px at 65% 35%, rgba(255,255,255,0.3) 50%, transparent 50%)',
          }}
        />

        {/* moon glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: '8%',
            left: '12%',
            width: 90,
            height: 90,
            borderRadius: '50%',
            background:
              'radial-gradient(circle, rgba(225,238,252,0.95) 0%, rgba(200,222,246,0.85) 45%, rgba(160,195,235,0.25) 68%, transparent 72%)',
            boxShadow: '0 0 60px 20px rgba(190,215,245,0.18)',
            zIndex: 0,
          }}
        />

        {/* rain droplets, sitting behind the glass sheen */}
        <RainOnGlass />

        {/* glass sheen overlay — makes the rain feel "behind glass" */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            inset: 0,
            zIndex: 2,
            background:
              'linear-gradient(115deg, rgba(255,255,255,0.06) 0%, transparent 30%, transparent 65%, rgba(255,255,255,0.04) 100%)',
            pointerEvents: 'none',
          }}
        />

        {/* pixel waves at the bottom */}
        <PixelOcean />
      </motion.div>
    </section>
  );
}
