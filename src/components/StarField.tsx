import { useEffect, useRef } from "react";

/**
 * Parallax star field.
 *
 * Four depth layers drawn to a single fixed canvas. Nearer layers move more
 * with the pointer and scroll; the faintest layer barely moves at all, which
 * is what sells the depth. The two nearest layers can also gather into four
 * labelled clusters when `clustered` is true — the stars re-read as a scatter
 * plot without changing what they are.
 *
 * Respects prefers-reduced-motion: no twinkle, no drift, instant transition.
 */

interface ClusterDef {
  x: number;
  y: number;
  c: [number, number, number];
}

const CLUSTERS: ClusterDef[] = [
  { x: 0.24, y: 0.3, c: [255, 77, 157] },
  { x: 0.72, y: 0.24, c: [69, 224, 184] },
  { x: 0.34, y: 0.74, c: [255, 194, 61] },
  { x: 0.78, y: 0.7, c: [139, 107, 255] },
];

interface LayerDef {
  density: number;
  depth: number;
  size: [number, number];
  alpha: [number, number];
  cluster: boolean;
}

const LAYERS: LayerDef[] = [
  { density: 1.0, depth: 0.14, size: [0.35, 0.85], alpha: [0.22, 0.45], cluster: false },
  { density: 0.62, depth: 0.34, size: [0.55, 1.25], alpha: [0.32, 0.62], cluster: false },
  { density: 0.38, depth: 0.62, size: [0.85, 1.85], alpha: [0.48, 0.85], cluster: true },
  { density: 0.16, depth: 1.0, size: [1.25, 2.7], alpha: [0.65, 1.0], cluster: true },
];

interface Star {
  hx: number;
  hy: number;
  cx: number;
  cy: number;
  col: [number, number, number];
  can: boolean;
  depth: number;
  r: number;
  a: number;
  tw: number;
  tws: number;
  layer: number;
}

interface FieldState {
  stars: Star[];
  w: number;
  h: number;
  mx: number;
  my: number;
  tx: number;
  ty: number;
  mix: number;
}

const rand = (a: number, b: number) => a + Math.random() * (b - a);

export default function StarField({ clustered }: { clustered: boolean }) {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const stateRef = useRef<FieldState>({
    stars: [],
    w: 0,
    h: 0,
    mx: 0,
    my: 0,
    tx: 0,
    ty: 0,
    mix: 0,
  });
  const clusteredRef = useRef(clustered);
  clusteredRef.current = clustered;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const S = stateRef.current;
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function build() {
      if (!canvas || !ctx) return;
      const w = window.innerWidth;
      const h = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      S.w = w;
      S.h = h;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);

      const areaScale = (w * h) / (1440 * 900);
      const stars: Star[] = [];

      LAYERS.forEach((L, li) => {
        const n = Math.round(150 * L.density * Math.max(0.45, Math.min(areaScale, 2.1)));
        for (let i = 0; i < n; i++) {
          const k = Math.floor(Math.random() * CLUSTERS.length);
          const ang = Math.random() * Math.PI * 2;
          const radius = Math.pow(Math.random(), 0.62) * Math.min(w, h) * 0.145;
          stars.push({
            hx: Math.random() * w,
            hy: Math.random() * (h * 1.9) - h * 0.45,
            cx: CLUSTERS[k].x * w + Math.cos(ang) * radius,
            cy: CLUSTERS[k].y * h + Math.sin(ang) * radius * 0.82,
            col: CLUSTERS[k].c,
            can: L.cluster,
            depth: L.depth,
            r: rand(L.size[0], L.size[1]),
            a: rand(L.alpha[0], L.alpha[1]),
            tw: Math.random() * Math.PI * 2,
            tws: rand(0.6, 1.9),
            layer: li,
          });
        }
      });

      S.stars = stars;
    }

    function onPointer(e: PointerEvent) {
      S.tx = (e.clientX / S.w - 0.5) * 2;
      S.ty = (e.clientY / S.h - 0.5) * 2;
    }

    let raf = 0;
    let t0 = performance.now();

    function frame(now: number) {
      if (!ctx) return;
      const dt = Math.min((now - t0) / 1000, 0.05);
      t0 = now;
      const { w, h } = S;

      S.mx += (S.tx - S.mx) * 0.045;
      S.my += (S.ty - S.my) * 0.045;

      const target = clusteredRef.current ? 1 : 0;
      S.mix += (target - S.mix) * (reduce ? 1 : 0.055);

      const scroll = window.scrollY || 0;
      ctx.clearRect(0, 0, w, h);

      // Soft halos, only once the stars have started to gather.
      if (S.mix > 0.02) {
        CLUSTERS.forEach((c) => {
          const cx = c.x * w;
          const cy = c.y * h;
          const rr = Math.min(w, h) * 0.2;
          const g = ctx.createRadialGradient(cx, cy, 0, cx, cy, rr);
          g.addColorStop(0, `rgba(${c.c[0]},${c.c[1]},${c.c[2]},${0.13 * S.mix})`);
          g.addColorStop(1, `rgba(${c.c[0]},${c.c[1]},${c.c[2]},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(cx, cy, rr, 0, Math.PI * 2);
          ctx.fill();
        });
      }

      for (let i = 0; i < S.stars.length; i++) {
        const s = S.stars[i];
        const m = s.can ? S.mix : 0;

        const px = s.depth * S.mx * 26;
        const py = s.depth * S.my * 20;
        const scrollShift = scroll * s.depth * 0.26;

        const x = s.hx + (s.cx - s.hx) * m + px;
        let y = s.hy + (s.cy + scrollShift - s.hy) * m + py - scrollShift * (1 - m);

        // Wrap vertically so the field never runs out while scrolling.
        const span = h * 1.9;
        y = (((y + h * 0.45) % span) + span) % span - h * 0.45;

        if (y < -12 || y > h + 12) continue;

        if (!reduce) s.tw += dt * s.tws;
        const twinkle = reduce ? 1 : 0.78 + 0.22 * Math.sin(s.tw);
        const alpha = s.a * twinkle;
        const r = s.r * (1 + m * 0.35);

        let col: string;
        if (m > 0.01) {
          col = [
            Math.round(238 + (s.col[0] - 238) * m),
            Math.round(236 + (s.col[1] - 236) * m),
            Math.round(255 + (s.col[2] - 255) * m),
          ].join(",");
        } else {
          col = "238,236,255";
        }

        // Only the two nearest layers get a glow; cheaper and reads as depth.
        if (s.layer >= 2) {
          const g = ctx.createRadialGradient(x, y, 0, x, y, r * 4.2);
          g.addColorStop(0, `rgba(${col},${alpha * 0.5})`);
          g.addColorStop(1, `rgba(${col},0)`);
          ctx.fillStyle = g;
          ctx.beginPath();
          ctx.arc(x, y, r * 4.2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.fillStyle = `rgba(${col},${alpha})`;
        ctx.beginPath();
        ctx.arc(x, y, r, 0, Math.PI * 2);
        ctx.fill();
      }

      raf = requestAnimationFrame(frame);
    }

    build();
    raf = requestAnimationFrame(frame);

    let resizeTimer: ReturnType<typeof setTimeout>;
    const onResize = () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(build, 180);
    };

    window.addEventListener("resize", onResize);
    window.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(raf);
      clearTimeout(resizeTimer);
      window.removeEventListener("resize", onResize);
      window.removeEventListener("pointermove", onPointer);
    };
  }, []);

  return <canvas id="sky" ref={canvasRef} aria-hidden="true" />;
}
