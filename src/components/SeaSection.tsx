import { useRef, useEffect } from 'react';

/* ============================================================
   SEA SECTION — Alexandria / Mediterranean
   - Liquid glass background (frosted, semi-transparent)
   - Pixel-cube waves at the bottom, moving left -> right
   - Slow tide (المد والجزر) raising/lowering the whole sea
   - Rain droplets sitting behind the glass pane
   ============================================================ */

interface Drop {
  x: number;
  y: number;
  r: number;
  speed: number;
  wobble: number;
  wobbleSpeed: number;
  opacity: number;
}

export default function SeaSection() {
  const waveCanvasRef = useRef<HTMLCanvasElement>(null);
  const rainCanvasRef = useRef<HTMLCanvasElement>(null);
  const sectionRef = useRef<HTMLElement>(null);

  /* ---------- PIXEL WAVES + TIDE ---------- */
  useEffect(() => {
    const canvas = waveCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const PX = 3; // tiny pixel size — fine pixel-art look
    const dpr = Math.min(window.devicePixelRatio || 1, 2);

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    resize();
    window.addEventListener('resize', resize);

    // Mediterranean palette — many tones, deep to foam
    const palette: [number, number, number][] = [
      [8, 47, 94],     // deepest navy
      [12, 62, 118],   // deep blue
      [16, 78, 139],   // sea blue
      [15, 98, 146],   // blue-teal
      [14, 116, 144],  // teal
      [24, 142, 165],  // bright teal
      [45, 168, 185],  // light teal
      [104, 200, 212], // pale aqua
      [173, 226, 233], // near-foam
      [235, 248, 250], // foam white
    ];

    // Static hash noise (per grid cell) — dithering without flicker
    const hash = (cx: number, cy: number) => {
      const s = Math.sin(cx * 127.1 + cy * 311.7) * 43758.5453;
      return s - Math.floor(s);
    };

    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / PX);
      const rows = Math.ceil(height / PX);

      // Tide: gentle rise & fall of the sea level (المد والجزر)
      const tide = Math.sin(t * 0.22) * height * 0.08;
      // Sea occupies only the lower part of this small canvas
      const baseLevel = height * 0.38 + tide;

      for (let c = 0; c <= cols; c++) {
        const x = c * PX;

        // Layered waves, small amplitudes, moving left -> right
        const w1 = Math.sin(x * 0.014 - t * 1.1) * 6;
        const w2 = Math.sin(x * 0.03 - t * 1.7 + 2.1) * 4;
        const w3 = Math.sin(x * 0.006 - t * 0.6 + 4.2) * 8;
        const w4 = Math.sin(x * 0.055 - t * 2.4 + 1.3) * 2;

        const surfaceY = baseLevel + w1 + w2 + w3 + w4;
        const surfaceRow = Math.floor(surfaceY / PX);

        for (let r = surfaceRow; r <= rows; r++) {
          const y = r * PX;
          const depth = (y - surfaceY) / (height - surfaceY || 1); // 0 surface -> 1 bottom
          const n = hash(c, r); // 0..1 static noise per cell

          let idx: number;
          let alpha: number;

          if (r === surfaceRow) {
            // Foam crest — broken, flickering line
            const sparkle = Math.sin(x * 0.09 + t * 3.2) + n * 0.8 > 0.5;
            idx = sparkle ? 9 : 7;
            alpha = 0.95;
          } else if (r === surfaceRow + 1) {
            // Just under the crest — mix of foam remnants and aqua
            idx = n > 0.75 ? 8 : 7;
            alpha = 0.9;
          } else {
            // Map depth to palette band, then dither +/- with noise
            const band = 6 - depth * 6; // 6 (light) -> 0 (deepest)
            const dithered = band + (n - 0.5) * 2.4;
            idx = Math.max(0, Math.min(7, Math.round(dithered)));
            alpha = 0.88 + n * 0.1;

            // Rare scattered glints — random cells shimmering with time
            if (n > 0.965 && Math.sin(t * 1.6 + n * 40) > 0.3) {
              idx = Math.min(8, idx + 2);
            }
          }

          const col = palette[idx];
          ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
          ctx.fillRect(x, y, PX, PX);
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

  /* ---------- RAIN DROPLETS ON THE GLASS ---------- */
  useEffect(() => {
    const canvas = rainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let raf = 0;
    let width = 0;
    let height = 0;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let drops: Drop[] = [];

    const spawnDrop = (randomY = false): Drop => ({
      x: Math.random() * width,
      y: randomY ? Math.random() * height : -10,
      r: 2 + Math.random() * 4.5,
      speed: 0.15 + Math.random() * 0.6,
      wobble: Math.random() * Math.PI * 2,
      wobbleSpeed: 0.01 + Math.random() * 0.03,
      opacity: 0.45 + Math.random() * 0.45,
    });

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      const count = Math.floor((width * height) / 12000);
      drops = Array.from({ length: count }, () => spawnDrop(true));
    };
    resize();
    window.addEventListener('resize', resize);

    const draw = () => {
      ctx.clearRect(0, 0, width, height);

      for (const d of drops) {
        // Bigger drops slide down slowly, small ones almost stick
        d.wobble += d.wobbleSpeed;
        d.y += d.speed * (d.r / 3);
        d.x += Math.sin(d.wobble) * 0.15;

        if (d.y > height + 10) {
          Object.assign(d, spawnDrop());
        }

        // Droplet body — like water on glass
        const grad = ctx.createRadialGradient(
          d.x - d.r * 0.35,
          d.y - d.r * 0.35,
          d.r * 0.1,
          d.x,
          d.y,
          d.r
        );
        grad.addColorStop(0, `rgba(255,255,255,${d.opacity * 0.9})`);
        grad.addColorStop(0.5, `rgba(180,215,230,${d.opacity * 0.35})`);
        grad.addColorStop(1, `rgba(120,170,195,${d.opacity * 0.15})`);
        ctx.fillStyle = grad;
        ctx.beginPath();
        ctx.arc(d.x, d.y, d.r, 0, Math.PI * 2);
        ctx.fill();

        // Tiny highlight
        ctx.fillStyle = `rgba(255,255,255,${d.opacity * 0.8})`;
        ctx.beginPath();
        ctx.arc(d.x - d.r * 0.3, d.y - d.r * 0.35, d.r * 0.22, 0, Math.PI * 2);
        ctx.fill();

        // Trail for larger sliding drops
        if (d.r > 3.5) {
          ctx.strokeStyle = `rgba(200,225,235,${d.opacity * 0.12})`;
          ctx.lineWidth = d.r * 0.5;
          ctx.beginPath();
          ctx.moveTo(d.x, d.y - d.r * 4);
          ctx.lineTo(d.x, d.y);
          ctx.stroke();
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
    <section
      ref={sectionRef}
      id="sea"
      aria-label="Alexandria sea"
      style={{
        position: 'relative',
        width: '100%',
        height: '100vh',
        overflow: 'hidden',
      }}
    >
      {/* Soft sea-sky gradient sitting behind the glass */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 0,
          background:
            'linear-gradient(to bottom, rgba(224,242,245,0.6) 0%, rgba(186,225,235,0.45) 45%, rgba(140,195,215,0.4) 100%)',
        }}
      />

      {/* RAIN DROPLETS — behind the glass pane */}
      <canvas
        ref={rainCanvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          width: '100%',
          height: '100%',
          zIndex: 1,
          display: 'block',
          pointerEvents: 'none',
        }}
      />

      {/* LIQUID GLASS PANE — frosted, semi-transparent */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          zIndex: 2,
          background:
            'linear-gradient(135deg, rgba(255,255,255,0.28) 0%, rgba(255,255,255,0.12) 50%, rgba(255,255,255,0.22) 100%)',
          backdropFilter: 'blur(4px) saturate(1.25)',
          WebkitBackdropFilter: 'blur(4px) saturate(1.25)',
          borderTop: '1px solid rgba(255,255,255,0.5)',
          borderBottom: '1px solid rgba(255,255,255,0.3)',
          boxShadow: 'inset 0 1px 0 rgba(255,255,255,0.6), inset 0 -30px 60px rgba(255,255,255,0.1)',
        }}
      />

      {/* PIXEL SEA — waves + tide, crisp cubes in front of the glass */}
      <canvas
        ref={waveCanvasRef}
        aria-hidden="true"
        style={{
          position: 'absolute',
          left: 0,
          right: 0,
          bottom: 0,
          width: '100%',
          height: '22%',
          zIndex: 3,
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
