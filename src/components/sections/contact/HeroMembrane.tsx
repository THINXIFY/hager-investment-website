"use client";

import { useEffect, useRef } from "react";

import { gsap } from "@/lib/gsap";

const SPRING = 0.025;
const DAMPING = 0.93;
const SPREAD = 0.18;
const HOVER = { radius: 130, force: 15 };
const PRESS = { radius: 200, force: 30 };

type V = { x: number; y: number; rx: number; ry: number; vx: number; vy: number; z: number; vz: number; col: number; row: number; cf: number };

/**
 * "Membrane": a living mesh surface behind the Contact hero. A grid of vertices joined by
 * springs breathes gently; the cursor pushes the surface away and ripples travel through
 * neighbours; a click presses deeper. Colours follow the HAGER palette (silver at the edges,
 * platinum toward the centre, a teal-white glint where disturbed). While the cursor is over the
 * hero, vertices behind the copy dim so the text stays readable.
 * Canvas 2D at device pixel ratio; paused off screen and in hidden tabs; a single static frame
 * with reduced motion. Decorative only (aria-hidden), never intercepts pointer events.
 */
/** `focus`: selector for the text blocks to keep readable (every visible match gets a dimmed zone).
 *  `scope`: selector of the ancestor the mesh fills and listens on (defaults to the nearest section). */
export function HeroMembrane({ focus = "[data-hero-scroll]", scope }: { focus?: string; scope?: string } = {}) {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const section = (scope ? canvas?.closest<HTMLElement>(scope) : null) ?? canvas?.closest("section");
    const ctx = canvas?.getContext("2d");
    if (!canvas || !section || !ctx) return;
    const focusEls = () => [...section.querySelectorAll<HTMLElement>(focus)].filter((el) => el.getClientRects().length > 0 && el.offsetWidth > 0);
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    let w = 0;
    let h = 0;
    let cols = 50;
    let rows = 30;
    let verts: V[] = [];
    let zones: { cx: number; cy: number; zw: number; zh: number }[] = [];
    const mouse = { x: -9999, y: -9999, inside: false, pressing: false };

    const build = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      w = section.clientWidth;
      h = section.clientHeight;
      canvas.width = Math.round(w * dpr);
      canvas.height = Math.round(h * dpr);
      canvas.style.width = `${w}px`;
      canvas.style.height = `${h}px`;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      // 50 × 30 on desktop; fewer columns on narrow screens so spacing stays even.
      cols = Math.max(16, Math.min(50, Math.round(w / 28)));
      rows = Math.max(14, Math.min(30, Math.round(h / 26)));
      const gx = w / (cols - 1);
      const gy = h / (rows - 1);
      const cx = w / 2;
      const cy = h / 2;
      const maxDist = Math.hypot(cx, cy);
      verts = [];
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const x = c * gx;
          const y = r * gy;
          const cf = Math.pow(1 - Math.min(1, (Math.hypot(x - cx, y - cy) / maxDist) * 1.4), 1.5);
          verts.push({ x, y, rx: x, ry: y, vx: 0, vy: 0, z: 0, vz: 0, col: c, row: r, cf });
        }
      }
      // Readability zones: an ellipse around each visible text block (falls back to the centre).
      const sr = section.getBoundingClientRect();
      zones = focusEls().map((el) => {
        const cr = el.getBoundingClientRect();
        return { cx: cr.left - sr.left + cr.width / 2, cy: cr.top - sr.top + cr.height / 2, zw: Math.max(cr.width * 0.62, w * 0.12), zh: Math.max(cr.height * 0.62, h * 0.12) };
      });
      if (!zones.length) zones = [{ cx, cy, zw: w * 0.35, zh: h * 0.35 }];
    };

    const at = (c: number, r: number) => verts[r * cols + c];

    const step = (t: number) => {
      const { radius, force: strength } = mouse.pressing ? PRESS : HOVER;
      for (const v of verts) {
        const breathe = Math.sin(t * 0.6 + v.col * 0.15 + v.row * 0.12) * 2;
        v.vz += (breathe - v.z) * 0.002;
        const dx = v.x - mouse.x;
        const dy = v.y - mouse.y;
        const dist = Math.hypot(dx, dy);
        if (dist < radius && dist > 0.001) {
          const force = (1 - dist / radius) * strength;
          v.vz += force * 0.4;
          v.vx += (dx / dist) * force * 0.12;
          v.vy += (dy / dist) * force * 0.12;
        }
        v.vx += (v.rx - v.x) * SPRING;
        v.vy += (v.ry - v.y) * SPRING;
        v.vz -= v.z * SPRING * 1.5;
        v.vx *= DAMPING;
        v.vy *= DAMPING;
        v.vz *= DAMPING;
        v.x += v.vx;
        v.y += v.vy;
        v.z += v.vz;
      }
      // Ripples: each vertex is pulled toward its four neighbours' depth.
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = at(c, r)!;
          let pull = 0;
          if (c > 0) pull += at(c - 1, r)!.z - v.z;
          if (c < cols - 1) pull += at(c + 1, r)!.z - v.z;
          if (r > 0) pull += at(c, r - 1)!.z - v.z;
          if (r < rows - 1) pull += at(c, r + 1)!.z - v.z;
          v.vz += pull * SPREAD;
        }
      }
    };

    const draw = () => {
      ctx.clearRect(0, 0, w, h);
      const sy = (v: V) => v.y - v.z * 0.3;
      // Lines
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = "rgba(218,232,234,0.03)";
      ctx.beginPath();
      for (let r = 0; r < rows; r++) {
        for (let c = 0; c < cols; c++) {
          const v = at(c, r)!;
          if (c < cols - 1) {
            const n = at(c + 1, r)!;
            ctx.moveTo(v.x, sy(v));
            ctx.lineTo(n.x, sy(n));
          }
          if (r < rows - 1) {
            const n = at(c, r + 1)!;
            ctx.moveTo(v.x, sy(v));
            ctx.lineTo(n.x, sy(n));
          }
        }
      }
      ctx.stroke();
      // Vertices
      for (const v of verts) {
        const disp = Math.hypot(v.x - v.rx, v.y - v.ry) + Math.abs(v.z);
        // Silver (169,193,197) at the edges → platinum-white (232,242,243) at the centre
        let r = 169 + (232 - 169) * v.cf;
        let g = 193 + (242 - 193) * v.cf;
        let b = 197 + (243 - 197) * v.cf;
        if (disp > 3) {
          const k = Math.min(1, (disp - 3) / 20);
          // toward a teal-tinted white glint
          r += (214 - r) * k;
          g += (246 - g) * k;
          b += (250 - b) * k;
        }
        const size = 1 + v.cf + (disp > 0.5 ? disp * 0.05 : 0);
        let alpha = Math.max(0.06 + v.cf * 0.18, disp > 0.5 ? Math.min(0.9, disp * 0.05) : 0);
        if (mouse.inside) {
          let e = 1;
          for (const z of zones) e = Math.min(e, ((v.rx - z.cx) / z.zw) ** 2 + ((v.ry - z.cy) / z.zh) ** 2);
          if (e < 1) alpha *= 1 - (1 - e) * 0.7;
        }
        const x = v.x;
        const y = sy(v);
        // Stamp a pre-rendered sprite (dot, or dot + soft glow) instead of building arcs each frame.
        const glow = disp > 1.5 || v.cf > 0.4;
        const rad = glow ? size + 6 : size;
        ctx.globalAlpha = alpha;
        ctx.drawImage(sprite(r, g, b, glow), x - rad, y - rad, rad * 2, rad * 2);
      }
      ctx.globalAlpha = 1;
    };

    /* Sprite cache: colours are quantised (they lie on a short silver → white path), so only a
       handful of tiny canvases are ever created. */
    const sprites = new Map<string, HTMLCanvasElement>();
    const SPRITE = 48;
    const sprite = (r: number, g: number, b: number, glow: boolean) => {
      const q = (n: number) => Math.round(n / 8) * 8;
      const key = `${q(r)},${q(g)},${q(b)},${glow ? 1 : 0}`;
      let s = sprites.get(key);
      if (s) return s;
      s = document.createElement("canvas");
      s.width = s.height = SPRITE;
      const sc = s.getContext("2d")!;
      const c = SPRITE / 2;
      const rgb = `${q(r)},${q(g)},${q(b)}`;
      if (glow) {
        sc.fillStyle = `rgba(${rgb},0.12)`;
        sc.beginPath();
        sc.arc(c, c, c, 0, Math.PI * 2);
        sc.fill();
      }
      sc.fillStyle = `rgb(${rgb})`;
      sc.beginPath();
      sc.arc(c, c, glow ? c * 0.24 : c, 0, Math.PI * 2);
      sc.fill();
      sprites.set(key, s);
      return s;
    };

    build();

    if (reduced) {
      draw();
      canvas.style.opacity = "1";
      const onResize = () => {
        build();
        draw();
      };
      window.addEventListener("resize", onResize);
      return () => window.removeEventListener("resize", onResize);
    }

    gsap.fromTo(canvas, { opacity: 0 }, { opacity: 1, duration: 2, ease: "power2.inOut" });

    let raf = 0;
    let visible = true;
    const t0 = performance.now();
    const loop = (now: number) => {
      step((now - t0) / 1000);
      draw();
      raf = requestAnimationFrame(loop);
    };
    const start = () => {
      if (!raf && visible && !document.hidden) raf = requestAnimationFrame(loop);
    };
    const stop = () => {
      cancelAnimationFrame(raf);
      raf = 0;
    };

    const local = (e: PointerEvent) => {
      const r = section.getBoundingClientRect();
      mouse.x = e.clientX - r.left;
      mouse.y = e.clientY - r.top;
    };
    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      mouse.inside = true;
      local(e);
    };
    const onLeave = () => {
      mouse.inside = false;
      mouse.pressing = false;
      mouse.x = mouse.y = -9999;
    };
    const onDown = (e: PointerEvent) => {
      local(e);
      mouse.pressing = true;
      if (e.pointerType !== "mouse") window.setTimeout(onLeave, 450); // a tap gives one impulse
    };
    const onUp = () => {
      mouse.pressing = false;
    };
    const onResize = () => build();
    const onVisibility = () => (document.hidden ? stop() : start());

    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible) start();
      else stop();
    });
    io.observe(section);

    section.addEventListener("pointermove", onMove);
    section.addEventListener("pointerleave", onLeave);
    section.addEventListener("pointerdown", onDown);
    window.addEventListener("pointerup", onUp);
    window.addEventListener("resize", onResize);
    document.addEventListener("visibilitychange", onVisibility);
    start();

    return () => {
      stop();
      io.disconnect();
      gsap.killTweensOf(canvas);
      section.removeEventListener("pointermove", onMove);
      section.removeEventListener("pointerleave", onLeave);
      section.removeEventListener("pointerdown", onDown);
      window.removeEventListener("pointerup", onUp);
      window.removeEventListener("resize", onResize);
      document.removeEventListener("visibilitychange", onVisibility);
    };
  }, [focus, scope]);

  return <canvas ref={ref} aria-hidden="true" className="pointer-events-none absolute inset-0 opacity-0" />;
}
