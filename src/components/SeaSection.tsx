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
    const PX = 5; // pixel cube size
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

    // Mediterranean palette — deep to shallow
    const deep = [16, 78, 139];     // deep sea blue
    const mid = [14, 116, 144];     // teal
    const shallow = [45, 168, 185]; // light teal
    const foam = [224, 242, 245];   // white foam

    const start = performance.now();

    const draw = (now: number) => {
      const t = (now - start) / 1000;
      ctx.clearRect(0, 0, width, height);

      const cols = Math.ceil(width / PX);

      // Tide: slow rise & fall of the whole sea level (المد والجزر)
      const tide = Math.sin(t * 0.22) * height * 0.12;
      const baseLevel = height * 0.45 + tide;

      for (let c = 0; c <= cols; c++) {
        const x = c * PX;

        // Layered waves, all phases move left -> right (x*f - t*s)
        const w1 = Math.sin(x * 0.012 - t * 1.1) * 14;
        const w2 = Math.sin(x * 0.028 - t * 1.7 + 2.1) * 8;
        const w3 = Math.sin(x * 0.005 - t * 0.6 + 4.2) * 20;
        const w4 = Math.sin(x * 0.05 - t * 2.4 + 1.3) * 3;

        const surfaceY = baseLevel + w1 + w2 + w3 + w4;
        const surfaceRow = Math.floor(surfaceY / PX);
        const rows = Math.ceil(height / PX);

        for (let r = surfaceRow; r <= rows; r++) {
          const y = r * PX;
          const depth = (y - surfaceY) / (height - surfaceY || 1); // 0 surface -> 1 bottom

          let col: number[];
          let alpha: number;

          if (r === surfaceRow) {
            // Foam crest — flickers with the wave motion
            const sparkle = Math.sin(x * 0.09 + t * 3.2) > 0.35;
            col = sparkle ? foam : shallow;
            alpha = sparkle ? 0.95 : 0.85;
          } else if (depth < 0.18) {
            col = shallow;
            alpha = 0.8;
          } else if (depth < 0.55) {
            col = mid;
            alpha = 0.85;
          } else {
            col = deep;
            alpha = 0.9;
          }

          // Occasional lighter pixel "glints" inside the water
          const glint =
            Math.sin(x * 0.07 + y * 0.11 + t * 1.4) > 0.96 && depth > 0.1;
          if (glint) {
            col = shallow;
            alpha = 0.95;
          }

          ctx.fillStyle = `rgba(${col[0]},${col[1]},${col[2]},${alpha})`;
          ctx.fillRect(x, y, PX - 1, PX - 1); // -1 keeps the pixel grid visible
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
          height: '38%',
          zIndex: 3,
          display: 'block',
          pointerEvents: 'none',
        }}
      />
    </section>
  );
}
